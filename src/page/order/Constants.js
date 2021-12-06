import React from 'react';
import { Tag } from 'antd';

export const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Mã đơn hàng',
    dataIndex: 'orderNumber',
    key: 'orderNumber',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Tên khách',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Trạng thái đơn',
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
    title: 'Số lượng sản phẩm',
    dataIndex: 'itemsCount',
    key: 'itemsCount',
  },
  {
    title: 'Phương thức thanh toán',
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
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    key: 'note',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Phí ship',
    dataIndex: 'shippingFee',
    key: 'shippingFee',
  },
  // {
  //   title: 'Create User',
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: 'Create Time',
  //   dataIndex: 'createTime',
  //   key: 'createTime',
  // },
  // {
  //   title: 'Update User',
  //   dataIndex: 'updateUser',
  //   key: 'updateUser',
  // },
  // {
  //   title: 'Update Time',
  //   dataIndex: 'updateTime',
  //   key: 'updateTime',
  // },
  {
    title: 'Trạng thái',
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