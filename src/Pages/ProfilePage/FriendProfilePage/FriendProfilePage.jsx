import React, { useState } from 'react';
import { Row, Col, Tabs, Dropdown, Menu, Flex } from 'antd';

import styles from './FriendProfilePage.module.scss';
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import Posts from './Tabs/Posts/Posts.jsx';
import Introduction from './Tabs/Introduction/Introduction.jsx';
import Friends from './Tabs/Friends/Friends.jsx';
import Photos from './Tabs/Photos/Photos.jsx';
import Videos from './Tabs/Videos/Videos.jsx';
import { AiFillMessage } from 'react-icons/ai';
import { EllipsisOutlined } from '@ant-design/icons';
import SuggestedFriends from '../UserProfilePage/SuggestedFriends.jsx';

const FriendProfilePage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [isFriendSuggestionVisible, setFriendSuggestionVisible] = useState(false);


  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const toggleFriendSuggestion = () => {
    setFriendSuggestionVisible(!isFriendSuggestionVisible);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "1":
        return <Posts />;
      case "2":
        return <Introduction />;
      case "3":
        return <Friends />;
      case "4":
        return <Photos />;
      case "5":
        return <Videos />;
      case "6":
        return <div>Nội dung của tab Reels</div>;
      case "7":
        return <div>Nội dung của tab Xem thêm</div>;
      default:
        return null;
    }
  };

  const menu = (
    <Menu className={styles['custom-menu']}>
      <Menu.Item key="1" className={styles['menu-item']}>Tìm kiếm</Menu.Item>
      <Menu.Item key="2" className={styles['menu-item']}>Báo cáo trang cá nhân</Menu.Item>
      <Menu.Item key="3" className={styles['menu-item']}>Chặn</Menu.Item>

    </Menu>

  );

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <div className={styles['wallpaper']}>
            <img className={styles['wallpaper-img']} src="https://imagev3.vietnamplus.vn/1200x630/Uploaded/2024/mzdic/2024_06_23/ronaldo-2306-8285.jpg.webp" alt="" />
          </div>
          <Row className={styles['info']} gutter={16}>
            <Col span={6}>
              <div className={styles['avatar']}>
                <img className={styles['avatar-img']} src="https://cdn.tuoitre.vn/thumb_w/480/471584752817336320/2024/7/6/2024-07-05t210215z828248098up1ek751mfqfvrtrmadp3soccer-euro-por-fra-report-1-1720260083640639014392.jpg" alt="" />
              </div>
            </Col>
            <Col span={9} style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{fontSize: '30px', fontWeight: 700, marginTop: '24px'}}>Nguyễn Đức Anh</span>
              <Flex gap={3}>
              <a
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#65686c',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                392 người bạn
              </a>
              <div>.</div>
              <a
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#65686c',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                392 bạn chung
              </a>
              </Flex>
            </Col>
            <Col style={{paddingRight: '0px'}} span={9}>
              <div style={{marginTop: '40px', textAlign: 'right'}}>
                <button className={styles['blue-button']}>
                  <IoMdAdd />
                  Thêm bạn bè
                </button>
                <button className={styles['white-button']}>
                  <AiFillMessage />
                  Nhắn tin
                </button>
                <button 
                  style={{ alignItems: 'center', padding: '0 16px'}} 
                  className={styles['small-button']}
                  onClick={toggleFriendSuggestion}
                >
                  <IoIosArrowDown
                    className={`${styles.arrowIcon} ${isFriendSuggestionVisible ? styles.arrowIconRotated : ''}`} // Thêm lớp xoay mũi tên
                  />
                </button>
              </div>
              {/* <div style={{marginTop: '10px', display: 'flex', justifyContent: 'end'}}>
              </div> */}
            </Col>
          </Row>

          {isFriendSuggestionVisible && (
            <Row style={{width: '100%'}}>
              <SuggestedFriends />
            </Row>
          )}

          <Row className={styles['tabs-select']} style={{ overflow:'hidden', height: '49px', width:'100%', display:'flex', justifyContent:'space-between',alignItems: 'baseline'}}>
            <Tabs defaultActiveKey="1" centered onChange={handleTabChange}>
              <Tabs.TabPane tab={<span className={styles.tab}>Bài viết</span>} key="1" />
              <Tabs.TabPane tab={<span className={styles.tab}>Giới thiệu</span>} key="2" />
              <Tabs.TabPane tab={<span className={styles.tab}>Bạn bè</span>} key="3" />
              <Tabs.TabPane tab={<span className={styles.tab}>Ảnh</span>} key="4" />
              <Tabs.TabPane tab={<span className={styles.tab}>Video</span>} key="5" />
              <Tabs.TabPane tab={<span className={styles.tab}>Reels</span>} key="6" />
              <Tabs.TabPane tab={<span className={styles.tab}>Xem thêm</span>} key="7" />
            </Tabs>
            <Dropdown overlay={menu} trigger={['click']}>
              <button style={{ alignItems: 'center', padding: '0 16px'}} className={styles['small-button']}>
                <EllipsisOutlined />
              </button>
            </Dropdown>
          </Row>

        </div>
      </div>
      <div className={styles['container-2']}>
        <div className={styles['content']}>
          {renderTabContent()}
        </div>
      </div>
    </>
  );
};

export default FriendProfilePage;
