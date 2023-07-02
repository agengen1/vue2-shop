import { Toast } from 'vant';
export default {
    namespaced: true,
    state: {
        shopList: [] //商品数据
    },
    mutations: {
        PUSHSHOPLIST(state, obj) {
            let list = state.shopList.filter((item) => {
                return item.id == obj.id
            })
            if (list.length > 0) {
                return Toast.fail("购物车已存在")
            }
            let newList = state.shopList.filter((item) => {
                return item.id != obj.id
            })
            state.shopList = [...newList, obj]
            return Toast.success("购物车添加成功！")
        },
        SETSELECTED(state, obj) {
            state.shopList.forEach((item) => {
                if (item.id == obj.id) {
                    item.selected = obj.flag
                }
            })
        },
        SETALLSELECTED(state, flag) {
            state.shopList.forEach((item) => {
                item.selected = flag
            })
        },
        SETCOUNT(state, obj) {
            state.shopList.forEach((item) => {
                if (item.id == obj.id) {
                    item.shopCount = obj.count
                }
            })
        },
        POPSHOPLIST(state, objId) {
            state.shopList = state.shopList.filter((item) => {
                return item.id != objId
            })
            Toast.success("删除成功！")
        },
        CLEARSHOPLIST(state){
            state.shopList = []
        }
    },
}