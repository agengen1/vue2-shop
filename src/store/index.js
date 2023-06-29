import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/user.js"
import shopCart from "@/store/shopCart.js"
Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    user,
    shopCart,
  }
})
