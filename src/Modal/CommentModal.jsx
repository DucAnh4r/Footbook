import React, { useState, useEffect } from "react";
import { Modal, Avatar, Input, Button } from "antd";
import styles from "./CommentModal.module.scss"; // Import SCSS module
import Post from "../Components/Post";
import SharedPost from "../Components/SharedPost";

const CommentModal = ({
  type,
  userId,
  content,
  comments,
  isModalOpen,
  onCancel,
  postId,
  images,
  addComment,
  userInfo,
  createdAt,
}) => {
  const [commentText, setCommentText] = useState("");

  // Reset data every time the modal is closed
  useEffect(() => {
    if (!isModalOpen) {
      // Reset comment text and any other states when modal closes
      setCommentText("");
    }
  }, [isModalOpen]);

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      addComment(commentText);
      setCommentText(""); // Reset after submitting
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={onCancel}
      footer={
        <div className={styles.commentInput}>
          <Input
            placeholder="Viết bình luận..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onPressEnter={handleCommentSubmit}
          />
          <Button type="primary" onClick={handleCommentSubmit}>
            Gửi
          </Button>
        </div>
      }
      width="700px"
      title={`${userInfo.fullName}'s post`}
      className={styles.commentModal}
    >
      {type === "post" ? (
        // Set the `key` to postId to force re-mount
        <Post
          key={isModalOpen ? postId : `closed-${postId}`} // Use key change to force re-mount
          postId={postId}
          content={content}
          createdAt={createdAt}
          userId={userId}
          images={images}
          isModalOpen={true}
        />
      ) : type === "sharedpost" ? (
        <SharedPost
          key={isModalOpen ? postId : `closed-${postId}`} // Use key change to force re-mount
          postId={postId}
          content={content}
          createdAt={createdAt}
          userId={userId}
          images={images}
          isModalOpen={true}
        />
      ) : (
        <p>Loại bài viết không hợp lệ</p>
      )}
      <div className={styles.commentsSection}>
        <h3>Bình luận</h3>
        {/* Comments List */}
        <div className={styles.commentsList}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <Avatar
                src="https://shopgarena.net/wp-content/uploads/2023/07/Meo-khoc-thet-len.jpg"
                className={styles.commentAvatar}
              />
              <div className={styles.commentContent}>
                <span className={styles.commentUser}>{comment.user}</span>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
