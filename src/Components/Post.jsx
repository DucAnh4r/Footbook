import React, { useEffect, useState } from "react";
import { Avatar, Button } from "antd";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { FaEarthAmericas } from "react-icons/fa6";
import styles from "./Post.module.scss";
import CommentModal from "../Modal/CommentModal";
import HahaIcon from "../assets/image/Reacts/haha.png";
import LikeIcon from "../assets/image/Reacts/like.png";
import LoveIcon from "../assets/image/Reacts/heart.png";
import WowIcon from "../assets/image/Reacts/wow.png";
import SadIcon from "../assets/image/Reacts/sad.png";
import AngryIcon from "../assets/image/Reacts/angry.png";
import ReactionIconsBox from "./ReactionIconsBox";
import ShareModal from "../Modal/ShareModal";
import { userFindByIdService } from "../services/userService";

const Post = ({ content, createdAt, userId, images }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReactionBoxVisible, setIsReactionBoxVisible] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState("NONE");
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  const [comments, setComments] = useState([
    { id: 1, user: "Quân A.P", content: "Vẫn đẹp trai ạ 😄" },
    { id: 2, user: "JSOL", content: "Mèo cute quá!" },
  ]);
  const reactionConfig = {
    NONE: { text: "Thích", icon: <AiOutlineLike />, color: "#65686c" },
    LIKE: { text: "Thích", icon: <img style={{ width: '20px', height: '20px' }} src={LikeIcon} alt="Haha" />, color: "blue" },
    HAHA: { text: "Haha", icon: <img style={{ width: '20px', height: '20px' }} src={HahaIcon} alt="Haha" />, color: "orange" },
    LOVE: { text: "Yêu thích", icon: <img style={{ width: '20px', height: '20px' }} src={LoveIcon} alt="Love" />, color: "red" },
    WOW: { text: "Wow", icon: <img style={{ width: '20px', height: '20px' }} src={WowIcon} alt="Wow" />, color: "orange" },
    SAD: { text: "Buồn", icon: <img style={{ width: '20px', height: '20px' }} src={SadIcon} alt="Sad" />, color: "orange" },
    ANGRY: { text: "Phẫn nộ", icon: <img style={{ width: '18px', height: '18px' }} src={AngryIcon} alt="Sad" />, color: "#e9710f" },
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await userFindByIdService(userId);
      setUserInfo(response?.data || []); // Lưu dữ liệu trả về
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // Chạy một lần khi component được render


  const handleReactionAdded = (reactionType) => {
    setSelectedReaction((prev) => (prev === reactionType ? "NONE" : reactionType));
    setIsReactionBoxVisible(false);
    console.log("Cảm xúc mới:", reactionType);
  };


  const addComment = (newComment) => {
    setComments((prevComments) => [
      ...prevComments,
      { id: prevComments.length + 1, user: "Bạn", content: newComment },
    ]);
  };

  return (
    <>
      <div className={styles.postContainer}>
        <div className={styles.header}>
          <Avatar
            src={userInfo.profilePictureUrl}
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <span className={styles.userName}>{userInfo.fullName}</span>
            <span className={styles.time}>
            {new Date(createdAt).toLocaleString()} · <FaEarthAmericas style={{ marginLeft: "4px" }} />
            </span>
          </div>
        </div>

        <div className={styles.content}>
          <p>{content}</p>
          {images.length > 0 && (
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`post-image-${index}`}
                className={styles.mainImage}
              />
            ))
          )}
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
            <span className={styles.shareCount}>1 lượt chia sẻ</span>
          </div>
        </div>

        <div className={styles.footer}>
          <Button
            icon={reactionConfig[selectedReaction].icon}
            type="text"
            className={styles.likeButtonWrapper}
            onMouseEnter={() => setIsReactionBoxVisible(true)}
            onMouseLeave={() => setIsReactionBoxVisible(false)}
            onClick={() =>
              handleReactionAdded(selectedReaction === "LIKE" ? "NONE" : "LIKE")
            }
            style={{
              color: reactionConfig[selectedReaction].color, // Màu chữ theo cấu hình
            }}
          >
            {reactionConfig[selectedReaction].text}
          </Button>

          {isReactionBoxVisible && (
            <div
              style={{
                position: "absolute",
                left: "0px",
                bottom: "0px",
              }}
              className={styles.reactionBoxWrapper}
              onMouseEnter={() => setIsReactionBoxVisible(true)}
              onMouseLeave={() => setIsReactionBoxVisible(false)}
            >
              <ReactionIconsBox
                postId="123"
                onReactionAdded={handleReactionAdded}
                currentReaction={selectedReaction}
              />
            </div>
          )}
          <Button
            icon={<FaRegComment />}
            type="text"
            onClick={() => setIsCommentModalOpen(true)}
          >
            Bình luận
          </Button>
          <Button
            icon={<PiShareFat />}
            type="text"
            onClick={() => setIsShareModalOpen(true)}
          >
            Chia sẻ
          </Button>
        </div>
      </div>

      {/* Modal bình luận */}
      <CommentModal
        isModalOpen={isCommentModalOpen}
        onCancel={() => setIsCommentModalOpen(false)}
        userName="Anh Đức Nguyễn"
        postContent="Mèo cute nè"
        postImage="https://shopgarena.net/wp-content/uploads/2023/07/Meo-khoc-thet-len.jpg"
        comments={comments}
        addComment={addComment}
      />

      {/* Modal chia sẻ */}
      <ShareModal
        isModalOpen={isShareModalOpen}
        onCancel={() => setIsShareModalOpen(false)}
      />
    </>
  );
};

export default Post;
