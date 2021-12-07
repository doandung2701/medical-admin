import React, { useEffect, useState } from 'react';
import {
    Switch,
    Card,
    Form,
    Input,
    Row,
    Col,
    Select,
    Divider,
    Button,
    InputNumber,
    message,
    Upload,
    Progress,
} from 'antd';
import { useHistory, useLocation, useParams } from 'react-router';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import * as notificationApi from '../../api/messagingApi';
export default function NotificationForm(props) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const requiredFieldRule = [{ required: true, message: 'Trường không được để trống' }];

    const handleSave = async values => {
        try {
            setLoading(true);
            const response = await notificationApi.sendNotification(values);
            if (response.status === 200) {
                message.success("Gửi thông báo thành công");
            } else {
                message.success("Gửi thông báo thất bại");
            }
        } catch (e) {
            message.success("Gửi thông báo thất bại");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Card title={'Gửi thông báo hàng loạt'} loading={loading}>
            <Row justify="center">
                <Col span={12}>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                        form={form}
                        name="notification-form"
                        onFinish={handleSave}
                    >
                        <Form.Item label="Tiêu đề" name="title" hasFeedback rules={requiredFieldRule}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Nội dung" name="body" hasFeedback rules={requiredFieldRule} >
                            <Input />
                        </Form.Item>
                        <Divider />
                        <Row justify="center">
                            <Button type="primary" htmlType="submit">
                                Gửi
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}