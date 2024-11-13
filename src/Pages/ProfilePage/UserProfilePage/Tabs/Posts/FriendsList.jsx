import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import styles from './FriendsList.module.scss';

const { Title, Link, Text } = Typography;

const FriendsList = () => {
  // Dữ liệu mẫu cho danh sách bạn bè
  const friends = [
    { name: 'Giang Đỗ', avatar: 'https://example.com/giang-do.jpg' },
    { name: 'Âu Tuấn Thông', avatar: 'https://example.com/au-tuan-thong.jpg' },
    { name: 'Duc Manh', avatar: '' },
    { name: 'Thảo Quyên', avatar: 'https://example.com/thao-quyen.jpg' },
    { name: 'Le Huy', avatar: '' },
    { name: 'Bùi Tuấn Kiệt', avatar: 'https://example.com/bui-tuan-kiet.jpg' },
    { name: 'Lê Du', avatar: 'https://example.com/le-du.jpg' },
    { name: 'Minh Hoàng', avatar: 'https://example.com/minh-hoang.jpg' },
    { name: 'Minh Hoàng', avatar: 'https://example.com/minh-hoang2.jpg' },
  ];

  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <Title level={4}>Bạn bè</Title>
        <Link className={styles.viewAll} href="#">
          Xem tất cả bạn bè
        </Link>
      </div>
      <Text className={styles.friendCount}>391 người bạn</Text>
      <Row gutter={[16, 16]}>
        {friends.map((friend, index) => (
          <Col span={8} key={index}>
            <div className={styles.friend}>
              <div className={styles.avatar}>
                {friend.avatar ? (
                  <img src={friend.avatar} alt={friend.name} />
                ) : (
                  <div className={styles.placeholderAvatar}></div>
                )}
              </div>
              <Text className={styles.name}>{friend.name}</Text>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default FriendsList;
