import React from 'react';
import { Avatar, Badge, Button, Divider, Input, List, Typography, Space, Tooltip, Popover } from 'antd';
import { EllipsisOutlined, ExpandOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SettingsMenu from './SettingsMenu';

const { Text, Title } = Typography;

const messages = [
  { id: 1, name: 'Người dùng Người dùng Người dùng Người dùng Người dùng ', message: 'Nội dung tin nhắn mẫu...', time: '1 giờ', avatar: 'https://via.placeholder.com/40', unread: true, active: true },
  { id: 2, name: 'Người dùng 2', message: 'Nội dung tin nhắn mẫu...', time: '2 giờ', avatar: 'https://via.placeholder.com/40', unread: true, active: false },
  { id: 3, name: 'Người dùng 3', message: 'Nội dung tin nhắn mẫu...', time: '3 giờ', avatar: 'https://via.placeholder.com/40', unread: false, active: true },
];

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const MessageContent = ({ onMessageClick, onClose }) => {
  const navigate = useNavigate();

  const handleExpandClick = () => {
    navigate('/messages');
    if (typeof onClose === 'function') {
      onClose(); // Đóng Popover nếu có
    }
  };

  const MessageItem = ({ id, name, message, time, avatar, unread }) => (
    <List.Item
      style={styles.messageItem}
      onClick={() => {
        if (typeof onMessageClick === 'function') {
          onMessageClick({ id, name, message, avatar });
        }
        if (typeof onClose === 'function') {
          onClose(); // Đóng Popover khi chọn tin nhắn
        }
      }}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar} size="small" />}
        title={<Text strong>{truncateText(name, 30)}</Text>} // Hiển thị tối đa 20 ký tự
        description={
          <Text type="secondary" style={styles.messageDescription}>
            {message} · {time}
          </Text>
        }
      />
      {unread && <Badge dot color="#1890ff" />}
    </List.Item>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Title level={5} style={styles.title}>Đoạn chat</Title>
        <Space>
          <Tooltip title="Tùy chọn">
            <Popover
              content={<SettingsMenu />}
              trigger="click"
              placement="bottomRight"
            >
              <EllipsisOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
            </Popover>
          </Tooltip>
          <Tooltip title="Mở rộng">
            <ExpandOutlined style={styles.icon} onClick={handleExpandClick} />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <EditOutlined style={styles.icon} />
          </Tooltip>
        </Space>
      </div>
      <Input placeholder="Tìm kiếm trên Messenger" style={styles.searchInput} />
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(item) => <MessageItem key={item.id} {...item} />}
      />
      <Divider />
      <Button type="text" onClick={handleExpandClick} style={styles.viewAllButton}>
        Xem tất cả trong Messenger
      </Button>
    </div>
  );
};


const styles = {
  container: { width: 300 },
  header: { display: 'flex', justifyContent: 'space-between', padding: '10px' },
  title: { margin: 0, fontWeight: 'bold' },
  icon: { fontSize: '16px', color: 'gray', cursor: 'pointer' },
  searchInput: { borderRadius: '20px' },
  messageItem: { padding: '8px 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' },
  messageDescription: { fontSize: '12px' },
  viewAllButton: { width: '100%', textAlign: 'center', color: '#1877f2' },
};

export default MessageContent;
