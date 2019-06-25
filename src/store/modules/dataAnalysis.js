import { getAgentAndMerchant, getAreaList } from '@/api/dataAnalysis'

const dataAnalysis = {
  state: {
    agentMerchantList: [],
    areaList: [],
    isGetAgentMerchant: false,
    isGetArea: false
  },
  mutations: {
    SET_AGENT_MERCHANT: (state, agentMerchantList) => {
      state.agentMerchantList = agentMerchantList
      state.isGetAgentMerchant = true
    },
    SET_AREA: (state, areaList) => {
      state.areaList = areaList
      state.isGetArea = true
    }
  },
  actions: {
    GetAreaList({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getAreaList().then(res => {
          if (res.result === 0) {
            const areaList = [{
              text: '全部',
              value: -1
            }]
            commit('SET_AREA', areaList.concat(res.para))
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    GetAgentAndMerchant({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getAgentAndMerchant().then(res => {
          if (res.result === 0) {
            const merchantList = [{
              id: -1,
              name: '全部'
            }]
            commit('SET_AGENT_MERCHANT', merchantList.concat(res.data))
            resolve()
          } else {
            reject()
          }
        })
      })
    }
  }
}

export default dataAnalysis
