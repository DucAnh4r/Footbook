// /src/components/Header.jsx
import React, { useState } from 'react';
import { Layout, Input, Avatar, Row, Col, Tooltip, Popover } from 'antd';
import { GoSearch } from "react-icons/go";
import NavItem from './NavItem';
import ProfileContent from './ProfileContent';
import NotificationContent from './NotificationContent';
import MessageContent from './MessageContent';
import AppStoreContent from './AppStoreContent.jsx';
import { navItems, iconData } from '../assets/icons.jsx';
import { FaUser } from "react-icons/fa";

const { Header: AntHeader } = Layout;

const Header = () => {
  const [selected, setSelected] = useState('home');
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleSelect = (key) => setSelected(key);
  const handleIconClick = (iconName) => {
    setSelectedIcon((prev) => (prev === iconName ? null : iconName));
  };

  const getPopoverContent = (name) => {
    switch (name) {
      case 'notifications':
        return <NotificationContent />;
      case 'messages':
        return <MessageContent />;
      case 'appStore':
        return <AppStoreContent />;
      default:
        return null;
    }
  };

  return (
    <AntHeader style={{ backgroundColor: '#fff', padding: '0 16px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', position: 'relative', zIndex: 1, lineHeight: '0px' }}>
      <Row align="middle" justify="space-between" style={{ height: '100%' }}>

        <Col style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar shape="square" size="large" style={{ backgroundColor: '#1877f2', color: '#fff', fontSize: '24px' }}>F</Avatar>
          <Input placeholder="Tìm kiếm trên Facebook" prefix={<GoSearch style={{ fontSize: '20px' }} />} style={{ borderRadius: '20px', width: '300px' }} />
        </Col>

        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '24px', alignItems: 'center', height: '100%' }}>
          {navItems.map((item) => (
            <NavItem key={item.key} item={item} selected={selected} handleSelect={handleSelect} />
          ))}
        </div>

        <Col>
          <Row gutter={16} align="middle">
            {iconData.map(({ name, icon, tooltip }) => (
              <Col key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Tooltip title={tooltip}>
                  {['notifications', 'messages', 'appStore'].includes(name) ? (
                    <Popover
                      content={getPopoverContent(name)}
                      trigger="click"
                      placement="bottomRight"
                      open={selectedIcon === name}
                      onOpenChange={(visible) => handleIconClick(visible ? name : null)}
                    >
                      <div style={{ backgroundColor: selectedIcon === name ? '#E8F0FE' : '#f0f0f0', borderRadius: '50%', padding: '8px' }}>
                        {icon}
                      </div>
                    </Popover>
                  ) : (
                    <div
                      style={{ backgroundColor: selectedIcon === name ? '#E8F0FE' : '#f0f0f0', borderRadius: '50%', padding: '8px' }}
                      onClick={() => handleIconClick(name)}
                    >
                      {icon}
                    </div>
                  )}
                </Tooltip>
              </Col>
            ))}
            <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Popover content={<ProfileContent />} trigger="click" placement="bottomRight" open={selectedIcon === 'profile'} onOpenChange={(visible) => handleIconClick(visible ? 'profile' : null)}>
                <div style={{ padding: '8px', cursor: 'pointer', borderRadius: '50%' }}>
                  <Avatar icon={<FaUser />} style={{ backgroundColor: selectedIcon === 'profile' ? '#E8F0FE' : '#87d068' }} />
                </div>
              </Popover>
            </Col>
          </Row>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
