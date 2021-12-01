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
    title: 'Phone',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Display name',
    dataIndex: 'displayName',
    key: 'displayName',
  },
  {
    title: 'Role',
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
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: status => {
      if(status == 1){
        return (
          <Tag color={'green'}>
            Active
          </Tag>
        );
      }else{
        return (
          <Tag color={'red'}>
            Disable
          </Tag>
        );
      }
    },
  }
];