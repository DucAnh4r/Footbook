import React from "react";
import Slider from "react-slick";
import styles from "./SuggestedFriends.module.scss";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./SlickOverrides.scss";

const friends = [
  { id: 1, name: "Phương Ly", mutualFriends: 3, image: "path/to/image1.jpg" },
  { id: 2, name: "NG M Hoang", mutualFriends: 3, image: "path/to/image2.jpg" },
  { id: 3, name: "Ngọc Trâm", mutualFriends: 1, image: "path/to/image3.jpg" },
  { id: 4, name: "Lã Xuân Linh", mutualFriends: 1, image: "path/to/image4.jpg" },
  { id: 5, name: "Long Vũ Hoàng", mutualFriends: 16, image: "path/to/image5.jpg" },
  { id: 6, name: "Ngọc Nhi", mutualFriends: 0, image: "path/to/image6.jpg" },
  // Thêm các bạn bè khác nếu cần
];

const SuggestedFriends = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className={styles.suggestedFriends}>
      <h2>Những người bạn có thể biết</h2>
      <Slider {...settings}>
        {friends.map(friend => (
          <div key={friend.id} className={styles.friendCard}>
            <div className={styles.friendImage}>
              <img src={friend.image} alt={friend.name} />
              <button className={styles.closeButton}>✕</button>
            </div>
            <div className={styles.friendInfo}>
              <h3>{friend.name}</h3>
              <p>{friend.mutualFriends} bạn chung</p>
              <button className={styles.addFriendButton}>Thêm bạn bè</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Component nút mũi tên kế tiếp
const NextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} ${styles.nextArrow}`} onClick={onClick} />;
};

// Component nút mũi tên trước
const PrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} ${styles.prevArrow}`} onClick={onClick} />;
};

export default SuggestedFriends;
