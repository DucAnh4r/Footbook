import React, { useEffect, useState } from "react";
import { Avatar, Button, Tooltip } from "antd";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { FaEarthAmericas } from "react-icons/fa6";
import styles from "./SharedPost.module.scss";
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

import { reactionConfig } from "../assets/Config";
import { getPostByIdService } from "../services/postService";

const Post = ({ content, createdAt, userId, images, postId, shareId }) => {
  const userId1 = getUserIdFromLocalStorage(); // Lấy userId1 từ localStorage

  const [sharedPost, setSharedPost] = useState(null); // Lưu bài chia sẻ

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReactionBoxVisible, setIsReactionBoxVisible] = useState(false);
  const [isReactionBoxVisible2, setIsReactionBoxVisible2] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState("NONE");
  const [userInfo, setUserInfo] = useState([]);
  const [mainUserInfo, setMainUserInfo] = useState([]);
  const [postReactionCount, setPostReactionCount] = useState([]);
  const [CommentCount, setCommentCount] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  const [likeCount, setLikeCount] = useState(0);
  const [loveCount, setLoveCount] = useState(0);
  const [hahaCount, setHahaCount] = useState(0);
  const [sadCount, setSadCount] = useState(0);
  const [angryCount, setAngryCount] = useState(0);


  const getSharedPost = async () => {
    try {
      setLoading(true);
      const response = await getPostByIdService(shareId);

      if (response?.data?.data?.postResponse) {
        setSharedPost(response.data.data.postResponse); // Lưu bài chia sẻ nếu có dữ liệu
      } else {
        console.warn("Shared post is null or undefined");
        setSharedPost(null); // Đặt giá trị null nếu không có dữ liệu
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      setSharedPost(null); // Đặt giá trị null nếu có lỗi
    } finally {
      setLoading(false);
    }
  };

  const fetchMainUser = async () => {
    try {
      setLoading(true);
      const response = await userFindByIdService(sharedPost.user_id);
      setMainUserInfo(response?.data?.data || []); // Lưu dữ liệu trả về
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLikedUsers = () => {
    return reactions
      .filter((reaction) => reaction.reactionType === "LIKE")
      .map((reaction) => reaction.fullName)
      .join("<br />");
  };

  const getAllReactions = () => {
    return reactions
      .map((reaction) => reaction.fullName + " (" + reaction.reactionType + ")")
      .join("<br />"); // Thay thế '\n' bằng '<br />'
  };

  const [comments, setComments] = useState([
    { id: 1, user: "Quân A.P", content: "Vẫn đẹp trai ạ 😄" },
    { id: 2, user: "JSOL", content: "Mèo cute quá!" },
  ]);

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
    getSharedPost();
    fetchUser();
    fetchMainUser();
    countReaction();
    fetchUserReaction(); // Gọi thêm hàm kiểm tra cảm xúc
    fetchReactions();
    countComment();
  }, []);

  useEffect(() => {
    getSharedPost();
    fetchUser();
    countReaction();
    fetchUserReaction(); // Gọi thêm hàm kiểm tra cảm xúc
    fetchReactions();
    countComment();
  }, [isCommentModalOpen]); //đóng mở modal thì xem lại số lượt like

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
      fetchReactions();
      countReaction();
      getAllReactions();
      // Đóng hộp thoại chọn cảm xúc (nếu có)
      setIsReactionBoxVisible(false);
      setIsReactionBoxVisible2(false);
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
    fetchReactions();
    countReaction();
    getAllReactions();
    setIsReactionBoxVisible(false); // Đóng box cảm xúc
    setIsReactionBoxVisible2(false); // Đóng box cảm xúc
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
            <div>
              <span className={styles.userName}>{userInfo.fullName}</span>
              <span style={{ marginLeft: "4px", color: "#65686c" }}>
                đã chia sẻ một bài viết
              </span>
            </div>
            <span className={styles.time}>
              {new Date(createdAt).toLocaleString()} ·{" "}
              <FaEarthAmericas style={{ marginLeft: "4px" }} />
            </span>
          </div>
        </div>

        <div className={styles.content}>
          <p>{content}</p>
          <div className={styles.sharedContent}>
            <img
              className={styles.mainImage}
              src="https://cdn.bongdaplus.vn/Assets/Media/2024/12/18/70/messi2.jpg"
              alt=""
            />
            <div style={{ padding: "10px" }} className={styles.header}>
              <Avatar
                src={userInfo.profilePictureUrl}
                className={styles.avatar}
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{userInfo.fullName}</span>
                <span className={styles.time}>
                  {new Date(createdAt).toLocaleString()} ·{" "}
                  <FaEarthAmericas style={{ marginLeft: "4px" }} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.reactionsContainer}>
          <div className={styles["reactions"]}>
            <Tooltip
              title={
                <span dangerouslySetInnerHTML={{ __html: getLikedUsers() }} />
              }
              arrow
            >
              <img
                src={LikeIcon}
                alt="Image 2"
                className={`${styles["icon"]} ${styles["icon-1"]}`}
              />
            </Tooltip>
            <Tooltip
              title={
                <span dangerouslySetInnerHTML={{ __html: getLikedUsers() }} />
              }
              arrow
            >
              <img
                src={HahaIcon}
                alt="Image 2"
                className={`${styles["icon"]} ${styles["icon-2"]}`}
              />
            </Tooltip>
            {/* <Tooltip 
              title={<span dangerouslySetInnerHTML={{ __html: getLikedUsers() }} />} 
              arrow
            >
              <img
                src={LoveIcon}
                alt="Image 2"
                className={`${styles["icon"]} ${styles["icon-3"]}`}
              />
            </Tooltip>
            <Tooltip 
              title={<span dangerouslySetInnerHTML={{ __html: getLikedUsers() }} />} 
              arrow
            >
              <img
                src={SadIcon}
                alt="Image 2"
                className={`${styles["icon"]} ${styles["icon-4"]}`}
              />
            </Tooltip>
            <Tooltip 
              title={<span dangerouslySetInnerHTML={{ __html: getLikedUsers() }} />} 
              arrow
            >
              <img
                src={AngryIcon}
                alt="Image 2"
                className={`${styles["icon"]} ${styles["icon-5"]}`}
              />
            </Tooltip> */}
          </div>
          <Tooltip
            title={
              <span dangerouslySetInnerHTML={{ __html: getAllReactions() }} />
            }
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
        type="sharedpost"
        userId={userId}
        content={content}
        isModalOpen={isCommentModalOpen}
        onCancel={() => setIsCommentModalOpen(false)}
        postId={postId}
        userInfo={userInfo}
        images={images}
        comments={comments}
        addComment={addComment}
        createdAt={createdAt}
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
