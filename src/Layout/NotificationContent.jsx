// /src/components/NotificationContent.jsx
import React from 'react';
import { Avatar, Button, Divider, Badge, List, Typography, Space } from 'antd';

const { Text } = Typography;

const notifications = [
  {
    id: 1,
    name: 'Sinh Viên Đại học Xây Dựng Hà Nội...',
    time: '13 giờ',
    reactions: '97 cảm xúc',
    comments: '11 bình luận',
    avatar: 'https://via.placeholder.com/40',
    unread: true,
  },
  {
    id: 2,
    name: 'Hội chế đồ ăn có tâm!!!',
    time: '15 giờ',
    reactions: '26 cảm xúc',
    comments: '7 bình luận',
    avatar: 'https://via.placeholder.com/40',
    unread: true,
  },
  // Add more notifications as needed
];

const NotificationContent = () => (
  <div style={{ width: 300 }}>
    <Space style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
      <Button type="text">Tất cả</Button>
      <Button type="text">Chưa đọc</Button>
    </Space>
    <Divider />

    <Space direction="vertical" style={{ width: '100%', padding: '8px 0' }}>
      <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
        <Text strong>Bạn đã tắt thông báo này</Text>
        <Button type="link" style={{ color: '#1877f2', padding: 0 }}>Bật</Button>
      </Space>
      <Text type="secondary" style={{ fontSize: '12px' }}>Bật thông báo để giữ kết nối</Text>
    </Space>
    <Divider />

    <Text strong>Trước đó</Text>
    <List
      itemLayout="horizontal"
      dataSource={notifications}
      renderItem={({ id, name, time, reactions, comments, avatar, unread }) => (
        <List.Item style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
          <List.Item.Meta
            avatar={<Avatar src={avatar} size="small" />}
            title={<Text style={{ fontSize: '14px' }}>{name}</Text>}
            description={
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {time} · {reactions} · {comments}
              </Text>
            }
          />
          {unread && <Badge dot style={{ backgroundColor: '#1890ff' }} />}
        </List.Item>
      )}
    />
    <Divider />

    <Button type="text" style={{ width: '100%', textAlign: 'center' }}>Xem thông báo trước đó</Button>
  </div>
);

export default NotificationContent;
