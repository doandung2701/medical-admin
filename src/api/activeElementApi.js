import { buildQueryParam } from "../helpers/queryHelper";
import request from "./baseApi"

const create = (body) => {
    return request().post(`/activeElements`,body);
}
const getById = (id) => {
    return request().get(`/activeElements/${id}`);
}
const updateById = (id,data) => {
    return request().put(`/activeElements/${id}`,data);
}
const softDeleteById = (id) => {
    return request().delete(`/activeElements/${id}`);
}
const getAll = (query = {}) => {
    return request().get(`/activeElements/getAll?${buildQueryParam(query)}`);
}
export {
    create,
    getById,
    updateById,
    softDeleteById,
    getAll
}