import { Row, Col } from 'antd'
import styles from './ProfilePage.module.scss'
import { IoIosCamera, IoIosArrowDown, IoMdAdd  } from "react-icons/io";
import { FaPen } from "react-icons/fa6";


const ProfilePage = () => {
  document.title = "Trang chủ"
  return (
    <>
        <div className={styles['container']}>
          <div className={styles['header']}>
            <div className={styles['wallpaper']}>
              
              <img className={styles['wallpaper-img']} src="https://imagev3.vietnamplus.vn/1200x630/Uploaded/2024/mzdic/2024_06_23/ronaldo-2306-8285.jpg.webp" alt="" />
              
              <div className={styles['add-wallpaper']}>
                <IoIosCamera style={{width: '25px', height: '25px'}}></IoIosCamera>
                <span style={{fontSize: '16px', fontWeight: 500}}>Thêm ảnh bìa</span>
              </div>

              
            </div>
            <Row className={styles['info']} gutter={16}>
              <Col span={6}>
                <div className={styles['avatar']}>
                  <img className={styles['avatar-img']} src="https://cdn.tuoitre.vn/thumb_w/480/471584752817336320/2024/7/6/2024-07-05t210215z828248098up1ek751mfqfvrtrmadp3soccer-euro-por-fra-report-1-1720260083640639014392.jpg" alt="" />
                </div>
                <div className={styles['add-avatar']}>
                  <IoIosCamera style={{width: '25px', height: '25px'}} />
                </div>
              </Col>
              <Col span={9} style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontSize: '30px', fontWeight: 700, marginTop: '24px'}}>Nguyễn Đức Anh</span>
                <a
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#65686c',
                    textDecoration: 'none' 
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'} 
                >
                  392 người bạn
                </a>
              </Col>
              <Col style={{paddingRight: '30px'}} span={9}>
                  <div style={{marginTop: '40px', textAlign: 'right'}}>
                    <button className={styles['blue-button']}>
                      <IoMdAdd />
                      Thêm vào tin
                    </button>
                    <button className={styles['white-button']}>
                      <FaPen />
                      Chỉnh sửa trang cá nhân
                    </button>
                  </div>
                  <div style={{marginTop: '10px', display: 'flex', justifyContent: 'end'}}>
                    <button style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} className={styles['white-button']}>
                      <IoIosArrowDown />
                    </button>
                  </div>
              </Col>
            </Row>
          </div>
        </div>
    </>
  )
}

export default ProfilePage