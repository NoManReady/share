import axios from 'axios'
import { Message } from 'iview'
import { remove } from 'lodash'
import config from '@/config'
import store from '@/store'
import router from '@/router'

let _env = process.env.NODE_ENV
let _envConfig = config[_env]
let _requests = []

// 开发环境打印信息
function log(msg) {
    if (_env === 'development') {
        console.log(msg)
    }
}

function pushRequest(config) {
    log(`${config.url}--begin`)
    _requests.push(config)
    store.dispatch('loading')
}

function popRequest(config) {
    log(`${config.url}--end`)
    remove(_requests, r => {
        return r === config
    })
    if (!_requests.length) {
        setTimeout(() => {
            store.dispatch('loading', false)
        }, 300)
    }
}

export default (options) => {
    let _opts = Object.assign({ method: 'get' }, options)
    return new Promise((resolve, reject) => {
        const _instance = axios.create({
            baseURL: _envConfig.host,
            timeout: 5000
        })
        let _random = { stamp: Date.now(), url: `${_envConfig.host}${options.url}` }
        pushRequest(_random)
        _instance(_opts)
            .then(res => {
                popRequest(_random)
                switch (res.status) {
                    case 400:
                        Message.error('前端发生异常错误')
                        reject(res)
                        break
                    case 401:
                        Message.error('Session失效，请重新登录')
                        store.dispatch('logout').then(() => {
                            router.push({ path: '/login' })
                        })
                        reject(res)
                        break
                    default:
                        resolve(res.data)
                }
            })
            .catch(err => {
                Message.error(err.msg || '发生异常错误')
                log(err)
                popRequest(_random)
                reject(err)
            })
    })
}
