import axios from 'axios'
import { getCookie } from './token'

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(config => {
    // 发送请求前做些什么
    const token = getCookie('token')
    if(token) {
        config.headers.token = token;
    }
    return config
}, error => {
    Promise.reject(error)
}) 
// 响应拦截器
service.interceptors.response.use(({ data }) => {
    // 拿到数据做些什么
    return data
}, error => {
    Promise.reject(error)
})

// 请求工具函数
export default (url, method, submitData) => {
    // 负责发请求：请求地址，请求方式，提交的数据
    return service({
      url,
      method,
      // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
      // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
      // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
      // method参数：get,Get,GET  转换成小写再来判断
      // 在对象，['params']:submitData ===== params:submitData 这样理解
      [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
}