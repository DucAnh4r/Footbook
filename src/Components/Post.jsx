import React, { useState } from "react";
import { Avatar, Button } from "antd";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { FaEarthAmericas } from "react-icons/fa6";
import styles from "./Post.module.scss";
import CommentModal from "../Modal/CommentModal";
import HahaIcon from "../assets/image/Reacts/haha.png";
import LikeIcon from "../assets/image/Reacts/like.png";
import ReactionIconsBox from "./ReactionIconsBox";
import ShareModal from "../Modal/ShareModal";

const Post = () => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReactionBoxVisible, setIsReactionBoxVisible] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [comments, setComments] = useState([
    { id: 1, user: "Quân A.P", content: "Vẫn đẹp trai ạ 😄" },
    { id: 2, user: "JSOL", content: "Mèo cute quá!" },
  ]);

  const handleReactionAdded = (reactionType) => {
    setReactions((prevReactions) => [...prevReactions, reactionType]);
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
          <img
            src="https://shopgarena.net/wp-content/uploads/2023/07/Meo-khoc-thet-len.jpg"
            alt="post content"
            className={styles.mainImage}
          />
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

        <div
          className={styles.footer}
        >
          <Button icon={<AiOutlineLike />} type="text"
            className={styles.likeButtonWrapper}
            onMouseEnter={() => setIsReactionBoxVisible(true)}
            onMouseLeave={() => setIsReactionBoxVisible(false)}
          >
            Thích
          </Button>
          {isReactionBoxVisible && (
            <div
              style={{padding: "50px", position: "absolute", left: "0px", bottom: "0px"}}
              className={styles.reactionBoxWrapper}
              onMouseEnter={() => setIsReactionBoxVisible(true)}
              onMouseLeave={() => setIsReactionBoxVisible(false)}
            >
              <ReactionIconsBox 
                postId="123" // ID bài viết
                onReactionAdded={handleReactionAdded} // Callback khi thêm cảm xúc
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
