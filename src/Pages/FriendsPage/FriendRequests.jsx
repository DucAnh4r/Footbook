import React, { useState } from 'react';
import { Button, Card } from 'antd';
import styles from './FriendRequests.module.scss';

const FriendRequests = () => {
  // Dữ liệu ví dụ
  const [requests, setRequests] = useState([
    { name: 'Trần Thịnh', image: 'link_to_image_1.jpg', mutualFriends: 1 },
    { name: 'Tran Duong', image: 'link_to_image_2.jpg', mutualFriends: 3 },
    { name: 'Hà My', image: 'link_to_image_3.jpg', mutualFriends: 2 },
    { name: 'My Tâm Đào', image: 'link_to_image_4.jpg', mutualFriends: 0 },
    { name: 'Thơ Ngô Đan', image: 'link_to_image_5.jpg', mutualFriends: 1 },
    { name: 'Hương Ly', image: 'link_to_image_6.jpg', mutualFriends: 2 },
    { name: 'Trần Phương Nhi', image: 'link_to_image_7.jpg', mutualFriends: 0 },
    { name: 'Duy An Vệ', image: 'link_to_image_8.jpg', mutualFriends: 1 },
    { name: 'Hoàng Tư Anh', image: 'link_to_image_9.jpg', mutualFriends: 0 },
    { name: 'Yên Nhi', image: 'link_to_image_10.jpg', mutualFriends: 2 },
    { name: 'Thơ Ngô Đan', image: 'link_to_image_5.jpg', mutualFriends: 1 },
    { name: 'Hương Ly', image: 'link_to_image_6.jpg', mutualFriends: 2 },
    { name: 'Trần Phương Nhi', image: 'link_to_image_7.jpg', mutualFriends: 0 },
    { name: 'Duy An Vệ', image: 'link_to_image_8.jpg', mutualFriends: 1 },
    { name: 'Hoàng Tư Anh', image: 'link_to_image_9.jpg', mutualFriends: 0 },
    { name: 'Yên Nhi', image: 'link_to_image_10.jpg', mutualFriends: 2 },
  ]);

  const [visibleRequests, setVisibleRequests] = useState(10); // Số lượng request hiển thị mặc định

  const handleShowMore = () => {
    setVisibleRequests(prev => prev + 10); // Hiển thị thêm 5 request
  };

  return (
    <div className={styles.friendRequestsContainer}>
      <h3>Lời mời kết bạn</h3>
      <div className={styles.friendRequestsList}>
        {requests.slice(0, visibleRequests).map((request, index) => (
          <Card key={index} className={styles.friendRequestCard} hoverable>
            <img src={request.image} alt={request.name} className={styles.friendImage} />
            <div className={styles.friendDetails}>
              <h4>{request.name}</h4>
              <p>{request.mutualFriends} bạn chung</p>
              <div className={styles.buttons}>
                <Button type="primary">Xác nhận</Button>
                <Button>Vứt bỏ</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {visibleRequests < requests.length && (
        <Button onClick={handleShowMore} type="link">Xem thêm</Button>
      )}
    </div>
  );
};

export default FriendRequests;
