// /src/assets/icons.jsx
import React from 'react';
import { RiHome2Line, RiHome2Fill, RiTeamLine, RiTeamFill, RiGroup2Line } from "react-icons/ri";
import { AiFillAppstore, AiFillMessage } from "react-icons/ai";
import { FaBell, FaUser, FaRegFlag, FaFlag } from "react-icons/fa";
import { Badge } from 'antd';

export const navItems = [
  { key: 'home', icon: <RiHome2Line />, selectedIcon: <RiHome2Fill style={{ color: '#1877f2' }} />, tooltip: 'Home' },
  { key: 'team', icon: <RiTeamLine />, selectedIcon: <RiTeamFill style={{ color: '#1877f2' }} />, tooltip: 'Team' },
  { key: 'flag', icon: <FaRegFlag />, selectedIcon: <FaFlag style={{ color: '#1877f2' }} />, tooltip: 'Flag' },
  { key: 'group', icon: <RiGroup2Line />,selectedIcon: <RiGroup2Line style={{ color: '#1877f2' }} />, tooltip: 'Group' }
];

export const iconData = [
  { name: 'appStore', icon: <AiFillAppstore style={{ fontSize: '25px' }} />, tooltip: 'App Store' },
  { name: 'messages', icon: <AiFillMessage style={{ fontSize: '25px' }} />, tooltip: 'Messages' },
  { name: 'notifications', icon: <Badge count={1} size="small"><FaBell style={{ fontSize: '25px' }} /></Badge>, tooltip: 'Notifications' }
];
