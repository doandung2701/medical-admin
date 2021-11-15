import React from 'react';
import { Tag } from 'antd';

export const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Order Number',
    dataIndex: 'orderNumber',
    key: 'orderNumber',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Customer name',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    render: state => {
      if (state === 'CREATED') {
        return (
          <Tag color={'default'}>
            Mới tạo
          </Tag>
        );
      } else if (state === 'PAID') {
        return (
          <Tag color={'warning'}>
            Đã thanh toán
          </Tag>
        );
      } else if (state === 'DELIVERY') {
        return (
          <Tag color={'processing'}>
            Đang vận chuyển
          </Tag>
        );
      } else if (state === 'CANCEL') {
        return (
          <Tag color={'error'}>
            Hủy đơn
          </Tag>
        );
      } else {
        return (
          <Tag color={'success'}>
            Hoàn thành
          </Tag>
        );
      }
    },
  },
  {
    title: 'Item count',
    dataIndex: 'itemsCount',
    key: 'itemsCount',
  },
  {
    title: 'Payment method',
    dataIndex: 'payMethod',
    key: 'payMethod',
    render: payMethod => {
      if (payMethod === 'DELIVERY') {
        return (
          <Tag color={'blue'}>
            Qua đơn vị giao vận
          </Tag>
        );
      } else {
        return (
          <Tag color={'success'}>
            Lấy tại cửa hàng
          </Tag>
        );
      }
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Shipping Fee',
    dataIndex: 'shippingFee',
    key: 'shippingFee',
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
      if (status == 1) {
        return (
          <Tag color={'green'}>
            Active
          </Tag>
        );
      } else {
        return (
          <Tag color={'red'}>
            Disable
          </Tag>
        );
      }
    },
  }
];