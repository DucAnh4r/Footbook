import React, { useState, useEffect } from 'react';
import { Avatar, Badge, Button, Input, List, Tabs, Tooltip, Typography, Dropdown, Menu } from 'antd';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';
import { FaCog, FaUserShield, FaQuestionCircle, FaDesktop, FaEnvelope, FaArchive, FaShieldAlt } from 'react-icons/fa';
import SettingsMessageModal from '../../../Modal/SettingsMessageModal';
import RestrictedAccountsView from './RestrictedAccountsView'; // Import view cho "Tài khoản đã hạn chế"

const { Text, Title } = Typography;
const { TabPane } = Tabs;

const messages = [
  { id: 1, name: 'Nguyễn Đức Anh', message: 'truyền được data vào rồi hiểu...', time: '14 phút', avatar: 'https://via.placeholder.com/40', online: true, isGroup: false },
  { id: 2, name: 'Chuẩn bị du hí hè thu', message: 'Bạn: Chỉ thấy đi chơi là lạ', time: '1 giờ', avatar: 'https://via.placeholder.com/40', isGroup: true },
  { id: 3, name: 'IT4', message: 'Loc no fuho đã gửi một nhắn...', time: '1 ngày', avatar: 'https://via.placeholder.com/40', isGroup: true },
  { id: 4, name: 'Nguyễn Hải', message: 'Bạn: https://www.facebook.com...', time: '3 ngày', avatar: 'https://via.placeholder.com/40', online: true, isGroup: false },
  { id: 5, name: 'dm', message: 'Đức Duy: mà đíu gửi đc 😴', time: '2 ngày', avatar: 'https://via.placeholder.com/40', isGroup: true },
  { id: 6, name: 'Naruto Ramen', message: 'Naruto Ramen đã gửi một...', time: '2 ngày', avatar: 'https://via.placeholder.com/40', unread: true, isGroup: true },
];

const MessageLeftSidebar = ({ onSelectChat }) => {
  const [selectedChatId, setSelectedChatId] = useState(messages[0].id); // Default to the first message
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRestrictedView, setIsRestrictedView] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openRestrictedView = () => {
    setIsModalVisible(false); // Đóng modal trước khi chuyển view
    setIsRestrictedView(true);
  };

  const goBackToMainView = () => {
    setIsRestrictedView(false);
  };

  useEffect(() => {
    onSelectChat(messages[0]);
  }, [onSelectChat]);

  const handleSelectChat = (msg) => {
    setSelectedChatId(msg.id);
    onSelectChat(msg);
  };

  // Dropdown menu options
  const menu = (
    <Menu style={{ padding: '20px 10px' }}>
      <Menu.Item key="1" onClick={showModal} icon={<FaCog />}>Tùy chọn</Menu.Item>
      <Menu.Item key="2" icon={<FaEnvelope />}>Tin nhắn đang chờ</Menu.Item>
      <Menu.Item key="3" icon={<FaArchive />}>Đoạn chat đã lưu trữ</Menu.Item>
      <Menu.Item key="4" onClick={openRestrictedView} icon={<FaUserShield />}>Tài khoản đã hạn chế</Menu.Item> {/* Thay đổi onClick để mở RestrictedAccountsView */}
      <Menu.Item key="5" icon={<FaShieldAlt />}>Quyền riêng tư & an toàn</Menu.Item>
      <Menu.Item key="6" icon={<FaQuestionCircle />}>Trợ giúp</Menu.Item>
      <Menu.Item key="7" icon={<FaDesktop />}>Dùng thử Messenger dành cho máy tính</Menu.Item>
    </Menu>
  );

  return (
    !isRestrictedView ? (
      <div style={styles.sidebar}>
        <div style={styles.header}>
          <Title level={5} style={styles.title}>Đoạn chat</Title>
          <div style={styles.headerIcons}>
            <Dropdown overlay={menu} trigger={['click']}>
              <Tooltip title="Tùy chọn">
                <EllipsisOutlined style={styles.icon} />
              </Tooltip>
            </Dropdown>
            <Tooltip title="Chỉnh sửa">
              <EditOutlined style={styles.icon} />
            </Tooltip>
          </div>
        </div>

        <Input placeholder="Tìm kiếm trên Messenger" style={styles.searchInput} />

        <Tabs defaultActiveKey="1" style={styles.tabs}>
          <TabPane tab="Hộp thư" key="1">
            <MessageList onSelectChat={handleSelectChat} selectedChatId={selectedChatId} />
          </TabPane>
          <TabPane tab="Cộng đồng" key="2">
            {/* Content for "Cộng đồng" */}
          </TabPane>
        </Tabs>

        <SettingsMessageModal visible={isModalVisible} onClose={closeModal} />
      </div>
    ) : (
      <RestrictedAccountsView onBack={goBackToMainView} />
    )
  );
};

const MessageList = ({ onSelectChat, selectedChatId }) => (
  <List
    itemLayout="horizontal"
    dataSource={messages}
    renderItem={(msg) => (
      <List.Item
        style={{
          ...styles.messageItem,
          ...(msg.highlight && styles.highlight),
          ...(msg.id === selectedChatId && styles.selected),

        }}
        onClick={() => onSelectChat(msg)}
      >
        <List.Item.Meta
          style={{
            padding: '10px 0px'
          }}
          avatar={
            <Badge dot={msg.online} color="green" offset={[-2, 30]}>
              <Avatar src={msg.avatar} size="large" />
            </Badge>
          }
          title={<Text strong>{msg.name}</Text>}
          description={
            <div style={styles.messageDescription}>
              <Text type="secondary" ellipsis>{msg.message}</Text>
              <Text style={styles.timeText}>{msg.time}</Text>
            </div>
          }
        />
        {msg.unread && <Badge dot color="#1890ff" />}
      </List.Item>
    )}
  />
);

const styles = {
  sidebar: {
    width: '360px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    padding: '16px',
    maxHeight: '93vh',
    overflowY: 'auto',
    height: '500px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    margin: 0,
  },
  headerIcons: {
    display: 'flex',
    gap: '8px',
  },
  icon: {
    fontSize: '20px',
    color: 'gray',
    cursor: 'pointer',
  },
  searchInput: {
    borderRadius: '20px',
    marginBottom: '16px',
  },
  tabs: {
    marginBottom: '16px',
  },
  messageItem: {
    padding: '10px 0',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
  },
  highlight: {
    backgroundColor: '#e6f7ff',
    borderRadius: '8px',
  },
  selected: {
    backgroundColor: '#d6e4ff',
    borderRadius: '8px',
  },
  messageDescription: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: '12px',
    color: 'gray',
    marginLeft: '10px',
  },
};

export default MessageLeftSidebar;
