import React, { useEffect, useState } from 'react';
import useDataTable from '../../component/DataTable';
import * as constants from './Constants';
import * as customerApi from '../../api/customerApi';
import { useHistory } from 'react-router';
import { Col, Row, Form, Input, Button, Select, Divider, Table, Dropdown, Menu, Modal, message } from 'antd';
import { PlusOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { DEFAULT_LIMIT_SIZE } from '../../globalConstants';
const { Option } = Select;
const DEFAULT_PAGE_NUMBER = 0;
function ShowCustomers() {
  const form = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(DEFAULT_LIMIT_SIZE);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [role, setRole] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [query, setQuery] = useState({
    name: null,
    role: null
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (values) => {
    setQuery(values);
  }
  useEffect(() => {
    const searchRequest = async () => {
      try {
        const { name, role } = query;
        // let title = '';
        // let status = ' ';
        setLoading(true);
        const response = await customerApi.query({
          name: name,
          role: role,
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
  }, [currentPage, pageSize, query]);
  const updatedColumns = [
    ...constants.columns,
    {
      title: 'Action',
      key: 'action',
      render: () => actionColumnView,
    },
  ];
  const handleTableChange = pagination => {
    setCurrentPage(pagination.current - 1);
  };
  const resetPagination = () => {
    setCurrentPage(DEFAULT_PAGE_NUMBER);
  };
  const handleMenuClick = ({ item, key, keyPath, domEvent }) => {
    if (key === 'edit') {
      console.log(selectedRow);
      setVisible(true);
    }
  }
  const actionMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">
        <EditOutlined />
        Update Role
      </Menu.Item>
    </Menu>
  );
  const actionColumnView = (
    <span>
      <Dropdown overlay={actionMenu} trigger={['click']} arrow>
        <a className="ant-dropdown-link" href="#">
          Actions <DownOutlined />
        </a>
      </Dropdown>
    </span>
  );
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = async () => {
    if (!role || role === '') {
      message.warning('Bạn chưa chọn quyền');
      return;
    }
    if (role === selectedRow.role)
      return;
    try {
      setLoading(true);
      setConfirmLoading(true);
      const { id } = selectedRow;
      const response = await customerApi.updateRole(id, {
        role:role
      });
      if (response.status === 200) {
        setVisible(false);
        const selectedIndx= data.findIndex(x=>x.id===id);
        data[selectedIndx]={
          ...data[selectedIndx],
          role:role
        };
        setData([...data]);
        message.success('Update role success');
      }
    } catch (e) {
      if (e.response.data?.message) {
        message.error(e.response.data.message);
      } else {
        message.error('Update role error');
      }
    } finally {
      setLoading(false);
      setConfirmLoading(false);
    }
  }
  return (
    <>
      <Modal
        title="Update role"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        closable={false}
        maskClosable={false}
      >
        <Select onChange={(role) => setRole(role)} style={{ width: '100%' }} defaultValue={selectedRow?.role}>
          <Option value={'ROLE_RETAIL'}>
            Lẻ
          </Option>
          <Option value={'ROLE_HOLE_SALE'}>
            Sỉ
          </Option>
        </Select>
      </Modal>
      <Row>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Form
          name="customer-search-form"
          // form={form}
          onFinish={handleSearch}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          style={{ width: '100%' }}
        >
          <Row gutter={[48, 16]}>
            <Col span={8}>
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Role" name="role">
                <Select allowClear clearIcon >
                  <Option value={'ROLE_RETAIL'}>
                    Lẻ
                  </Option>
                  <Option value={'ROLE_HOLE_SALE'}>
                    Sỉ
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
      <Table
        loading={loading}
        rowKey={record => record.id}
        columns={updatedColumns}
        dataSource={data}
        scroll={{ x: 1500 }}
        onRow={record => {
          return {
            onClick: () => {
              setSelectedRow(record);
            },
          };
        }}
        onChange={handleTableChange}
        pagination={{
          pageSize: DEFAULT_LIMIT_SIZE,
          current: currentPage + 1,
          total: total,
          showTotal: (total, range) => {
            return `${range[0]}-${range[1]} of ${total} items`;
          },
        }}
      />
    </>
  );
}

export default ShowCustomers;
