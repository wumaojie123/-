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

