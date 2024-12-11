import React, { useState } from "react";
import { Modal, Avatar, Input, Button } from "antd";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { FaEarthAmericas } from "react-icons/fa6";
import "./CommentModal.scss";

const CommentModal = ({ isModalOpen, onCancel, postContent, postImage, comments, addComment, userName }) => {
    const [commentText, setCommentText] = useState("");

    const handleCommentSubmit = () => {
        if (commentText.trim() !== "") {
            addComment(commentText);
            setCommentText("");
        }
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={onCancel}
            footer={
                <div className="commentInput">
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
            title={`${userName}'s post`}
            className="commentModal"
        >
            <div className="postContainer">
                {/* Header */}
                <div className="header">
                    <Avatar
                        src="https://shopgarena.net/wp-content/uploads/2023/07/Meo-khoc-thet-len.jpg"
                        className="avatar"
                    />
                    <div className="userInfo">
                        <span className="userName">{userName || "Anonymous"}</span>
                        <span className="time">
                            5 phút · <FaEarthAmericas style={{ marginLeft: "4px" }} />
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="content">
                    <p>{postContent}</p>
                    <img
                        src={postImage}
                        alt="post content"
                        className="mainImage"
                    />
                </div>

                {/* Footer */}
                <div className="footer">
                    <Button icon={<AiOutlineLike />} type="text">
                        Thích
                    </Button>
                    <Button icon={<FaRegComment />} type="text">
                        Bình luận
                    </Button>
                    <Button icon={<PiShareFat />} type="text">
                        Chia sẻ
                    </Button>
                </div>

                <div className="commentsSection">
                    {/* Comments List */}
                    <div className="commentsList">
                        {comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <Avatar
                                    src="https://shopgarena.net/wp-content/uploads/2023/07/Meo-khoc-thet-len.jpg"
                                    className="commentAvatar"
                                />
                                <div className="commentContent">
                                    <span className="commentUser">{comment.user}</span>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CommentModal;
