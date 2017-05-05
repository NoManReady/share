import Mock from 'mockjs'
import { shuffle } from 'lodash'
const userMap = {
    admin: {
        role: ['admin'],
        token: 'admin',
        name: '超级管理员'
    },
    normal: {
        role: ['editor'],
        token: 'editor',
        name: '普通'

    },
    dev: {
        role: ['develop'],
        token: 'develop',
        name: '开发'
    }
}

const { users } = Mock.mock({
    'users|685': [{
        date: '@date',
        id: '@guid',
        'status|1': [1, 2, 3],
        name: '@shuffle(["武","孙","空"])',
        'age|16-30': 1,
        address: '@city(true)',
        'desc': '@csentence'
    }]
})
export default {
    login: config => {
        const { userCode } = config.params;
        return new Promise((resolve, reject) => {
            let _user = userMap[userCode]
            if (_user) {
                resolve([200, {
                    data: _user
                }]);
            } else {
                reject([500, { msg: '账号不正确' }])
            }
        })
    },
    getInfo: config => {
        const { userCode } = config.params;
        return new Promise((resolve, reject) => {
            let _user = userMap[userCode]
            if (_user) {
                resolve([200, {
                    data: _user
                }]);
            } else {
                reject([500, { msg: '获取失败' }])
            }
        })
    },
    logout: () => new Promise(resolve => {
        resolve([200, { data: 'success' }]);
    }),
    getUsers: (config) => new Promise(resolve => {
        let { pageIndex, pageSize } = config.params
        let _users = shuffle(users.slice((pageIndex - 1) * pageSize, pageIndex * pageSize))
        resolve([200, { users: _users, count: users.length }])
    })
};
