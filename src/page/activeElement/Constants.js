import React from 'react';
import { Tag } from 'antd';

export const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
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
  },
];