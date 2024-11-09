import React from "react";
import { Layout } from "antd";
import Header from "./Header"; 
const { Sider, Content} = Layout;

const MainLayout = (props) => {
    return (
        <Layout>
            <Header />
            <Layout>
                <Sider width={360} style={{ background: '#f5f5f5' }}>left sidebar</Sider>
                <Content>
                    <div className="page-content">{props.children}</div>
                </Content>
                <Sider width={360} style={{ background: '#f5f5f5' }}>right sidebar</Sider>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
