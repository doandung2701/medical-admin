import React from 'react';
import { Tag } from 'antd';

export const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: status => {
      if(status === 'DRAFT'){
        return (
          <Tag color={'green'}>
            DARF
          </Tag>
        );
      }else if (status === 'DISABLED'){
        return (
          <Tag color={'red'}>
            DISABLED
          </Tag>
        );
      }else{
        return (
          <Tag color={'blue'}>
            PUBLIC
          </Tag>
        );
      }
    },
  },
];