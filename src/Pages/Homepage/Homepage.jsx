import React from 'react';
import { Layout } from 'antd';
import RightSidebar from './RightSidebar/RightSidebar';
import StatusInput from './StatusInput';
import Post from './Post';
import SuggestedFriends from '../ProfilePage/UserProfilePage/SuggestedFriends';
import Reels from './Reels';
import StoryList from './StoryList';
import LeftSidebar from './LeftSidebar/LeftSidebar';

const { Sider, Content } = Layout;

const Homepage = () => {

  return (
    <>
      <Sider
        width={360}
        style={{
          background: '#f5f5f5',
          height: '100vh',
          position: 'fixed',
          top: '64px',
          left: '0',
          zIndex: 100,
        }}
      >
        <LeftSidebar />
      </Sider>

        <Content style={{ padding: '70px 370px', minHeight: '100vh' }}>
          <div className="page-content">
            <StatusInput />
            <StoryList />
            <Post />
            <SuggestedFriends />
            <Reels />
          </div>
        </Content>


      <Sider
        width={360}
        style={{
          background: '#f5f5f5',
          height: '100vh',
          position: 'fixed',
          top: '64px',
          right: '0',
          zIndex: 100,
        }}
      >
        <RightSidebar />
      </Sider>
    </>
  );
};

export default Homepage;
