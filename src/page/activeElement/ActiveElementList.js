import Header from '../../component/Header';
import React, { useEffect, useState } from 'react';
import useDataTable from '../../component/DataTable';
import * as constants from './Constants';
import { DEFAULT_LIMIT_SIZE } from '../../globalConstants';
import * as activeElementApi from '../../api/activeElementApi';
export default function ActiveElementList(props) {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const hanldeDelete = async (selectedRow) => {
        try {
            setLoading(true);
            const response = await activeElementApi.softDeleteById(selectedRow.id);
            if (response && response.status === 200) {
                searchRequest();
            }
        } catch (e) {
            if (e.response.data?.message) {
                message.error(e.response.data.message);
            } else {
                message.error('Lỗi khi xóa tag');
            }
        } finally {
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
        updateEntityPath: 'activeElements',
        total,
        loading
    });
    const handleSearch = async (values) => {
        // setName(values);
        searchRequest(values);
    }
    const searchRequest = async (values = null) => {
        try {
            setLoading(true);
            const response = await activeElementApi.getAll({
                name: values
            });
            if (response && response.status === 200) {
                const data = response.data.data;
                setTotal(data.length);
                setData(data);
            }
        } catch (e) {
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        searchRequest();
    }, []);
    useEffect(() => {
        if (deleteItem)
            hanldeDelete(deleteItem);
    }, [deleteItem]);
    return (
        <>
            <Header addNewPath="add-activeElement" hasSelected={hasSelected} handleSearch={handleSearch} />
            <DataTable />
        </>
    );
}