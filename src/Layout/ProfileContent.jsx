// /src/components/ProfileContent.jsx
import React, { useState } from 'react';
import { Avatar, Button, Divider, Input, Radio, Modal, List, Typography, Space } from 'antd';
import {
  FaCog, FaQuestionCircle, FaMoon, FaCommentDots, FaSignOutAlt, FaUser,
  FaArrowLeft, FaGlobe, FaCheck, FaExclamationCircle, FaEnvelope,
  FaInfoCircle, FaKeyboard, FaStar
} from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const { Text, Title } = Typography;

const languages = [
  { name: 'Tiếng Việt', description: 'Tiếng Việt · Gần đây' },
  { name: 'English (US)', description: 'Tiếng Anh (Mỹ) · Gần đây' },
  { name: '中文(台灣)', description: 'Tiếng Trung phồn thể (Đài Loan) · Gợi ý' },
  { name: 'Español', description: 'Tiếng Tây Ban Nha · Gợi ý' },
  { name: 'Português (Brasil)', description: 'Tiếng Bồ Đào Nha (Brazil) · Gợi ý' },
  { name: 'Af-Soomaali', description: 'Tiếng Somali' },
  { name: 'Afrikaans', description: 'Tiếng Afrikaans' },
  { name: 'Azərbaycan dili', description: 'Tiếng Azerbaijan' },
  { name: 'Bahasa Indonesia', description: 'Tiếng Indo' },
  { name: 'Bahasa Melayu', description: 'Tiếng Mã Lai' },
  { name: 'Basa Jawa', description: 'Tiếng Java' },
  { name: 'Bisaya', description: 'Tiếng Cebuano' }
];

const ProfileContent = () => {
  const [view, setView] = useState('main'); // 'main', 'settings', 'language', 'languageList'
  const [selectedLanguage, setSelectedLanguage] = useState('Tiếng Việt');
  const [darkMode, setDarkMode] = useState('off'); // 'off', 'on', 'auto'
  const [singleKeyShortcuts, setSingleKeyShortcuts] = useState('off'); // 'off', 'on'
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBackClick = () => {
    const viewMapping = {
      languageList: 'language',
      language: 'settings',
      keyboard: 'accessibility'
    };
    setView(viewMapping[view] || 'main');
  };

  const renderBackButton = (title) => (
    <Space align="center" style={{ padding: '8px 0' }}>
      <Button type="text" icon={<FaArrowLeft />} onClick={handleBackClick} />
      <Title level={5} style={{ margin: 0 }}>{title}</Title>
    </Space>
  );

  return (
    <div style={{ width: 300 }}>
      {view === 'main' && (
        <div>
          <Space direction="vertical" style={{ width: '100%', alignItems: 'center' }}>
            <Avatar icon={<FaUser />} size="large" />
            <Text strong style={{ fontSize: '16px' }}>Duc Manh</Text>
            <Button type="link" style={{ padding: 0, color: 'black' }}>Xem tất cả trang cá nhân</Button>
          </Space>
          <Divider />
          <List
            dataSource={[
              { text: 'Cài đặt & quyền riêng tư', icon: <FaCog />, view: 'settings' },
              { text: 'Trợ giúp & hỗ trợ', icon: <FaQuestionCircle />, view: 'helpSupport' },
              { text: 'Màn hình & trợ năng', icon: <FaMoon />, view: 'accessibility' },
              { text: 'Đóng góp ý kiến', icon: <FaCommentDots /> },
              { text: 'Đăng xuất', icon: <FaSignOutAlt /> }
            ]}
            renderItem={({ text, icon, view }) => (
              <List.Item onClick={() => view && setView(view)} style={{ cursor: 'pointer' }}>
                <Button type="text" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {icon} <span style={{ marginLeft: 8 }}>{text}</span>
                  </span>
                  {view && <MdOutlineArrowForwardIos />}
                </Button>
              </List.Item>
            )}
          />
          <Divider />
          <Text type="secondary" style={{ fontSize: '12px', textAlign: 'center', display: 'block' }}>
            Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo · Cookie · Xem thêm · Meta © 2024
          </Text>
        </div>
      )}

      {view === 'settings' && (
        <div>
          {renderBackButton('Cài đặt & quyền riêng tư')}
          <Divider />
          <List
            dataSource={[
              { text: 'Ngôn ngữ', icon: <FaGlobe />, view: 'language' },
              { text: 'Xem tất cả cài đặt', icon: <FaCog /> }
            ]}
            renderItem={({ text, icon, view }) => (
              <List.Item onClick={() => view && setView(view)} style={{ cursor: 'pointer' }}>
                <Button type="text" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {icon} <span style={{ marginLeft: 8 }}>{text}</span>
                  </span>
                  {view && <MdOutlineArrowForwardIos />}
                </Button>
              </List.Item>
            )}
          />
        </div>
      )}

      {view === 'language' && (
        <div>
          {renderBackButton('Ngôn ngữ')}
          <Divider />
          <Button
            type="text"
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            onClick={() => setView('languageList')}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <FaGlobe style={{ marginRight: 8 }} />
              <div>
                <Text>Ngôn ngữ trên Facebook</Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>{selectedLanguage}</Text>
              </div>
            </span>
            <MdOutlineArrowForwardIos />
          </Button>
        </div>
      )}

      {view === 'languageList' && (
        <div>
          {renderBackButton('Ngôn ngữ trên Facebook')}
          <Input placeholder="Tìm kiếm ngôn ngữ" style={{ margin: '8px 0', borderRadius: '20px' }} />
          <Divider />
          <List
            dataSource={languages}
            renderItem={(language) => (
              <List.Item onClick={() => setSelectedLanguage(language.name)} style={{ cursor: 'pointer' }}>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <Text strong>{language.name}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{language.description}</Text>
                  </div>
                  {selectedLanguage === language.name && <FaCheck style={{ color: '#1877f2' }} />}
                </Space>
              </List.Item>
            )}
          />
        </div>
      )}

      {view === 'helpSupport' && (
        <div>
          {renderBackButton('Trợ giúp & hỗ trợ')}
          <Divider />
          <List
            dataSource={[
              { text: 'Trung tâm trợ giúp', icon: <FaInfoCircle /> },
              { text: 'Hộp thư hỗ trợ', icon: <FaEnvelope /> },
              { text: 'Báo cáo sự cố', icon: <FaExclamationCircle /> }
            ]}
            renderItem={({ text, icon }) => (
              <List.Item>
                <Button type="text" icon={icon} style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'flex-start' }}>
                  {text}
                </Button>
              </List.Item>
            )}
          />
        </div>
      )}

      {view === 'accessibility' && (
        <div>
          {renderBackButton('Màn hình & trợ năng')}
          <Divider />
          <div style={{ padding: '8px 0' }}>
            <Space align="center">
              <FaMoon style={{ fontSize: '20px' }} />
              <Text strong>Chế độ tối</Text>
            </Space>
            <Text type="secondary" style={{ fontSize: '12px' }}>Điều chỉnh giao diện để giảm độ chói.</Text>
            <Radio.Group value={darkMode} onChange={(e) => setDarkMode(e.target.value)}>
              <Radio value="off">Đang tắt</Radio>
              <Radio value="on">Đang bật</Radio>
              <Radio value="auto">Tự động</Radio>
            </Radio.Group>
          </div>
          <Divider />
          <Button type="text" icon={<FaKeyboard />} onClick={() => setView('keyboard')} style={{ display: 'flex', justifyContent: 'flex-start' }}>
            Bàn phím <MdOutlineArrowForwardIos />
          </Button>
        </div>
      )}

      {view === 'keyboard' && (
        <div>
          {renderBackButton('Bàn phím')}
          <Divider />
          <Button type="text" icon={<FaKeyboard />} onClick={() => setIsModalVisible(true)}>
            Xem tất cả phím tắt
          </Button>
          <Divider />
          <div>
            <Space>
              <FaStar style={{ fontSize: '20px' }} />
              <Text strong>Dùng phím tắt có một ký tự</Text>
            </Space>
            <Radio.Group value={singleKeyShortcuts} onChange={(e) => setSingleKeyShortcuts(e.target.value)}>
              <Radio value="off">Đang tắt</Radio>
              <Radio value="on">Đang bật</Radio>
            </Radio.Group>
          </div>
        </div>
      )}

      <Modal
        title="Tất cả phím tắt trên Footbook"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
      >
        <Space direction="horizontal" style={{ justifyContent: 'space-around', padding: '16px' }}>
          <div>
            <Title level={5}>Toàn cầu</Title>
            <p>Hiển thị phím tắt: <kbd>f1</kbd></p>
          </div>
          <div>
            <Title level={5}>Bảng tin</Title>
            <p>Viết bình luận: <kbd>c</kbd></p>
          </div>
        </Space>
      </Modal>
    </div>
  );
};

export default ProfileContent;
