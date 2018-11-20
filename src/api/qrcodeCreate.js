// import request from '@/utils/request'

// 支付二维码批量生成
export function exportPayOrCode(data) {
  const url = `/agent/rest/equipment/batch/exportPayOrCode?valueStr=${data.valueStr}`
  return url
  // const Ael = document.createElement('a')
  // Ael.href = url
  // document.body.appendChild(Ael)
  // // Ael.click()
  // return request({
  //   url: '/rest/equipment/batch/exportPayOrCode',
  //   method: 'post',
  //   data
  // })
}

// 注册二维码批量生成
export function exportRegisterOrCode(data) {
  const url = `/agent/rest/equipment/batch/exportRegisterOrCode?valueStr=${data.valueStr}`
  return url
  // window.open(url, '_blank')
  // return request({
  //   url: '/rest/equipment/batch/exportRegisterOrCode',
  //   method: 'get',
  //   params: data
  // })
}
