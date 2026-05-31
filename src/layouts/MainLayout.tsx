import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '@/components/Logo'
import UserInfo from '@/components/UserInfo'
import useLoadUserData from '@/hooks/useLoadUserData'
import useNavPage from '@/hooks/useNavPage'

const { Header, Content, Footer } = Layout


const MainLayout: FC = () => {
  const { getUserInfoLoading } = useLoadUserData()
  useNavPage()

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        {getUserInfoLoading ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}

      </Content>
      <Footer className={styles.footer}>
        問卷調查&copy;2024.2 - present. Created by J
      </Footer>
    </Layout>
  )
}

export default MainLayout