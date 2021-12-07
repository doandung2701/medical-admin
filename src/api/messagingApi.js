import request from "./baseApi"

const sendNotification = (body) => {
    return request().post(`/messaging/notification`, body);
}
export {
    sendNotification
}