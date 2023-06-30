import axios from "@/utils/request"

/**
 * 获取新闻资讯列表
 *
*/
export function getNewsListapi(){
    return axios.get("/news/list")
}

/**
 * 获取新闻详情
 * @param {string|number} id 新闻id
*/
export function getNewsDetailsapi(id){
    return axios.get(`/news/show?id=${id}`)
}