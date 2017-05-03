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

// 获取全部用户
export function getUsers({pageSize=10,pageIndex=1}){
    return fetch({
        url:'/v1/users',
        params:{
            pageIndex,
            pageSize
        }
    })
}