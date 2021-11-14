import request from "./baseApi"
const create = (body) => {
    return request().post(`/product`,body);
}

export {
    create
}