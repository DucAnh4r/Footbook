import React, { useState } from "react";
import { Modal, Button, Avatar, Input, Checkbox } from "antd";
import { FaArrowLeft, FaEarthAmericas } from "react-icons/fa6";
import styles from "./ShareModal.module.scss";
import AudienceModal from "./AudienceModal";
import { IoSearchOutline } from "react-icons/io5";

const ShareModal = ({ isModalOpen, onCancel }) => {
    const [view, setView] = useState("share"); // "share" hoặc "sendTo"
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
                    placeholder="Say something about this (optional)"
                    autoSize={{ minRows: 1, maxRows: 100 }}
                    className={styles.textArea}
                />
                <Button type="primary" block className={styles.shareButton}>
                    Share now
                </Button>
            </div>
            <div className={styles.shareTo}>
                <div className={styles.messengerSection}>
                    <h4>Send in Messenger</h4>
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
                    <h4>Share to</h4>
                    <div className={styles.options}>
                        <div className={styles.option}>
                            <div className={styles.iconWrapper}>
                                <img src="messenger-icon.svg" alt="Messenger" />
                            </div>
                            <span>Messenger</span>
                        </div>
                        <div className={styles.option}>
                            <div className={styles.iconWrapper}>
                                <img src="whatsapp-icon.svg" alt="WhatsApp" />
                            </div>
                            <span>WhatsApp</span>
                        </div>
                        <div className={styles.option}>
                            <div className={styles.iconWrapper}>
                                <img src="story-icon.svg" alt="Your Story" />
                            </div>
                            <span>Your Story</span>
                        </div>
                        <div className={styles.option}>
                            <div className={styles.iconWrapper}>
                                <img src="copy-link-icon.svg" alt="Copy Link" />
                            </div>
                            <span>Copy link</span>
                        </div>
                        <div className={styles.option}>
                            <div className={styles.iconWrapper}>
                                <img src="group-icon.svg" alt="Group" />
                            </div>
                            <span>Group</span>
                        </div>
                        <div className={styles.option}>
                            <div className={styles.iconWrapper}>
                                <img src="friend-profile-icon.svg" alt="Friend's Profile" />
                            </div>
                            <span>Friend's profile</span>
                        </div>
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
            <h2>Send to</h2>
            <Input
                placeholder="Search for people and groups"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={styles.searchInput}
                prefix={<IoSearchOutline/>}
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
                placeholder="Add an optional message here..."
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
                Send
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
                onSelect={(value) => setSelectedAudience(value)} // Cập nhật audience
                defaultAudience={selectedAudience} // Truyền giá trị mặc định
            />
        </>
    );
};

export default ShareModal;
