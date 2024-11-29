import React from 'react';
import { Avatar, Button } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined, SendOutlined } from '@ant-design/icons';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { FaLaugh, FaSmile } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaEarthAmericas } from "react-icons/fa6";
import styles from './Post.module.scss'; // Import SCSS module
import HahaIcon from "../assets/image/Reacts/haha.png";
import LikeIcon from "../assets/image/Reacts/like.png";

const Post = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/photo');
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.header}>
        <Avatar src="https://shopgarena.net/wp-content/uploads/2023/07/Meo-khoc-thet-len.jpg" className={styles.avatar} />
        <div className={styles.userInfo}>
          <span className={styles.userName}>Anh Đức Nguyễn</span>
          <span className={styles.time}>5 phút · <FaEarthAmericas style={{marginLeft: '4px'}}/></span>
          
        </div>
      </div>
      
      <div className={styles.content}>
        <p>Mèo cute nè</p>
        <img 
          src="https://shopgarena.net/wp-content/uploads/2023/07/Meo-khoc-thet-len.jpg" 
          alt="post content" 
          className={styles.mainImage} 
          onClick={handleImageClick} // Thêm sự kiện click
        />
      </div>

      <div className={styles.reactionsContainer}>
        <div className={styles['reactions']}>
          <img src={HahaIcon} alt="Image 1" className={`${styles['icon']} ${styles['icon-left']}`} />
          <img src={LikeIcon} alt="Image 2" className={`${styles['icon']} ${styles['icon-right']}`} />
        </div>
        <span className={styles.reactionCount}>885</span>

        <div className={styles.rightFooter}>
          <span className={styles.cmtCount} style={{marginRight: '10px'}}>20 bình luận</span>
          <span className={styles.shareCount}>1 lượt chia sẻ</span>
        </div>
      </div>

      <div className={styles.footer}>
        <Button icon={<AiOutlineLike />} type="text">Thích</Button>
        <Button icon={<FaRegComment />} type="text">Bình luận</Button>
        {/* <Button icon={<SendOutlined />} type="text">Gửi</Button> */}
        <Button icon={<PiShareFat />} type="text">Chia sẻ</Button>
      </div>
    </div>
  );
};

export default Post;
