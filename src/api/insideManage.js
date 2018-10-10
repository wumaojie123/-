import request from '@/utils/request'

export class insideManageAPI {
  constructor() {
    this.request = request
  }
  // 获取agent列表
  static async getAgentList(query) {
    return this.request({
      url: '/insideManage/getList',
      method: 'get',
      params: query
    })
  }
  // 新增agent
  static async addAgent(data) {
    return this.request({
      url: '/insideManage/addAgent',
      method: 'post',
      data
    })
  }
  // 获取agent信息
  static async getAgentInfo(id) {
    return this.request({
      url: '/insideManage/getAgentInfo',
      method: 'get',
      params: { id }
    })
  }
  // 更新agent信息
  static async updateAgentInfo(data) {
    return this.request({
      url: '/insideManage/create',
      method: 'post',
      data
    })
  }
  // 获取 BD 列表
  static async getBDList(query) {
    return this.request({
      url: '/insideManage/getList',
      method: 'get',
      params: query
    })
  }
  // 新增 BD
  static async addBD(data) {
    return this.request({
      url: '/insideManage/addAgent',
      method: 'post',
      data
    })
  }
  // 更新 BD 数据
  static async updateBDInfo(data) {
    return this.request({
      url: '/insideManage/addAgent',
      method: 'post',
      data
    })
  }
}

