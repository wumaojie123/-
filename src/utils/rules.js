/**
 * 常用的表单规则校验,给提示所用
 */
import { validateTel, equal } from './validate'

/**
 * 手机号码格式校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const telCheck = (rule, value, callback) => {
  if (!value || (value && !validateTel(value))) {
    return callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}
/*
* 判断旧密码和新密码是否一致
* @param object rule
* @param sring value
* @param function callback
* */

export const equals = (rule, value, callback) => {
  console.log(rule.oldPassWord)
  console.log(value)
  if (!equal(rule.oldPassWord, value)) {
    callback(new Error('两次输入不一致'))
  }
}

export const passwordCheck = (rule, value, callback) => {
  if (value && !/^[A-Za-z0-9]{6,16}$/.test(value)) {
    return callback(new Error('请输入6-16位的数字或字母'))
  } else {
    callback()
  }
}

export const priceCheck = (rule, value, callback) => {
  if (!/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(value) || value > 10000) {
    return callback(new Error('价格必须为大于0的正数,价格需小于10000,最多保留2位小数'))
  } else {
    callback()
  }
}
export const serviceTimeCheck = (rule, value, callback) => {
  if (!/^([1-9][0-9]*)$/.test(value) || value > 1440) {
    return callback(new Error('服务时间必须为大于0的小于等于1440(24小时)正整数'))
  } else {
    callback()
  }
}
export const conisCheck = (rule, value, callback) => {
  if (!/^([1-9][0-9]*)$/.test(value) || value === 0 || value > 10000) {
    return callback(new Error('模拟投币数必须为大于0的整数'))
  } else {
    callback()
  }
}
