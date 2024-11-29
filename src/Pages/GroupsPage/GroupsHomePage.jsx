import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import styles from './GroupsHomePage.module.scss';
import LeftSidebar from './Components/LeftSidebar';
import { Layout } from 'antd';
import GroupsPost from './GroupsPost';

const { Sider, Content } = Layout;

const GroupsPage = () => {

  return (
    <Layout>
      <Sider
        width={360}
        style={{
          background: '#f5f5f5',
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

      <Content style={{ padding: '70px 370px', minHeight: '100vh', overflow: 'unset', marginLeft: '100px', }}>
        <div className="page-content">
          <h3>Hoạt động gần đây</h3>
          <GroupsPost />
          <GroupsPost />
        </div>
      </Content>
    </Layout>
  );
};

export default GroupsPage;
