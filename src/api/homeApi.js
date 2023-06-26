import axios from "@/utils/request.js"

/**
 * 获取轮播图
 *
*/
export function getSwipeapi(){
    return axios.get("/imglist")
}