import React, { useState } from 'react';
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';
import styles from './ShowFriendsPage.module.scss';
import FriendInvitations from './Sidebars/FriendInvitations';
import FriendRequestItem from '../Components/FriendRequestItem';
import SuggestedFriends from './Sidebars/SuggestedFriends'; // Import SuggestedFriends
import FriendPicture from 'C:/Users/ADMIN/Desktop/Hoc/Nam4/BE Java springboot/Footbook/src/assets/image/FriendPage/friends.png';

const { Sider, Content } = Layout;

const ShowFriendsPage = () => {
  const { type } = useParams(); // Lấy tham số type từ URL
  const [selectedUserId, setSelectedUserId] = useState(null); // State lưu ID người dùng đã chọn

  // Dữ liệu mẫu người dùng
  const users = [
    { id: 1, name: 'Lionel Messi', bio: 'This is a bio about Messi.' },
    { id: 2, name: 'Cristiano Ronaldo', bio: 'This is a bio about Ronaldo.' },
    // Thêm người dùng khác vào đây
  ];

  // Hàm gọi khi click vào một bạn trong FriendRequestItem
  const handleSelectUser = (userId) => setSelectedUserId(userId);

  // Tìm kiếm thông tin người dùng từ ID
  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <Layout>
      <Sider
        width={360}
        style={{
          background: 'white',
          height: '100vh',
          overflow: 'auto',
          position: 'fixed',
          top: '64px',
          left: '0',
          zIndex: '100',
        }}
        className="scroll-on-hover"
      >
        {/* Sử dụng switch-case để xác định Sidebar cần hiển thị */}
        {(() => {
          switch (type) {
            case 'requests':
              return <FriendInvitations />;
            case 'suggested':
              return <SuggestedFriends />;
            default:
              return <SuggestedFriends />; 
          }
        })()}
        
        {users.map((user) => (
          <FriendRequestItem
            key={user.id}
            userId={user.id}
            onSelectUser={handleSelectUser}
          />
        ))}
      </Sider>

      <Content style={{ padding: '70px 0 70px 370px', minHeight: '100vh', overflow: 'auto' }}>
        <div className="page-content">
          {selectedUser ? (
            <div className={styles.userDetails}>
              <h2>{selectedUser.name}</h2>
              <p>{selectedUser.bio}</p>
            </div>
          ) : (
            <div className={styles['content']}>
              <img src={FriendPicture} alt="Friend" />
              <span>Chọn tên của người mà bạn muốn xem trước trang cá nhân</span>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ShowFriendsPage;
