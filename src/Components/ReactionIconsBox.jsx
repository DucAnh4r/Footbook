import React from "react";
import Haha from "../assets/image/ReactionIcons/Haha.gif";
import Like from "../assets/image/ReactionIcons/Like.gif";
import Sad from "../assets/image/ReactionIcons/Sad.gif";
import Angry from "../assets/image/ReactionIcons/Angry.gif";
import Heart from "../assets/image/ReactionIcons/Heart.gif";
import Wow from "../assets/image/ReactionIcons/Wow.gif";
import styles from "./ReactionIconsBox.module.scss"; // Sử dụng CSS Module

const ReactionIconsBox = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.emoji}>
          <div className={styles.hello}>
            <img src={Like} alt="Like" />
          </div>
          <div className={styles.hello}>
            <img src={Heart} alt="Heart" />
          </div>
          <div className={styles.hello}>
            <img src={Haha} alt="Haha" />
          </div>
          <div className={styles.hello}>
            <img src={Wow} style={{width: "48px"}} alt="Wow" />
          </div>
          <div className={styles.hello}>
            <img src={Sad} style={{width: "54px"}}  alt="Sad" />
          </div>
          <div className={styles.hello}>
            <img src={Angry} alt="Angry" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactionIconsBox;
