import React from 'react';
import styles from './AboutCard.module.scss';
import { FaLock } from "react-icons/fa";
import { Row, Col } from 'antd';

const AboutCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <span>Giới thiệu về nhóm này</span>
      </div>
      <div className={styles.infoList}>
        <Row style={{ marginBottom: '10px' }}>
            <Col span={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <FaLock />
            </Col>
            <Col style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontWeight: 'bold'}}>Riêng tư</span>
                <span>Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng.</span>
            </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
            <Col span={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <FaLock />
            </Col>
            <Col style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontWeight: 'bold'}}>Riêng tư</span>
                <span>Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng.</span>
            </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
            <Col span={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <FaLock />
            </Col>
            <Col style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontWeight: 'bold'}}>Riêng tư</span>
                <span>Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng.</span>
            </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
            <Col span={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <FaLock />
            </Col>
            <Col style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontWeight: 'bold'}}>Riêng tư</span>
                <span>Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng.</span>
            </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
            <Col span={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <FaLock />
            </Col>
            <Col style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontWeight: 'bold'}}>Riêng tư</span>
                <span>Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng.</span>
            </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutCard;
