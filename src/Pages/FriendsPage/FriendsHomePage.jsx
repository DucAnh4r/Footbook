import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import styles from './FriendsHomePage.module.scss';
import LeftSidebar from './Components/LeftSidebar';
import { Layout } from 'antd';
import FriendRequestsList from './Components/FriendRequestsList';
import { useAuthCheck } from '../../utils/checkAuth';

const { Sider, Content } = Layout;

const FriendsPage = () => {
  useAuthCheck();
  // Dữ liệu ví dụ cho "Lời mời kết bạn"
  const friendRequests = [
    { name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 }
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,
    ,
    // Thêm dữ liệu những người bạn có thể biết ở đây...
  ];

  // Dữ liệu ví dụ cho "Những người bạn có thể biết"
  const suggestedFriends = [
    { name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 }
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,{ name: 'John Doe', image: 'https://cdn.britannica.com/37/231937-050-9228ECA1/Drake-rapper-2019.jpg?w=400&h=300&c=crop', mutualFriends: 5 },
    ,
    ,
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
          zIndex: '100',
          boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)', 
        }}
        className="scroll-on-hover"
      >
        <LeftSidebar />
      </Sider>

      <Content style={{ padding: '70px 0px 70px 380px', minHeight: '100vh', overflow: 'auto' }}>
        <div className="page-content">
          {/* Hiển thị Lời mời kết bạn */}
          <FriendRequestsList requestsType="friendRequests" data={friendRequests} />

          {/* <div style={{height: '40px'}}></div> */}

          {/* Hiển thị Những người bạn có thể biết */}
          <FriendRequestsList requestsType="suggestedFriends" data={suggestedFriends} />
        </div>
      </Content>
    </Layout>
  );
};

export default FriendsPage;
