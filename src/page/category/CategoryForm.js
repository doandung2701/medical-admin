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
    Progress,
} from 'antd';
import { useHistory, useLocation, useParams } from 'react-router';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getBase64, normFile } from '../../helpers/fileHelper';
import request from '../../api/baseApi';
import { stringToSlug } from '../../helpers/queryHelper';
import * as categoryApi from '../../api/categoryApi';

export default function CategoryForm(props) {
    const location = useLocation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [photo, setphoto] = useState();
    const parentId = new URLSearchParams(location.search).get('parentId');
    const { id } = useParams();
    const requiredFieldRule = [{ required: true, message: 'Trường không được để trống' }];
    const history = useHistory();
    const [progress, setProgress] = useState(0);
    const [isRedirect, setIsRedirect] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ upload được file định dạng JPG/PNG!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Ảnh upload phải nhỏ hơn 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    const handleSave = async values => {
        if (!isUpdate) {
            handleCreate(values);
        } else {
            handleUpdate(values);
        }
    }
    const handleUpdate = async values => {
        values.photo = photo;
        try {
            setLoading(true);
            const response = await categoryApi.updateCategory(id,values);
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
    const handleCreate = async values => {
        values.photo = photo;
        if (parentId)
            values['parentId'] = parentId;
        try {
            setLoading(true);
            const response = await categoryApi.create(values);
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

            onSuccess("Ok");
            setphoto(res.data.data);
        } catch (err) {
            const error = new Error("Some error");
            onError({ err });
        }
    };
    const handleGenSlug = () => {
        const name = form.getFieldValue('name');
        if (name && name.trim().length > 0) {
            form.setFieldsValue({
                slug: stringToSlug(name.trim())
            })
        }
    }
    useEffect(() => {
        if (isRedirect) {
            history.push('/categories');
        }
    }, [isRedirect]);
    useEffect(() => {
        const getDetailById = async () => {
            try {
                setLoading(true);
                const response = await categoryApi.getCategoryDetailById(id);
                form.setFieldsValue(response.data.data);
                if (response.data.data.photo)
                    setphoto(response.data.data.photo);
            } catch (e) {
                if (e.response?.data?.message) {
                    message.error(e.response.data.message);
                } else {
                    message.error('Đã có lỗi xảy ra khi lấy chi tiết danh mục');
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
    return (
        <Card title={isUpdate ? 'Cập nhật danh mục' : 'Thêm mới danh mục'} loading={loading}>
            <Row justify="center">
                <Col span={12}>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                        form={form}
                        name="category-form"
                        onFinish={handleSave}
                    >
                        <Form.Item label="Tên" name="name" hasFeedback rules={requiredFieldRule}>
                            <Input onBlur={handleGenSlug} />
                        </Form.Item>
                        <Form.Item label="Mô tả" name="description" hasFeedback rules={requiredFieldRule} >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Slug" name="slug" hasFeedback rules={requiredFieldRule}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Ảnh" name="photo"
                        >
                            <Upload

                                name="photo"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                customRequest={uploadImage}
                                beforeUpload={beforeUpload}
                            >
                                {photo ? <img src={photo} alt="photo" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
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