import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Divider,
  Button,
  notification,
} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './Login.less';
import {  useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {signin} from '../../../redux/actions/auth';
function Login() {
  const [form] = Form.useForm();
  const userNameRule = [{ required: true, message: 'Email không được để trống' }];
  const passwordNameRule = [
    { required: true, message: 'Password không được để trống' },
  ];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dipatch = useDispatch();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
  }, [loading]);
  const normalLogin = async () => {
    dipatch(signin(email,password,()=>history.push('/')));
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
                Đăng nhập
              </Button>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
export default Login;
