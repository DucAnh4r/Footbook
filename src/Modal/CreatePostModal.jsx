import React, { useState } from "react";
import { Modal, Input, Button, Upload, Avatar, Card } from "antd";
import { SmileOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { MdInsertEmoticon, MdOutlineAddPhotoAlternate } from "react-icons/md";
import { HiMiniGif } from "react-icons/hi2";
import "./CreatePostModal.scss";
import AudienceModal from "./AudienceModal";
import GifModal from "./GifModal";

const themes = [
    { id: 0, name: "Default", background: "white" }, // Chủ đề mặc định
    { id: 1, name: "Rainbow", background: "linear-gradient(to right, #ff9a9e, #fad0c4)" },
    { id: 2, name: "Sunset", background: "linear-gradient(to right, #ff758c, #ff7eb3)" },
    { id: 3, name: "Ocean", background: "linear-gradient(to right, #6a11cb, #2575fc)" },
];

const CreatePostModal = ({ isModalOpen, onClose }) => {
    const [postContent, setPostContent] = useState("");
    const [showUpload, setShowUpload] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(themes[0]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isAudienceModalOpen, setIsAudienceModalOpen] = useState(false);
    const [selectedAudience, setSelectedAudience] = useState("Friends");
    const [gifModalVisible, setGifModalVisible] = useState(false);
    const [selectedGif, setSelectedGif] = useState(null); // URL của GIF đã chọn

    const handleOk = () => {
        console.log("Post content:", postContent);
        console.log("Selected theme:", selectedTheme);
        console.log("Uploaded files:", uploadedFiles);
        onClose(); // Đóng modal
    };

    const handleCloseUpload = (event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click từ nút đóng lan tới Upload
        setShowUpload(false); // Ẩn khu vực Upload
    };

    const isPostDisabled = !postContent.trim() && uploadedFiles.length === 0;

    return (
        <Modal
            title={<div className="modal-title">Create post</div>}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={onClose}
            footer={[
                <div className="modal-footer">
                    <Button
                        key="post"
                        type="primary"
                        onClick={handleOk}
                        className="post-button"
                        disabled={isPostDisabled} // Vô hiệu hóa nếu không có nội dung hoặc ảnh
                    >
                        Post
                    </Button>
                </div>,
            ]}
            style={{ padding: 0 }}
            className="scrollable-modal"
        >
            <div className="modal-content">
                <div className="user-info">
                    <Avatar size={40} icon={<UserOutlined />} />
                    <div className="user-details">
                        <div className="user-name">Duc Manh</div>
                        <Button size="small" className="friends-button" onClick={() => setIsAudienceModalOpen(true)}
                        >
                            {selectedAudience}
                        </Button>
                    </div>
                </div>
                <div
                    className="custom-textarea-container"
                    style={{
                        background: selectedTheme.background,
                        color: selectedTheme.id === 0 ? "#000" : "#fff",
                    }}
                >
                    <Input.TextArea
                        autoSize={{ minRows: 1, maxRows: 100 }}
                        placeholder="What's on your mind, Duc?"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="custom-textarea"
                    />
                    <SmileOutlined className="emoji-icon" />

                    {/* Hiển thị ảnh GIF đã chọn */}
                    {selectedGif && (
                        <div className="selected-gif-container">
                            <img
                                src={selectedGif}
                                alt="Selected GIF"
                                className="selected-gif"
                                onClick={() => setSelectedGif(null)} // Cho phép xóa GIF khi nhấp vào
                            />
                        </div>
                    )}

                    {/* Chỉ hiển thị Upload hoặc Themes */}
                    {showUpload && (
                        <Upload
                        className="ant-upload ant-upload-select"
                        fileList={uploadedFiles} // Hiển thị danh sách file
                        onChange={(info) => {
                            setUploadedFiles(info.fileList); // Cập nhật danh sách file
                            setSelectedTheme(themes[0]); // Reset theme về mặc định
                        }}
                        beforeUpload={(file) => {
                            // Kiểm tra định dạng file (chỉ cho phép ảnh hoặc video)
                            const isImageOrVideo = file.type.startsWith("image/") || file.type.startsWith("video/");
                            if (!isImageOrVideo) {
                                console.error("You can only upload image or video files!");
                                return Upload.LIST_IGNORE; // Bỏ qua file không hợp lệ
                            }
                            return true; // Cho phép upload file hợp lệ
                        }}
                        listType="picture"
                    >
                        <div className="upload-area">
                            <Button icon={<UploadOutlined />} type="text">
                                Add photos/videos
                            </Button>
                            <div className="upload-hint">or drag and drop</div>
                            <Button
                                type="text"
                                onClick={handleCloseUpload}
                                className="close-upload-button"
                            >
                                ✕
                            </Button>
                        </div>
                    </Upload>
                    )}
                    {(!showUpload && !selectedGif) && (

                        <div className="themes-container">
                            {themes.map((theme) => (
                                <Button
                                    key={theme.id}
                                    className={`theme-button ${selectedTheme.id === theme.id ? "active" : ""}`}
                                    style={{
                                        background: theme.background,
                                        color: selectedTheme.id === 0 ? "#000" : "#fff",
                                    }}
                                    onClick={() => {
                                        setSelectedTheme(theme);
                                        if (theme.id !== 0) {
                                            setShowUpload(false); // Ẩn Upload khi chọn Theme
                                        }
                                    }}
                                    disabled={uploadedFiles.length > 0} // Disable khi có Photo hoặc GIF
                                >
                                </Button>
                            ))}
                        </div>
                    )}
                </div>

                <Card className="card-container ant-card-body" style={{ padding: 0 }}>
                    <div className="add-post-options">
                        <Button type="text" className="add-post-text">
                            Add to your post
                        </Button>
                        <div className="icon-container">
                            <Button
                                type="text"
                                icon={<MdOutlineAddPhotoAlternate />}
                                className="icon"
                                onClick={() => {
                                    setShowUpload(true);
                                    setSelectedTheme(themes[0]);
                                }}
                                disabled={selectedTheme.id !== 0}
                            />
                            <Button
                                type="text"
                                icon={<MdInsertEmoticon />}
                                className="icon"

                            />
                            <Button type="text" icon={<HiMiniGif />} className="icon"
                                onClick={() => {
                                    setGifModalVisible(true)
                                    setSelectedTheme(themes[0]); // Reset về Default Theme khi chọn GIF
                                }}
                                disabled={selectedTheme.id !== 0 || showUpload === true}
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <GifModal
                visible={gifModalVisible}
                onClose={() => setGifModalVisible(false)}
                onSendGif={(gifUrl) => {
                    setSelectedGif(gifUrl); // Lưu URL của GIF đã chọn
                    setGifModalVisible(false); // Đóng modal GIF
                }}
            />
            <AudienceModal
                isModalOpen={isAudienceModalOpen}
                onClose={() => setIsAudienceModalOpen(false)}
                onSelect={(value) => setSelectedAudience(value)} // Cập nhật audience
                defaultAudience={selectedAudience} // Truyền giá trị mặc định
            />
        </Modal>

    );
};

export default CreatePostModal;


