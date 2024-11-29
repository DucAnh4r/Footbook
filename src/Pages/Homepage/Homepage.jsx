
import React from 'react';
import { Layout } from 'antd';
import StatusInput from './StatusInput';
import StoryList from './StoryList';
import Post from '../../Components/Post';
import Reels from './Reels';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import RightSidebar from './RightSidebar/RightSidebar';
import './Homepage.scss'
import SuggestedFriends from '../ProfilePage/UserProfilePage/SuggestedFriends';
import GroupPost from '../../Components/GroupPost';


const { Sider, Content } = Layout;

const Homepage = () => {
  document.title = "Trang chủ";
  return (
    <>
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
      
      <Content style={{ padding: '70px 370px', minHeight: '100vh', overflow: 'unset' }}>
        <div className="page-content" style={{padding: '16px 30px'}}>
          <StatusInput />
          <StoryList />
          <Post />
          <GroupPost />
          <SuggestedFriends />
          <Reels />
        </div>
      </Content>
      
      <Sider
        width={360}
        style={{
          background: '#f5f5f5',
          height: '100vh',
          overflow: 'hidden',
          position: 'fixed',
          top: '64px',
          right: '0',
          zIndex: '100'
        }}
        className="scroll-on-hover"
      >
        <RightSidebar />
      </Sider>
    </>
  );
};

export default Homepage;
