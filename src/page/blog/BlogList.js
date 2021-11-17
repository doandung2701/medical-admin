import Header from '../../component/Header';
import React, { useEffect, useState } from 'react';
import useDataTable from '../../component/DataTable';
import * as constants from './Constants';
import * as blogApi from '../../api/blogApi';
import { useHistory } from 'react-router';
import { Col, Row, Form, Input, Button, Select, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './Style.less';
const { Option } = Select;
export default function BlogList(props) {
    const form = Form.useForm();
    const [data, setData] = useState([]);
    const [query, setQuery] = useState({
        title: null,
        status: null
    });
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const hanldeDelete = async (selectedRow) => {
        try {
            setLoading(true);
            const response = await blogApi.softDeleteById(selectedRow.id);
            if (response && response.status === 200) {
                let selectedId = data.findIndex(x => x.id === selectedRow.id);
                if (selectedId !== -1) {
                    data[selectedId] = {
                        ...data[selectedId],
                        status: 'DISABLED'
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
    const {
        DataTable,
        hasSelected,
        currentPage,
        pageSize,
        resetPagination,
        deleteItem
    } = useDataTable({
        columns: constants.columns,
        dataSource: data,
        updateEntityPath: 'blogs',
        total,
        loading
    });
    const handleSearch = async (values) => {
        // setName(values);
        // debugger;
        setQuery(values);
    }
    useEffect(() => {
        const searchRequest = async () => {
            try {
                const { title, status } = query;
                // let title = '';
                // let status = ' ';
                setLoading(true);
                const response = await blogApi.query({
                    title: title,
                    status: status,
                    offset: currentPage * pageSize,
                    limit: pageSize
                });
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
        searchRequest();
    }, [currentPage, pageSize,query]);
    useEffect(() => {
        if (deleteItem)
            hanldeDelete(deleteItem);
    }, [deleteItem]);
    const handleAddNew = () => {
        history.push('/add-blog');
    };
    return (
        <>
            <Row>
                <Col flex="auto">
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        style={{ float: 'right' }}
                        onClick={handleAddNew}
                    >
                        Add New
                    </Button>
                </Col>
            </Row>
            <Row style={{marginTop:'10px'}}>
                <Form
                    name="blog-search-form"
                    // form={form}
                    onFinish={handleSearch}
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 21 }}
                    style={{ width: '100%' }}
                >
                    <Row gutter={[48, 16]}>
                        <Col span={8}>
                            <Form.Item label="Title" name="title">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Status" name="status">
                                <Select allowClear clearIcon >
                                    <Option value={'DRAFT'}>
                                        Nháp
                                    </Option>
                                    <Option value={'PUBLIC'}>
                                        Công khai
                                    </Option>
                                    <Option value={'DISABLED'}>
                                        Vô hiệu hóa
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
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