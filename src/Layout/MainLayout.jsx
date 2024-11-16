import React from "react";
import { Layout } from "antd";
import Header from "./Header"; // Custom header component
import "./MainLayout.scss";
import { HeaderProvider } from "../Context/HeaderContext";

const MainLayout = ({ children }) => {
    return (
        <Layout style={{ height: '100vh' }}>
            <HeaderProvider>
            <Header /> {/* Custom Header */}
            <Layout>
                {children}
            </Layout>
            </HeaderProvider>
        </Layout>
    );
};

export default MainLayout;
