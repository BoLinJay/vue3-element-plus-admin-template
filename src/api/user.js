import www from '@/utils/www.js'

/**
 * 登录
 * @param {*} form 
 * @returns 
 */
export const userLogin = (form) => {
    return www('/login', 'post', form)
}