import React from 'react'
import styles from './LeftSidebar.module.scss'
import FriendImg from '../../assets/image/Homepage/LeftSidebar/friend.png'
import MessImg from '../../assets/image/Homepage/LeftSidebar/messenger.png'
import { useNavigate } from 'react-router-dom';




const LeftSidebar = () => {
    const navigate = useNavigate();
    const handleProfileClick = () => {
        navigate('/profile');
    };
    const handleFriendsClick = () => {
        navigate('/friends');
    };
    
  return (
    <div className={styles['container']}>
        <div className={styles['header']}>
            <h1 style={{marginLeft: '20px', fontSize: '24px'}}>Bạn bè</h1>

        </div>
        <ul className={styles['list-container']}>
            <li style={{backgroundColor: 'rgb(218, 218, 218)'}} className={styles['list-item']} onClick={() => handleProfileClick()}>
                <div className={styles['element-container']}>
                    <div className={styles['image-container']}>
                        <img className={styles['icon']} src={FriendImg} alt="" />
                    </div>
                    <span className={styles['text']}>Trang chủ</span>
                </div>
            </li>
            <li className={styles['list-item']} onClick={() => handleFriendsClick()}>
                <div className={styles['element-container']}>
                    <div className={styles['image-container']}>
                        <img className={styles['icon']} src={FriendImg} alt="" />
                    </div>
                    <span className={styles['text']}>Lời mời kết bạn</span>
                </div>
            </li>
            <li className={styles['list-item']}>
                <div className={styles['element-container']}>
                    <div className={styles['image-container']}>
                        <img className={styles['icon']} 
                            style={{
                                width: '30px',
                                height: '30px',
                                marginLeft: '3px' 
                            }}
                            src={MessImg}
                            alt=""
                        />
                    </div>
                    <span className={styles['text']}>Gợi ý</span>
                </div>
            </li>
            <li className={styles['list-item']} onClick={() => handleFriendsClick()}>
                <div className={styles['element-container']}>
                    <div className={styles['image-container']}>
                        <img className={styles['icon']} src={FriendImg} alt="" />
                    </div>
                    <span className={styles['text']}>Tất cả bạn bè</span>
                </div>
            </li>
        </ul>
        
    </div>
  )
}

export default LeftSidebar