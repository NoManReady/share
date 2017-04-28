/**
 * 获取焦点
 */

// 自定义对象key值
const focusContext = '@@focus';

function focus(el, focus) {
  if (focus) {
    el.focus();
  } else {
    el.blur();
  }
}
export default (el, binding, vnode) => {
  focus(el, binding.value);
}
