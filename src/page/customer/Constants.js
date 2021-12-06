import React from 'react';
import { Tag } from 'antd';

export const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Uid',
    dataIndex: 'uid',
    key: 'uid',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'SĐT',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Tên',
    dataIndex: 'displayName',
    key: 'displayName',
  },
  {
    title: 'Quyền',
    dataIndex: 'role',
    key: 'role',
    render: role => {
      if(role === 'ROLE_RETAIL'){
        return (
          <Tag color={'green'}>
            Lẻ
          </Tag>
        );
      }else if (role === 'ROLE_HOLE_SALE'){
        return (
          <Tag color={'red'}>
            Sỉ
          </Tag>
        );
      }else{
        return (
          <Tag color={'blue'}>
            Super
          </Tag>
        );
      }
    },
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: status => {
      if(status == 1){
        return (
          <Tag color={'green'}>
            Hoạt động
          </Tag>
        );
      }else{
        return (
          <Tag color={'red'}>
            Vô hiệu hóa
          </Tag>
        );
      }
    },
  }
];