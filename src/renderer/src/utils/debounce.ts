/* eslint-disable @typescript-eslint/no-this-alias */
/**
 * 防抖函数
 * @param func 执行函数
 * @param delay 延迟时间 ms
 * @param immediate 是否立即执行
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (func: any, delay: number, immediate = false): any {
  let timer: NodeJS.Timeout | undefined

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: unknown, ...args: any[]) {
    const that = this
    if (immediate) {
      func.apply(that, args) // 确保引用函数的指向正确，并且函数的参数也不变
      immediate = false
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(that, args)
    }, delay)
  }
}
