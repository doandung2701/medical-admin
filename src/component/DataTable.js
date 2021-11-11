import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import useActionMenu from './ActionMenu';
import { DEFAULT_LIMIT_SIZE } from '../globalConstants';

const DEFAULT_PAGE_NUMBER = 0;

function useDataTable({ columns, dataSource, updateEntityPath, total }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(DEFAULT_LIMIT_SIZE);
  const [actionColumnView] = useActionMenu({ selectedRow, updateEntityPath });

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: selected => {
      setSelectedRowKeys(selected);
    },
  };

  const updatedColumns = [
    ...columns,
    {
      title: 'Action',
      key: 'action',
      render: () => actionColumnView,
    },
  ];

  useEffect(() => {
    console.log('columns:', columns);
    console.log('datasoure:', dataSource);
    console.log('updateColumns:', updatedColumns);
  });

  const handleSingleDelete = () => {
    console.log('handleSingleDelete, selected:', selectedRow);
  };

  const resetPagination = () => {
    setCurrentPage(DEFAULT_PAGE_NUMBER);
  };

  const handleTableChange = pagination => {
    console.log('pagination:', pagination);
    setCurrentPage(pagination.current - 1);
  };

  const DataTable = () => (
    <Table
      rowKey={record => record.id}
      rowSelection={rowSelection}
      columns={updatedColumns}
      dataSource={dataSource}
      onRow={record => {
        return {
          onClick: () => {
            setSelectedRow(record);
          },
        };
      }}
      onChange={handleTableChange}
      pagination={{
        pageSize: DEFAULT_LIMIT_SIZE,
        current: currentPage + 1,
        total: total,
        showTotal: (total, range) => {
          return `${range[0]}-${range[1]} of ${total} items`;
        },
      }}
    />
  );

  return {
    DataTable,
    hasSelected,
    selectedRow,
    selectedRowKeys,
    currentPage,
    pageSize,
    resetPagination,
  };
}

export default useDataTable;
