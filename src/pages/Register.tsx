import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import styles from './Register.module.scss'
import { registerService, User } from '@/api/user'
import { useMutation } from '@tanstack/react-query'

const { Title } = Typography

function useRegister() {
    const nav = useNavigate();

    const { mutate: register, isPending: registering } = useMutation({
        mutationFn: async (values: User) => {
            return await registerService(values);
        },
        onSuccess: () => {
            message.success("註冊成功");
            nav(LOGIN_PATHNAME);
        },
    });

    return {
        register,
        registering,
    };
}


const Register: FC = () => {
    const { register, registering } = useRegister();

    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}>
                        <UserAddOutlined />
                    </Title>
                    <Title level={2}>注冊新用戶</Title>
                </Space>
            </div>

            <div>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={(values: User) => {
                        register(values)
                    }}
                >
                    <Form.Item label="昵稱" name="nickname">
                        <Input />
                    </Form.Item>

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
                        label="確認密碼"
                        name="confirm"
                        dependencies={['password']} // 依賴於 password ，password 變化，會重新觸發 validator
                        rules={[
                            { required: true, message: '請輸入密碼' },
                            ({ getFieldValue }) => ({  // getgetFieldValue 用於獲取表單字段的值，這裡用於獲取 password 字段的值，以便在 validator 中進行比較
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject(new Error('兩次密碼不一致'))
                                    }
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit" disabled={registering}>
                                注冊
                            </Button>
                            <Link to={LOGIN_PATHNAME}>已有賬戶，登錄</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Register
