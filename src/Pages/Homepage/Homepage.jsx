import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'

const Homepage = () => {
  document.title="Trang chủ"
  return (
    <React.Fragment>
      <Layout style={{ padding: '0 24px 24px', alignItems:'center'}}>
      
      <Content
            style={{
              maxWidth: 680,
              padding: 24,
              margin: 0,
              minHeight: 123,
              background: 'white',
              borderRadius: '20px',
            }}
          >
            Content
          </Content>
      </Layout>
    </React.Fragment>
  )
}

export default Homepage