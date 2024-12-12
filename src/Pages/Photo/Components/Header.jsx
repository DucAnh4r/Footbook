import React, {  } from "react";
import { Layout } from "antd";
import {Row, Col} from "antd";
import "slick-carousel/slick/slick.css";
import styles from './Header.module.scss';
import LogoImg from "../../assets/image/Header/logo.png";
import { useLocation, useNavigate } from "react-router-dom";




const Header = () => {
  const navigate = useNavigate(); // Initialize navigate
  const handleLogoClick = () => {
    navigate("/"); // Điều hướng đến URL với tham số type
  };

  return (
    <>
    
    </>
  );
};



export default Header;
