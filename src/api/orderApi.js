import axios from "@/utils/request";

/**
 * 创建订单
 * @param {string|number} address	收货地址id	
 * @param {string} note	备注信息	
 * @param {Array} goods	购买商品信息数组	[{"id":"109","count":5,"selected":true},{"id":"111","count":23,"selected":true}]

*/
export function CreateOrderapi(address, note, goods) {
  return axios.post("/order/create", {
    address,
    note,
    goods,
  });
}

/**
 * 查询订单列表
 */
export function getOrderListapi() {
  return axios.get("order/list");
}

/**
 * 查询订单详情
 * @param {string|number} id 订单id
 */
export function getOrderDetailsapi(id) {
  return axios.get(`/order/show?id=${id}`);
}

/**
 * 取消订单
 * @param {string|number} id 订单id
 */
export function CancelOrderapi(id) {
  return axios.post("/order/cancel", {
    id,
  });
}
