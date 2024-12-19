import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import styles from "./AllFriends.module.scss";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import FriendItem from "../../Components/FriendItem";
import { userListFriendService } from "../../../../services/userService";
import { getUserIdFromLocalStorage } from "../../../../utils/authUtils";

const AllFriends = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]); // Lưu danh sách lời mời kết bạn
  const [selectedUserId, setSelectedUserId] = useState(null); // State để lưu id người dùng được chọn
  const [loading, setLoading] = useState(true); // Hiển thị trạng thái loading
  const navigate = useNavigate();

  const user_id = getUserIdFromLocalStorage();

  const handleBack = () => {
    navigate("/friends");
  };

  const handleSelectUser = (senderId) => {
    // Cập nhật selectedUserId khi thẻ FriendRequestItem được chọn
    setSelectedUserId(senderId);
    if (onSelectUser) {
      onSelectUser(senderId); // Gọi callback từ cha nếu có
    }
  };

  useEffect(() => {
    const fetchListFriend = async () => {
      try {
        const response = await userListFriendService(user_id);
        console.log(response.data.data.friends); // Kiểm tra dữ liệu từ API
        if (response.data.success) {
          // Nếu có dữ liệu và là mảng, set dữ liệu vào state, nếu không thì set là mảng rỗng
          setUsers(
            Array.isArray(response.data.data.friends)
              ? response.data.data.friends
              : []
          );
        } else {
          console.error(response.data.message);
          setUsers([]); // Trường hợp nếu API trả về thông báo lỗi, gán mảng rỗng
        }
      } catch (error) {
        console.error("Error fetching friend requests:", error);
        setUsers([]); // Nếu có lỗi xảy ra, gán mảng rỗng
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchListFriend();
  }, [user_id]); // user_id là một dependency nếu cần thay đổi

  return (
    <>
      <Row className={styles.headerRow}>
        <Col>
          <div className={styles.backButton}>
            <div className={styles.backIcon} onClick={handleBack}>
              <IoMdArrowRoundBack style={{ width: "30px", height: "30px" }} />
            </div>
          </div>
        </Col>
        <Col className={styles.titleCol}>
          <span className={styles.subTitle}>Bạn bè</span>
          <span className={styles.title}>Tất cả bạn bè</span>
          <input type="text" placeholder="Tìm kiếm bạn bè" />
        </Col>
      </Row>
      <Row style={{ padding: "0 16px" }} className={styles.statsRow}>
        <span>{Array.isArray(users) ? users.length : 0} người bạn</span>{" "}
        {/* Kiểm tra nếu users là mảng */}
      </Row>

      <Row style={{ marginTop: "16px" }}>
        {loading ? (
          <span>Đang tải...</span>
        ) : Array.isArray(users) && users.length > 0 ? ( // Kiểm tra nếu users là mảng và có phần tử
          users.map((user) => (
            <FriendItem
              key={user.id}
              userId={user.id}
              user={user}
              onSelectUser={handleSelectUser}
              isSelected={user.id === selectedUserId}
            />
          ))
        ) : (
          <span>Không có bạn bè nào</span> // Thông báo khi không có bạn bè
        )}
      </Row>
    </>
  );
};

export default AllFriends;
