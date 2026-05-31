import React, { FC } from 'react'
import { Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
    const { getUserInfoLoading } = useLoadUserData()
    // 用戶沒有登錄時，跳轉到登錄頁
    useNavPage()
    return (
        <div style={{ height: '100vh' }}>
            {getUserInfoLoading ? (
                <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <Spin />
                </div>
            ) : (
                <Outlet />
            )}
        </div>
    )
}

export default QuestionLayout
