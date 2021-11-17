import React, { useState } from 'react';
import { Dropdown, Menu, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

function useActionMenu({ selectedRow, updateEntityPath,callbackDelete,additionActionMenu = null }) {
  const history = useHistory();
  const [selectedDeleteItem, setSelectedDeleteItem] = useState();
  const handleMenuClick = ({ item, key, keyPath, domEvent }) => {
    if (key === 'edit') {
      const updatePath = '/' + updateEntityPath + '/' + selectedRow.id;
      history.push(updatePath);
    }
  };

  const handleSingleDelete = () => {
    setSelectedDeleteItem(selectedRow);
  };
 const handleCustomAction = () => {
  setSelectedDeleteItem(selectedRow);
 }
  const actionMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">
        <EditOutlined />
        Update/View Detail
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm
          title="Sure to delete?"
          placement="left"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={handleSingleDelete}
        >
          <DeleteOutlined type="delete" />
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const actionColumnView = (
    <span>
      <Dropdown overlay={actionMenu} trigger={['click']} arrow>
        <a className="ant-dropdown-link" href="#">
          Actions <DownOutlined />
        </a>
      </Dropdown>
    </span>
  );

  return [actionColumnView, selectedDeleteItem];
}

export default useActionMenu;
