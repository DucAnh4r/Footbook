// /src/components/Messagepage.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Avatar, Input, Button, List, Typography, Space, Tooltip } from 'antd';
import { SmileOutlined, PhoneOutlined, VideoCameraOutlined, InfoCircleOutlined, SendOutlined } from '@ant-design/icons';

const { Text } = Typography;

// Socket connection
const socket = io.connect('http://localhost:4000');

const Messagepage = ({ selectedChat, toggleRightSidebar }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  // Handle message sending
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        user: 'You',
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit('send_message', newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
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
        <Space>
          <Tooltip title="Call"><PhoneOutlined style={styles.icon} /></Tooltip>
          <Tooltip title="Video"><VideoCameraOutlined style={styles.icon} /></Tooltip>
          <Tooltip title="Info">
            <InfoCircleOutlined onClick={() => toggleRightSidebar(prev => !prev)} style={styles.icon} />
          </Tooltip>
        </Space>
      </div>

      {/* Messages List */}
      <div style={styles.messagesContainer}>
        <List
          dataSource={messages}
          renderItem={(msg) => (
            <List.Item style={msg.user === 'You' ? styles.myMessage : styles.otherMessage}>
              <List.Item.Meta
                avatar={<Avatar src="https://via.placeholder.com/30" />}
                title={<Text strong>{msg.user}</Text>}
                description={msg.text}
              />
              <Text style={styles.messageTime}>{msg.time}</Text>
            </List.Item>
          )}
        />
      </div>

      {/* Message Input */}
      <div style={styles.footer}>
        <Space>
          <Button icon={<SmileOutlined />} />
          <Button icon={<img src="https://img.icons8.com/color/24/gif.png" alt="GIF" />} />
          <Button icon={<img src="https://img.icons8.com/color/24/attachment.png" alt="Attachment" />} />
        </Space>
        <Input
          style={styles.input}
          placeholder="Aa"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={sendMessage}
        />
        <Button icon={<SendOutlined />} type="primary" onClick={sendMessage} />
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    height: '93vh',
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
  },
};

export default Messagepage;
