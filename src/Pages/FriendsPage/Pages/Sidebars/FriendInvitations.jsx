import React from 'react';
import { Row, Col } from 'antd';
import styles from './FriendInvitations.module.scss'
import { useNavigate } from 'react-router-dom';

const FriendInvitations = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/friends');
    };
  return (
    <>
        <Row style={{padding: '16px'}} className={styles.headerRow}>
            <Col>
            <div className={styles.backButton}>
                <span onClick={handleBack}>back</span>
            </div>
            </Col>
            <Col className={styles.titleCol}>
            <span className={styles.title}>Bạn bè</span>
            <span className={styles.subTitle}>Lời mời kết bạn</span>
            </Col>
        </Row>
        <Row style={{padding: '0 16px'}} className={styles.statsRow}>
            <span>98 lời mời kết bạn</span>
        </Row>
        <Row style={{padding: ' 016px'}} className={styles.actionRow}>
            <span>Xem lời mời đã gửi</span>
        </Row>
    </>
  );
};

export default FriendInvitations;