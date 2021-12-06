import Header from '../../component/Header';
import React, { useEffect, useState } from 'react';
import useDataTable from '../../component/DataTable';
import * as constants from './Constants';
import { DEFAULT_LIMIT_SIZE } from '../../globalConstants';
import * as brandApi from '../../api/brandApi';
export default function BrandList(props) {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const hanldeDelete = async (selectedRow) => {
        try {
            setLoading(true);
            const response = await brandApi.softDeleteById(selectedRow.id);
            if(response && response.status === 200){
                let selectedId = data.findIndex(x => x.id === selectedRow.id);
                if(selectedId !== -1){
                    data[selectedId] = {
                        ...data[selectedId],
                        status: 0
                    }
                    setData([...data]);
                }
            }
        } catch (e) {
            if(e.response.data?.message){
                message.error(e.response.data.message);
            }else{
                message.error('Lỗi khi xóa nhãn hàng');
            }
        }finally{
            setLoading(false);
        }
    }
    const {
        DataTable,
        hasSelected,
        currentPage,
        pageSize,
        resetPagination,
        deleteItem
    } = useDataTable({
        columns: constants.columns,
        dataSource: data,
        updateEntityPath: 'brands',
        total,
        loading
    });
    const handleSearch = async (values) =>{
        setName(values);
    }
    useEffect(() => {
        const searchRequest = async () => {
            try {
                setLoading(true);
                const response = await brandApi.query(name, currentPage * pageSize, pageSize);
                if(response && response.status === 206){
                   const totalCount= response.headers['x-total-count'];
                   const data = response.data.data;
                   setTotal(totalCount);
                   setData(data);
                }
            } catch (e) {
            }finally{
                setLoading(false);
            }
        }
        searchRequest();
    }, [currentPage, pageSize,name]);
    useEffect(() => {
        if(deleteItem)
            hanldeDelete(deleteItem);
    }, [deleteItem]);
    return (
        <>
            <Header addNewPath="add-brand" hasSelected={hasSelected}  handleSearch={handleSearch}/>
            <DataTable />
        </>
    );
}