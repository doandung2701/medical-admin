import React, { useEffect, useState } from 'react';
import useDataTable from '../../component/DataTable';
import * as constants from './Constants';
import { Col, Row, Input, Form, Divider, Select, TreeSelect, Button, Popconfirm, Menu } from 'antd';
import {
    DeleteOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    EditOutlined
} from '@ant-design/icons';
import './Style.less';
import * as orderApi from '../../api/orderApi';
import * as productAPi from '../../api/productApi';
const { Option } = Select;
const { Search } = Input;

function OrderList() {
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true);
    const {
        DataTable,
        hasSelected,
        currentPage,
        pageSize,
        resetPagination,
        deleteItem,
        handleCustomAction
    } = useDataTable({
        columns: constants.columns,
        dataSource: data,
        updateEntityPath: 'orders',
        total,
        loading
    });
    const hanldeDelete = async (selectedRow) => {
        try {
            setLoading(true);
            const response = await productAPi.softDeleteById(selectedRow.id);
            if (response && response.status === 200) {
                let selectedId = data.findIndex(x => x.id === selectedRow.id);
                if (selectedId !== -1) {
                    data[selectedId] = {
                        ...data[selectedId],
                        status: 0
                    }
                    setData([...data]);
                }
            }
        } catch (e) {
            if (e.response.data?.message) {
                message.error(e.response.data.message);
            } else {
                message.error('Error when delete brand');
            }
        } finally {
            setLoading(false);
        }
    }
    const handleSearch = async (values) => {
        values['offset'] = currentPage * pageSize;
        values['limit'] = pageSize;
        try {
            setLoading(true);
            const response = await orderApi.query(values);
            if (response && response.status === 206) {
                const totalCount = response.headers['x-total-count'];
                const data = response.data.data;
                setTotal(totalCount);
                setData(data);
            }
        } catch (e) {
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        form.submit();
        // handleSearch()
    }, [currentPage,pageSize]);
    useEffect(() => {
        if (deleteItem)
            hanldeDelete(deleteItem);
    }, [deleteItem]);
    return (
        <>
            <Row>
                <Col flex="auto">
                    {/* <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        style={{ float: 'right' }}
                        onClick={handleAddNew}
                    >
                        Add New
                    </Button> */}
                </Col>
            </Row>
            <Row>
                <Form
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    form={form}
                    onFinish={handleSearch}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                >
                    <Row>
                        <Col span={8}>
                            <Form.Item label="Order number" name="orderNumber">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Customer name" name="customerName">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="State" name="state">
                                <Select allowClear clearIcon >
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
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Payment method" name="paymentMethod">
                                <Select allowClear clearIcon >
                                    <Option value={'DELIVERY'}>
                                        Qua đơn vị giao vận
                                    </Option>
                                    <Option value={'GET_ON_STORE'}>
                                        Lấy tại cửa hàng
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}></Col>
                        <Col span={8} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
            <Divider />
            <DataTable />
        </>
    );
}

export default OrderList;
