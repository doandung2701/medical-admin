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
  message
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as categoryApi from '../../api/categoryApi';
import * as originApi from '../../api/originApi';
import * as brandApi from '../../api/brandApi';
import * as productAPi from '../../api/productApi';
import { useHistory, useParams } from 'react-router';
import ProductImage from './ProductImage';
const { Option } = Select;

function ProductDetail() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [initData, setinitData] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [isReady, setIsReady] = useState(false);

  const handleSave = async values => {
    console.log('onFinish', values);
    // call save API
    try {
      setLoading(true);
      const { status } = values;
      if (status) {
        values.status = 1;
      } else {
        values.status = 0;
      }
      const response = await productAPi.update(id,values);
      if (response.status === 200) {
        message.success('Update product success');
        setIsRedirect(true);
      }
    } catch (e) {
      if (e.response.data?.message) {
        message.error(e.response.data.message);
      } else {
        message.error('Update product error');
      }
    } finally {
      setLoading(false);
    }
  };
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
  useEffect(() => {
    if (isRedirect) {
      history.push('/products');
    }
  }, [isRedirect]);
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
  const getDetail = async (id) => {
    try {
      setLoading(true);
      const response = await productAPi.getDetailById(id);
      if (response.status === 200)
        if (response.data.data)
        {
          setinitData(response.data.data);
          setIsReady(true);
        }

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
  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);
  const requiredFieldRule = [{ required: true, message: 'Required Field' }];

  return (
    <>
    <Card title="Update Product" loading={loading}>
      <Row justify="center">
        <Col span={24}>
          {isReady && <Form
            initialValues={initData}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            form={form}
            name="product-form"
            onFinish={handleSave}
          >
            <Form.Item hasFeedback label="Name" name="name" rules={requiredFieldRule}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={requiredFieldRule}>
              <Input />
            </Form.Item>
            <Form.Item hasFeedback label="Detail" name="detail" valuePropName="data" getValueFromEvent={(event, editor) => {
              const data = editor?.getData();
              if (data)
                return data;
              return '';
            }}
              rules={requiredFieldRule}
            >
              <CKEditor
                config={{
                  ckfinder: {
                    // Upload the images to the server using the CKFinder QuickUpload command
                    // You have to change this address to your server that has the ckfinder php connector
                    uploadUrl: process.env.REACT_APP_BASE_API + '/file/ckeditor/upload'
                  }
                }}
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
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item hasFeedback label="Retail Price" name="retailPrice" rules={requiredFieldRule}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item hasFeedback label="Whole sale Price" name="wholeSalePrice" rules={requiredFieldRule}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item hasFeedback label="Retail original Price" name="retailOriginalPrice" rules={requiredFieldRule}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item hasFeedback label="Whole sale original Price" name="wholeSaleOriginalPrice" rules={requiredFieldRule}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item hasFeedback label="Sku" name="sku" rules={requiredFieldRule}>
              <Input />
            </Form.Item>
            <Form.Item hasFeedback
              label="Status"
              name="status"
              valuePropName="checked"
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
          </Form>}
        </Col>
      </Row>
    </Card>
    <ProductImage id ={id}/>
    </>
  );
}

export default ProductDetail;
