import React, { useState } from 'react';
import { Card, Form, Input, Row, Col, Divider, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './Login.less';

function Login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const userNameRule = [{ required: true, message: 'User name is required' }];
  const passwordNameRule = [{ required: true, message: 'Password is required' }];

  const handleLogin = values => {
    console.log('on login', values);
  };
  return (
    <Row justify="center" align="stretch" style={{minHeight: '100vh'}}>
      <Col span={12} flex={'auto'} className={'login-container'}>
        <Card loading={loading} className={'strech-content'}>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            form={form}
            name="login-form"
            onFinish={handleLogin}
            autoComplete="off"
          >
            <Form.Item
              label="User name"
              name="username"
              rules={userNameRule}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password"  rules={passwordNameRule}>
              <Input.Password
                placeholder="password"
               
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Divider />
            <Row justify="center">
              <Button type="primary" htmlType="submit">
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
