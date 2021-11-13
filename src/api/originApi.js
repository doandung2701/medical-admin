import { buildQueryParam } from "../helpers/queryHelper";
import request from "./baseApi"

const query = (query) =>{
    return request().get(`/origins?${buildQueryParam(query)}`);
}
const create = (body) => {
    return request().post(`/origins`,body);
}
const getById = (id) => {
    return request().get(`/origins/${id}`);
}
const updateById = (id,data) => {
    return request().put(`/origins/${id}`,data);
}
const softDeleteById = (id) => {
    return request().delete(`/origins/${id}`);
}
const getAll = () => {
    return request().get(`/origins/getAll`);
}
export {
    query,
    create,
    getById,
    updateById,
    softDeleteById,
    getAll
}