# project-v3

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

@[TOC](文章目录)

---

考`

# 一、axios的二次封装
```js
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
    //如果已登录则携带token请求后台
    if(token) {
        config.headers.token = token;
    }
    return config
}, error => {
    Promise.reject(error)
}) 
// 响应拦截器
service.interceptors.response.use( response => {
    // 拿到数据做些什么
    if(response.data.status === '200') {
     return response.data
    }
   
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
```
>重点

==1.首先==
```js
const service = axios.create({
    baseURL: 'URL', //后台节后地址
    timeout: 5000 //延迟时间
})
```
==2.请求拦截器==
```js
XXX.interceptors.request.use( config => {})  // 发送请求前做些什么
```
==3.响应拦截器==
```js
XXX.interceptors.response.use( response =>{}) //拿到数据后做些什么
```
==4.请求工具函数封装==

```js
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
```
**一般项目接口都有很多个，这样封装的话以后调用API非常方便,如：**
```js
/**
 * 登录
 * @param {*} form 
 * @returns 
 */
export const userLogin = (form) => {
    return www('/login', 'post', form)
}
```

# 二、vue.config.js中devServer的基础配置
```js
devServer:{
    open: true,//启动项目自动打开
    host: '127.0.0.1', //本地代理服务器地址
    port: 8080, //本地代理服务器端口号
    proxy: {
      '/api': {
        target: 'URL', //代理服务器地址
        pathRewrite: { '^/api': '' },  //  '/api' 代理接口删除
        changeOrigin: true, //开启跨域
        pathRewrite: {
          '^/api': ''
          // 配置出来的接口没有 /api
          // 比如/api/admin/being/classes/classInfo 会被替代成/admin/being/classes/classInfo
        }
      }
    }
  },
```
# 三、登录页

==重点==
```js
//携带form表单数据向后台发送请求，请求成功则将后台返回的token保存到本地存储
const login = (formEL) => {
    if(!formEL) return 
    formEL.validate((valid) => {
        if(valid) {
           userLogin(form).then( ( data ) => {
                console.log(data); 
                setCookie('tokenKey', data.token)  
                router.push('/home')
           })
        } else {
            console.log('error');
        }
    })
}
```

# 四、菜单栏

```js
<template>
  <el-menu
        active-text-color="#ffd04b"
        background-color="#0f52ba"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        router
      >
      <template v-for="(item, index) in menu" :key="index">
        <el-sub-menu :index="index + ''" v-if="!item.hidden">
          <template #title >
            <span>{{item.name}}</span>
          </template>
            <el-menu-item :index="child.path" v-for="(child, i) in item.children" :key="i">{{child.name}}</el-menu-item>
        </el-sub-menu>
      </template>
        <el-menu-item index="/home/user">用户中心</el-menu-item>
      </el-menu>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const menu = ref([])
const router = useRouter()
menu.value = [...router.options.routes]
//router.options.routes 获取所有路由信息
</script>)
```
==重点==
**1.router.options.routes 获取所有路由信息**
返回实例：
![在这里插入图片描述](https://img-blog.csdnimg.cn/7c22074d84d84c7eaae78a5a9643339b.png)
**2.拿到数据后在模板中渲染**
![在这里插入图片描述](https://img-blog.csdnimg.cn/8bf26a6fc30344fea01718a58a44b62a.png)
效果:
![在这里插入图片描述](https://img-blog.csdnimg.cn/dd19cac9ae6d47559b2e47d7d40e6a0b.png)
# 五、学生列表
```js
const getList = (userName) => { 
  return studentList(userName)
  .then( data => {
  //后台返回数据  '1':表示 男， '2':表示 女
  //对后台数据进行处理
  data.data.forEach(item => {
    item.sex === 1? item.sex_text = '男': item.sex_text = '女'
    item.state === "1" ? item.state_text = '已入学' : item.state === '2'? item.state_text = '未入学': item.state_text = '休学中'
  });
  student.value = data
}).catch(error => {
    throw error
})
}
```
==重点==
*对后台返回数据的处理*
**使用firEach() 再返回的数据中添加新属性，不要修改原数据**

# 六、路由
```js
router.beforeEach(( to, from, next) => {
//to：从哪里来
//next: 到哪里去
    if(to.path === '/login' || to.path === '/') {
        next()
    } else if(!getCookie('tokenKey')) {
        next('/login')
    } else next()
})
```
# 七、处理token
```js
export function setCookie(tokenKey, token) {
    return localStorage.setItem(tokenKey, token)
}
export function getCookie(tokenKey) {
    return localStorage.getItem(tokenKey)
}
export function removeCookie(tokenKey) {
    return localStorage.removeItem(tokenKey)
}
```
==重点==
localStorage.setItem('名称'，数据)  添加本地存储
localStorage.getItem('名称')   获取本地存储
localStorage.removeItem('名称')  删除

# 八 、Element-plus面包屑组件
```js
watch(
  ()=> route.matched,
  (newV) => {
    menus.value = newV
  },
  {
    immediate: true
  }
)
```
==重点==
**route.matched:记录所选择的路由信息**


---

# 总结
>1.router.options.routes的使用，获取路由信息
>2.登录时存储token到本地
>3.对后台数据进行一些处理
>4.面包屑实现精髓 route.matched

## 界面![](https://img-blog.csdnimg.cn/a9bb9401e079492790eefd2342ac8595.gif)



**B站学习视频：[BiliBili](https://www.bilibili.com/video/BV1hS4y1i7HW?p=55&vd_source=66b779125bf78ce82164f4e357e09af1)**


**GitHub源码：[GitHUb](https://github.com/BoLinJay/vue3-element-plus-admin-template)**
