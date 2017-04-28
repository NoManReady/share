import fetch from '@/utils/fetch'

// 登录
export function login(data) {
    return fetch({
        url: '/v1/login',
        method: 'post',
        params: data
    })
}

// 登出
export function logout() {
    return fetch({
        url: '/v1/logout'
    })
}

// 获取用户信息
export function getUserInfo() {
    return fetch({
        url: '/v1/userInfo'
    })
}