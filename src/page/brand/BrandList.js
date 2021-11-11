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
    const {
        DataTable,
        hasSelected,
        currentPage,
        pageSize,
        resetPagination,
    } = useDataTable({
        columns: constants.columns,
        dataSource: data,
        updateEntityPath: '/brands',
        total
    });
    useEffect(() => {
        const searchRequest = async () => {
            try {
                const response = await brandApi.query(name, currentPage * pageSize, pageSize);
                if(response && response.status === 206){
                   const totalCount= response.headers['x-total-count'];
                   console.log(totalCount);
                   const data = response.data.data;
                   setTotal(totalCount);
                   setData(data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        searchRequest();
    }, [currentPage, pageSize]);
    return (
        <>
            <Header addNewPath="add-brand" hasSelected={hasSelected} />
            <DataTable />
        </>
    );
}