import React from 'react'
import styles from './LeftSidebar.module.scss'
import FriendImg from '../../../assets/image/Homepage/LeftSidebar/friend.png'
import MessImg from '../../../assets/image/Homepage/LeftSidebar/messenger.png'

const LeftSidebar = () => {
  return (
    <div className={styles['container']}>
        <ul className={styles['list-container']}>
            <li className={styles['list-item']}>
                <div className={styles['element-container']}>
                    <div className={styles['image-container']}>
                        <img className={styles['image']} src="https://cdn.tuoitre.vn/thumb_w/480/471584752817336320/2024/7/6/2024-07-05t210215z828248098up1ek751mfqfvrtrmadp3soccer-euro-por-fra-report-1-1720260083640639014392.jpg" alt="" />
                    </div>
                    <span className={styles['text']}>Nguyễn Đức Anh</span>
                </div>
            </li>
            <li className={styles['list-item']}>
                <div className={styles['element-container']}>
                    <div className={styles['image-container']}>
                        <img className={styles['icon']} src={FriendImg} alt="" />
                    </div>
                    <span className={styles['text']}>Bạn bè</span>
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
                    <span className={styles['text']}>Messenger</span>
                </div>
            </li>
        </ul>
        
    </div>
  )
}

export default LeftSidebar