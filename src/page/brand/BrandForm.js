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
import * as brandApi from '../../api/brandApi';
import { useHistory, useLocation, useParams } from 'react-router';
export default function BrandForm(props){
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);
    const requiredFieldRule = [{ required: true, message: 'Required Field' }];
    const history = useHistory();
    const [isUpdate, setIsUpdate] = useState(false);
    const {id} = useParams();
    const createData = async (data) =>{
        try{
            setLoading(true);
            const response = await brandApi.create(data);
            if(response.status === 201){
                message.success('Thêm nhãn hàng thành công');
                setIsRedirect(true);
            }
        }catch(e){
            if(e.response.data?.message){
                message.error(e.response.data.message);
            }else{
                message.error('Thêm nhãn hàng thất bại');
            }
            
        }finally{
            setLoading(false);
        }
    }
    const updateData = async (data) => {
        try{
            setLoading(true);
            const response = await brandApi.updateById(id,data);
            if(response.status === 200){
                message.success('Cập nhật nhãn hàng thành công');
                setIsRedirect(true);
            }
        }catch(e){
            if(e.response.data?.message){
                message.error(e.response.data.message);
            }else{
                message.error('Cập nhật nhãn hàng thất bại');
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
            const response = await brandApi.getById(id);
            // console.log(response);
            form.setFieldsValue(response.data.data);
        }catch(e){
            if(e.response.data?.message){
                message.error(e.response.data.message);
            }else{
                message.error('Lỗi khi lấy chi tiết nhãn hàng');
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
        history.push('/brands');
      }
  }, [isRedirect])
  return (
    <Card title="Thêm/Cập nhật nhãn hàng" loading={loading}>
      <Row justify="center">
        <Col span={12}>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            form={form}
            name="brand-form"
            onFinish={handleSave}
          >
            <Form.Item label="Tên" name="name" rules={requiredFieldRule}>
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