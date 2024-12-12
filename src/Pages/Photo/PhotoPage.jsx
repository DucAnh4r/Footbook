import React, { useState } from 'react';
import { Layout } from "antd";
import {Row, Col} from "antd";
import { Avatar, Button } from "antd";
import { FaEarthAmericas } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import styles from './PhotoPage.module.scss';
import LogoImg from "../../assets/image/Header/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import HahaIcon from "../../assets/image/Reacts/haha.png";
import LikeIcon from "../../assets/image/Reacts/like.png";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import Comment from "./Components/Comment";
import { IoIosSend } from "react-icons/io";
import { MdZoomIn } from "react-icons/md";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";



const PhotoPage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const handleLogoClick = () => {
    navigate("/"); // Điều hướng đến URL với tham số type
  };

  const [comment, setComment] = useState(""); // State để theo dõi nội dung comment

  const handleChange = (e) => {
    setComment(e.target.value); // Cập nhật giá trị comment khi người dùng gõ
  };

  const comments = [
    {
      author: "Hà Yến Sao",
      content: "Mấy cái caption với cmt của 2khang nó cứ sao á 😂",
      likes: 174,
      time: "2d",
      replies: 5,
    },
    {
      author: "Ngọc Gia Tuệ Hân",
      content: "Anh ơi, ủa anh ơi 😂",
      likes: 46,
      time: "2d",
      replies: 1,
    },
    {
      author: "Nguyễn Gia Huy",
      content: "4 anh lần này không comeback, 4 anh come out.",
      likes: 109,
      time: "1d",
      replies: 0,
    },
    {
      author: "Madeline Truong",
      content: "Khang nói hit không khí bình thường, mà nó thở ra khí cười...",
      likes: 52,
      time: "1d",
      replies: 0,
    },
    {
      author: "Madeline Truong",
      content: "Khang nói hit không khí bình thường, mà nó thở ra khí cười...",
      likes: 52,
      time: "1d",
      replies: 0,
    },
    {
      author: "Madeline Truong",
      content: "Khang nói hit không khí bình thường, mà nó thở ra khí cười...",
      likes: 52,
      time: "1d",
      replies: 0,
    },
    {
      author: "Madeline Truong",
      content: "Khang nói hit không khí bình thường, mà nó thở ra khí cười...",
      likes: 52,
      time: "1d",
      replies: 0,
    },
  ];

  const images = [
    "https://via.placeholder.com/800x400?text=Image+1",
    "https://via.placeholder.com/800x400?text=Image+2",
    "https://via.placeholder.com/800x400?text=Image+3",
  ];


  return (
    <Layout>
      <Row className={styles['container']}>
        <Col className={styles['image-row']}>
          <div className={`${styles['round-button-container']} ${styles['cancel-button-container']}`}>
            x
          </div>
          <div className={`${styles['round-button-container']} ${styles['zoomin-button-container']}`}>
            <MdZoomIn />
          </div>
          <div className={`${styles['round-button-container']} ${styles['zoomout-button-container']}`}>
            <MdZoomIn />
          </div>
          <div className={`${styles['round-button-container']} ${styles['full-button-container']}`}>
            <AiOutlineFullscreen />
          </div>
          <div className={`${styles['round-button-container']} ${styles['left-button-container']}`}>
            <FaAngleLeft />
          </div>
          <div className={`${styles['round-button-container']} ${styles['right-button-container']}`}>
            <FaAngleRight />
          </div>
          <div className={styles['image-container']}>
            <img className={styles['image']} src="https://c.ndtvimg.com/2024-04/64v6v0mo_ronaldo_625x300_09_April_24.jpg?im=FitAndFill,algorithm=dnn,width=806,height=605" alt="" />

          </div>
        </Col>
        <Col className={styles['right-row']}>
          <div style={{padding: "16px"}}>
            <div className={styles.header}>
              <Avatar
                src="https://shopgarena.net/wp-content/uploads/2023/07/Meo-khoc-thet-len.jpg"
                className={styles.avatar}
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>Anh Đức Nguyễn</span>
                <span className={styles.time}>
                  5 phút · <FaEarthAmericas style={{ marginLeft: "4px" }} />
                </span>
              </div>
            </div>

            <div className={styles.content}>
              <p>Mèo cute nè</p>
            </div>

            <div className={styles.reactionsContainer}>
              <div className={styles["reactions"]}>
                <img
                  src={HahaIcon}
                  alt="Image 1"
                  className={`${styles["icon"]} ${styles["icon-left"]}`}
                />
                <img
                  src={LikeIcon}
                  alt="Image 2"
                  className={`${styles["icon"]} ${styles["icon-right"]}`}
                />
              </div>
              <span className={styles.reactionCount}>885</span>
              <div className={styles.rightFooter}>
                <span className={styles.cmtCount} style={{ marginRight: "10px" }}>
                  20 bình luận
                </span>
                <span className={styles.shareCount}>
                  1 lượt chia sẻ
                </span>
              </div>
            </div>

            <div className={styles.footer}>
              <Button icon={<AiOutlineLike />} type="text"
                className={styles.likeButtonWrapper}
                onMouseEnter={() => setIsReactionBoxVisible(true)}
                onMouseLeave={() => setIsReactionBoxVisible(false)}
              >
                Thích
              </Button>
              <Button
                icon={<FaRegComment />}
                type="text"
                onClick={() => setIsModalOpen(true)}
              >
                Bình luận
              </Button>
              <Button icon={<PiShareFat />} type="text">
                Chia sẻ
              </Button>
            </div>

            <div className={styles.commentSection}>
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
            </div>

            <div className={styles.seeMoreSection}>
              <p className={styles.seeMoreBtn}>Xem thêm bình luận</p>
              <p style={{color: "#65686c"}}>6/84</p>
            </div>
          </div>

          <div className={styles.writeCommentSection}>
            <Row>
              <Col span={4}>
                <Avatar
                  src="https://shopgarena.net/wp-content/uploads/2023/07/Meo-khoc-thet-len.jpg"
                  className={styles.avatar}
                  style={{margin: "6px 0 0 6px"}}
                />
              </Col>
              <Col span={20}>
                <div className={styles.writeCommentContainer}>
                  <textarea
                    placeholder="Viết bình luận..."
                    value={comment} // Liên kết với state
                    onChange={handleChange} // Cập nhật state khi thay đổi nội dung
                  ></textarea>
                  <div className={styles.actionCommentContainer}>
                    <IoIosSend className={styles["sendCommentButton"]} style={{color: comment ? "blue" : "gray"}}></IoIosSend>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col className={styles['messenger-bubble-row']}>
          
        </Col>
      </Row>
    </Layout>
  );
};



export default PhotoPage;
