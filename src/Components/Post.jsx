import React, { useEffect, useState } from "react";
import { Avatar, Button, Tooltip  } from "antd";
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
import {
  countPostReactionService,
  getPostReactionService,
  deletePostReactionService,
  addPostReactionService,
} from "../services/postReactionService";

import { countCommentService } from "../services/commentService";

import { getUserIdFromLocalStorage } from "../utils/authUtils";

const Post = ({ content, createdAt, userId, images, postId }) => {
  const userId1 = getUserIdFromLocalStorage(); // Lấy userId1 từ localStorage
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReactionBoxVisible, setIsReactionBoxVisible] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState("NONE");
  const [userInfo, setUserInfo] = useState([]);
  const [postReactionCount, setPostReactionCount] = useState([]);
  const [CommentCount, setCommentCount] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu


  const getLikedUsers = () => {
    return reactions.filter(reaction => reaction.reactionType === "LIKE").map(reaction => reaction.fullName).join('\n');
  };

  const getAllReactions = () => {
    return reactions
      .map(reaction => reaction.fullName + ' (' + reaction.reactionType + ')')
      .join('<br />');  // Thay thế '\n' bằng '<br />'
  };
  

  const [comments, setComments] = useState([
    { id: 1, user: "Quân A.P", content: "Vẫn đẹp trai ạ 😄" },
    { id: 2, user: "JSOL", content: "Mèo cute quá!" },
  ]);

  const reactionConfig = {
    NONE: { text: "Thích", icon: <AiOutlineLike />, color: "#65686c" },
    LIKE: {
      text: "Thích",
      icon: (
        <img
          style={{ width: "20px", height: "20px" }}
          src={LikeIcon}
          alt="Haha"
        />
      ),
      color: "blue",
    },
    HAHA: {
      text: "Haha",
      icon: (
        <img
          style={{ width: "20px", height: "20px" }}
          src={HahaIcon}
          alt="Haha"
        />
      ),
      color: "orange",
    },
    LOVE: {
      text: "Yêu thích",
      icon: (
        <img
          style={{ width: "20px", height: "20px" }}
          src={LoveIcon}
          alt="Love"
        />
      ),
      color: "red",
    },
    WOW: {
      text: "Wow",
      icon: (
        <img
          style={{ width: "20px", height: "20px" }}
          src={WowIcon}
          alt="Wow"
        />
      ),
      color: "orange",
    },
    SAD: {
      text: "Buồn",
      icon: (
        <img
          style={{ width: "20px", height: "20px" }}
          src={SadIcon}
          alt="Sad"
        />
      ),
      color: "orange",
    },
    ANGRY: {
      text: "Phẫn nộ",
      icon: (
        <img
          style={{ width: "18px", height: "18px" }}
          src={AngryIcon}
          alt="Sad"
        />
      ),
      color: "#e9710f",
    },
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await userFindByIdService(userId);
      setUserInfo(response?.data?.data || []); // Lưu dữ liệu trả về
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const countReaction = async () => {
    try {
      setLoading(true);
      const response = await countPostReactionService(postId);
      setPostReactionCount(response?.data?.data || 0);
    } catch (error) {
      console.error("Error count reaction:", error);
    } finally {
      setLoading(false);
    }
  };

  const countComment = async () => {
    try {
      setLoading(true);
      const response = await countCommentService(postId);
      setCommentCount(response?.data?.data || 0);
    } catch (error) {
      console.error("Error count reaction:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReactions = async () => {
    try {
      const response = await getPostReactionService(postId);
      setReactions(response?.data?.data || []); // Lưu dữ liệu phản ứng
    } catch (error) {
      console.error("Error fetching reactions:", error);
    }
  };

  const fetchUserReaction = async () => {
    try {
      const response = await getPostReactionService(postId);
      const reactions = response?.data?.data || [];
      const userReaction = reactions.find(
        (reaction) => reaction.userId === userId1
      );
      if (userReaction) {
        setSelectedReaction(userReaction.reactionType);
      }
    } catch (error) {
      console.error("Error fetching user reactions:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    countReaction();
    fetchUserReaction(); // Gọi thêm hàm kiểm tra cảm xúc
    fetchReactions();
    countComment();
  }, [postId]); // Gọi lại khi postId thay đổi

  const handleReactionAdded = async (reactionType) => {
    try {
      console.log("Selected Reaction:", selectedReaction);
      console.log("Reaction Type:", reactionType);

      // Nếu người dùng bỏ chọn cảm xúc hoặc chọn lại cùng cảm xúc đã chọn
      if (reactionType === "NONE" || reactionType === selectedReaction) {
        console.log("Xóa cảm xúc hiện tại...");
        await deletePostReactionService(postId, userId1);
        setSelectedReaction("NONE");
        console.log("Cảm xúc đã bị xóa");
      }
      // Nếu bài viết chưa có cảm xúc (NONE), thêm cảm xúc mới
      else if (selectedReaction === "NONE") {
        console.log("Thêm cảm xúc mới...");
        await addPostReactionService({
          post_id: postId,
          user_id: userId1,
          reaction_type: reactionType,
        });
        setSelectedReaction(reactionType);
        console.log("Cảm xúc mới đã được thêm:", reactionType);
      }
      // Nếu bài viết đã có cảm xúc, cập nhật sang cảm xúc khác
      else {
        console.log("Cập nhật cảm xúc...");
        await deletePostReactionService(postId, userId1); // Xóa cảm xúc cũ
        await addPostReactionService({
          post_id: postId,
          user_id: userId1,
          reaction_type: reactionType,
        }); // Thêm cảm xúc mới
        setSelectedReaction(reactionType);
        console.log("Cảm xúc đã được cập nhật thành:", reactionType);
      }
      countReaction();
      // Đóng hộp thoại chọn cảm xúc (nếu có)
      setIsReactionBoxVisible(false);
    } catch (error) {
      console.error("Lỗi khi xử lý cảm xúc:", error);
    }
  };

  // Hàm riêng cho nút "LIKE"
  const handleLikeButtonClick = async () => {
    if (selectedReaction !== "NONE") {
      // Nếu đang có cảm xúc LIKE, xóa nó đi
      console.log("Xóa cảm xúc ĐANG CÓ...");
      await deletePostReactionService(postId, userId1);
      setSelectedReaction("NONE");
      console.log("đã xóa cảm xúc ĐANG CÓ");
    } else {
      // Nếu không có cảm xúc, thêm cảm xúc LIKE
      console.log("Thêm cảm xúc LIKE...");
      await addPostReactionService({
        post_id: postId,
        user_id: userId1,
        reaction_type: "LIKE",
      });
      setSelectedReaction("LIKE");
      console.log("Đã thêm cảm xúc LIKE");
    }
    setIsReactionBoxVisible(false); // Đóng box cảm xúc
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
          <Avatar src={userInfo.profilePictureUrl} className={styles.avatar} />
          <div className={styles.userInfo}>
            <span className={styles.userName}>{userInfo.fullName}</span>
            <span className={styles.time}>
              {new Date(createdAt).toLocaleString()} ·{" "}
              <FaEarthAmericas style={{ marginLeft: "4px" }} />
            </span>
          </div>
        </div>

        <div className={styles.content}>
          <p>{content}</p>
          {images.length > 0 &&
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`post-image-${index}`}
                className={styles.mainImage}
              />
            ))}
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
          <Tooltip 
            title={<span dangerouslySetInnerHTML={{ __html: getAllReactions() }} />} 
            arrow
          >
            <span className={styles.reactionCount}>{postReactionCount}</span>
          </Tooltip>
          <div className={styles.rightFooter}>
            <span className={styles.cmtCount} style={{ marginRight: "10px" }}>
              {CommentCount} bình luận
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
            onClick={handleLikeButtonClick}
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
                postId={postId}
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
