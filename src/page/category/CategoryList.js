import { Button, Col, Divider, message, Row, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  PlusOutlined
} from '@ant-design/icons';
import * as categoryApi from '../../api/categoryApi';
import { useHistory } from 'react-router';
function CategoryList(props) {
  const [data, setData] = useState([]);
  const [selectedNode, setSelectedNode] = useState();
  const history = useHistory();
  const handleAddNew = () => {
    if (selectedNode)
      history.push(`/add-category?parentId=${selectedNode}`);
    else
      history.push(`/add-category`);
  }
  const handleEdit = () => {
    history.push(`/categories/${selectedNode}`);
  }
 
  const onLoadData = ({ key, children }) => {
    return new Promise(async (resolve, reject) => {
      if (children) {
        resolve();
        return;
      }
      try {
        const response = await categoryApi.getCategoryByParentId(key);
        if (response.status === 200) {
          setData((origin) => updateTreeData(origin, key, transformData(response.data.data)));
          resolve();

        } else {
          resolve();
        }
      } catch (e) {
        resolve();
      }
    });
  }
  const updateTreeData = (list, key, children) => {
    return list.map((node) => {
      if (node.key === key) {
        return { ...node, children };
      }

      if (node.children) {
        return { ...node, children: updateTreeData(node.children, key, children) };
      }

      return node;
    });
  }
  const transformData = (data) => {
    return data.map(item => {
      return {
        key: item.id,
        title: item.name,
      }
    })
  }
  const onTreeSelect = (selectedKeys, { selected, selectedNodes, node, event }) => {
    if (selected) {
      setSelectedNode(selectedKeys[0]);
    } else {
      setSelectedNode(null);
    }
  }
  useEffect(() => {
    const getCategoryByLevel = async () => {
      try {
        const response = await categoryApi.getCategoryByLevel(1);
        if (response.status === 200) {
          setData(transformData(response.data.data));
        }
      } catch (e) {
        message.error('Load category error');
      }
    }
    getCategoryByLevel();
  }, []);
  return (
    <>
      <Row>
        <Col flex="auto">
          <Button
            icon={<PlusOutlined />}
            type="primary"
            style={{ float: 'right' }}
            onClick={handleAddNew}
          >
            Add New
          </Button>
          <Button
            icon={<PlusOutlined />}
            type="secondary"
            disabled={!selectedNode}
            style={{ float: 'right', marginRight:'10px' }}
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Col>
      </Row>
      <Divider />
      <Tree
        onSelect={onTreeSelect}
        treeData={data}
        loadData={onLoadData}
      />
    </>
  )
}
export default CategoryList;