import www from '@/utils/www.js'

// 查询学生列表
export const studentList = (name) => {
    return www(`/students?name=${name}`, 'get')
}

// 删除学生信息
export const deleteStudent = (id) => {
    return www(`/students/:${id}`, 'delete')
}

// 信息列表
export const getInfoList = () => {
    return www('/info', 'get')
}
// 删除信息
export const deleteInfo = (id) => {
    return www(`/info/:${id}`, 'delete')
}

// 新增 & 修改信息
/**
 * 
 * @param {新增 post & 修改 put} type 
 * @param {*} form 
 * @returns 
 */
export const Info = (type,form) => {
    return www('/info', type, form)
}

// // 修改信息
// export const editInfo = (form) => {
//     return www('/info', 'put', form)
// }

// 作业数据
export const getWorksList = (page, size) => {
    return www(`/works?page=${page}&size=${size}`, 'get')
}

// 数据概览
export const getDataviewList = () => {
    return www('/dataview', 'get')
}

// 旅游地图
export const getTravelMapList = () => {
    return www('/travel', 'get')
}