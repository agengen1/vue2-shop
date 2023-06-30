import axios from "@/utils/request.js"

/**
 * 获取收货地址列表
 *
*/
export function getAddressapi(){
    return axios.get("/address")
}

/**
 * 保存收货地址
 * @param {string}  name	收货人姓名	
 * @param {string}  tel	  手机号码	
 * @param {string}  area	收货地址	
 * @param {string}  detail	详细地址	
 * @param {string | number} id	可选参数，如果有id表示做编辑操作，如果没有id参数表示做新增操作响应参数
*/
export function saveAddress_infoapi(name,tel,area,detail,id=null){
    if(id!=null){
        return axios.post("/address/save",{
            name,tel,area,detail,id
        })
    }else{
        return axios.post("/address/save",{
            name,tel,area,detail
        })
    }
    
}


/**
 * 需要修改的收货地址详细获取
 * @param {string | number}  id 要修改的收货ID   
*/
export function editAddressapi(id){
    return axios.get(`/address/edit?id=${id}`)
}


/**
 * 删除收货地址
 * @param {string | number}  id 要删除的收货ID   
*/
export function deleteAddressapi(id){
    return axios.post("/address/del",{id})
}


/**
 * 获取默认收货地址
 *
*/
export function getAddress_defapi(){
    return axios.get("address/def")
}