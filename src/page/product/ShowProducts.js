import React, { useState } from 'react';
import Header from '../../component/Header';
import useDataTable from '../../component/DataTable';
import * as constants from './Constants';
import { Col, Row, Input, Form, Divider,Select,TreeSelect,Button,Popconfirm   } from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
const { Option } = Select;
const { Search } = Input;

function ShowProducts() {
  const {
    DataTable,
    hasSelected,
    currentPage,
    pageSize,
    resetPagination,
  } = useDataTable({
    columns: constants.columns,
    dataSource: constants.data,
    updateEntityPath: 'update-product',
  });
  const form = Form.useForm();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [sku, setSku] = useState();
  const [status, setStatus] = useState(true);
  const handleSearch = () => {

  }
  const handleAddNew = () => {

  }

  return (
    <>
      <Row>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          name="product-form"
          onFinish={handleSearch}
        >
          <Col span={24}>
            <Form.Item label="Query" name="query">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item hasFeedback label="Brand" name="brandId">
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
            <Form.Item hasFeedback label="Origin" name="originId">
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
            <Form.Item hasFeedback label="Category" name="categoryId">
              <TreeSelect allowClear clearIcon showSearch treeDefaultExpandAll treeData={categories} />
            </Form.Item>
          </Col>
        </Form>

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
      <Divider />
      <DataTable responsive={['xxl', 'xl', 'lg', 'md', 'sm', 'xs']} />
    </>
  );
}

export default ShowProducts;
