import Header from '../../component/Header';
import React, { useEffect, useState } from 'react';
import useDataTable from '../../component/DataTable';
import * as constants from './Constants';
import { DEFAULT_LIMIT_SIZE } from '../../globalConstants';
import * as originApi from '../../api/originApi';
export default function OriginList(props) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const hanldeDelete = async (selectedRow) => {
        try {
            setLoading(true);
            const response = await originApi.softDeleteById(selectedRow.id);
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
                message.error('Error when delete brand');
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
        updateEntityPath: 'origins',
        total,
        loading
    });
    const handleSearch = async (values) =>{
        setSearch(values);
    }
    useEffect(() => {
        const searchRequest = async () => {
            try {
                setLoading(true);
                const response = await originApi.query({
                    name: search,
                    code: search,
                    offset: currentPage * pageSize,
                    limit: pageSize
                });
                if(response && response.status === 206){
                   const totalCount= response.headers['x-total-count'];
                   console.log(totalCount);
                   const data = response.data.data;
                   setTotal(totalCount);
                   setData(data);
                }
            } catch (e) {
                console.log(e);
            }finally{
                setLoading(false);
            }
        }
        searchRequest();
    }, [currentPage, pageSize,search]);
    useEffect(() => {
        if(deleteItem)
            hanldeDelete(deleteItem);
    }, [deleteItem]);
    return (
        <>
            <Header addNewPath="add-origin" hasSelected={hasSelected}  handleSearch={handleSearch}/>
            <DataTable />
        </>
    );
}