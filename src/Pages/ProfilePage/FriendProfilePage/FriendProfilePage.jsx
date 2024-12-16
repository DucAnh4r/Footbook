import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Dropdown, Menu } from 'antd';
import styles from './FriendProfilePage.module.scss';
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { AiFillMessage } from 'react-icons/ai';
import { EllipsisOutlined } from '@ant-design/icons';
import SuggestedFriends from '../UserProfilePage/SuggestedFriends.jsx';
import { useAuthCheck } from '../../../utils/checkAuth.jsx';
import { countFriendService, createFriendshipService, getFriendshipStatusService, deleteFriendshipService, acceptFriendshipService } from '../../../services/friendService.jsx';
import { useParams } from 'react-router-dom';
import { getUserIdFromLocalStorage } from '../../../utils/authUtils.jsx';

const FriendProfilePage = () => {
  useAuthCheck();
  const { userId2 } = useParams();
  console.log(userId2); // Kiểm tra console để đảm bảo userId2 có giá trị
  const [activeTab, setActiveTab] = useState("1");
  const [isFriendSuggestionVisible, setFriendSuggestionVisible] = useState(false);
  const [friendshipStatus, setFriendshipStatus] = useState(null); // Lưu trạng thái kết bạn
  const [sender, setSender] = useState(null);
  const [friends, setFriends] = useState(null);

  const userId1 = getUserIdFromLocalStorage(); // Lấy userId1 từ localStorage

  const fetchFriendshipStatus = async () => {
    try {
      const response = await getFriendshipStatusService({ userId1, userId2 });
      setFriendshipStatus(response?.data?.data?.status || null);
      setSender(response?.data?.data?.usent);
    } catch (error) {
      console.error("Lỗi khi lấy trạng thái bạn bè:", error);
    }
  };

  const countFriend = async () => {
    try {
      const response = await countFriendService({ userId1 });
      setFriends(response?.data || 0);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng bạn bè:", error);
    }
  };

  const handleAddFriend = async () => {
    try {
      await createFriendshipService({ userId1, userId2 });
      fetchFriendshipStatus(); // Cập nhật trạng thái
    } catch (error) {
      console.error("Lỗi khi gửi lời mời kết bạn:", error);
    }
  };

  const handleAcceptFriend = async () => {
    try {
      await acceptFriendshipService({ userId2, userId1 });
      fetchFriendshipStatus(); // Cập nhật trạng thái
    } catch (error) {
      console.error("Lỗi khi gửi lời mời kết bạn:", error);
    }
  };

  const handleDeleteFriend = async () => {
    try {
      await deleteFriendshipService({ userId2, userId1 });
      setFriendshipStatus(null); // Cập nhật trạng thái thành không phải bạn bè
      countFriend(); // Cập nhật số lượng bạn bè
    } catch (error) {
      console.error("Lỗi khi xóa bạn bè:", error);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const toggleFriendSuggestion = () => {
    setFriendSuggestionVisible(!isFriendSuggestionVisible);
  };

  const renderButton = () => {
    if (friendshipStatus === "PENDING") {
      if (userId1 !== sender) {
        return (
          <>
          <div style={{display:'flex', alignItems: 'center', justifyContent:'space-between', flexDirection: 'column', marginBottom: '10px'}}>
            <div style={{fontSize: '20px', fontWeight: '600'}}>
              Duc sent you a friend request
            </div>
          <div>
            <button
              className={styles["blue-button"]}
              onClick={handleAcceptFriend}
            >
              Chấp nhận
            </button>
            <button
              className={styles["white-button"]}
              onClick={handleDeleteFriend}
            >
              Từ chối
            </button>
            </div>
            </div>
          </>
        );
      } else {
        return (
          <button className={styles["blue-button"]}>
            Đã gửi lời mời kết bạn
          </button>
        );
      }
    } else if (friendshipStatus === "ACCEPTED") {
      return (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={handleDeleteFriend}>
                Xóa bạn bè
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <button className={styles["blue-button"]}>
            Bạn bè
          </button>
        </Dropdown>
      );
    } else {
      return (
        <button className={styles["blue-button"]} onClick={handleAddFriend}>
          <IoMdAdd /> Thêm bạn bè
        </button>
      );
    }
  };

  useEffect(() => {
    fetchFriendshipStatus();
    countFriend();
  }, []);

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
            <Col span={9} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '30px', fontWeight: 700, marginTop: '24px' }}>Nguyễn Đức Anh</span>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#65686c',
                  textDecoration: 'none',
                }}
              >
                {friends} người bạn
              </span>
            </Col>
            <Col style={{ paddingRight: '0px' }} span={9}>
              <div style={{ marginTop: '40px', textAlign: 'right' }}>
                {renderButton()}
                <button className={styles['white-button']}>
                  <AiFillMessage />
                  Nhắn tin
                </button>
                <button
                  style={{ alignItems: 'center', padding: '0 16px' }}
                  className={styles['small-button']}
                  onClick={toggleFriendSuggestion}
                >
                  <IoIosArrowDown
                    className={`${styles.arrowIcon} ${isFriendSuggestionVisible ? styles.arrowIconRotated : ''}`}
                  />
                </button>
              </div>
            </Col>
          </Row>

          {isFriendSuggestionVisible && (
            <Row style={{ width: '100%' }}>
              <SuggestedFriends />
            </Row>
          )}

          <Row className={styles['tabs-select']} style={{ overflow: 'hidden', height: '49px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Tabs defaultActiveKey="1" centered onChange={handleTabChange}>
              <Tabs.TabPane tab={<span className={styles.tab}>Bài viết</span>} key="1" />
              <Tabs.TabPane tab={<span className={styles.tab}>Giới thiệu</span>} key="2" />
              <Tabs.TabPane tab={<span className={styles.tab}>Bạn bè</span>} key="3" />
              <Tabs.TabPane tab={<span className={styles.tab}>Ảnh</span>} key="4" />
              <Tabs.TabPane tab={<span className={styles.tab}>Video</span>} key="5" />
              <Tabs.TabPane tab={<span className={styles.tab}>Reels</span>} key="6" />
              <Tabs.TabPane tab={<span className={styles.tab}>Xem thêm</span>} key="7" />
            </Tabs>
            <Dropdown trigger={['click']}>
              <button style={{ alignItems: 'center', padding: '0 16px' }} className={styles['small-button']}>
                <EllipsisOutlined />
              </button>
            </Dropdown>
          </Row>
        </div>
      </div>
      <div className={styles['container-2']}>
        <div className={styles['content']}>
          {/* Nội dung tab */}
        </div>
      </div>
    </>
  );
};

export default FriendProfilePage;
