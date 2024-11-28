import React, { useContext, useEffect, useState } from "react";
import { Layout, Card, Row, Col, Avatar, Typography, List, Input, Divider, Tooltip, Popover } from "antd";
import Slider from "react-slick";
import { LikeOutlined, MessageOutlined, SendOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import { AiOutlineLike, AiOutlineZoomIn, AiOutlineZoomOut, AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { TbMessageCircle } from "react-icons/tb";
import { PiShareFat, PiShareFatFill } from "react-icons/pi";
import { GoPaperAirplane } from "react-icons/go";
import { FaComment, FaUser } from "react-icons/fa";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { HeaderContext } from "../../Context/HeaderContext";
import { iconData } from "../../assets/icons";
import styles from "../../Layout/Header.module.scss";
import NotificationContent from "../../Layout/NotificationContent";
import MessageContent from "../../Layout/Message/MessageContent";
import AppStoreContent from "../../Layout/AppStoreContent";
import ProfileContent from "../../Layout/ProfileContent";
import './Photo.css'

const { Title } = Typography;

const PhotoPage = () => {
  const { setShowHeader } = useContext(HeaderContext);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2)); // Phóng to tối đa 200%
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5)); // Thu nhỏ tối đa 50%
  };

  const handleFullScreen = () => {
    setIsFullScreen((prev) => !prev); // Chuyển đổi giữa true và false
  };

  // useEffect(() => {
  //   setShowHeader(false); // Ẩn Header khi vào trang này
  //   return () => setShowHeader(true); // Hiển thị lại Header khi rời khỏi trang
  // }, [setShowHeader]);

  useEffect(() => {
    // Thêm lớp để khóa cuộn khi vào trang
    document.body.classList.add("no-scroll");
    return () => {
      // Gỡ lớp để cho phép cuộn khi rời khỏi trang
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    setSelectedIcon(null); // Close any open popover on navigation
  }, [location.pathname]);

  const handleIconClick = (iconName) => {
    setSelectedIcon((prev) => (prev === iconName ? null : iconName));
  };

  const buttonStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "18px",
  };


  const comments = [
    {
      author: "Hà Yến Sao",
      content: "Mấy cái caption với cmt của 2khang nó cứ sao á 😂",
      likes: 174,
      time: "2d",
      replies: 5,
    },
    {
      author: "Ngọc Gia Tuệ Hân",
      content: "Anh ơi, ủa anh ơi 😂",
      likes: 46,
      time: "2d",
      replies: 1,
    },
    {
      author: "Nguyễn Gia Huy",
      content: "4 anh lần này không comeback, 4 anh come out.",
      likes: 109,
      time: "1d",
      replies: 0,
    },
    {
      author: "Madeline Truong",
      content: "Khang nói hit không khí bình thường, mà nó thở ra khí cười...",
      likes: 52,
      time: "1d",
      replies: 0,
    },
    {
      author: "Madeline Truong",
      content: "Khang nói hit không khí bình thường, mà nó thở ra khí cười...",
      likes: 52,
      time: "1d",
      replies: 0,
    },
    {
      author: "Madeline Truong",
      content: "Khang nói hit không khí bình thường, mà nó thở ra khí cười...",
      likes: 52,
      time: "1d",
      replies: 0,
    },
    {
      author: "Madeline Truong",
      content: "Khang nói hit không khí bình thường, mà nó thở ra khí cười...",
      likes: 52,
      time: "1d",
      replies: 0,
    },
  ];

  const images = [
    "https://via.placeholder.com/800x400?text=Image+1",
    "https://via.placeholder.com/800x400?text=Image+2",
    "https://via.placeholder.com/800x400?text=Image+3",
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Layout>
      <Row >
        {/* Slider Ảnh */}
        <Col xs={24}
          lg={isFullScreen ? 24 : 19} // Chiếm toàn bộ màn hình nếu isFullScreen
          style={{ paddingLeft: '0px', paddingRight: '0px' }}>
          <div style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            gap: "10px",
            zIndex: 10,
          }}>
            <button
              style={buttonStyle}
              onClick={() => handleZoomIn()}
            >
              <AiOutlineZoomIn />
            </button>
            <button
              style={buttonStyle}
              onClick={() => handleZoomOut()}
            >
              <AiOutlineZoomOut />
            </button>
            <button
              style={buttonStyle}
              onClick={() => handleFullScreen()}
            >
              {isFullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
            </button>
          </div>
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  style={{
                    width: "100%",
                    height: "100vh",
                    objectFit: "cover",
                    borderRadius: "8px",
                    transform: `scale(${zoomLevel})`, // Áp dụng zoom
                    transition: "transform 0.3s ease", // Tạo hiệu ứng mượt khi zoom
                  }}
                />
              </div>
            ))}
          </Slider>
        </Col>

        {/* Bình luận */}
        <Col xs={24} lg={5} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
          <div style={{ padding: '24px', paddingRight: '0px' }}>
            {/* Cần cuộn */}
            <div className="scrollable-area">
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: 'space-between' }}>
                  <div style={{ display: "flex", justifyContent: 'center', gap: "8px" }}>
                    <Avatar
                      shape="circle"
                      size="large"
                      src="https://via.placeholder.com/40"
                      style={{ backgroundColor: "#f56a00" }}
                    />
                    <div>
                      <Title level={5} style={{ margin: 0 }}>
                        DAO News
                      </Title>
                      <span style={{ color: "#888", fontSize: "12px" }}>
                        14 November at 01:15
                      </span>
                    </div>
                  </div>
                  <div>
                    <MdOutlineMoreHoriz size={25} />
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <p>
                    <strong>HURRYKNG không nói ❌:</strong> Nhóm này đỉnh, mong chờ
                    mấy anh comeback
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <div>
                    <span role="img" aria-label="like" style={{ marginRight: "8px" }}>
                      😂 23K
                    </span>
                    <span role="img" aria-label="comment">
                      154
                    </span>
                    <span role="img" aria-label="share" style={{ marginLeft: "8px" }}>
                      63
                    </span>
                  </div>
                  <div>
                    <span role="img" aria-label="like" style={{ marginRight: "8px" }}>
                      23 <FaComment />
                    </span>
                    <span role="img" aria-label="comment">
                      154 <PiShareFatFill />
                    </span>
                  </div>
                </div>
              </div>
              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: '20px', paddingRight: '20px' }}>
                <AiOutlineLike size={25} />
                <TbMessageCircle size={25} />
                <PiShareFat size={25} />
                <GoPaperAirplane size={25} />
              </div>
              <Divider />
              {/* Comments Section */}
              <div style={{ fontSize: "12px", color: "#888" }}>Most relevant</div>
              <List
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={(item) => (
                  <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "12px", marginBottom: "12px" }}>
                    <List.Item.Meta
                      avatar={
                        <div style={{
                          display: "flex",
                          gap: '8px'
                        }}>
                          <Avatar
                            shape="circle"
                            size="large"
                            style={{
                              backgroundColor: "#87d068",
                              size: ''
                            }}
                          >
                            {item.author.charAt(0)}
                          </Avatar>
                          <div style={{
                            display: "flex",
                            alignItems: "start",
                            flexDirection: 'column',
                            backgroundColor: '#f0f2f5',
                            borderRadius: '10px',
                            padding: '8px'
                          }}>
                            <strong>{item.author}</strong>
                            <span
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              {item.content}
                            </span>
                          </div>
                        </div>
                      }
                    />
                    <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#888" }}>
                      <span>
                        <LikeOutlined /> Like
                      </span>
                      <span>
                        <MessageOutlined /> Reply
                      </span>
                      {item.replies > 0 && <span>View all {item.replies} replies</span>}
                    </div>
                  </div>
                )}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "12px", gap: "8px" }}>
              <Avatar style={{ backgroundColor: "#f56a00" }} />
              <Input
                placeholder="Write a comment..."
                style={{
                  borderRadius: "20px",
                  height: "36px",
                }}
                suffix={<SendOutlined />}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

// Custom Nút "Next"
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        zIndex: 2,
        background: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        lineHeight: "40px",
        textAlign: "center",
      }}
      onClick={onClick}
    >
      <GrNext />
    </div>
  );
};

// Custom Nút "Prev"
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        zIndex: 2,
        background: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        lineHeight: "40px",
        textAlign: "center",
      }}
      onClick={onClick}
    >
      <GrPrevious />
    </div>
  );
};

export default PhotoPage;
