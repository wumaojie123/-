import request from '@/utils/request'

export default class insideManageAPI {
  // 获取agent列表
  static async getAgentList(query) {
    return request({
      url: '/agentManage/queryAgents',
      method: 'get',
      params: query
    })
  }

  // 查询一级代理列表（BD查）2018-12-10
  static async getFirstAgentList(query) {
    return request({
      url: '/agentManage/firstAgents/queryFirstAgents',
      method: 'get',
      params: query
    })
  }

  // 新增agent
  static async addAgent(data) {
    return request({
      url: '/insideManage/addAgent',
      method: 'post',
      data
    })
  }
  // 查询 代理商 信息
  static async getAgentInfo(agentUserId) {
    return request({
      url: '/agentManage/getAgent',
      method: 'get',
      params: { agentUserId }
    })
  }
  // 添加/修改代理商/BD(废弃)
  static async updateAgentInfo(data) {
    return request({
      url: '/agentManage/addOrUpdateAgent',
      method: 'post',
      data
    })
  }
  // 添加/修改代理商/BD(最新 2018-11-27)
  static async updateAgent(data) {
    return request({
      url: '/agentManage/updateAgent',
      method: 'post',
      data
    })
  }
  // 添加代理商/BD(最新 2018-11-27)
  static async addAgentInfo(data) {
    return request({
      url: '/agentManage/addAgent',
      method: 'post',
      data
    })
  }
  // 新增 BD（废弃）
  static async addBD(data) {
    return request({
      url: '/agentManage/addOrUpdateAgent',
      method: 'post',
      data
    })
  }
  // 更新 BD 数据（废弃）
  static async updateBDInfo(data) {
    return request({
      url: '/insideManage/addAgent',
      method: 'post',
      data
    })
  }
  // 更新 BD 数据(最新 2018-11-27)
  static async updateBD(data) {
    return request({
      url: '/agentManage/updateBD',
      method: 'post',
      data
    })
  }
  // 更新 BD 数据(最新 2018-11-27)
  static async addBDInfo(data) {
    return request({
      url: '/agentManage/addBD',
      method: 'post',
      data
    })
  }
  // 获取bd账号列表
  static async getBDList(param) {
    return request({
      url: '/agentManage/getUserByRole',
      method: 'get',
      params: param
    })
  }
  // 获取商户信息
  static async getShanghuInfo(phone) {
    return request({
      url: '/agentManage/getMerchant',
      method: 'get',
      params: {
        phone
      }
    })
  }
  // 获取 获取经营项目 列表
  static async getBusinProjects(params) {
    return request({
      url: '/agentManage/getAgentBusiness',
      method: 'get',
      params: {
        params
      }
    })
  }
  // 获取BD列表
  static async getUserByRole(params) {
    return request({
      url: '/agentManage/getUserByRole',
      method: 'get',
      params: params
    })
  }
  // 查询一级代理列表（总控查
  static async queryFirstAgentsByControl(params) {
    return request({
      url: '/agentManage/firstAgents/queryFirstAgentsByControl',
      method: 'get',
      params: params
    })
  }
}
