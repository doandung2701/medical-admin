import { buildQueryParam } from "../helpers/queryHelper";
import request from "./baseApi"

const query = (query) =>{
    return request().get(`/customers?${buildQueryParam(query)}`);
}
const updateRole = (id,body) => {
    return request().post(`/customers/${id}/role`,body);
}
export {
    query,
    updateRole
}