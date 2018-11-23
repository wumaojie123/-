export const Throttle = () => {
  let timer = null
  let last = null
  return function(fn, delay, ...args) {
    const context = this
    const now = Date.now()
    if (last && now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(context, args)
        clearTimeout(timer)
        timer = null
      }, delay)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}
