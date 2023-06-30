import axios from "@/utils/request"

/**
 * 登录
 * @param {string} username 用户名
 * @param {string} password 密码
*/
export function Loginapi(username, password) {
    return axios.post("/login", {
        username, password
    })
}

/**
 * 注册
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} email 邮箱
*/
export function Registerapi(username, password,email) {
    return axios.post("/register", {
        username, password,email
    })
}


/**
 * 退出登录
*/
export function Logoutapi() {
    return axios.get("/logout")
}