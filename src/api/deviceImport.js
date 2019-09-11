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

// 外部设备导入记录批次列表
export async function getOutsideDeviceImportList(params) {
  return request({
    url: '/outsideDeviceImport/list',
    method: 'get',
    params
  })
}

// 批量导出
export async function outsideDeviceImportBatchExportCode(data) {
  const url = '/outsideDeviceImport/batchExportCode'
  const downloadUrl = `${process.env.BASE_API}${url}?${param(data)}`
  exportFile(downloadUrl)
}

// 撤销
export async function outsideDeviceImportExecuteRevocation(params) {
  return request({
    url: '/outsideDeviceImport/executeRevocation',
    method: 'post',
    params
  })
}

// 映射
export async function outsideDeviceImportExecuteORM(params) {
  return request({
    url: '/outsideDeviceImport/executeORM',
    method: 'post',
    params
  })
}

// 查看导入详情
export async function outsideDeviceImportDetailList(params) {
  return request({
    url: '/outsideDeviceImport/detailList',
    method: 'get',
    params
  })
}
