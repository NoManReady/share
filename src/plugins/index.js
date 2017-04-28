import lifecircle from './lifecircle'
// import intercepter from './intercepter'
export default {
  install(Vue, options) {
    lifecircle(Vue, options)
    // intercepter(Vue, options)
  }
}
