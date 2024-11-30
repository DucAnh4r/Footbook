import React, { useState, useEffect, useRef } from 'react';
import { Input, Avatar, Button, Flex, Typography, Tooltip } from 'antd';
import { ArrowRightOutlined, CloseOutlined, MinusOutlined, PhoneOutlined, SmileOutlined, StopOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './ChatWindow.scss';
import { FaChevronDown, FaMicrophone } from "react-icons/fa";
import { RiEmojiStickerLine } from "react-icons/ri";
import { PiGifFill } from "react-icons/pi";
import { io } from "socket.io-client";
import { AiFillLike } from "react-icons/ai";

// Import các hàm từ audioRecorder.js
import { startRecording, stopRecording, playAudio, downloadAudio } from '../../utils/audioRecorder';
import GifModal from '../../Modal/GifModal';
import StickerModal from '../../Modal/StickerModal';
import FileUploadButton from '../../Components/FileUploadButton';
import ChatSettingsPopup from '../../Components/ChatSettingsPopup';

const { TextArea } = Input;

const ChatWindow = ({ message, onClose, onHide, position }) => {
    const [socket, setSocket] = useState(null);
    const [chatMessages, setChatMessages] = useState([]); // Lưu trữ tin nhắn
    const [inputValue, setInputValue] = useState(""); // Giá trị input của TextArea
    const [isRecording, setIsRecording] = useState(false); // Trạng thái ghi âm
    const [audioUrl, setAudioUrl] = useState(null); // URL file âm thanh sau khi ghi âm
    const [audioBlob, setAudioBlob] = useState(null); // Blob âm thanh để tải xuống
    const chatBodyRef = useRef(null); // Thêm ref để theo dõi khung chat
    const [isRecordingMode, setIsRecordingMode] = useState(false); // Chế độ ghi âm
    const [gifModalVisible, setGifModalVisible] = useState(false); // Quản lý trạng thái hiển thị modal GIF
    const [stickerModalVisible, setStickerModalVisible] = useState(false);

    useEffect(() => {
        // Kết nối với Socket.IO server
        const newSocket = io("http://localhost:5000"); // Thay bằng URL server của bạn
        setSocket(newSocket);

        // Lắng nghe sự kiện tin nhắn từ server
        newSocket.on("receiveMessage", (data) => {
            setChatMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            newSocket.disconnect(); // Ngắt kết nối khi component bị hủy
        };
    }, []);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatMessages]);

    useEffect(() => {
        return () => {
            chatMessages.forEach((msg) => {
                if (msg.content.startsWith('<img') || msg.content.startsWith('<a')) {
                    const matches = msg.content.match(/src="([^"]+)"/);
                    if (matches) URL.revokeObjectURL(matches[1]);
                }
            });
        };
    }, [chatMessages]);


    // Xử lý gửi tin nhắn
    const handleSendMessage = () => {
        if (inputValue.trim() !== "") {
            const newMessage = { content: inputValue, sender: "You" }; // Tin nhắn mới
            setChatMessages((prevMessages) => [newMessage, ...prevMessages]); // Thêm vào danh sách tin nhắn
            socket.emit("sendMessage", { content: inputValue, recipient: message.name }); // Gửi tin nhắn qua socket
            setInputValue(""); // Reset input
        }
    };

    // Bắt đầu ghi âm
    const handleStartRecording = async () => {
        try {
            await startRecording(); // Gọi hàm bắt đầu ghi âm
            setIsRecording(true);
            setIsRecordingMode(true);
        } catch (err) {
            console.error("Error starting recording:", err);
        }
    };

    // Dừng ghi âm
    const handleStopRecording = async () => {
        try {
            const { audioUrl, audioBlob } = await stopRecording(); // Gọi hàm kết thúc ghi âm
            setAudioUrl(audioUrl); // Lưu URL file âm thanh
            setAudioBlob(audioBlob); // Lưu blob âm thanh
            setIsRecording(false);
            setIsRecordingMode(false);
        } catch (err) {
            console.error("Error stopping recording:", err);
        }
    };

    const handleCancelRecording = () => {
        setIsRecording(false);
        setIsRecordingMode(false);
    };

    const handleSendGif = (gifUrl) => {
        const gifMessage = {
            content: `<img src="${gifUrl}" alt="GIF" style="max-width: 200px; max-height: 200px;" />`,
            sender: "You",
            type: "gif",
        };
        setChatMessages((prevMessages) => [gifMessage, ...prevMessages]);
        socket.emit("sendMessage", { content: gifMessage.content, recipient: message.name, type: "gif" });
        setGifModalVisible(false);
    };

    const handleSendSticker = (stickerUrl) => {
        const stickerMessage = {
            content: `<img src="${stickerUrl}" alt="Sticker" style="max-width: 200px; max-height: 200px;" />`,
            sender: "You",
            type: "sticker",
        };
        setChatMessages((prevMessages) => [stickerMessage, ...prevMessages]);
        socket.emit("sendMessage", { content: stickerMessage.content, recipient: message.name, type: "sticker" });
        setStickerModalVisible(false);
    };

    const handleSendLike = () => {
        const likeMessage = {
            content: `<img src="https://upload.wikimedia.org/wikipedia/commons/1/13/Facebook_like_thumb.png" alt="Like" style="max-width: 50px; max-height: 50px;" />`,
            sender: "You",
            type: "like",
        };
        setChatMessages((prevMessages) => [likeMessage, ...prevMessages]);
        socket.emit("sendMessage", {
            content: likeMessage.content,
            recipient: message.name,
            type: "like",
        });
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div
            className="chat-window"
            style={{
                position: 'fixed',
                bottom: position.bottom,
                right: position.right,
                width: '338px',
                height: '455px',
                background: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div className="chat-header">
                <ChatSettingsPopup>
                <Tooltip title="Cài đặt chat">
                    <div className="chat-setting-container" style={{ cursor: 'pointer' }}>
                    <Flex gap={4} align='center'>
                        <Avatar size={34} src="https://i.pravatar.cc/300" />
                        <Flex vertical>
                            <Typography.Text style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '120px', // Đặt chiều rộng tối đa
                            }}>
                                {truncateText(message.name || 'Người dùng', 20)}
                            </Typography.Text>
                            <Typography.Text>active</Typography.Text>
                        </Flex>
                        <FaChevronDown size={10} color="#000" />
                    </Flex>
                    </div>
                </Tooltip>
                </ChatSettingsPopup>
                <Flex gap={4}>
                    <Tooltip title="Gọi điện">
                        <Button
                            type="text"
                            icon={<PhoneOutlined />}
                            style={{ color: '#000', fontSize: '20px' }}
                        />
                    </Tooltip>
                    <Tooltip title="Gọi video">
                        <Button
                            type="text"
                            icon={<VideoCameraOutlined />}
                            style={{ color: '#000', fontSize: '20px' }}
                        />
                    </Tooltip>
                    <Tooltip title="Thu nhỏ cửa sổ">
                        <Button
                            type="text"
                            icon={<MinusOutlined />}
                            onClick={onHide}
                            style={{ color: '#000', fontSize: '20px' }}
                        />
                    </Tooltip>
                    <Tooltip title="Đóng cửa sổ">
                        <Button
                            type="text"
                            icon={<CloseOutlined />}
                            onClick={onClose}
                            style={{ color: '#000', fontSize: '20px' }}
                        />
                    </Tooltip>
                </Flex>
            </div>

            {/* Body */}
            <div className="chat-body" ref={chatBodyRef}>
                {chatMessages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${msg.sender === "You" ? "sender" : "receiver"} ${msg.type === "gif"
                                ? "gif-message"
                                : msg.type === "sticker"
                                    ? "sticker-message"
                                    : msg.type === "file"
                                        ? "file-message"
                                        : msg.type === "like"
                                            ? "like-message"
                                            : "text-message"
                            }`}
                    >
                        {/* Hiển thị avatar nếu là người nhận */}
                        {msg.sender !== "You" && (
                            <div className="chat-avatar">
                                <img src="https://i.pravatar.cc/300" alt="Avatar" />
                            </div>
                        )}

                        {/* Render nội dung */}
                        <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                    </div>
                ))}
                {/* Phát lại âm thanh */}
                {audioUrl && (
                    <div className="audio-player">
                        <audio controls src={audioUrl}></audio>
                        <Button onClick={() => playAudio(audioUrl)}>Phát</Button>
                        <Button onClick={() => downloadAudio(audioBlob)}>Tải xuống</Button>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="chat-footer">
                {isRecordingMode ? (
                    // Giao diện ghi âm
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', backgroundColor: '#d8b6ff', borderRadius: '10px' }}>
                        <Button
                            shape="circle"
                            icon={<CloseOutlined />}
                            style={{ backgroundColor: 'white', color: 'red' }}
                            onClick={handleCancelRecording}
                        />
                        <Button
                            shape="circle"
                            icon={<StopOutlined />}
                            style={{ backgroundColor: 'white', color: 'purple' }}
                            onClick={handleStopRecording}
                        />
                        <div style={{ flex: 1, backgroundColor: 'white', padding: '4px 10px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>0:00</span>
                        </div>
                        <Button
                            shape="circle"
                            icon={<ArrowRightOutlined />}
                            style={{ backgroundColor: 'white', color: 'blue' }}
                            onClick={() => setIsRecordingMode(false)}
                        />
                    </div>
                ) : (
                    <Flex gap={4} align='center' style={{ height: '60px' }}>
                        {/* Nút ghi âm */}
                        <Tooltip title={isRecording ? "Dừng ghi âm" : "Ghi âm"}>
                            <Button
                                type="text"
                                icon={<FaMicrophone />}
                                onClick={isRecording ? handleStopRecording : handleStartRecording}
                                style={{
                                    color: isRecording ? 'red' : '#000',
                                    fontSize: '20px',
                                    width: '36px',
                                    paddingLeft: '4px',
                                }}
                            />
                        </Tooltip>

                        <FileUploadButton
                            onFileChange={(fileMessage) => {
                                const formattedMessage = {
                                    ...fileMessage,
                                    type: "file", // Thêm type để xác định đây là file
                                };

                                setChatMessages((prevMessages) => [formattedMessage, ...prevMessages]);
                                socket.emit("sendFile", {
                                    content: formattedMessage.content,
                                    recipient: message.name,
                                    type: "file", // Gửi type kèm theo
                                });
                            }}
                        />

                        <Tooltip title="Sticker">
                            <Button
                                type="text"
                                icon={<RiEmojiStickerLine />}
                                style={{ color: '#000', fontSize: '20px', width: '36px' }}
                                onClick={() => setStickerModalVisible(true)}
                            />
                        </Tooltip>

                        <Tooltip title="GIF">
                            <Button
                                type="text"
                                icon={<PiGifFill />}
                                style={{ color: '#000', fontSize: '20px', width: '36px' }}
                                onClick={() => setGifModalVisible(true)}
                            />
                        </Tooltip>

                        <Tooltip title="Chọn emoji">
                            <div className="textarea-container">
                                <TextArea
                                    placeholder="Aa"
                                    autoSize={{ minRows: 1, maxRows: 4 }}
                                    className="custom-textarea"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onPressEnter={(e) => {
                                        e.preventDefault(); // Ngăn xuống dòng
                                        handleSendMessage(); // Gửi tin nhắn
                                    }}
                                />
                            </div>
                        </Tooltip>

                        <Tooltip title="Gửi like">
                            <Button
                                type="text"
                                icon={<AiFillLike />}
                                style={{ color: '#000', fontSize: '20px', width: '36px', paddingRight: '4px' }}
                                onClick={handleSendLike} // Gọi hàm gửi like
                            />
                        </Tooltip>
                    </Flex>
                )}
            </div>
            {/* Modal GIF */}
            <GifModal
                visible={gifModalVisible}
                onClose={() => setGifModalVisible(false)}
                onSendGif={handleSendGif}
            />

            <StickerModal
                visible={stickerModalVisible}
                onClose={() => setStickerModalVisible(false)}
                onSendSticker={handleSendSticker}
            />
        </div>
    );
};

export default ChatWindow;
