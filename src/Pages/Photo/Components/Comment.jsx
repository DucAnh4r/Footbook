import React, {  } from "react";
import { Layout } from "antd";
import {Row, Col} from "antd";
import "slick-carousel/slick/slick.css";
import styles from './Comment.module.scss';
import { Avatar, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";




const Comment = () => {
  const navigate = useNavigate(); // Initialize navigate
  const handleLogoClick = () => {
    navigate("/"); // Điều hướng đến URL với tham số type
  };

  return (
    <Row className={styles["container"]}>
        <Col className={styles["avatar-col"]} span={4}>
            <Avatar
                src="https://shopgarena.net/wp-content/uploads/2023/07/Meo-khoc-thet-len.jpg"
                className={styles.avatar}
            />
        </Col>
        <Col span={18}>
            <div className={styles["comment-box"]}>
                <p className={styles["name"]}>Duy Lến</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati delectus quisquam ipsum ipsa eum non pariatur dolorum eveniet temporibus nemo, sapiente corrupti sint, blanditiis minima ut hic impedit molestiae. Mollitia.</p>
            </div>
            <div className={styles["option-box"]}>
                <p>2 giờ</p>
                <p>Thích</p>
                <p>Phản hồi</p>
                <div style={styles["comment-reaction-box"]}>
                    <p>3 cảm xúc</p>
                </div>
            </div>
        </Col>
        <Col span={2}>
        
        </Col>
    </Row>
  );
};



export default Comment;
