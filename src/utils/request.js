import axios from "axios"

const xaxios = axios.create({
    baseURL:"http://tpadmin.test/api"
})

export default xaxios