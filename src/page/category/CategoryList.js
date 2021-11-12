import { Button, Col, Divider, message, Row, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    PlusOutlined
  } from '@ant-design/icons';
import * as categoryApi from '../../api/categoryApi';
import { useHistory } from 'react-router';
function CategoryList(props){
    const [data, setData] = useState([]);
    const history = useHistory();
    const  handleAddNew = () => {
        history.push('/add-category');
    }
    const onLoadData = ({key,children}) => {
        return new Promise(async (resolve, reject) => {
            debugger;
            if(children){
                resolve();
                return ;    
            }
            try{
                const response = await categoryApi.getCategoryByParentId(key);
                if(response.status === 200){
                    setData((origin)=>updateTreeData(origin, key,transformData(response.data.data)));
                    resolve();
                    
                }else{
                    resolve();
                }
            }catch(e){
                resolve();
            }
          });
    }
    const updateTreeData =(list, key, children) => {
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
    const transformData = (data)=>{
        return data.map(item=>{
            return {
                key: item.id,
                title: item.name,
            }
        })
    }
    useEffect(() => {
       const getCategoryByLevel = async () => {
            try{
                const response = await categoryApi.getCategoryByLevel(1);
                console.log(response);
                if(response.status === 200){
                    setData(transformData(response.data.data));
                }
            }catch(e){
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
        </Col>
      </Row>
      <Divider />
        <Tree
        treeData={data}
        loadData={onLoadData}
        />
        </>
    )
}
export default CategoryList;