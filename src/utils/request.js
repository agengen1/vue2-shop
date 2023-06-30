import axios from "axios"

const xaxios = axios.create({
    baseURL:"http://tpadmin.test/api"
})

//请求拦截器
xaxios.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
}, (error) => {
    // Do something with request error
    return Promise.reject(error)
})

export default xaxios