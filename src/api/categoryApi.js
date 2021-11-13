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
const checkOrderValid = (order,parentId)=>{
    return request().get(`/category/displays/order/checkValidOrder?order=${order}&parentId=${parentId?parentId:''}`);
}
const create = (cat) => {
    return request().post(`/category`,cat);
}
const checkUpdateOrderValid = (order,id) => {
    return request().get(`/category/displays/order/checkUpdateOrderValid?order=${order}&id=${id}`);
}
const getAllCategory = () => {
    return request().get(`/category/getAll`);
}
export {
    getCategoryByLevel,
    getCategoryByParentId,
    getCategoryDetailById,
    updateCategory,
    updateDisplayOrder,
    deleteById,
    checkOrderValid,
    create,
    checkUpdateOrderValid,
    getAllCategory
}