import React, { useEffect, useState } from 'react';
import styles from './RightSidebar.module.scss';
import { Col, Row } from 'antd';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import FriendItem from './FriendItem.jsx';

const RightSidebar = () => {
  const [friends, setFriends] = useState([]); // State để lưu trữ danh sách bạn bè

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch('FriendList.json'); 
      const data = await response.json();
      setFriends(data);
    };
    
    fetchFriends();
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['friend-request-container']}>
        <div style={{ marginTop: '8px' }} className={styles['flex-between']}>
          <span style={{ fontSize: '16px', fontWeight: 500, color: '#65686c' }}>
            Lời mời kết bạn
          </span>
          <a style={{ fontSize: '16px' }} href="#">
            Xem tất cả
          </a>
        </div>
        <div className={styles['content']}>
          <Row>
            <Col span={5}>
              <div className={styles['image-container']}>
                <img
                  className={styles['image']}
                  src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/12/20/1129102/Lionel-Messi1.jpg"
                  alt=""
                />
              </div>
            </Col>
            <Col span={19}>
              <Row className={styles['flex-between']}>
                <span style={{ fontSize: '15px', fontWeight: 500, color: 'black' }}>
                  Lionel Messi
                </span>
                <span style={{ fontSize: '14px', fontWeight: 400, color: '#65686c' }}>
                  3 ngày
                </span>
              </Row>
              <Row style={{ paddingTop: 0 }} className={styles['flex-between']}>
                <button className={styles['button']}>Xác nhận</button>
                <button className={`${styles['button']} ${styles['delete-button']}`}>
                  Xóa
                </button>
              </Row>
            </Col>
          </Row>
        </div>
      </div>

      <div className={styles['friend-list-container']}>
        <div className={styles['flex-between']}>
          <span style={{ fontSize: '16px', fontWeight: 500, color: '#65686c' }}>
            Người liên hệ
          </span>
          <div>
            <SearchOutlined className={styles['icon']} />
            <MoreOutlined style={{ transform: 'rotate(90deg)' }} className={styles['icon']} />
          </div>
        </div>
          {/* Map qua danh sách bạn bè và hiển thị FriendItem */}
          {friends.map((friend, index) => (
            <div className={styles['friend-container']}>
              <FriendItem
                key={index}
                name={friend.name}
                imageSrc={friend.imageSrc}
                isOnline={friend.isOnline}
              />
            </div>
          ))}
        </div>
    </div>
  );
};

export default RightSidebar;
