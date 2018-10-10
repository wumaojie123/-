/**
 * 常用的表单规则校验,给提示所用
 */
import { validateTel } from './validate'

/**
 * 手机号码格式校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const telCheck = (rule, value, callback) => {
  console.log('telCheck')
  if (value && !validateTel(value)) {
    return callback(new Error('请输入正确的11位手机号码'))
  }
}
