// /src/components/MessageContent.jsx
import React, { useState } from 'react';
import { Avatar, Button, Divider, Input, Badge, List, Typography, Space, Tooltip, Popover } from 'antd';
import { EllipsisOutlined, ExpandOutlined, EditOutlined } from '@ant-design/icons';
import SettingsMenu from './SettingsMenu'; // Đảm bảo bạn có component này hoặc import đúng
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

const messages = [
  { id: 1, name: 'Người dùng 1', message: 'Nội dung tin nhắn mẫu...', time: '1 giờ', avatar: 'https://via.placeholder.com/40', unread: true },
  { id: 2, name: 'Người dùng 2', message: 'Nội dung tin nhắn mẫu...', time: '2 giờ', avatar: 'https://via.placeholder.com/40', unread: true },
  { id: 3, name: 'Người dùng 3', message: 'Nội dung tin nhắn mẫu...', time: '3 giờ', avatar: 'https://via.placeholder.com/40', unread: false },
  // Add more messages as needed
];

const MessageContent = () => {
  const [visible, setVisible] = useState(false);
  
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const navigate = useNavigate();

  const handleExpandClick = () => {
    navigate('/messages');
  };

  const Header = () => (
    <div style={styles.header}>
      <Title level={5} style={styles.title}>Đoạn chat</Title>
      <Space>
        <Tooltip title="Tùy chọn">
          <Popover
            content={<SettingsMenu />}
            trigger="click"
            open={visible}
            onOpenChange={handleVisibleChange}
            placement="bottomRight"
          >
            <EllipsisOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
          </Popover>
        </Tooltip>
        <Tooltip title="Mở rộng"><ExpandOutlined style={styles.icon} onClick={handleExpandClick} /></Tooltip>
        <Tooltip title="Chỉnh sửa"><EditOutlined style={styles.icon} /></Tooltip>
      </Space>
    </div>
  );

  const MessageItem = ({ id, name, message, time, avatar, unread }) => (
    <List.Item style={styles.messageItem}>
      <List.Item.Meta
        avatar={<Avatar src={avatar} size="small" />}
        title={<Text strong>{name}</Text>}
        description={<Text type="secondary" style={styles.messageDescription}>{message} · {time}</Text>}
      />
      {unread && <Badge dot color="#1890ff" />}
    </List.Item>
  );

  return (
    <div style={styles.container}>
      <Header />
      <Input placeholder="Tìm kiếm trên Messenger" style={styles.searchInput} />
      <Space style={styles.buttonsContainer}>
        <Button type="text" style={styles.activeButton}>Hộp thư</Button>
        <Button type="text">Cộng đồng</Button>
      </Space>

      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(item) => <MessageItem key={item.id} {...item} />}
      />
      <Divider />

      <Button type="text" onClick={handleExpandClick} style={styles.viewAllButton}>Xem tất cả trong Messenger</Button>
    </div>
  );
};

const styles = {
  container: {
    width: 300,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  },
  title: {
    margin: 0,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: '16px',
    color: 'gray',
    cursor: 'pointer',
  },
  searchInput: {
    borderRadius: '20px',
  },
  buttonsContainer: {
    display: 'flex',
    padding: '8px 0',
  },
  activeButton: {
    fontWeight: 'bold',
  },
  messageItem: {
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  messageDescription: {
    fontSize: '12px',
  },
  viewAllButton: {
    width: '100%',
    textAlign: 'center',
    color: '#1877f2',
  },
};

export default MessageContent;
