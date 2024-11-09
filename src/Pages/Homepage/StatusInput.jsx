// /src/components/StatusInput.jsx
import React from 'react';
import { Input, Button, Space, Avatar } from 'antd';
import { FaVideo, FaImages, FaSmile } from 'react-icons/fa';

const StatusInput = () => {
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      marginBottom: '16px',
      maxWidth: '680px',
      width: '100%',
      margin: '0 auto'
    }}>
      <Space align="center" style={{ width: '100%' }}>
        <Avatar size="large" icon={<img src="https://via.placeholder.com/150" alt="user avatar" />} />
        <Input placeholder="Duc oi, bạn đang nghĩ gì thế?" style={{ borderRadius: '20px', height: '40px', flex: 1 }} />
      </Space>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px', flexWrap: 'wrap' }}>
        <Button type="text" icon={<FaVideo style={{ color: 'red' }} />}>Video trực tiếp</Button>
        <Button type="text" icon={<FaImages style={{ color: 'green' }} />}>Ảnh/video</Button>
        <Button type="text" icon={<FaSmile style={{ color: 'orange' }} />}>Cảm xúc/hoạt động</Button>
      </div>
    </div>
  );
};

export default StatusInput;
