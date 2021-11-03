import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Card, Form, Input, Row, Col, Divider, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './Login.less';
import { useHistory } from 'react-router';
import { getAuth } from "firebase/auth";

function Login() {
  const [form] = Form.useForm();
  const userNameRule = [{ required: true, message: 'User name is required' }];
  const passwordNameRule = [
    { required: true, message: 'Password is required' },
  ];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(getAuth());
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace('/dashboard');
  }, [user, loading]);
  const normalLogin = async () => {
    await signInWithEmailAndPassword(email, password);
  };
  const signInWithGoogle = async () => {
    await signInWithGoogle();
  };
  const handleChangeEmail = value => {
    setEmail(value);
  };
  const handleChangePassword = value => {
    setPassword(value);
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
              <Button type="link" onClick={signInWithGoogle}>
                Login with Google
              </Button>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
export default Login;
