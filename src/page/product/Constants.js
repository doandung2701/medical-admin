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
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Nhãn hàng',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Xuất xứ',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Số lượng sẵn có',
    dataIndex: 'availableQuantity',
    key: 'availableQuantity',
  },
  {
    title: 'Giá lẻ',
    dataIndex: 'retailPrice',
    key: 'retailPrice',
  },
  {
    title: 'Giá sỉ',
    dataIndex: 'wholeSalePrice',
    key: 'wholeSalePrice',
  },
  {
    title: 'Xuất xứ',
    dataIndex: 'origin',
    key: 'origin',
  },
  {
    title: 'Sku',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'Hoạt chất',
    dataIndex: 'activeElements',
    key: 'activeElements',
    render: activeElements => {
      if (activeElements && Array.isArray(activeElements) && activeElements.length > 0) {
        return activeElements.map(item => {
          return <Tag color={'green'}>
            {item.name}
          </Tag>
        });
      }
      return '';
    }
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: status => {
      if (status == 1) {
        return (
          <Tag color={'green'}>
            Hoạt động
          </Tag>
        );
      } else {
        return (
          <Tag color={'red'}>
            Vô hiệu hóa
          </Tag>
        );
      }
    },
  }
];