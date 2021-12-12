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
import * as tagApi from '../../api/tagApi';
import * as activeElementApi from '../../api/activeElementApi';
import { useHistory, useParams } from 'react-router';
import ProductImage from './ProductImage';
import { filterSelectOption } from '../../helpers/queryHelper';
const { Option } = Select;

function ProductDetail() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeElements, setActiveElements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const handleSave = async values => {
    // call save API
    try {
      setLoading(true);
      const { status } = values;
      if (status) {
        values.status = 1;
      } else {
        values.status = 0;
      }
      const response = await productAPi.update(id, values);
      if (response.status === 200) {
        message.success('Cập nhật thành công');
        setIsRedirect(true);
      }
    } catch (e) {
      if (e.response.data?.message) {
        message.error(e.response.data.message);
      } else {
        message.error('Cập nhật thất bại');
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
    } finally {
      setLoading(false);
    }
  }
  const getDetail = async (id) => {
    try {
      setLoading(true);
      const response = await productAPi.getDetailById(id);
      if (response.status === 200)
        if (response.data.data) {
          form.setFieldsValue(response.data.data);
        }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }
  const getTags = async () => {
    try {
      setLoading(true);
      const response = await tagApi.getAll();
      if (response.status === 200)
        setTags(response.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  const getActiveElements = async () => {
    try {
      setLoading(true);
      const response = await activeElementApi.getAll();
      if (response.status === 200)
        if (response.data.data)
          setActiveElements(response.data.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getBrands();
    getOrigins();
    getCategories();
    getTags();
    getActiveElements();
  }, []);
  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);
  const requiredFieldRule = [{ required: true, message: 'Không được trống' }];

  return (
    <>
      <Card title="Cập nhật sản phẩm" loading={loading}>
        <Row justify="center">
          <Col span={24}>
            {<Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              form={form}
              name="product-form"
              onFinish={handleSave}
            >
              <Form.Item hasFeedback label="Tên" name="name" rules={requiredFieldRule}>
                <Input />
              </Form.Item>
              <Form.Item label="Mô tả" name="description" rules={requiredFieldRule}>
                <Input />
              </Form.Item>
              <Form.Item hasFeedback label="Chi tiết" name="detail" valuePropName="data" getValueFromEvent={(event, editor) => {
                const data = editor?.getData();
                if (data)
                  return data;
                return '';
              }}
                
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
              <Form.Item hasFeedback label="Nhãn hàng" name="brandId" rules={requiredFieldRule}>
                <Select allowClear showSearch clearIcon filterOption={filterSelectOption}>
                  {brands.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item hasFeedback label="Xuất xứ" name="originId" rules={requiredFieldRule}>
                <Select allowClear showSearch clearIcon filterOption={filterSelectOption}>
                  {origins.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item hasFeedback label="Tag" name="tags">
                <Select allowClear showSearch clearIcon mode={'multiple'} filterOption={filterSelectOption}>
                  {tags.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.tag}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item hasFeedback label="Hoạt tính" name="activeElements">
              <Select allowClear showSearch clearIcon mode={'multiple'} filterOption={filterSelectOption}>
                {activeElements.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
              <Form.Item hasFeedback label="Danh mục" name="categoryId" rules={requiredFieldRule}>
                <TreeSelect allowClear clearIcon showSearch treeDefaultExpandAll treeData={categories} />
              </Form.Item>
              <Form.Item hasFeedback label="Số lượng sẵn có" name="availableQuantity" rules={requiredFieldRule}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item hasFeedback label="Giá lẻ" name="retailPrice" rules={requiredFieldRule}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item hasFeedback label="Giá sỉ" name="wholeSalePrice" rules={requiredFieldRule}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item hasFeedback label="Sku" name="sku" rules={requiredFieldRule}>
                <Input />
              </Form.Item>
              <Form.Item hasFeedback
                label="Trạng thái"
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
                  Lưu
                </Button>
              </Row>
            </Form>}
          </Col>
        </Row>
      </Card>
      <ProductImage id={id} />
    </>
  );
}

export default ProductDetail;
