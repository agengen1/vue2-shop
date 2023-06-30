import axios from "@/utils/request"

/**
 * 获取图片分类
 *
*/
export function getImgSharingClassapi(){
    return axios.get("/photo/getimgcategory")
}

/**
 * 获取图片列表
 * @param {string|number} id 图片分类id
*/
export function getImgSharingListapi(id){
    return axios.get(`/photo/getimages?id=${id}`)
}

/**
 * 获取图片列表数据详情
 * @param {string|number} id 图片列表数据id
*/
export function getImgSharingDetailsapi(id){
    return axios.get(`/photo/getimageInfo?id=${id}`)
}

/**
 * 获取图片列表数据详情中的图片列表
 * @param {string|number} id 图片列表数据id
*/
export function getImgSharingDetailsImgListapi(id){
    return axios.get(`/photo/getthumimages?id=${id}`)
}