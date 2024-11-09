// /src/components/MessageContent.jsx
import React from 'react';
import { Avatar, Button, Divider, Input, Badge, List, Typography, Space } from 'antd';

const { Text } = Typography;

const messages = [
  { id: 1, name: 'Người dùng 1', message: 'Nội dung tin nhắn mẫu...', time: '1 giờ', avatar: 'https://via.placeholder.com/40', unread: true },
  { id: 2, name: 'Người dùng 2', message: 'Nội dung tin nhắn mẫu...', time: '2 giờ', avatar: 'https://via.placeholder.com/40', unread: true },
  { id: 3, name: 'Người dùng 3', message: 'Nội dung tin nhắn mẫu...', time: '3 giờ', avatar: 'https://via.placeholder.com/40', unread: false },
  // Add more messages as needed
];

const MessageContent = () => (
  <div style={{ width: 300 }}>
    <Space style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
      <Button type="text" style={{ fontWeight: 'bold' }}>Hộp thư</Button>
      <Button type="text">Cộng đồng</Button>
    </Space>
    <Divider />

    <Input placeholder="Tìm kiếm trên Messenger" style={{ borderRadius: '20px', marginBottom: '8px' }} />
    <Divider />

    <List
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={({ id, name, message, time, avatar, unread }) => (
        <List.Item style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
          <List.Item.Meta
            avatar={<Avatar src={avatar} size="small" />}
            title={<Text strong>{name}</Text>}
            description={<Text type="secondary" style={{ fontSize: '12px' }}>{message} · {time}</Text>}
          />
          {unread && <Badge dot color="#1890ff" />}
        </List.Item>
      )}
    />
    <Divider />

    <Button type="text" style={{ width: '100%', textAlign: 'center', color: '#1877f2' }}>Xem tất cả trong Messenger</Button>
  </div>
);

export default MessageContent;
