import request from "./baseApi"

const create = (body) => {
    return request().post(`/tags`,body);
}
const getById = (id) => {
    return request().get(`/tags/${id}`);
}
const updateById = (id,data) => {
    return request().put(`/tags/${id}`,data);
}
const softDeleteById = (id) => {
    return request().delete(`/tags/${id}`);
}
const getAll = () => {
    return request().get(`/tags/getAll`);
}
export {
    create,
    getById,
    updateById,
    softDeleteById,
    getAll
}