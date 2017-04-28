/**
 * 获取dom指定样式
 * @param {*DOM Node} o 
 * @param {*style propertie} k 
 */
export const getCss = (o, k) => {
    return o.currentStyle ? o.currentStyle[k] : document.defaultView.getComputedStyle(o, false)[k]
}


/**
 * 添加dom事件
 */
export const attachEvent = (() => {
    if (window.addEventListener) {
        return (target, type, cb) => {
            target.addEventListener(type, cb, false)
        }
    } else if (window.attachEvent) {
        return (target, type, cb) => {
            target.attachEvent(`on${type}`, cb)
        }
    }
})()

/**
 * 移出dom事件
 */
export const detachEvent = (() => {
    if (window.removeEventListener) {
        return (target, type, cb) => {
            target.addEventListener(type, cb, false)
        }
    } else if (window.detachEvent) {
        return (target, type, cb) => {
            target.detachEvent(`on${type}`, cb)
        }
    }
})()