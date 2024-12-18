import React, { useState } from "react";
import { Modal, Button, Avatar, Input, Checkbox, Tooltip } from "antd";
import { FaArrowLeft, FaEarthAmericas } from "react-icons/fa6";
import styles from "./ShareModal.module.scss";
import AudienceModal from "./AudienceModal";
import { IoSearchOutline } from "react-icons/io5";
import { FaFacebookMessenger, FaLink, FaRegFileAlt, FaUserFriends, FaUsers, FaWhatsapp } from "react-icons/fa";

const ShareModal = ({ isModalOpen, onCancel }) => {
    const [view, setView] = useState("share");
    const [selectedAudience, setSelectedAudience] = useState("Friends");
    const [isAudienceModalOpen, setIsAudienceModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);

    const users = [
        { id: 1, name: "Trí Dũng", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: 2, name: "1111111111111111111111111111111", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: 3, name: "Ninh bình", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
        { id: 4, name: "Fordeer Life Style", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
        { id: 5, name: "IT4", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
    ];

    const handleCheckboxChange = (id) => {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
        );
    };

    const renderShareContent = () => (
        <div className={styles.shareContainer}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <Avatar src="https://shopgarena.net/wp-content/uploads/2023/07/Meo-khoc-thet-len.jpg" />
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>Duc Manh</span>
                        <div className={styles.privacyContainer}>
                            <div className={styles.underName}>
                                <span className={styles.privacy}>
                                    Feed · <FaEarthAmericas />
                                </span>
                                <Button
                                    size="small"
                                    className={styles.friendsButton}
                                    onClick={() => setIsAudienceModalOpen(true)}
                                >
                                    {selectedAudience}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Input.TextArea
                    placeholder="Hãy nói gì đó về nội dung này (không bắt buộc)"
                    autoSize={{ minRows: 1, maxRows: 100 }}
                    className={styles.textArea}
                />
                <Button type="primary" block className={styles.shareButton}>
                    Chia sẻ ngay
                </Button>
            </div>
            <div className={styles.shareTo}>
                <div className={styles.messengerSection}>
                    <h4>Gửi bằng Messenger</h4>
                    <div className={styles.messengerUsers}>
                        <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
                        <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" />
                        <Avatar src="https://randomuser.me/api/portraits/men/47.jpg" />
                        <Avatar src="https://randomuser.me/api/portraits/women/30.jpg" />
                        <Button
                            className={styles.moreButton}
                            onClick={() => setView("sendTo")}
                        >
                            ...
                        </Button>
                    </div>
                </div>
                <div className={styles.shareOptions}>
                    <h4>Chia sẻ lên</h4>
                    <div className={styles.options}>
                        {["Messenger", "WhatsApp", "Tin", "Liên kết", "Nhóm", "Bạn bè"].map(
                            (option, idx) => (
                                <Tooltip key={idx} title={option}>
                                    <div className={styles.option}>
                                        <div className={styles.iconWrapper}>
                                            {option === "Messenger" && <FaFacebookMessenger />}
                                            {option === "WhatsApp" && <FaWhatsapp />}
                                            {option === "Tin" && <FaRegFileAlt />}
                                            {option === "Liên kết" && <FaLink />}
                                            {option === "Nhóm" && <FaUsers />}
                                            {option === "Bạn bè" && <FaUserFriends />}
                                        </div>
                                        <span>{option}</span>
                                    </div>
                                </Tooltip>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSendToContent = () => (
        <div className={styles.sendToContainer}>
            <Button className={styles.backButton} type="text" onClick={() => setView("share")}>
                <FaArrowLeft />
            </Button>
            <h2>Gửi tới</h2>
            <Input
                placeholder="Tìm kiếm người và nhóm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={styles.searchInput}
                prefix={<IoSearchOutline />}
            />
            <div className={styles.userList}>
                {users
                    .filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase()))
                    .map((user) => (
                        <div key={user.id} className={styles.userItem}>
                            <Avatar src={user.avatar} />
                            <span>{user.name}</span>
                            <Checkbox
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleCheckboxChange(user.id)}
                            />
                        </div>
                    ))}
            </div>
            <Input.TextArea
                placeholder="Thêm tin nhắn tại đây (không bắt buộc)"
                className={styles.messageInput}
                autoSize={{ minRows: 1, maxRows: 100 }}
            />
            <Button
                type="primary"
                block
                onClick={() => {
                    console.log("Send to:", selectedUsers);
                    setView("share");
                }}
                disabled={selectedUsers.length === 0}
            >
                Gửi
            </Button>
        </div>
    );

    return (
        <>
            <Modal
                open={isModalOpen}
                onCancel={onCancel}
                footer={null}
                width="500px"
                title={view === "share" ? "Share" : "Send to"}
                className={styles.shareModal}
            >
                {view === "share" ? renderShareContent() : renderSendToContent()}
            </Modal>

            <AudienceModal
                isModalOpen={isAudienceModalOpen}
                onClose={() => setIsAudienceModalOpen(false)}
                onSelect={(value) => setSelectedAudience(value)}
                defaultAudience={selectedAudience}
            />
        </>
    );
};

export default ShareModal;
