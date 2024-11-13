import React from 'react';
import AboutSection from './AboutSection';
import { Col, Row, Space } from 'antd';
import StatusInput from '../../../../Homepage/StatusInput';
import Post from '../../../../Homepage/Post';
import PostFilter from './PostFilter';
import PhotoGallery from './PhotoGallery';
import FriendsList from './FriendsList';
import styles from './Posts.module.scss';

const Posts = () => {
  const isFriend = true
  return (
    <Row gutter={16}>
      <Col
        span={10}
        className={styles.leftCol}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <AboutSection />
          <PhotoGallery />
          <FriendsList />
        </Space>
      </Col>
      <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} span={14}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <PostFilter />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </Space>
      </Col>
    </Row>
  );
};

export default Posts;
