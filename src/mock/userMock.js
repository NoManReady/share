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

export default {
    login: config => {
        const { userCode } = config.params;
        return new Promise((resolve, reject) => {
            let _user = userMap[userCode]
            if (_user) {
                setTimeout(() => {
                    resolve([200, {
                        data: _user
                    }]);
                }, 500);
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
                setTimeout(() => {
                    resolve([200, {
                        data: _user
                    }]);
                }, 100);
            } else {
                reject([500, { msg: '获取失败' }])
            }
        })
    },
    logout: () => new Promise(resolve => {
        setTimeout(() => {
            resolve([200, { data: 'success' }]);
        }, 100);
    })
};
