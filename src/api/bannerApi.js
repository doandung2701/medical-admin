import request from "./baseApi"

const getAllBanner = () =>{
    return request().get(`/collections/banner`);
}
const updateBanner = (body) => {
    return request().put(`/collections/banner`,body);
}
export {
    getAllBanner,
    updateBanner
}