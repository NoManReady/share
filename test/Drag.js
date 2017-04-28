
import { getCss } from '../utils/index'

const params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
}
export const drag = (target, bar, inWindow = false, cb) => {
    if (typeof (target) === 'string') {
        target = document.querySelector(target)
    }
    if (typeof (bar) === 'string') {
        bar = document.querySelector(bar)
    }
    if (!bar) {
        bar = target
    }
    bar.onmousedown = function (e) {
        params.left = target.offsetLeft
        params.top = target.offsetTop
        params.flag = true
        if (!e) {
            e = window.event
            bar.onselectstart = function () {
                return false
            }
        }
        params.currentX = e.clientX
        params.currentY = e.clientY
    }
    document.onmouseup = function () {
        params.flag = false
    }
    document.onmousemove = function (e) {
        e = e ? e : window.event
        if (params.flag) {
            let _nowX = e.clientX
            let _nowY = e.clientY
            let _disX = _nowX - params.currentX
            let _disY = _nowY - params.currentY
            let _left = params.left + _disX
            let _top = params.top + _disY
            let _maxTop
            let _maxLeft
            if (inWindow) {
                _maxTop = window.innerHeight - target.offsetHeight
                _maxLeft = window.innerWidth - target.offsetWidth
                if (_left < 0) {
                    _left = 0
                } else if (_left > _maxLeft) {
                    _left = _maxLeft
                }
                if (_top < 0) {
                    _top = 0
                } else if (_top > _maxTop) {
                    _top = _maxTop
                }
            }
            target.style.left = _left + "px"
            target.style.top = _top + "px"

            if (typeof cb == "function") {
                cb(_left, _top)
            }
        }
    }
}