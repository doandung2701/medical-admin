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
  } from 'antd';
  import * as activeElementApi from '../../api/activeElementApi';
  import { useHistory, useLocation, useParams } from 'react-router';
export default function ActiveElementForm(props){
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);
    const requiredFieldRule = [{ required: true, message: 'Bắt buộc nhập' }];
    const history = useHistory();
    const [isUpdate, setIsUpdate] = useState(false);
    const {id} = useParams();
    const createData = async (data) =>{
        try{
            setLoading(true);
            const response = await activeElementApi.create(data);
            if(response.status === 201){
                message.success('Thêm hoạt chất thành công');
                setIsRedirect(true);
            }
        }catch(e){
            if(e.response.data?.message){
                message.error(e.response.data.message);
            }else{
                message.error('Thêm hoạt chất thất bại');
            }
            
        }finally{
            setLoading(false);
        }
    }
    const updateData = async (data) => {
        try{
            setLoading(true);
            const response = await activeElementApi.updateById(id,data);
            if(response.status === 200){
                message.success('Cập nhật hoạt chất thành công');
                setIsRedirect(true);
            }
        }catch(e){
            if(e.response.data?.message){
                message.error(e.response.data.message);
            }else{
                message.error('Cập nhật hoạt chất thất bại');
            }
            
        }finally{
            setLoading(false);
        }
    }
    const handleSave = async (values) => {
        // call save API
        if(isUpdate){
            updateData(values);
        }else{
            createData(values);
        }
        
    };
  useEffect(() => {
      const getDetailById = async () => {
        try{
            setLoading(true);
            const response = await activeElementApi.getById(id);
            form.setFieldsValue(response.data.data);
        }catch(e){
            if(e.response.data?.message){
                message.error(e.response.data.message);
            }else{
                message.error('Lỗi khi lấy chi tiết hoạt chất');
            }
            setIsRedirect(true);
        }finally{
            setLoading(false);
        }
      }
    if(id){
        setIsUpdate(true);
        getDetailById();
    }
}, [id]);
  useEffect(() => {
      if(isRedirect){
        history.push('/activeElements');
      }
  }, [isRedirect])
  return (
    <Card title="Thêm/Cập nhật hoạt chất" loading={loading}>
      <Row justify="center">
        <Col span={12}>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            form={form}
            name="active-element-form"
            onFinish={handleSave}
          >
            <Form.Item label="Tên" name="name" rules={requiredFieldRule}>
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="content">
              <Input />
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