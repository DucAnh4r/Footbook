import React from 'react';
import styles from './GroupListPage.module.scss';

const GroupListPage = () => {
  // Danh sách nhóm người dùng đã tham gia
  const joinedGroups = [
    {
      name: 'SmallGym 💪 Đơn Giản Là Đam Mê 💪',
      lastActive: '3 ngày trước',
      imageUrl: 'path-to-smallgym-image.png',
    },
    {
      name: 'VGA Siêu Rẻ VN - Chợ PC & Gaming Gear',
      lastActive: '6 tuần trước',
      imageUrl: 'path-to-vga-image.png',
    },
    {
      name: 'Scourgebringer VN',
      lastActive: '8 tuần trước',
      imageUrl: 'path-to-scourgebringer-image.png',
    },
    {
      name: 'Brawlhalla Việt Nam',
      lastActive: '9 tuần trước',
      imageUrl: 'path-to-brawlhalla-image.png',
    },
  ];

  return (
    <div className={styles['group-list-container']}>
      <h3 style={{ marginBottom: '20px', marginTop: '30px' }}>Tất cả các nhóm bạn đã tham gia ({joinedGroups.length})</h3>
      <div className={styles['group-grid']}>
        {joinedGroups.map((group, index) => (
          <div key={index} className={styles['group-card']}>
            <img src={group.imageUrl} alt={group.name} className={styles['group-image']} />
            <div className={styles['group-info']}>
              <h3>{group.name}</h3>
              <p>Lần truy cập gần đây nhất: {group.lastActive}</p>
              <button className={styles['view-button']}>Xem nhóm</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupListPage;
