import request from "./baseApi"

const getCategoryByLevel = (level = 1) => {
    return request().get(`/category/level/${level}`);
}
const getCategoryByParentId = (parentId) => {
    return request().get(`/category/${parentId}`);
}
const getCategoryDetailById = (id) => {
    return request().get(`/category/detail/${id}`);
}
const updateCategory = (id,body) => {
    return request().put(`/category/detail/${id}`,body);
}
const updateDisplayOrder = (body) =>{
    return request().put(`/category/displays/order`,body);
}
const deleteById = (id) => {
    return request().delete(`/category/${id}`);
}
export {
    getCategoryByLevel,
    getCategoryByParentId,
    getCategoryDetailById,
    updateCategory,
    updateDisplayOrder,
    deleteById
}