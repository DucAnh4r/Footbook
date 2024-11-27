import React, { useState } from 'react';
import { Button, Card } from 'antd';
import styles from './FriendRequestsList.module.scss';

const FriendRequests = ({ requestsType, data }) => {
  const [visibleRequests, setVisibleRequests] = useState(10);

  const handleShowMore = () => {
    setVisibleRequests(prev => prev + 10); // Hiển thị thêm 10 request
  };

  const getTitle = () => {
    return requestsType === 'friendRequests' ? 'Lời mời kết bạn' : 'Những người bạn có thể biết';
  };

  const getRequests = () => {
    return data || []; // Dữ liệu mặc định nếu không truyền vào
  };

  const cardBodyStyle = {
    padding: '0', // Xóa padding mặc định của thẻ ant-card-body
  };

  const cardStyle = {
    width: '211px', // Chiều rộng của thẻ
    borderRadius: '8px', // Bo góc
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Đổ bóng nhẹ
    backgroundColor: 'white', // Màu nền trắng
  };

  const noMargin = {
    margin: '0',
  };


  return (
    <div className={styles.friendRequestsContainer}>
      <h2 style={{marginTop: '40px'}}>{getTitle()}</h2>
      <div className={styles.friendRequestsList}>
        {getRequests().slice(0, visibleRequests).map((request, index) => (
          <Card key={index} style={cardStyle} bodyStyle={cardBodyStyle} hoverable>
            <img src={request.image} alt={request.name} className={styles.friendImage} />
            <div className={styles.friendDetails}>
              <h3 className={styles['name']}>{request.name}</h3>
              <p style={noMargin}>{request.mutualFriends} bạn chung</p>
              <div className={styles.buttons}>
                {requestsType === 'friendRequests' ? (
                  <>
                    <Button type="primary">Xác nhận</Button>
                    <Button>Xóa</Button>
                  </>
                ) : (
                  <>
                    <Button type="primary">Thêm bạn bè</Button>
                    <Button>Gỡ bỏ</Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      {visibleRequests < getRequests().length && (
        <Button onClick={handleShowMore} className={styles['see-more-btn']} type="link">Xem thêm</Button>
      )}
    </div>
  );
};

export default FriendRequests;
