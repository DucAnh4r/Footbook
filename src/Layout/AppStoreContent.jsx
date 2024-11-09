// /src/components/AppStoreContent.jsx
import React from 'react';
import { Avatar, Divider, Input, List, Typography, Space, Button } from 'antd';
import {
  FaStar,
  FaUserFriends,
  FaUsers,
  FaNewspaper,
  FaStream,
  FaStore,
  FaGamepad,
  FaVideo,
} from "react-icons/fa";

const { Text } = Typography;

const sections = [
  {
    title: 'Xã hội',
    items: [
      { icon: <FaStar />, title: 'Sự kiện', description: 'Tổ chức hoặc tìm sự kiện cùng những hoạt động khác trên mạng và ở quanh đây.' },
      { icon: <FaUserFriends />, title: 'Bạn bè', description: 'Tìm kiếm bạn bè hoặc những người bạn có thể biết.' },
      { icon: <FaUsers />, title: 'Nhóm', description: 'Kết nối với những người có chung sở thích.' },
      { icon: <FaNewspaper />, title: 'Bảng tin', description: 'Xem bài viết phù hợp của những người và Trang bạn theo dõi.' },
      { icon: <FaStream />, title: 'Bảng feed', description: 'Xem bài viết gần đây nhất từ bạn bè, nhóm, Trang và hơn thế nữa.' },
      { icon: <FaStore />, title: 'Trang', description: 'Khám phá và kết nối với các doanh nghiệp trên Facebook.' },
    ],
  },
  {
    title: 'Giải trí',
    items: [
      { icon: <FaVideo />, title: 'Video chơi game', description: 'Xem, kết nối với những game và người phát trực tiếp mà bạn yêu thích.' },
      { icon: <FaGamepad />, title: 'Chơi game', description: 'Chơi game bạn yêu thích.' },
      { icon: <FaVideo />, title: 'Video', description: 'Dành cho video phù hợp với sở thích và quan hệ kết nối của bạn.' },
    ],
  },
];

const AppStoreContent = () => (
  <div style={{ width: 300 }}>
    <Input placeholder="Tìm kiếm trong menu" style={{ borderRadius: '20px', marginBottom: '8px' }} />
    <Divider />

    {sections.map((section) => (
      <div key={section.title}>
        <Text strong>{section.title}</Text>
        <List
          itemLayout="horizontal"
          dataSource={section.items}
          renderItem={({ icon, title, description }) => (
            <List.Item style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
              <List.Item.Meta
                avatar={<Avatar icon={icon} size="small" style={{ backgroundColor: '#f0f2f5' }} />}
                title={<Text strong>{title}</Text>}
                description={<Text type="secondary" style={{ fontSize: '12px' }}>{description}</Text>}
              />
            </List.Item>
          )}
        />
        <Divider />
      </div>
    ))}

    <Text strong>Tạo</Text>
    <Space direction="vertical" style={{ width: '100%' }}>
      {[
        { icon: <FaNewspaper />, title: 'Đăng' },
        { icon: <FaStream />, title: 'Tin' },
        { icon: <FaVideo />, title: 'Thước phim' },
        { icon: <FaStar />, title: 'Sự kiện trong đời' },
        { icon: <FaStore />, title: 'Trang' },
        { icon: <FaStream />, title: 'Quảng cáo' },
        { icon: <FaUsers />, title: 'Nhóm' },
        { icon: <FaNewspaper />, title: 'Sự kiện' },
        { icon: <FaGamepad />, title: 'Bài niêm yết trên Marketplace' },
      ].map(({ icon, title }) => (
        <Button
          key={title}
          type="text"
          icon={icon}
          style={{ display: 'flex', justifyContent: 'start', width: '100%' }}
        >
          {title}
        </Button>
      ))}
    </Space>
  </div>
);

export default AppStoreContent;
