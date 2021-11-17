import { buildQueryParam } from "../helpers/queryHelper";
import request from "./baseApi"

const query = (query) =>{
    return request().get(`/blogs?${buildQueryParam(query)}`);
}
const create = (body) => {
    return request().post(`/blogs`,body);
}
const getById = (id) => {
    return request().get(`/blogs/${id}`);
}
const updateById = (id,data) => {
    return request().put(`/blogs/${id}`,data);
}
const softDeleteById = (id) => {
    return request().delete(`/blogs/${id}`);
}
const getAll = () => {
    return request().get(`/blogs/getAll`);
}
export {
    query,
    create,
    getById,
    updateById,
    softDeleteById,
    getAll
}