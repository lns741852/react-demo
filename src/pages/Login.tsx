
import React, { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { REGISTER_PATHNAME } from '../router'
// import { loginService } from '../services/user'
// import { setToken } from '../utils/user-token'
import styles from './Login.module.scss'
import { MANAGE_INDEX_PATHNAME } from '../router'
import { loginService, User } from '@/api/user'
import { useMutation } from '@tanstack/react-query'
import { setToken } from '@/utils/user-token'

type loginType = {
    password: string
    remember: boolean
    username: string
}

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'
const REMEMBER_KEY = 'REMEMBER'


/**
 * 記住用戶信息到功能
 */
function rememberUser(username: string, password: string, remember: boolean) {
    localStorage.setItem(USERNAME_KEY, username)
    localStorage.setItem(PASSWORD_KEY, password)
    localStorage.setItem(REMEMBER_KEY, remember.toString())

}

/**
 *  刪除用戶信息功能
 */
function deleteUserFromStorage() {
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
    localStorage.removeItem(REMEMBER_KEY)
}


/**
 *  用戶訊息回填功能
 */
function getUserInfoFromStorage() {
    return {
        username: localStorage.getItem(USERNAME_KEY),
        password: localStorage.getItem(PASSWORD_KEY),
        remember: localStorage.getItem(REMEMBER_KEY) === 'true',
    }
}


function useLogin() {
    const nav = useNavigate();

    const { mutate: login, isPending: logging } = useMutation({
        mutationFn: async (values: { username: string; password: string }) => {
            return await loginService(values)
        },
        onSuccess: (res) => {
            setToken(res.token)
            message.success("登錄成功");
            nav(MANAGE_INDEX_PATHNAME);
        },
    });

    return {
        login,
        logging,
    };
}


const Login: FC = () => {
    const nav = useNavigate()
    const [form] = Form.useForm()

    const { login, logging } = useLogin()

    useEffect(() => {
        const { username, password, remember } = getUserInfoFromStorage()
        form.setFieldsValue({ username, password, remember })
    }, [form])


    // 表單提交
    const onFinish = (values: loginType) => {
        const { username, password, remember } = values || {}

        login({ username, password })

        if (remember) {
            rememberUser(username as string, password as string, remember)
        } else {
            deleteUserFromStorage()
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}>
                        <UserAddOutlined />
                    </Title>
                    <Title level={2}>用戶登錄</Title>
                </Space>
            </div>

            <div>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="用戶名"
                        name="username"
                        rules={[
                            { required: true, message: '請輸入用戶名' },
                            { type: 'string', min: 5, max: 20, message: '字符長度在 5-20 之間' },
                            { pattern: /^\w+$/, message: '只能是字母數字下劃線' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密碼"
                        name="password"
                        rules={[{ required: true, message: '請輸入密碼' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked" // 於將 Checkbox 的 checked 屬性綁定到 Form.Item 的 value 上
                        wrapperCol={{ offset: 6, span: 16 }}>
                        <Checkbox>記住我</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                登錄
                            </Button>
                            <Link to={REGISTER_PATHNAME}>注冊新用戶</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
