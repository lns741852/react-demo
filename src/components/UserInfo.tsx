import React, { FC } from 'react'
import { Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { LOGIN_PATHNAME } from '../router'
import { removeToken } from '@/utils/user-token'
import useGetUserInfo from '@/hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '@/store/userReducer'
import { useQueryClient } from '@tanstack/react-query'


const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const queryClient = useQueryClient();

  const { username, nickname } = useGetUserInfo() // 从 redux 中获取用户信息

  function logout() {

    // reactQuery 跟 redux 可選擇一個使用
    queryClient.clear(); //強制清空所有 React Query 的快取
    dispatch(logoutReducer()) // 清空了 redux user 数据

    removeToken() // 清除 token 的存储
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      {/* 文字+區塊，不用換行 */}
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登入</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
