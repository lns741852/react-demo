import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography

const Home: FC = () => {
    const nav = useNavigate()

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <Title className={styles.title}>問卷調查 | 在線投票</Title>
                <Paragraph className={styles['auto-typing']}>
                    已累計創建問卷 100 份，發布問卷 90 份，收到答卷 980 份
                </Paragraph>

                <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
                    開始使用
                </Button>
            </div>
        </div>
    )
}

export default Home
