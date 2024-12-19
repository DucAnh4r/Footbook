
import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import StatusInput from './StatusInput';
import StoryList from './StoryList';
import Post from '../../Components/Post';
import Reels from './Reels';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import RightSidebar from './RightSidebar/RightSidebar';
import './Homepage.scss'
import SuggestedFriends from '../ProfilePage/UserProfilePage/SuggestedFriends';
import GroupPost from '../../Components/GroupPost';
import { useAuthCheck } from '../../utils/checkAuth';
import { getUserIdFromLocalStorage } from '../../utils/authUtils';
import { getPostListFriendService } from '../../services/postService';
import SharedPost from '../../Components/SharedPost';


const { Sider, Content } = Layout;

const Homepage = () => {
  useAuthCheck();
  const [posts, setPosts] = useState([]); // Lưu danh sách bài viết
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const user_id = getUserIdFromLocalStorage(); // Lấy userId từ localStorage

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getPostListFriendService(user_id);
      setPosts(response?.data?.data?.postResponses || []); // Lưu dữ liệu trả về

    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); 

  document.title = "Trang chủ";
  return (
    <>
      <Sider
        width={360}
        style={{
          background: '#f5f5f5',
          height: '100vh',
          overflow: 'hidden',
          position: 'fixed',
          top: '64px',
          left: '0',
          zIndex: '100'
        }}
        className="scroll-on-hover"
      >
        <LeftSidebar />
      </Sider>

      <Content style={{ padding: '70px 370px', minHeight: '100vh', overflow: 'unset' }}>
        <div className="page-content" style={{ padding: '16px 30px' }}>
          <StatusInput />
          <SharedPost 
            key={"4e4bed83-6ad6-409b-84b1-0176b8e46cbe"}
            postId={"4e4bed83-6ad6-409b-84b1-0176b8e46cbe"}
            content={"test share"}
            createdAt={"2024-12-18T18:48:38"}
            userId={"10f16543-3682-4771-a315-12125a1eb60a"}
            images={""}
            shareId={"0cbcc2cc-54d2-4a9e-96f0-d51cdc992dd6"}
          />
          {loading ? (
            <p>Đang tải bài viết...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
                <Post
                    key={post.post_id}
                    postId={post.post_id}
                    content={post.content}
                    createdAt={post.create_at}
                    userId={post.user_id}
                    images={post.images}
                    isModalOpen={false}
                />
            ))
          ) : (
            <p>Không có bài viết nào để hiển thị.</p>
          )}
          <Post
            key={"123"}
            postId={"123"}
            content={"123"}
            createdAt={"123"}
            userId={"123"}
            images={""}
          />
        </div>
      </Content>

      <Sider
        width={360}
        style={{
          background: '#f5f5f5',
          height: '100vh',
          overflow: 'hidden',
          position: 'fixed',
          top: '64px',
          right: '0',
          zIndex: '100'
        }}
        className="scroll-on-hover"
      >
        <RightSidebar/>
      </Sider>
    </>
  );
};

export default Homepage;
