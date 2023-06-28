import axios from "@/utils/request"

/**
 * 获取商品分类
 *
*/
export function getShopClassapi(){
    return axios.get("category")
}

/**
 * 获取商品列表
 * @param {string|number} id 商品分类id
*/
export function getShopListapi(id){
    return axios.get(`goodslist?category_id=${2}`)
}

/**
 * 获取商品详情（一个）
 * @param {string|number} id 商品id
*/
export function getShopDetailsapi(id){
    return axios.get(`goodsinfo?id=${id}`)
}

/**
 * 获取商品详情（多个）
 * @param {Array} ids 商品id数组
*/
export function getShopDetailsArrayapi(ids){
    return axios.get(`shopcart?ids=${ids}`)
}