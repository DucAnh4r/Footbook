import React, { useState } from "react";
import { Layout, Avatar, Badge, Tooltip, FloatButton, Typography, Flex } from 'antd';
import { IoPencilSharp } from 'react-icons/io5';
import Header from "./Header"; // Custom header component
import "./MainLayout.scss";
import { HeaderProvider } from "../Context/HeaderContext";
import ChatWindow from "../Pages/Homepage/ChatWindow";

const MainLayout = ({ children }) => {
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [hiddenMessages, setHiddenMessages] = useState([]);

    const handleMessageClick = (message) => {
        const isHidden = hiddenMessages.some((m) => m.id === message.id);
        if (isHidden) {
            setHiddenMessages((prev) => prev.filter((m) => m.id !== message.id));
            setSelectedMessages((prev) => [...prev, message]);
        } else {
            const isAlreadyOpen = selectedMessages.some((m) => m.id === message.id);
            if (!isAlreadyOpen) {
                setSelectedMessages((prev) => [...prev, message]);
            }
        }
    };

    const handleCloseChat = (id) => {
        setSelectedMessages((prev) => prev.filter((message) => message.id !== id));
    };

    const handleHideChat = (id) => {
        const messageToHide = selectedMessages.find((m) => m.id === id);
        if (messageToHide) {
            setHiddenMessages((prev) => [...prev, messageToHide]);
            setSelectedMessages((prev) => prev.filter((m) => m.id !== id));
        }
    };

    const handleShowChat = (id) => {
        const messageToShow = hiddenMessages.find((m) => m.id === id);
        if (messageToShow) {
            const isAlreadyOpen = selectedMessages.some((m) => m.id === id);
            if (!isAlreadyOpen) {
                setSelectedMessages((prev) => [...prev, messageToShow]);
            }
            setHiddenMessages((prev) => prev.filter((m) => m.id !== id));
        }
    };

    // Xử lý hiển thị cửa sổ chat khi nhấn nút FloatButton
    const handleNewMessage = () => {
        const newMessage = {
            id: `new-${Date.now()}`, // Tạo ID duy nhất
            name: "Tin nhắn mới",
            message: "Nội dung tin nhắn mới",
        };
        setSelectedMessages((prev) => [...prev, newMessage]);
    };

    const calculatePosition = (index) => {
        const baseBottom = 0;
        const baseRight = 94;
        const offset = index * 350;
        return { bottom: baseBottom, right: baseRight + offset };
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <HeaderProvider>
                <Header onMessageClick={handleMessageClick} /> {/* Truyền xuống Header */}
                <Layout>{children}</Layout>
            </HeaderProvider>
            {/* Bong bóng chat (hiển thị tin nhắn ẩn) */}
            <FloatButton.Group shape="circle" style={{ bottom: '14px', right: '24px' }}>
                {hiddenMessages.map((message) => (
                    <Tooltip
                        key={message.id}
                        title={
                            <Flex vertical>
                                <Typography.Text strong>{message.name || 'Không có tên'}</Typography.Text>
                                <Typography.Text type="secondary">
                                    {message.message || 'Không có nội dung'}
                                </Typography.Text>
                            </Flex>
                        }
                        color="white"
                        placement="left"
                    >
                        <Badge
                            count={
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: 'green',
                                        borderRadius: '50%',
                                        border: '2px solid white',
                                    }}
                                />
                            }
                            offset={[-8, 40]}
                        >
                            <Avatar
                                src="https://i.pravatar.cc/300"
                                size={48}
                                onClick={() => handleShowChat(message.id)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Badge>
                    </Tooltip>
                ))}
                <Tooltip title="Tin nhắn mới" placement="left">
                    <FloatButton icon={<IoPencilSharp />} onClick={handleNewMessage} />
                </Tooltip>
            </FloatButton.Group>

            {/* Các cửa sổ chat */}
            {selectedMessages.map((message, index) => {
                const position = calculatePosition(index);
                return (
                    <ChatWindow
                        key={message.id}
                        message={message}
                        onClose={() => handleCloseChat(message.id)}
                        onHide={() => handleHideChat(message.id)} // Thêm hàm ẩn chat
                        position={position}
                    />
                );
            })}
        </Layout>
    );
};

export default MainLayout;
