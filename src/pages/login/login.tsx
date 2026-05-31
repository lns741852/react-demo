import './login.css'
import { Button, Form, Input, Card } from 'antd';
import { useNavigate } from 'react-router';
import { userLogin, type UserProperty } from '../../app/slices/userSlice';
import { useAppDispatch } from '../../app/store/hooks';
import styled from 'styled-components';



const LoginWapper = styled.div`
    width: 100%;
    height: 100vh;
    background: #1890ff;
    display: flex;
    align-items: center;
    justify-content: center;

`


const Login: React.FC = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onFinish = () => {
        const loginInfo: UserProperty = {
            name: "test",
            id: "1",
            score: 0,
            status: "admin",
        };
        localStorage.setItem("loginInfo", loginInfo.status);
        dispatch(userLogin(loginInfo))
        navigate("/home");
    };



    return (
        <LoginWapper>
            <Card style={{ width: 300 }}>
                <Form form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item name="username" label="username" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="password" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </LoginWapper>
    )
}


export default Login