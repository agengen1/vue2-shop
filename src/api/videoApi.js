import axios from "axios"

/**
 * 获取视频列表
 * @param {string | number}  type 视频类型   
 * @param {string | number}  page 视频页数
*/
export function getVideoListapi(type, page) {
    return axios.post("https://fc-mp-cc9def39-a2c5-4a82-886d-6c9225613652.next.bspapp.com/video/getVideoType", {
        type, page
    })
}


/**
 * 获取视频详情
 * @param {string | number}  id 视频id   
*/
export function getVideoDetailsapi(id) {
    return axios.post("https://fc-mp-cc9def39-a2c5-4a82-886d-6c9225613652.next.bspapp.com/video/getvideoInfo", {
        id
    })
}