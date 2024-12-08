import React, { useState } from 'react';
import LogoImg from "../../assets/image/Header/logo.png";
import styles from './LoginPage.module.scss';
const LoginPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [animate, setAnimate] = useState(false);

    const toggleSignUp = () => {
        setAnimate(true);
        setTimeout(() => {
            setIsSignUp(!isSignUp);
            setAnimate(false);
        }, 300); // Thời gian animation (phải khớp với CSS)
    };

    return (
        <div className={styles.container}>

            <div className={styles.leftContent}>
                <img
                    src={LogoImg}
                    className={styles["logo-img"]}

                />
                <h1 className={styles.leftTitle}>
                    {isSignUp
                        ? 'Tạo tài khoản và kết nối tới bạn bè của bạn'
                        : 'Chào mừng bạn đến với Footbook'}
                </h1>
                <p className={styles.leftSubtitle}>
                    {isSignUp
                        ? 'Nơi kết bạn, chia sẻ bài đăng, tham gia nhóm, và tạo trang để giao tiếp với bạn bè hoặc công chúng.'
                        : 'Nơi kết bạn, chia sẻ bài đăng, tham gia nhóm, và tạo trang để giao tiếp với bạn bè hoặc công chúng.'}
                </p>
            </div>
            <div className={styles.rightContent}>
                <div
                    className={`${styles.card} ${animate ? styles.animate : ''}`}
                >
                    <h2 className={styles.title}>
                        {isSignUp ? 'Đăng ký 🚀' : 'Đăng nhập 👋'}
                    </h2>
                    <p className={styles.subtitle}>
                        {isSignUp
                            ? ''
                            : ''}
                    </p>
                    <form className={styles.form}>
                        {isSignUp && (
                            <>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="name">Họ và tên:</label>
                                    <input type="text" id="name" placeholder="Nhập tên của bạn" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="sdt">Số điện thoại: </label>
                                    <input type="text" id="sdt" placeholder="Nhập số điện thoại" />
                                </div>
                            </>
                        )}
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder={isSignUp ? 'Nhập email' : 'Nhập email hoặc số điện thoại'}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Mật khẩu:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Nhập mật khẩu"
                            />
                        </div>
                        {isSignUp && (
                            <div className={styles.inputGroup}>
                                <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Nhập lại mật khẩu"
                                />
                            </div>
                        )}
                        {!isSignUp && (
                            <div className={styles.rememberMe}>
                                <input type="checkbox" id="rememberMe" />
                                <label htmlFor="rememberMe">Lưu thông tin</label>
                            </div>
                        )}
                        <button type="submit" className={styles.signInButton}>
                            {isSignUp ? 'Đăng ký' : 'Đăng nhập'}
                        </button>
                    </form>
                    <div className={styles.toggle}>
                        {isSignUp ? (
                            <>
                                Đã có tài khoản?{' '}
                                <a href="#" onClick={toggleSignUp}>
                                    Đăng nhập
                                </a>
                            </>
                        ) : (
                            <>
                                Chưa có tài khoản?{' '}
                                <a href="#" onClick={toggleSignUp}>
                                    Đăng ký
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
