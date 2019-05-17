import request from '@/utils/request'

export function modifyPassword(formData) {
  const data = 'originPwd=' + formData.originPwd + '&newPwd=' + formData.newPwd + '&verifyPwd=' + formData.verifyPwd
  return request({
    url: '/agentManage/updatePassword',
    method: 'post',
    data
  })
}
