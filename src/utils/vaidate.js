export function nameRule(rule, value, callback) {
    let reg = /^[a-zA-Z0-9_-]{4,16}$/
    if(value === '') {
         callback(new Error('请输入用户名'))
    } else if(!reg.test(value)) {
         callback(new Error('用户名4-16位'))
    } else {
        callback()
    }
}
export function passRule(rule, value, callback) {
    let res = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=].{6,16}/
    if(value === '') {
         callback(new Error('请输入密码'))
    } else if (!res.test(value)) {
        callback(new Error('密码格式不正确,长度为6-16位'))
    } else {
        callback()
    }
}