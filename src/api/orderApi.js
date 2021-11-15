import { buildQueryParam } from "../helpers/queryHelper";
import request from "./baseApi"

const query = (query) =>{
    return request().get(`/order?${buildQueryParam(query)}`);
}
const getDetailById = (id) => {
    return request().get(`/order/${id}`);
} 
export {
    query,
    getDetailById
}