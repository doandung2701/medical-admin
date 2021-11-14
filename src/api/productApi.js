import { buildQueryParam } from "../helpers/queryHelper";
import request from "./baseApi"
const create = (body) => {
    return request().post(`/product`,body);
}
const search = (query) => {
    return request().get(`/product?${buildQueryParam(query)}`)
}
const getDetailById = id => {
    return request().get(`/product/detail/${id}`);
}
const update = (id,body) => {
    return request().put(`/product/${id}`,body);
}
export {
    create,
    search,
    getDetailById,
    update
}