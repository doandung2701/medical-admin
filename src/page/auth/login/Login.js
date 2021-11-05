import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Divider,
  Button,
  Spin,
  notification,
} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './Login.less';
import { useHistory } from 'react-router';
import { signInWithEmailAndPassword, getAuth } from '@firebase/auth';
import { useSelector } from 'react-redux';
import firebaseApp from '../../../firebase';
import { getUserFromAuthState } from '../../../redux/selector/authSelector';

function Login() {
  const [form] = Form.useForm();
  const userNameRule = [{ required: true, message: 'User name is required' }];
  const passwordNameRule = [
    { required: true, message: 'Password is required' },
  ];
  const userState = useSelector(getUserFromAuthState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const history = useHistory();
  useEffect(() => {
    if (userState) {
      history.push('/');
    }
  }, [userState]);
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace('/');
  }, [user, loading]);
  const normalLogin = async () => {
    try {
      const respones = await signInWithEmailAndPassword(
        getAuth(firebaseApp),
        email,
        password
      );
      setUser(true);
    } catch (e) {
      console.log(e);
      notification.info({
        message: `Đăng nhập thất bại`,
        description: 'Sai tên hoặc mật khẩu',
      });
    }
  };
  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };
  const handleChangePassword = e => {
    setPassword(e.target.value);
  };
  return (
    <Row justify="center" align="stretch" style={{ minHeight: '100vh' }}>
      <Col span={12} flex="auto" className="login-container">
        <Card loading={loading} className="strech-content">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            form={form}
            name="login-form"
            autoComplete="off"
          >
            <Form.Item label="Email" name="email" rules={userNameRule}>
              <Input value={email} onChange={handleChangeEmail} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={passwordNameRule}
            >
              <Input.Password
                placeholder="password"
                value={password}
                onChange={handleChangePassword}
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Divider />
            <Row justify="center">
              <Button type="primary" onClick={normalLogin}>
                Login
              </Button>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
export default Login;
