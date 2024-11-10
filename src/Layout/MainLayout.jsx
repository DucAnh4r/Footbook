import React from "react";
import { Layout } from "antd";
import Header from "./Header"; // Your custom header component
const { Sider, Content} = Layout; // Destructure from Layout
import LeftSidebar from "../Pages/Homepage/LeftSidebar/LeftSidebar";
import "./MainLayout.scss";
import RightSidebar from "../Pages/Homepage/RightSidebar/RightSidebar";

const MainLayout = (props) => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Header>header</Header> {/* Custom Header */}
            <Layout>
                {/* Left Sidebar with scroll on hover */}
                <Sider
                    width={360}
                    style={{
                        background: '#f5f5f5',
                        maxHeight: '100vh',
                        overflow: 'hidden'
                    }}
                    className="scroll-on-hover"
                >
                    <LeftSidebar />
                </Sider>
                
                {/* Content with always visible scrollbar */}
                <Content
                    style={{
                        padding: '16px'
                    }}
                >
                    <div className="page-content">{props.children}</div>
                </Content>
                
                {/* Right Sidebar with scroll on hover */}
                <Sider
                    width={360}
                    style={{
                        background: '#f5f5f5',
                        maxHeight: '100vh',
                        overflow: 'hidden'
                    }}
                    className="scroll-on-hover"
                >
                    <RightSidebar />
                </Sider>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
