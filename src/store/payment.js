export default {
    namespaced: true,
    state: {
        paymentShoplist:[],//要支付的商品列表
    },
    mutations: {
        PUSHPAYMENTSHOPLIST(state,arr){
            state.paymentShoplist = [...arr]
        },
        CLEARPAYMENTSHOPLIST(state){
            state.paymentShoplist = []
        }
    }
}