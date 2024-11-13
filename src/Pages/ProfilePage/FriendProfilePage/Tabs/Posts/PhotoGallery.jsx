import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import styles from './PhotoGallery.module.scss';

const { Title, Link } = Typography;

const PhotoGallery = () => {
  // Dữ liệu mẫu cho các ảnh
  const photos = [
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg',
    'https://example.com/photo3.jpg',
    'https://example.com/photo4.jpg',
    'https://example.com/photo5.jpg',
    'https://example.com/photo6.jpg',
    'https://example.com/photo7.jpg',
    'https://example.com/photo8.jpg',
    'https://example.com/photo9.jpg',
  ];

  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <Title level={4}>Ảnh</Title>
        <Link className={styles.viewAll} href="#">
          Xem tất cả ảnh
        </Link>
      </div>
      <Row gutter={[8, 8]}>
        {photos.slice(0, 9).map((photo, index) => (
          <Col span={8} key={index}>
            <div className={styles.photo}>
              <img src={photo} alt={`Photo ${index + 1}`} />
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default PhotoGallery;
