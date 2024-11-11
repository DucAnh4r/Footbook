import React from 'react';
import { Layout } from 'antd';
import StatusInput from './StatusInput';
import StoryList from './StoryList';
import Post from './Post';
import SuggestedFriends from './SuggestedFriends';
import Reels from './Reels';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import RightSidebar from './RightSidebar/RightSidebar';

const { Sider, Content } = Layout;

const Homepage = () => {
  document.title = "Trang chủ";
  return (
    <>
      <Sider
        width={360}
        style={{
          background: '#f5f5f5',
          maxHeight: '100vh',
          overflow: 'hidden'
        }}
        className="scroll-on-hover"
      >
        <LeftSidebar />
      </Sider>
      
      <Content style={{ padding: '16px' }}>
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
          maxHeight: '100vh',
          overflow: 'hidden'
        }}
        className="scroll-on-hover"
      >
        <RightSidebar />
      </Sider>
    </>
  );
};

export default Homepage;
