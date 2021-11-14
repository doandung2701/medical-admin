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
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Available quantity',
    dataIndex: 'avalilableQuantity',
    key: 'avalilableQuantity',
  },
  {
    title: 'Retail price',
    dataIndex: 'retailPrice',
    key: 'retailPrice',
  },
  {
    title: 'Whole sale price',
    dataIndex: 'wholeSalePrice',
    key: 'wholeSalePrice',
  },
  {
    title: 'Original retail price',
    dataIndex: 'originalRetailPrice',
    key: 'originalRetailPrice',
  },
  {
    title: 'Original whole sale price',
    dataIndex: 'originalWholeSalePrice',
    key: 'originalWholeSalePrice',
  },
  {
    title: 'Origin',
    dataIndex: 'origin',
    key: 'origin',
  },
  {
    title: 'Sku',
    dataIndex: 'sku',
    key: 'sku',
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
  // {
  //   title: 'Category',
  //   key: 'category',
  //   dataIndex: 'category',
  //   render: tags => (
  //     <>
  //       {tags.map(tag => {
  //         let color = 'blue';
  //         if (tag === 'accessory') {
  //           color = 'volcano';
  //         } else if (tag === 'clothing') {
  //           color = 'geekblue';
  //         } else if (tag === 'jewellery') {
  //           color = 'green';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
];