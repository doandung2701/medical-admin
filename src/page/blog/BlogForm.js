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
} from 'antd';
import * as blogApi from '../../api/blogApi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { useHistory, useLocation, useParams } from 'react-router';
import request from '../../api/baseApi';
import './Style.less';

export default function BlogForm(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const requiredFieldRule = [{ required: true, message: 'Không được để trống' }];
  const history = useHistory();
  const [isUpdate, setIsUpdate] = useState(false);
  const [photo, setphoto] = useState();
  const [progress, setProgress] = useState(0);
  const { id } = useParams();
  const createData = async (data) => {
    try {
      setLoading(true);
      const response = await blogApi.create(data);
      if (response.status === 201) {
        message.success('Thêm mới thành công');
        setIsRedirect(true);
      }
    } catch (e) {
      if (e.response.data?.message) {
        message.error(e.response.data.message);
      } else {
        message.error('Thêm mới thất bại');
      }

    } finally {
      setLoading(false);
    }
  }
  const updateData = async (data) => {
    try {
      setLoading(true);
      const response = await blogApi.updateById(id, data);
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
  }
  const handleSave = async (values) => {
    // call save API
    if (isUpdate) {
      updateData(values);
    } else {
      createData(values);
    }

  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ được phép tải lên file định dạng JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('File kích thước phải bé hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  useEffect(() => {
    const getDetailById = async () => {
      try {
        setLoading(true);
        const response = await blogApi.getById(id);
        form.setFieldsValue(response.data.data);
        setphoto(response.data.data.thumbnail);
      } catch (e) {
        if (e.response.data?.message) {
          message.error(e.response.data.message);
        } else {
          message.error('Lỗi khi lấy chi tiết blog');
        }
        setIsRedirect(true);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      setIsUpdate(true);
      getDetailById();
    }
  }, [id]);
  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append("file", file);
    try {
      const res = await request().post(
        "/file/upload",
        fmData,
        config
      );

      onSuccess(res.data.data);
      setphoto(res.data.data);
    } catch (err) {
      const error = new Error("Some error");
      onError({ err });
      setphoto('');
    }
  };
  useEffect(() => {
    if (isRedirect) {
      history.push('/blogs');
    }
  }, [isRedirect]);
  const normFile = (e) => {
    return e?.fileList[0]?.response || photo;
  };
  return (
    <Card title={isUpdate ? 'Cập nhật blog' : 'Thêm mới blog'} loading={loading}>
      <Row justify="center">
        <Col span={12}>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            form={form}
            name="blog-form"
            onFinish={handleSave}
          >
            <Form.Item label="Tiêu đề" name="title" rules={requiredFieldRule}>
              <Input />
            </Form.Item>
            <Form.Item label="Nội dung rút gọn" name="subContent" rules={requiredFieldRule}>
              <Input />
            </Form.Item>
            <Form.Item hasFeedback label="Nội dung chi tiết" name="content" valuePropName="data" getValueFromEvent={(event, editor) => {
              const data = editor.getData();
              return data;
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
            <Form.Item label="Ảnh thubnail" name="thumbnail" rules={requiredFieldRule}
              getValueFromEvent={normFile} valuePropName="thumbnail"
            >
              <Upload
                name="thumbnail"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={uploadImage}
                beforeUpload={beforeUpload}
                maxCount={1}
              >
                {photo ? <img src={photo} alt="photo" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item label="Trạng thái" name="status" rules={requiredFieldRule}
            >
              <Select allowClear clearIcon >
                <Select.Option value={'DRAFT'}>
                  Nháp
                </Select.Option>
                <Select.Option value={'PUBLIC'}>
                  Công khai
                </Select.Option>
                <Select.Option value={'DISABLED'}>
                  Vô hiệu hóa
                </Select.Option>
              </Select>
            </Form.Item>
            <Divider />
            <Row justify="center">
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}