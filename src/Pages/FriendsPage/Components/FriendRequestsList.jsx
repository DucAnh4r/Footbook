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

  return (
    <div className={styles.friendRequestsContainer}>
      <h2>{getTitle()}</h2>
      <div className={styles.friendRequestsList}>
        {getRequests().slice(0, visibleRequests).map((request, index) => (
          <Card key={index} className={styles.friendRequestCard} hoverable>
            <img src={request.image} alt={request.name} className={styles.friendImage} />
            <div className={styles.friendDetails}>
              <h4>{request.name}</h4>
              <p>{request.mutualFriends} bạn chung</p>
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
        <Button onClick={handleShowMore} type="link">Xem thêm</Button>
      )}
    </div>
  );
};

export default FriendRequests;
