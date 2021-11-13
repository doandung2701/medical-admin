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
  TreeSelect
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as categoryApi from '../../api/categoryApi';
import * as originApi from '../../api/originApi';
import * as brandApi from '../../api/brandApi';

const { Option } = Select;

function AddProduct() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSave = values => {
    console.log('onFinish', values);
    // call save API
  };
  const getBrands = async () => {
    try{
      setLoading(true);
      const response = await brandApi.getAll();
      if(response.status === 200)
        if(response.data.data)
          setBrands(response.data.data);
    }catch(e){

    }finally{
      setLoading(false);
    }
  }
  const getOrigins = async () => {
    try{
      setLoading(true);
      const response = await originApi.getAll();
      if(response.status === 200)
        if(response.data.data)
          setOrigins(response.data.data);
    }catch(e){
     
    }finally{
      setLoading(false);
    }
  }
  const getCategories = async () => {
    try{
      setLoading(true);
      const response = await categoryApi.getAllCategory();
      debugger;
      if(response.status === 200)
        if(response.data.data)
          setCategories(response.data.data);
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    getBrands();
    getOrigins();
    getCategories();
  }, []);

  const requiredFieldRule = [{ required: true, message: 'Required Field' }];

  return (
    <Card title="Add Product" loading={false}>
      <Row justify="center">
        <Col span={24}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            form={form}
            name="product-form"
            onFinish={handleSave}
          >
            <Form.Item hasFeedback label="Name" name="name" rules={requiredFieldRule}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
            <Form.Item hasFeedback label="Detail" name="detail" valuePropName="data" getValueFromEvent={(event, editor) => {
              const data = editor.getData();
              return data;
            }}
              rules={requiredFieldRule}
            >
              <CKEditor
              config={{ckfinder: {
                // Upload the images to the server using the CKFinder QuickUpload command
                // You have to change this address to your server that has the ckfinder php connector
                uploadUrl: process.env.REACT_APP_BASE_API + '/file/ckeditor/upload'
            }}}
             editor={ClassicEditor} />
            </Form.Item>
            <Form.Item hasFeedback label="Brand" name="brandId" rules={requiredFieldRule}>
              <Select allowClear clearIcon >
                {brands.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item hasFeedback label="Origin" name="originId" rules={requiredFieldRule}>
              <Select allowClear clearIcon >
                {origins.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item hasFeedback label="Category" name="categoryId" rules={requiredFieldRule}>
              <TreeSelect allowClear clearIcon showSearch treeDefaultExpandAll treeData={categories} />
            </Form.Item>
            <Form.Item hasFeedback label="Available Quantity" name="availableQuantity" rules={requiredFieldRule}>
              <InputNumber />
            </Form.Item>
            <Form.Item hasFeedback label="Retail Price" name="retailPrice" rules={requiredFieldRule}>
              <InputNumber />
            </Form.Item>
            <Form.Item hasFeedback label="Whole sale Price" name="wholeSalePrice" rules={requiredFieldRule}>
              <InputNumber />
            </Form.Item>
            <Form.Item hasFeedback label="Retail original Price" name="retailOriginalPrice" rules={requiredFieldRule}>
              <InputNumber />
            </Form.Item>
            <Form.Item hasFeedback label="Whole sale original Price" name="wholeSaleOriginalPrice" rules={requiredFieldRule}>
              <InputNumber />
            </Form.Item>
            <Form.Item hasFeedback label="Sku" name="sku" rules={requiredFieldRule}>
              <Input />
            </Form.Item>
            <Form.Item hasFeedback
              label="Status"
              name="status"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Form.Item>
            <Divider />
            <Row justify="center">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}

export default AddProduct;
