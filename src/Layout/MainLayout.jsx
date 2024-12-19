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

    const MAX_CHAT_WINDOWS = 3; // Giới hạn số lượng cửa sổ chat

    const handleMessageClick = (message) => {
        const isHidden = hiddenMessages.some((m) => m.userId === message.userId);
        
        if (isHidden) {
            setHiddenMessages((prev) => prev.filter((m) => m.userId !== message.userId));
            setSelectedMessages((prev) => {
                const newMessages = [...prev, message];
                if (newMessages.length > MAX_CHAT_WINDOWS) {
                    // Nếu vượt quá giới hạn, ẩn cái cũ nhất
                    const [oldest, ...rest] = newMessages;
                    setHiddenMessages((hidden) => [...hidden, oldest]);
                    return rest;
                }
                return newMessages;
            });
        } else {
            const isAlreadyOpen = selectedMessages.some((m) => m.userId === message.userId);
        console.log("message",message);
            if (!isAlreadyOpen) {
                setSelectedMessages((prev) => {
                    const newMessages = [...prev, message];
                    if (newMessages.length > MAX_CHAT_WINDOWS) {
                        // Nếu vượt quá giới hạn, ẩn cái cũ nhất
                        const [oldest, ...rest] = newMessages;
                        setHiddenMessages((hidden) => [...hidden, oldest]);
                        return rest;
                    }
                    return newMessages;
                });
            }
        }
    };

    const handleCloseChat = (id) => {
        setSelectedMessages((prev) => prev.filter((message) => message.userId !== id));
    };

    const handleHideChat = (id) => {
        const messageToHide = selectedMessages.find((m) => m.userId === id);
        if (messageToHide) {
            setHiddenMessages((prev) => [...prev, messageToHide]);
            setSelectedMessages((prev) => prev.filter((m) => m.userId !== id));
        }
    };

    const handleShowChat = (id) => {
        const messageToShow = hiddenMessages.find((m) => m.userId === id);
        if (messageToShow) {
            setHiddenMessages((prev) => prev.filter((m) => m.userId !== id));
            setSelectedMessages((prev) => {
                const newMessages = [...prev, messageToShow];
                if (newMessages.length > MAX_CHAT_WINDOWS) {
                    // Nếu vượt quá giới hạn, ẩn cái cũ nhất
                    const [oldest, ...rest] = newMessages;
                    setHiddenMessages((hidden) => [...hidden, oldest]);
                    return rest;
                }
                return newMessages;
            });
        }
    };

    const handleNewMessage = () => {
        const newMessage = {
            id: `new-${Date.now()}`, // Tạo ID duy nhất
            name: "Tin nhắn mới",
            message: "Nội dung tin nhắn mới",
        };
        setSelectedMessages((prev) => {
            const newMessages = [...prev, newMessage];
            if (newMessages.length > MAX_CHAT_WINDOWS) {
                // Nếu vượt quá giới hạn, ẩn cái cũ nhất
                const [oldest, ...rest] = newMessages;
                setHiddenMessages((hidden) => [...hidden, oldest]);
                return rest;
            }
            return newMessages;
        });
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
                <Header onMessageClick={handleMessageClick} />
                <Layout style={{ minHeight: 'auto' }}>{children}</Layout>
            </HeaderProvider>
            <FloatButton.Group shape="circle" style={{ bottom: '14px', right: '24px' }}>
                {hiddenMessages.map((message) => (
                    <Tooltip
                        key={message.userId}
                        title={
                            <div>
                                <Typography.Text strong>{message.name || 'Không có tên'}</Typography.Text>
                                <Typography.Text type="secondary">
                                    {message.message || 'Không có nội dung'}
                                </Typography.Text>
                            </div>
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
                                onClick={() => handleShowChat(message.userId)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Badge>
                    </Tooltip>
                ))}
                <Tooltip title="Tin nhắn mới" placement="left">
                    <FloatButton icon={<IoPencilSharp />} onClick={handleNewMessage} />
                </Tooltip>
            </FloatButton.Group>

            {selectedMessages.map((message, index) => {
                const position = calculatePosition(index);
                return (
                    <ChatWindow
                        key={message.userId}
                        receiverId={message.userId}
                        message={message}
                        onClose={() => handleCloseChat(message.userId)}
                        onHide={() => handleHideChat(message.userId)}
                        position={position}
                    />
                );
            })}
        </Layout>
    );
};

export default MainLayout;
