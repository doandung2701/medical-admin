import React from 'react';
import { Tag } from 'antd';

export const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Create User',
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: 'Create Time',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: 'Update User',
    dataIndex: 'updateUser',
    key: 'updateUser',
  },
  {
    title: 'Update Time',
    dataIndex: 'updateTime',
    key: 'updateTime',
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
  },
];