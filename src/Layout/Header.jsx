import React, { useContext, useEffect, useState } from "react";
import { Layout, Input, Avatar, Row, Col, Tooltip, Popover } from "antd";
import { GoSearch } from "react-icons/go";
import NavItem from "./NavItem";
import ProfileContent from "./ProfileContent";
import NotificationContent from "./NotificationContent";
import AppStoreContent from "./AppStoreContent.jsx";
import { navItems, iconData } from "../assets/icons.jsx";
import { FaUser } from "react-icons/fa";
import MessageContent from "./Message/MessageContent.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import LogoImg from "../assets/image/Header/logo.png";
import styles from "./Header.module.scss";
import { HeaderContext } from "../Context/HeaderContext.jsx";

const { Header: AntHeader } = Layout;

const Header = ({ onMessageClick }) => {
  const { showHeader } = useContext(HeaderContext); // Lấy trạng thái showHeader từ Context
  const [selected, setSelected] = useState("home");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation();

  const handleLogoClick = () => {
    navigate("/"); // Điều hướng đến URL với tham số type
  };

  const handleSelect = (key, path) => {
    setSelected(key);
    if (path) {
      navigate(path); // Navigate to the specified path
    }
  };

  useEffect(() => {
    setSelectedIcon(null); // Close any open popover on navigation
  }, [location.pathname]);

  useEffect(() => {
    const allowedPaths = ['/', '/friends', '/pages', '/groups'];
    if (!allowedPaths.includes(location.pathname)) {
      setSelected(""); // Reset selected item when on non-allowed path
    }
  }, [location.pathname]);

  const handleIconClick = (iconName) => {
    setSelectedIcon((prev) => (prev === iconName ? null : iconName));
  };

  const getPopoverContent = (name) => {
    switch (name) {
      case "notifications":
        return <NotificationContent />;
      case "messages":
        return (
          <MessageContent
            onMessageClick={onMessageClick}
            onClose={() => setSelectedIcon(null)} // Đóng Popover khi click
          />
        );
      case "appStore":
        return <AppStoreContent />;
      default:
        return null;
    }
  };

  // Nếu `showHeader` là `false`, không render Header
  if (!showHeader) return null;

  return (
    <AntHeader className={styles.header}>
      <Row align="middle" justify="space-between" className={styles["header-row"]}>
        <Col className={styles["header-logo"]}>
          <img src={LogoImg} className={styles["logo-img"]} onClick={handleLogoClick} alt="Footbook" />
          <Input
            placeholder="Tìm kiếm trên Facebook"
            prefix={<GoSearch style={{ fontSize: "20px" }} />}
            className={styles["search-input"]}
          />
        </Col>

        <div className={styles["nav-items-container"]}>
          {navItems.map((item) => (
            <NavItem
              key={item.key}
              item={item}
              selected={selected}
              handleSelect={() => handleSelect(item.key, item.path)} // Pass path to handleSelect
            />
          ))}
        </div>

        <Col>
          <Row gutter={16} align="middle">
            {iconData.map(({ name, icon, tooltip }) => (
              <Col key={name} className={styles["icon-container"]}>
                <Tooltip title={tooltip}>
                  {["notifications", "messages", "appStore"].includes(name) ? (
                    <Popover
                      content={getPopoverContent(name)}
                      trigger="click"
                      placement="bottomRight"
                      open={selectedIcon === name}
                      onOpenChange={(visible) => handleIconClick(visible ? name : null)}
                      getPopupContainer={(triggerNode) => triggerNode.parentNode} 
                    >
                      <div
                        className={`${styles["icon-wrapper"]} ${selectedIcon === name ? styles["icon-selected"] : ""}`}
                      >
                        {icon}
                      </div>
                    </Popover>
                  ) : (
                    <div
                      className={`${styles["icon-wrapper"]} ${selectedIcon === name ? styles["icon-selected"] : ""}`}
                      onClick={() => handleIconClick(name)}
                    >
                      {icon}
                    </div>
                  )}
                </Tooltip>
              </Col>
            ))}

            <Col className={styles["icon-container"]}>
              <Popover
                content={<ProfileContent />}
                trigger="click"
                placement="bottomRight"
                open={selectedIcon === "profile"}
                onOpenChange={(visible) => handleIconClick(visible ? "profile" : null)}
                getPopupContainer={(triggerNode) => triggerNode.parentNode} 
              >
                <div className={styles["avatar-wrapper"]}>
                  <Avatar
                    icon={<FaUser />}
                    style={{ backgroundColor: selectedIcon === "profile" ? "#E8F0FE" : "#87d068" }}
                  />
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
