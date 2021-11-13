import request from "./baseApi"

const query = (name, offset, limit) =>{
    return request().get(`/brands?name=${name}&offset=${offset}&limit=${limit}`);
}
const create = (body) => {
    return request().post(`/brands`,body);
}
const getById = (id) => {
    return request().get(`/brands/${id}`);
}
const updateById = (id,data) => {
    return request().put(`/brands/${id}`,data);
}
const softDeleteById = (id) => {
    return request().delete(`/brands/${id}`);
}
const getAll = () => {
    return request().get(`/brands/getAll`);
}
export {
    query,
    create,
    getById,
    updateById,
    softDeleteById,
    getAll
}