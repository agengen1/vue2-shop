export default {
    namespaced: true,
    state: {
        userinfo: JSON.parse(window.localStorage.getItem('userinfo')) || {}, //用户信息
        token: window.localStorage.getItem('token') || "",
    },
    mutations: {
        SETTOKEN(state, value) {
            state.token = value
            window.localStorage.setItem("token", value)
        },
        SETUSERINFO(state, value) {
            state.userinfo = value
            window.localStorage.setItem("userinfo", JSON.stringify(value))
        },
        ClEARTOKEN(state) {
            state.token = "";
            window.localStorage.removeItem("token")
        },
        ClEARUSERINFO(state) {
            state.userinfo = {}
            window.localStorage.removeItem("userinfo")
        }
    }
}