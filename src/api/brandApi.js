import request from "./baseApi"

const query = (name, offset, limit) =>{
    return request().get(`/brands?name=${name}&offset=${offset}&limit=${limit}`);
}
export {
    query
}