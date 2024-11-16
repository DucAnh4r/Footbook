import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import styles from './FriendsHomePage.module.scss';
import LeftSidebar from './Components/LeftSidebar';
import { Layout } from 'antd';
import FriendRequests from './Components/FriendRequestsList';

const { Sider, Content } = Layout;

const FriendsPage = () => {
  // Dữ liệu ví dụ cho "Lời mời kết bạn"
  const friendRequests = [
    { name: 'Trần Thịnh', image: 'link_to_image_3.jpg', mutualFriends: 1 },
    { name: 'Hà My', image: 'link_to_image_4.jpg', mutualFriends: 2 },
    { name: 'Trần Thịnh', image: 'link_to_image_3.jpg', mutualFriends: 1 },
    { name: 'Hà My', image: 'link_to_image_4.jpg', mutualFriends: 2 },{ name: 'Trần Thịnh', image: 'link_to_image_3.jpg', mutualFriends: 1 },
    { name: 'Hà My', image: 'link_to_image_4.jpg', mutualFriends: 2 },{ name: 'Trần Thịnh', image: 'link_to_image_3.jpg', mutualFriends: 1 },
    { name: 'Hà My', image: 'link_to_image_4.jpg', mutualFriends: 2 },{ name: 'Trần Thịnh', image: 'link_to_image_3.jpg', mutualFriends: 1 },
    { name: 'Hà My', image: 'link_to_image_4.jpg', mutualFriends: 2 },
    { name: 'Hà My', image: 'link_to_image_4.jpg', mutualFriends: 2 },
    { name: 'Hà My', image: 'link_to_image_4.jpg', mutualFriends: 2 },
    { name: 'Hà My', image: 'link_to_image_4.jpg', mutualFriends: 2 },
    { name: 'Hà My', image: 'link_to_image_4.jpg', mutualFriends: 2 },
    { name: 'Hà My', image: 'link_to_image_4.jpg', mutualFriends: 2 },
    { name: 'Hà My', image: 'link_to_image_4.jpg', mutualFriends: 2 },
    { name: 'Hà My', image: 'link_to_image_4.jpg', mutualFriends: 2 },
    // Thêm dữ liệu lời mời kết bạn khác ở đây...
  ];

  // Dữ liệu ví dụ cho "Những người bạn có thể biết"
  const suggestedFriends = [
    { name: 'John Doe', image: 'link_to_image_1.jpg', mutualFriends: 5 },{ name: 'John Doe', image: 'link_to_image_1.jpg', mutualFriends: 5 },
    { name: 'Jane Smith', image: 'link_to_image_2.jpg', mutualFriends: 3 },{ name: 'John Doe', image: 'link_to_image_1.jpg', mutualFriends: 5 },
    { name: 'Jane Smith', image: 'link_to_image_2.jpg', mutualFriends: 3 },{ name: 'John Doe', image: 'link_to_image_1.jpg', mutualFriends: 5 },
    { name: 'Jane Smith', image: 'link_to_image_2.jpg', mutualFriends: 3 },{ name: 'John Doe', image: 'link_to_image_1.jpg', mutualFriends: 5 },
    { name: 'Jane Smith', image: 'link_to_image_2.jpg', mutualFriends: 3 },{ name: 'John Doe', image: 'link_to_image_1.jpg', mutualFriends: 5 },
    { name: 'Jane Smith', image: 'link_to_image_2.jpg', mutualFriends: 3 },{ name: 'John Doe', image: 'link_to_image_1.jpg', mutualFriends: 5 },
    { name: 'Jane Smith', image: 'link_to_image_2.jpg', mutualFriends: 3 },{ name: 'John Doe', image: 'link_to_image_1.jpg', mutualFriends: 5 },
    { name: 'Jane Smith', image: 'link_to_image_2.jpg', mutualFriends: 3 },{ name: 'John Doe', image: 'link_to_image_1.jpg', mutualFriends: 5 },
    { name: 'Jane Smith', image: 'link_to_image_2.jpg', mutualFriends: 3 },{ name: 'John Doe', image: 'link_to_image_1.jpg', mutualFriends: 5 },
    { name: 'Jane Smith', image: 'link_to_image_2.jpg', mutualFriends: 3 },
    { name: 'Jane Smith', image: 'link_to_image_2.jpg', mutualFriends: 3 },
    // Thêm dữ liệu những người bạn có thể biết ở đây...
  ];

  return (
    <Layout>
      <Sider
        width={360}
        style={{
          background: 'white',
          height: '100vh',
          overflow: 'hidden',
          position: 'fixed',
          top: '64px',
          left: '0',
          zIndex: '100'
        }}
        className="scroll-on-hover"
      >
        <LeftSidebar />
      </Sider>

      <Content style={{ padding: '70px 0px 70px 370px', minHeight: '100vh', overflow: 'auto' }}>
        <div className="page-content">
          {/* Hiển thị Lời mời kết bạn */}
          <FriendRequests requestsType="friendRequests" data={friendRequests} />

          {/* Hiển thị Những người bạn có thể biết */}
          <FriendRequests requestsType="suggestedFriends" data={suggestedFriends} />
        </div>
      </Content>
    </Layout>
  );
};

export default FriendsPage;
