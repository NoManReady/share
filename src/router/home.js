
const Notfind = r => require(['@views/404'], r)

export default [{
    path: '*',
    component: Notfind
}]