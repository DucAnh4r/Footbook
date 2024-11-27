import React from 'react';
import styles from './FriendRequestItem.module.scss';
import { Row, Col } from 'antd';

const FriendRequestItem = ({ userId, onSelectUser, isSelected  }) => {
  const handleClick = () => {
    if (onSelectUser) {
      onSelectUser(userId); // Gọi hàm onSelectUser khi người dùng chọn thẻ
    }
  };
  return (
    <>
      <div
        className={`${styles.content} ${isSelected ? styles.selected : ''}`} // Thêm class "selected" nếu là item đang được chọn
        onClick={handleClick}
      >
        <Row onClick={() => onSelectUser(userId)} style={{ cursor: 'pointer' }}>
          <Col span={5}>
            <div className={styles['image-container']}>
              <img
                className={styles['image']}
                src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/12/20/1129102/Lionel-Messi1.jpg"
                alt="Lionel Messi"
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
            <Row className={styles['flex-between']}>
              <button className={styles['button']}>Xác nhận</button>
              <button className={`${styles['button']} ${styles['delete-button']}`}>
                Xóa
              </button>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default FriendRequestItem;
