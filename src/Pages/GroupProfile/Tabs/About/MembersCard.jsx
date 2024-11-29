import React from 'react';
import styles from './MembersCard.module.scss';
import { IoSchool, IoHome, IoEarth } from 'react-icons/io5';

const MembersCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <span style={{marginRight: '6px'}}>Thành viên</span>
        <span style={{fontWeight: '500', color: '#6F7175'}}> · 32,0K</span>
      </div>
      <div className={styles.infoList}>
        <button className={styles['white-button']}>Xem tất cả</button>
      </div>
    </div>
  );
};

export default MembersCard;
