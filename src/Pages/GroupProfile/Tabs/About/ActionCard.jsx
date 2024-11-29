import React from 'react';
import styles from './ActionCard.module.scss';
import { Row, Col } from 'antd';
import { IoSchool, IoHome, IoEarth } from 'react-icons/io5';
import { FaLock } from "react-icons/fa";

const ActionCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <span style={{marginRight: '6px'}}>Hoạt động</span>
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

export default ActionCard;
