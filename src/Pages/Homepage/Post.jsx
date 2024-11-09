// /src/components/Post.jsx
import React from 'react';
import { Avatar, Button } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined, SendOutlined } from '@ant-design/icons';
import { FaLaugh, FaSmile } from 'react-icons/fa';

const Post = () => {
  return (
    <div style={styles.postContainer}>
      <div style={styles.header}>
        <Avatar src="https://via.placeholder.com/40" style={styles.avatar} />
        <div style={styles.userInfo}>
          <span style={styles.userName}>Nghệ Vãi L</span>
          <span style={styles.time}>Le Dai Tri · 5 phút · 🌐</span>
        </div>
      </div>
      
      <div style={styles.content}>
        <p>KongFung</p>
        <img src="https://via.placeholder.com/680x400" alt="post content" style={styles.mainImage} />
      </div>

      <div style={styles.linkContainer}>
        <span style={styles.linkText}>BIT.LY/TIENGRUOI</span>
      </div>

      <div style={styles.reactionsContainer}>
        <div style={styles.reactions}>
          <Avatar size="small" icon={<FaSmile style={{ color: '#ffcc00' }} />} />
          <Avatar size="small" icon={<FaLaugh style={{ color: '#ff5733' }} />} />
          <span style={styles.reactionCount}>9</span>
        </div>
        <span style={styles.shareCount}>1 lượt chia sẻ</span>
      </div>

      <div style={styles.footer}>
        <Button icon={<LikeOutlined />} type="text">Thích</Button>
        <Button icon={<CommentOutlined />} type="text">Bình luận</Button>
        <Button icon={<SendOutlined />} type="text">Gửi</Button>
        <Button icon={<ShareAltOutlined />} type="text">Chia sẻ</Button>
      </div>
    </div>
  );
};

const styles = {
  postContainer: {
    maxWidth: '680px',
    width: '100%', // Đảm bảo responsive trên màn hình nhỏ
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    margin: '20px auto',
    padding: '16px',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  avatar: {
    marginRight: '8px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontWeight: 'bold',
  },
  time: {
    fontSize: '12px',
    color: 'gray',
  },
  content: {
    marginTop: '8px',
  },
  mainImage: {
    width: '100%',
    maxWidth: '100%', // Đảm bảo hình ảnh không vượt quá chiều rộng
    borderRadius: '8px',
    marginTop: '8px',
    objectFit: 'cover', // Đảm bảo hình ảnh hiển thị tốt trên màn hình nhỏ
  },
  linkContainer: {
    textAlign: 'center',
    marginTop: '8px',
    backgroundColor: '#f0f2f5',
    padding: '4px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '14px',
    overflowWrap: 'break-word', // Đảm bảo text không bị tràn
  },
  reactionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
    borderBottom: '1px solid #f0f2f5',
    paddingBottom: '8px',
    fontSize: '14px', // Kích thước nhỏ hơn trên màn hình di động
  },
  reactions: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  reactionCount: {
    fontSize: '14px',
    marginLeft: '4px',
    color: '#606770',
  },
  shareCount: {
    fontSize: '14px',
    color: '#606770',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '8px',
    paddingTop: '8px',
    flexWrap: 'wrap', // Cho phép các nút xuống hàng trên màn hình nhỏ
  },
  linkText: {
    color: '#000',
    textDecoration: 'none',
  },
};

export default Post;
