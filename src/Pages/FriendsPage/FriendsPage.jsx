import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import styles from './FriendsPage.module.scss';
import LeftSidebar from './LeftSidebar';
import { Layout } from 'antd';
import FriendRequests from './FriendRequests';

const { Sider, Content } = Layout;


const FriendsPage = () => {
  return (
    <>
      <Sider
        width={360}
        style={{
          background: 'white',
          maxHeight: '100vh',
          overflow: 'hidden'

        }}
        className="scroll-on-hover"
      >
        <LeftSidebar />
      </Sider>
      
      <Content style={{ padding: '16px' }}>
        <div className="page-content">
          <FriendRequests />
        </div>
      </Content>
      
      
    </>
  );
};

export default FriendsPage;
