import { createRouter, createWebHistory} from 'vue-router'
const routes = [
    {
        path: '/:catchAll(.*)',
        name: 'Error',
        hidden: true,
        component: () => import('@/components/error.vue')
    },
    {
        path: '/',
        redirect: '/login',
        hidden: true,
        component: ()=>import('@/components/login.vue')
    },
    {
        path: '/login',
        name: 'Login',
        hidden: true,
        component: () => import('@/components/login.vue')
    },
    {
        path: '/home',
        name: '学生管理',
        component: () => import('@/views/home'),
        children: [
            {
                path: '/home/student',
                name:'学生列表',
                component: () => import('@/views/student/StudentList.vue')
            },
            {
                path: '/home/info',
                name: '信息列表',
                component: () => import('@/views/student/InfoList.vue')
            },
            {
                path: '/home/infomanage',
                name: '信息管理',
                component: () => import('@/views/student/InfoManager.vue')
            },
            {
                path: '/home/worklist',
                name: '作业列表',
                component: () => import('@/views/student/WorkList.vue')
            },
            {
                path: '/home/workmanage',
                name: '作业管理',
                component: () => import('@/views/student/WorkManager.vue')
            },
        ]
    },
    {
        path: '/home',
        name: '数据分析',
        component: () => import('@/views/home'),
        children: [
            {
                path: '/home/dataview',
                name:'数据概览',
                component: () => import('@/views/dataAnalysis/DataView.vue')
            },
            {
                path: '/home/mapview',
                name:'地图概览',
                component: () => import('@/views/dataAnalysis/MapView.vue')
            },
            {
                path: '/home/travel',
                name:'旅游地图',
                component: () => import('@/views/dataAnalysis/TravelMap.vue')
            },
            {
                path: '/home/score',
                name:'分数地图',
                component: () => import('@/views/dataAnalysis/ScoreMap.vue')
            }
           
        ]
    },
    {
        path: '/home',
        name: '用户中心',
        hidden: true,
        component: () => import('@/views/home'),
        children: [
            {
                path: '/home/user',
                name: '用户信息',
                component: () => import('@/views/user/User.vue')
            }
        ]
    }
  

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router