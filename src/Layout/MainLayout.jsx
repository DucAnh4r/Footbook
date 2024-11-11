import React from "react";
import { Layout } from "antd";
import Header from "./Header"; // Custom header component
import "./MainLayout.scss";

const MainLayout = ({ children }) => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Header /> {/* Custom Header */}
            <Layout>
                {children}
            </Layout>
        </Layout>
    );
};

export default MainLayout;
