
const Notfind = r => require(['@views/404'], r)

const Index = r => require(['@views/home/index'], r)
const About = r => require(['@views/home/about'], r)
const Users = r => require(['@views/home/users'], r)
const Statistic = r => require(['@views/home/statistic'], r)

export default [{
    path: 'index',
    component: Index
}, {
    path: 'about',
    component: About
}, {
    path: 'users',
    component: Users
}, {
    path: 'statistic',
    component: Statistic,
    childrens: [{
        path: '*',
        component: Notfind
    }]
}, {
    path: '*',
    component: Notfind
}]