import React from 'react';
import { Tag } from 'antd';

export const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: status => {
      if(status === 'DRAFT'){
        return (
          <Tag color={'green'}>
            NHÁP
          </Tag>
        );
      }else if (status === 'DISABLED'){
        return (
          <Tag color={'red'}>
            VÔ HIỆU HÓA
          </Tag>
        );
      }else{
        return (
          <Tag color={'blue'}>
            CÔNG KHAI
          </Tag>
        );
      }
    },
  },
];