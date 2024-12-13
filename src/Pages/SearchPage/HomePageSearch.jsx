import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './HomePageSearch.module.scss';
import LeftSidebar from './Components/LeftSidebar';
import Post from '../../Components/Post';
import {Row} from 'antd'
import { useAuthCheck } from '../../utils/checkAuth';

const { Sider, Content } = Layout;

const HomePageSearch = () => {
  useAuthCheck();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Lấy query string từ URL
    const params = new URLSearchParams(location.search);
    const query = params.get('query'); // "searchQuery" là tên của query bạn truyền
    setSearchQuery(query || '');
  }, [location.search]);

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
        <LeftSidebar query={searchQuery} />
      </Sider>

      <Content style={{ padding: '70px 0px 70px 380px', minHeight: '100vh', overflow: 'auto' }}>
        <div className="page-content">
          <h1>Kết quả tìm kiếm cho: {searchQuery}</h1>
          {/* Hiển thị kết quả tìm kiếm */}
          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '70%'}}> 
              <Post></Post>
              <Post></Post>
              <Post></Post>
              <Post></Post>
              <Post></Post>
              <Post></Post>

            </div>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePageSearch;
