import Mock from 'mockjs'

// const { menus } = Mock.mock({
//     'menus|10-15': [{
//         path: '/topic/@word',
//         title: '@word',
//         'pid|1': [0],
//         'id': '@guid'
//     }]
// })
const menus = [{
    id: '1',
    pid: '0',
    path: '/home/index',
    title: 'home',
    childs: []
}, {
    id: '2',
    pid: '0',
    path: '/home/about',
    title: 'about',
    childs: []
}, {
    id: '3',
    pid: '0',
    path: '/home/users',
    title: 'users',
    childs: []
}, {
    id: '4',
    pid: '0',
    path: '/home/statistic',
    title: 'statistic',
    childs: [{
        id: '4-1',
        pid: '4',
        path: '/home/statistic/score',
        title: 'score',
        childs: []
    },{
        id: '4-2',
        pid: '4',
        path: '/home/statistic/age',
        title: 'age',
        childs: []
    },{
        id: '4-3',
        pid: '4',
        path: '/home/statistic/price',
        title: 'price',
        childs: [{
            id:'4-3-1',
            pid:'4-3',
            path:'/home/aaa',
            title:'test',
            childs:[]
        }]
    }]
}]
export default {
    getMenus: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, { menus }])
            }, 300)
        })
    }
}