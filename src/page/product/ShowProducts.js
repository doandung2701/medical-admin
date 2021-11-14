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
import * as categoryApi from '../../api/categoryApi';
import * as originApi from '../../api/originApi';
import * as brandApi from '../../api/brandApi';
import * as productAPi from '../../api/productApi';
const { Option } = Select;
const { Search } = Input;

function ShowProducts() {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sku, setSku] = useState();
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
    updateEntityPath: 'products',
    total,
    loading
  });
  const redirectToAddPhoto = () =>{
    debugger;
    handleCustomAction();
    console.log(deleteItem);
  }
  const handleSearch = async (values) => {
    console.log(values);
    values['offset'] = currentPage * pageSize;
    values['limit'] = pageSize;
    try {
      setLoading(true);
      const response = await productAPi.search(values);
      if (response && response.status === 206) {
        const totalCount = response.headers['x-total-count'];
        const data = response.data.data;
        console.log(data);
        setTotal(totalCount);
        setData(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  const handleAddNew = () => {

  }
  const getBrands = async () => {
    try {
      setLoading(true);
      const response = await brandApi.getAll();
      if (response.status === 200)
        if (response.data.data)
          setBrands(response.data.data);
    } catch (e) {

    } finally {
      setLoading(false);
    }
  }
  const getOrigins = async () => {
    try {
      setLoading(true);
      const response = await originApi.getAll();
      if (response.status === 200)
        if (response.data.data)
          setOrigins(response.data.data);
    } catch (e) {

    } finally {
      setLoading(false);
    }
  }
  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryApi.getAllCategory();
      if (response.status === 200)
        if (response.data.data)
          setCategories(response.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getBrands();
    getOrigins();
    getCategories();
  }, []);
  
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
          <Button
            icon={<DeleteOutlined />}
            disabled={!hasSelected}
            style={{ float: 'right', marginRight: 12 }}
          >
            <Popconfirm
              title="Sure to delete?"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => { }}
            >
              Delete
            </Popconfirm>
          </Button>
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
              <Form.Item label="Query" name="query">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Brand" name="brandId">
                <Select allowClear clearIcon >
                  {brands.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Origin" name="originId">
                <Select allowClear clearIcon >
                  {origins.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Category" name="categoryId">
                <TreeSelect allowClear clearIcon showSearch treeDefaultExpandAll treeData={categories} />
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

export default ShowProducts;
