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
    Tag,
    Descriptions, Badge, Spin, Modal
} from 'antd';
import { useHistory, useParams } from 'react-router';
import * as orderApi from '../../api/orderApi';
import { formatCurrency } from '../../helpers/stringHelper';
const { Option } = Select;
export default function OrderDetail(props) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);
    const [initData, setinitData] = useState();
    const history = useHistory();
    const { id } = useParams();
    const [isReady, setIsReady] = useState(false);
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const getDetail = async (id) => {
        try {
            setLoading(true);
            const response = await orderApi.getDetailById(id);
            if (response.status === 200)
                if (response.data.data) {
                    setinitData(response.data.data);
                    setIsReady(true);
                    setState(response.data.data.state);
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
    };
    const renderpaymentMethod = payMethod => {
        if (payMethod === 'DELIVERY') {
            return (
                <Tag color={'blue'}>
                    Qua đơn vị giao vận
                </Tag>
            );
        } else {
            return (
                <Tag color={'success'}>
                    Lấy tại cửa hàng
                </Tag>
            );
        }
    };
    const renderStatus = status => {
        if (status == 1) {
            return (
                <Tag color={'green'}>
                    Active
                </Tag>
            );
        } else {
            return (
                <Tag color={'red'}>
                    Disable
                </Tag>
            );
        }
    };
    const updateOrderStatus = () => {
        setVisible(true);
    }
    const handleOk = async () => {
        if (!state || state === '') {
            message.warning('Bạn chưa chọn trạng thái');
            return;
        }
        if (state === initData.state)
            return;
        try {
            setLoading(true);
            setConfirmLoading(true);
            const { id } = initData;
            const response = await orderApi.updateState(id, state);
            if (response.status === 200) {
                setinitData({
                    ...initData,
                    state: state
                });
                setVisible(false);
                message.success('Update state success');
            }
        } catch (e) {
            if (e.response.data?.message) {
                message.error(e.response.data.message);
            } else {
                message.error('Update state error');
            }
        } finally {
            setLoading(false);
            setConfirmLoading(false);
        }
    }
    const handleCancel = () => {
        setVisible(false);
    };
    return (<>
        {initData && (
            <>
                <Modal
                    title="Update state"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    closable={false}
                    maskClosable={false}
                >
                    <Select onChange={(state) => setState(state)} style={{ width: '100%' }} defaultValue={initData?.state}>
                        <Option value={'CREATED'}>
                            Mới tạo
                        </Option>
                        <Option value={'PAID'}>
                            Đã thanh toán
                        </Option>
                        <Option value={'DELIVERY'}>
                            Đang vận chuyển
                        </Option>
                        <Option value={'CANCEL'}>
                            Hủy đơn
                        </Option>
                        <Option value={'DONE'}>
                            Hoàn thành
                        </Option>
                    </Select>
                </Modal>
                <Descriptions title="Order Info" bordered extra={initData.state !== 'DONE' && <Button onClick={updateOrderStatus} type="primary">Update state</Button>}>
                    <Descriptions.Item label="Order number">{initData.orderNumber}</Descriptions.Item>
                    <Descriptions.Item label="Customer name">{initData.customerName}</Descriptions.Item>
                    <Descriptions.Item label="Customer email">{initData.email}</Descriptions.Item>
                    <Descriptions.Item label="Customer address">{initData.address}</Descriptions.Item>
                    <Descriptions.Item label="Customer note">{initData.note}</Descriptions.Item>
                    <Descriptions.Item label="State">{renderState(initData.state)}</Descriptions.Item>
                    <Descriptions.Item label="Number of item">{initData.itemsCount}</Descriptions.Item>
                    <Descriptions.Item label="Payment method">{renderpaymentMethod(initData.payMethod)}</Descriptions.Item>
                    <Descriptions.Item label="Total Item Price">{initData.price}</Descriptions.Item>
                    <Descriptions.Item label="Shipping Price">{initData.shippingFee}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={2}>{renderStatus(initData.status)}</Descriptions.Item>
                    <Descriptions.Item label="Order item detail info">
                        {initData.items && initData.items.length > 0 && (
                            initData.items.map(item => {
                                return <div key={item.id}><b>{item.productName}</b> - {item.quantity} - {formatCurrency(item.price * item.quantity)}</div>
                            })
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </>
        )},
    </>)
}