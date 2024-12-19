import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { Avatar, Input, Button, List, Typography, Space, Tooltip } from 'antd';
import { SmileOutlined, PhoneOutlined, VideoCameraOutlined, InfoCircleOutlined, SendOutlined, CloseOutlined, StopOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { RiEmojiStickerLine } from "react-icons/ri";
import { PiGifFill } from "react-icons/pi";
import { FaMicrophone } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import GifModal from '../../Modal/GifModal';
import StickerModal from '../../Modal/StickerModal';
import { startRecording, stopRecording, playAudio, downloadAudio } from '../../utils/audioRecorder';
import './Messagepage.scss';
import AudioMessage from "../../Components/AudioMessage";
import { useAuthCheck } from '../../utils/checkAuth';

const { Text } = Typography;

const socket = io.connect('http://localhost:5173');

const Messagepage = ({ selectedChat, toggleRightSidebar }) => {
  useAuthCheck();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [gifModalVisible, setGifModalVisible] = useState(false);
  const [stickerModalVisible, setStickerModalVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const chatBodyRef = useRef(null);
  const [isRecordingMode, setIsRecordingMode] = useState(false); // Chế độ ghi âm

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        user: 'You',
        text: message,
        type: 'text',
        time: new Date().toLocaleTimeString(),
      };
      socket.emit('send_message', newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
    }
  };

  const handleSendGif = (gifUrl) => {
    const gifMessage = {
      user: 'You',
      text: `<img src="${gifUrl}" alt="GIF" style="max-width: 200px; max-height: 200px;" />`,
      type: 'gif',
      time: new Date().toLocaleTimeString(),
    };
    socket.emit('send_message', gifMessage);
    setMessages((prev) => [...prev, gifMessage]);
    setGifModalVisible(false);
  };

  const handleSendSticker = (stickerUrl) => {
    const stickerMessage = {
      user: 'You',
      text: `<img src="${stickerUrl}" alt="Sticker" style="max-width: 200px; max-height: 200px;" />`,
      type: 'sticker',
      time: new Date().toLocaleTimeString(),
    };
    socket.emit('send_message', stickerMessage);
    setMessages((prev) => [...prev, stickerMessage]);
    setStickerModalVisible(false);
  };

  const handleStartRecording = async () => {
    try {
      await startRecording();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const handleStopRecording = async () => {
    try {
      const { audioUrl, audioBlob } = await stopRecording();
      setAudioUrl(audioUrl);
      setAudioBlob(audioBlob);

      const audioMessage = {
        user: 'You',
        text: audioUrl, // Chỉ lưu URL âm thanh
        type: 'audio',
        time: new Date().toLocaleTimeString(),
      };
      socket.emit('send_message', audioMessage);
      setMessages((prev) => [...prev, audioMessage]);
      setIsRecording(false);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };


  return (
    <div style={styles.chatContainer}>
      {/* Header */}
      <div style={styles.header}>
        <Space>
          <Avatar src={selectedChat?.avatar || "https://via.placeholder.com/40"} />
          <Text strong>{selectedChat?.name || "Select a chat"}</Text>
        </Space>
        <Space style={{ paddingRight: '10px', columnGap: '15px' }} >
          <Tooltip title="Call"><PhoneOutlined style={styles.icon} /></Tooltip>
          <Tooltip title="Video"><VideoCameraOutlined style={styles.icon} /></Tooltip>
          <Tooltip title="Info">
            <InfoCircleOutlined onClick={() => toggleRightSidebar((prev) => !prev)} style={styles.icon} />
          </Tooltip>
        </Space>
      </div>

      {/* Messages List */}
      <div className="messagesContainer" ref={chatBodyRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.user === 'You' ? 'sender' : 'receiver'
              } ${msg.type === 'gif'
                ? 'gif-message'
                : msg.type === 'sticker'
                  ? 'sticker-message'
                  : msg.type === 'file'
                    ? 'file-message'
                    : msg.type === 'audio'
                      ? 'audio-message'
                      : 'text-message'
              }`}
          >
            {msg.type === 'audio' ? (
              <AudioMessage audioSrc={msg.text} />
            ) : (
              <div className="message-content">
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div style={styles.footer}>
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
          <>
            <Space>
              <Tooltip title="Record">
                <Button
                  icon={<FaMicrophone style={{ color: '#0084ff' }} />}
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  type="text"
                  style={{ color: isRecording ? 'red' : 'black' }}
                />
              </Tooltip>
              <Tooltip title="GIF">
                <Button icon={<PiGifFill style={{ color: '#0084ff' }} />} onClick={() => setGifModalVisible(true)} />
              </Tooltip>
              <Tooltip title="Sticker">
                <Button icon={<RiEmojiStickerLine style={{ color: '#0084ff' }} />} onClick={() => setStickerModalVisible(true)} />
              </Tooltip>

            </Space>
            <Input
              style={styles.input}
              placeholder="Aa"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={sendMessage}
            />
            <Tooltip title="Like">
              <Button icon={<AiFillLike style={{ color: '#0084ff' }} />} />
            </Tooltip>
          </>
        )}
      </div>

      {/* Modals */}
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

const styles = {
  chatContainer: {
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit',
    border: '1px solid #f0f0f0',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  header: {
    padding: '10px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #f0f0f0',
  },
  icon: {
    fontSize: '18px',
    cursor: 'pointer',
    color: '#0084ff',
  },
  messagesContainer: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
  },
  myMessage: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '5px 10px',
    borderRadius: '12px',
    backgroundColor: '#daf8e3',
    margin: '8px 0',
    alignItems: 'center',
  },
  otherMessage: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '5px 10px',
    borderRadius: '12px',
    backgroundColor: '#f1f1f1',
    margin: '8px 0',
    alignItems: 'center',

  },
  messageTime: {
    fontSize: '12px',
    color: '#888',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderTop: '1px solid #f0f0f0',
    backgroundColor: '#fff',

  },
  input: {
    flex: 1,
    marginLeft: '10px',
    borderRadius: '50px'
  },
};

export default Messagepage;
