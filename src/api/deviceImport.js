import request from '@/utils/request'
import { param, exportFile } from '@/utils'
// 获取设备导入列表
export async function getDeviceImportList(param) {
  return request({
    url: '/agentEquipmentImportLog/list',
    method: 'get',
    params: param
  })
}

export async function getImportDetailList(param) {
  return request({
    url: '/agentEquipmentImportLog/detailList',
    method: 'get',
    params: param
  })
}

export async function myCancelImport(data) {
  return request({
    url: '/rest/file/batch/revocation',
    method: 'post',
    data
  })
}

export async function download(data) {
  const url = '/rest/file/batch/exportAgentEquipmentImport'
  const downloadUrl = `${process.env.BASE_API}${url}?${param(data)}`
  exportFile(downloadUrl)
}
