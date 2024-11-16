import React from 'react';
import { Row, Col } from 'antd';
import styles from './SuggestedFriends.module.scss'
import { useNavigate } from 'react-router-dom';

const SuggestedFriends = () => {
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
            <span className={styles.subTitle}>Gợi ý</span>
            </Col>
        </Row>
        <Row style={{padding: '0 16px'}} className={styles.statsRow}>
            <span>Những người bạn có thể biết</span>
        </Row>
    </>
  );
};

export default SuggestedFriends;