import * as user from './userApi'
import * as menu from './menuApi'

// 整合输出
export default {
    ...user,
    ...menu
}