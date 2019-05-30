import request from '@/utils/request'

// 获取消费者前端信息
export function getAdConsumersConfig(data) {
  return request({
    url: '/rest/adConsumersConfig/getAdConsumersConfig', // 假地址 自行替换
    method: 'get',
    params: data
  })
}
// 获取消费者前端信息
export function getAdBrandConfig(data) {
  return request({
    url: '/rest/adBrandConfig/getAdBrandConfig', // 假地址 自行替换
    method: 'get',
    params: data
  })
}
// 编辑消费者前端配置信息
export function editAdConsumersConfig(data) {
  return request({
    url: '/rest/adConsumersConfig/editAdConsumersConfig',
    method: 'post',
    data
  })
}
// 编辑运营商后台配置数据
export function editAdBrandConfig(data) {
  return request({
    url: '/rest/adBrandConfig/editAdBrandConfig',
    method: 'post',
    data
  })
}

