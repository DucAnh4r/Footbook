import React from "react";
import { Layout } from "antd";
import Header from "./Header"; // Your custom header component
const { Sider, Content} = Layout; // Destructure from Layout

const MainLayout = (props) => {
    return (
        <Layout>
            <Header>header</Header> {/* Custom Header */}
            <Layout>
                <Sider width={360} style={{ background: 'white' }}>left sidebar</Sider>
                <Content>
                    <div className="page-content">{props.children}</div>
                </Content>
                <Sider width={360} style={{ background: 'white' }}>right sidebar</Sider>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
