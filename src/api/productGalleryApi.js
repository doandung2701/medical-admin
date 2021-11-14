import { buildQueryParam } from "../helpers/queryHelper";
import request from "./baseApi"
const getAllByProductId = (id) => {
    return request().get(`/product-gallery/product/${id}`);
}
const createBatch = (id,data) => {
    return request().post(`/product-gallery/${id}`,data);
}
export {
   getAllByProductId,
   createBatch
}