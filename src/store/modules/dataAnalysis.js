const dataAnalysis = {
  state: {
    equipmentType: [],
    isGetEquipmentType: false
  },
  mutations: {
    SET_EQUIPMENT_TYPE: (state, equipmentType) => {
      state.equipmentType = equipmentType
      state.isGetEquipmentType = true
    }
  },
  actions: {
    GetEquipmentType({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        const mockData = [
          {
            label: '哈哈',
            value: 1
          },
          {
            label: '嘿嘿',
            value: 2
          }
        ]
        commit('SET_EQUIPMENT_TYPE', mockData)
        resolve()
      })
    }
  }
}

export default dataAnalysis
