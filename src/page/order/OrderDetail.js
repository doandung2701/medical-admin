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
    TreeSelect,
    message,
    Tag
} from 'antd';
import { useHistory, useParams } from 'react-router';
import * as orderApi from '../../api/orderApi';
export default function OrderDetail(props) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);
    const [initData, setinitData] = useState({});
    const history = useHistory();
    const { id } = useParams();
    const [isReady, setIsReady] = useState(false);
    const getDetail = async (id) => {
        try {
            setLoading(true);
            const response = await orderApi.getDetailById(id);
            if (response.status === 200)
                if (response.data.data) {
                    setinitData(response.data.data);
                    setIsReady(true);
                    console.log(response.data.data);
                }

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (isRedirect) {
            history.push('/orders');
        }
    }, [isRedirect]);
    useEffect(() => {
        if (id) {
            getDetail(id);
        }
    }, [id]);
    const renderState = (state) => {
        if (state === 'CREATED') {
            return (
                <Tag color={'default'}>
                    Mới tạo
                </Tag>
            );
        } else if (state === 'PAID') {
            return (
                <Tag color={'warning'}>
                    Đã thanh toán
                </Tag>
            );
        } else if (state === 'DELIVERY') {
            return (
                <Tag color={'processing'}>
                    Đang vận chuyển
                </Tag>
            );
        } else if (state === 'CANCEL') {
            return (
                <Tag color={'error'}>
                    Hủy đơn
                </Tag>
            );
        } else {
            return (
                <Tag color={'success'}>
                    Hoàn thành
                </Tag>
            );
        }
    }
    return (<>
        <Card title="Order detail" loading={loading}>
            <Row justify="center">
                <Col span={24}>
                    <Input disabled value={initData?.orderNumber} />
                    {renderState(initData?.state)}
                    <Divider />
                    <Row justify="center">
                        {/* <Button type="primary" htmlType="submit">
                                Save
                            </Button> */}
                    </Row>
                </Col>
            </Row>
        </Card></>)
}