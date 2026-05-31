
import React, { FC, useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router/index'
import styles from './Logo.module.scss'
import useGetUserInfo from '@/hooks/useGetUserInfo'

const { Title } = Typography

const Logo: FC = () => {
    const { username } = useGetUserInfo()

    const [pathname, setPathname] = useState(HOME_PATHNAME)
    useEffect(() => {
        if (username) {
            setPathname(MANAGE_INDEX_PATHNAME)
        }
    }, [username])

    return (
        <div className={styles.container}>
            <Link to={pathname}>
                <Space>  {/* display: flex; align-items: center; gap: 10px; */}
                    <h1> {/* 區塊元素 */}
                        <FormOutlined id="logo" />
                    </h1>
                    <h1>問卷調查</h1>
                </Space>
            </Link>
        </div>
    )
}

export default Logo
