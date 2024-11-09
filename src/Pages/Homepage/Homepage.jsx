import { Layout } from 'antd'
import StatusInput from './StatusInput';
import StoryList from './StoryList';
import React from 'react'
import Post from './Post';
import SuggestedFriends from './SuggestedFriends';
import Reels from './Reels';

const Homepage = () => {
  document.title = "Trang chủ"
  return (
    <React.Fragment>
      <Layout style={{ padding: '16px 24px 24px', alignItems: 'center' }}>
          <StatusInput />
          <StoryList />
          <Post />
          <SuggestedFriends />
          <Reels />
      </Layout>
    </React.Fragment>
  )
}

export default Homepage