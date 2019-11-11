export const deviceMap = [
  { value: 'CDZ', label: '充电桩' },
  { value: 'SHJ', label: '售货机' }
]
export const deviceMapInfo = {
  'CDZ': '充电桩',
  'SHJ': '售货机'
}

export const communicationMap = { 0: '无', 1: '脉冲', 2: '串口' }
export const statusMap = { disabled: '禁用', '1Normal': '启用' }

export const tybtns = {
  'result': 4, 'description': null, 'para': {
    'brand': 'AJ',
    'uniqueCode': '',
    'machineType': '娃娃机',
    'machineTypeCode': 35,
    'paramsLength': 17,
    'params': [{
      'id': 0,
      'name': '待机音乐',
      'length': 1,
      'disabled': false,
      'description': '',
      'componentType': 'select',
      'componentValueType': 'int',
      'componentValue': '1',
      'componentValueUnit': '',
      'componentValueRange': { 'min': '0', 'max': '4' },
      'componentValueArray': [{ 'value': 0, 'text': '关闭' }, { 'value': 1, 'text': '第1首音乐' }, {
        'value': 2,
        'text': '第2首音乐'
      }, { 'value': 3, 'text': '第3首音乐' }, { 'value': 4, 'text': '第4首音乐' }],
      'componentValueSwitch': null,
      'visible': true
    }, {
      'id': 1,
      'name': '几币',
      'length': 1,
      'disabled': false,
      'description': '',
      'componentType': 'inputInt',
      'componentValueType': 'int',
      'componentValue': '1',
      'componentValueUnit': '个',
      'componentValueRange': { 'min': '1', 'max': '100' },
      'componentValueArray': [{ 'value': 1, 'text': '' }],
      'componentValueSwitch': null,
      'visible': true
    }, {
      'id': 2,
      'name': '几玩',
      'length': 1,
      'disabled': false,
      'description': '',
      'componentType': 'inputInt',
      'componentValueType': 'int',
      'componentValue': '1',
      'componentValueUnit': '局',
      'componentValueRange': { 'min': '1', 'max': '100' },
      'componentValueArray': [{ 'value': 1, 'text': '' }],
      'componentValueSwitch': null,
      'visible': true
    }, {
      'id': 3,
      'name': '游戏时间',
      'length': 1,
      'disabled': false,
      'description': '',
      'componentType': 'inputInt',
      'componentValueType': 'int',
      'componentValue': '60',
      'componentValueUnit': '秒',
      'componentValueRange': { 'min': '5', 'max': '60' },
      'componentValueArray': [{ 'value': 1, 'text': '' }],
      'componentValueSwitch': null,
      'visible': true
    }, {
      'id': 4,
      'name': '空中抓物',
      'length': 1,
      'disabled': false,
      'description': '',
      'componentType': 'switch',
      'componentValueType': 'int',
      'componentValue': '50',
      'componentValueUnit': '',
      'componentValueRange': { 'min': '0', 'max': '1' },
      'componentValueArray': null,
      'componentValueSwitch': { 'open': 1, 'close': 0 },
      'visible': true
    }, {
      'id': 5,
      'name': '游戏模式',
      'length': 1,
      'disabled': false,
      'description': '',
      'componentType': 'select',
      'componentValueType': 'int',
      'componentValue': '0',
      'componentValueUnit': '',
      'componentValueRange': { 'min': '0', 'max': '4' },
      'componentValueArray': [{ 'value': 0, 'text': '弱抓力模式' }, { 'value': 1, 'text': '强爪力固定' }, {
        'value': 2,
        'text': '概率累积固定'
      }, { 'value': 3, 'text': '概率累积随机' }, { 'value': 4, 'text': '贩卖模式' }],
      'componentValueSwitch': null,
      'visible': true
    }, {
      'id': 6,
      'name': '中奖概率',
      'length': 2,
      'disabled': false,
      'description': '',
      'componentType': 'inputInt',
      'componentValueType': 'int',
      'componentValue': '16',
      'componentValueUnit': '',
      'componentValueRange': { 'min': '1', 'max': '250' },
      'componentValueArray': [{ 'value': 1, 'text': '' }],
      'componentValueSwitch': null,
      'visible': true
    }, {
      'id': 7,
      'name': '强抓力电压',
      'length': 2,
      'disabled': false,
      'description': '',
      'componentType': 'inputFloat',
      'componentValueType': 'float1',
      'componentValue': '15.0',
      'componentValueUnit': 'V',
      'componentValueRange': { 'min': '15.0', 'max': '47.5' },
      'componentValueArray': [{ 'value': 1, 'text': '' }],
      'componentValueSwitch': null,
      'visible': true
    }, {
      'id': 8,
      'name': '弱抓力电压',
      'length': 2,
      'disabled': false,
      'description': '',
      'componentType': 'inputFloat',
      'componentValueType': 'float1',
      'componentValue': '4.5',
      'componentValueUnit': 'V',
      'componentValueRange': { 'min': '4.5', 'max': '20.0' },
      'componentValueArray': [{ 'value': 1, 'text': '' }],
      'componentValueSwitch': null,
      'visible': true
    }, {
      'id': 9,
      'name': '强抓力维持时间',
      'length': 2,
      'disabled': false,
      'description': '',
      'componentType': 'inputFloat',
      'componentValueType': 'float1',
      'componentValue': '1.0',
      'componentValueUnit': '',
      'componentValueRange': { 'min': '0.1', 'max': '3.0' },
      'componentValueArray': [{ 'value': 1, 'text': '' }],
      'componentValueSwitch': null,
      'visible': true
    }, {
      'id': 10,
      'name': '到顶转弱',
      'length': 1,
      'disabled': false,
      'description': '',
      'componentType': 'switch',
      'componentValueType': 'int',
      'componentValue': '0',
      'componentValueUnit': '',
      'componentValueRange': { 'min': '0', 'max': '1' },
      'componentValueArray': null,
      'componentValueSwitch': { 'open': 1, 'close': 0 },
      'visible': true
    }, {
      'id': 11,
      'name': '局数开机保留',
      'length': 1,
      'disabled': false,
      'description': '',
      'componentType': 'switch',
      'componentValueType': 'int',
      'componentValue': '0',
      'componentValueUnit': '',
      'componentValueRange': { 'min': '0', 'max': '1' },
      'componentValueArray': null,
      'componentValueSwitch': { 'open': 1, 'close': 0 },
      'visible': true
    }, {
      'id': 12,
      'name': '连投几局送一局',
      'length': 1,
      'disabled': false,
      'description': '',
      'componentType': 'inputInt',
      'componentValueType': 'int',
      'componentValue': '0',
      'componentValueUnit': '局',
      'componentValueRange': { 'min': '1', 'max': '60' },
      'componentValueArray': [{ 'value': 1, 'text': '' }],
      'componentValueSwitch': null,
      'visible': true
    }],
    'groups': [{
      'name': '基础设置',
      'indexStart': 0,
      'indexEnd': 6,
      'indexIds': null,
      'description': null,
      'visible': true
    }, {
      'name': '爪力设置',
      'indexStart': 7,
      'indexEnd': 10,
      'indexIds': null,
      'description': null,
      'visible': true
    }, { 'name': '其他设置', 'indexStart': 11, 'indexEnd': 12, 'indexIds': null, 'description': null, 'visible': true }],
    'buttonGroups': null,
    'buttons': [{
      'name': '设置接口参数',
      'queryFunctionCode': 33,
      'functionCode': 32,
      'disabled': false,
      'paramsLength': 3,
      'params': [{
        'id': 0,
        'name': '接口类型',
        'length': 1,
        'disabled': false,
        'description': '',
        'componentType': 'select',
        'componentValueType': 'int',
        'componentValue': '1',
        'componentValueUnit': '',
        'componentValueRange': { 'min': '0', 'max': '3' },
        'componentValueArray': [{ 'value': 0, 'text': 'TTL_3V3' }, { 'value': 1, 'text': 'RS232' }, {
          'value': 2,
          'text': 'TTL_5V'
        }, { 'value': 3, 'text': 'RS485' }],
        'componentValueSwitch': null,
        'visible': true
      }, {
        'id': 1,
        'name': '波特率',
        'length': 1,
        'disabled': false,
        'description': '',
        'componentType': 'select',
        'componentValueType': 'int',
        'componentValue': '3',
        'componentValueUnit': '',
        'componentValueRange': { 'min': '0', 'max': '7' },
        'componentValueArray': [{ 'value': 0, 'text': '4800' }, { 'value': 1, 'text': '9600' }, {
          'value': 2,
          'text': '19200'
        }, { 'value': 3, 'text': '38400' }, { 'value': 4, 'text': '57600' }, {
          'value': 5,
          'text': '115200'
        }, { 'value': 6, 'text': '128000' }, { 'value': 7, 'text': '256000' }],
        'componentValueSwitch': null,
        'visible': true
      }, {
        'id': 2,
        'name': '预留',
        'length': 1,
        'disabled': false,
        'description': '',
        'componentType': 'inputInt',
        'componentValueType': 'int',
        'componentValue': '0',
        'componentValueUnit': '个',
        'componentValueRange': { 'min': '0', 'max': '255' },
        'componentValueArray': null,
        'componentValueSwitch': null,
        'visible': false
      }],
      'refresh': false
    }, {
      'name': '本地账目',
      'queryFunctionCode': 34,
      'functionCode': 36,
      'disabled': false,
      'paramsLength': 21,
      'params': [{
        'id': 0,
        'name': '设备状态',
        'length': 1,
        'disabled': false,
        'description': '',
        'componentType': 'select',
        'componentValueType': 'int',
        'componentValue': '1',
        'componentValueUnit': '',
        'componentValueRange': { 'min': '0', 'max': '12' },
        'componentValueArray': [{ 'value': 0, 'text': '空闲' }, { 'value': 1, 'text': '投币器1错误' }, {
          'value': 2,
          'text': '投币器2错误'
        }, { 'value': 3, 'text': '光眼错误' }, { 'value': 4, 'text': '天车后微动错误' }, {
          'value': 5,
          'text': '天车前微动错误'
        }, { 'value': 6, 'text': '天车左微动错误' }, { 'value': 7, 'text': '天车上微动错误' }, {
          'value': 8,
          'text': '天车下微动错误'
        }, { 'value': 9, 'text': '天车到达礼品口错误' }, { 'value': 10, 'text': '天车回到起始位置错误' }, {
          'value': 11,
          'text': '主板存储器错误'
        }, { 'value': 12, 'text': '奖池错误' }],
        'componentValueSwitch': null,
        'visible': true
      }, {
        'id': 1,
        'name': '投币总数',
        'length': 4,
        'disabled': false,
        'description': '',
        'componentType': 'inputInt',
        'componentValueType': 'int',
        'componentValue': '0',
        'componentValueUnit': '个',
        'componentValueRange': { 'min': '0', 'max': '2147480000' },
        'componentValueArray': null,
        'componentValueSwitch': null,
        'visible': true
      }, {
        'id': 2,
        'name': '线下投币总数',
        'length': 4,
        'disabled': false,
        'description': '',
        'componentType': 'inputInt',
        'componentValueType': 'int',
        'componentValue': '0',
        'componentValueUnit': '个',
        'componentValueRange': { 'min': '0', 'max': '2147480000' },
        'componentValueArray': null,
        'componentValueSwitch': null,
        'visible': true
      }, {
        'id': 3,
        'name': '出奖总数',
        'length': 4,
        'disabled': false,
        'description': '',
        'componentType': 'inputInt',
        'componentValueType': 'int',
        'componentValue': '0',
        'componentValueUnit': '个',
        'componentValueRange': { 'min': '0', 'max': '2147480000' },
        'componentValueArray': null,
        'componentValueSwitch': null,
        'visible': true
      }, {
        'id': 4,
        'name': '兑币营收总账',
        'length': 4,
        'disabled': false,
        'description': '',
        'componentType': 'inputInt',
        'componentValueType': 'int',
        'componentValue': '0',
        'componentValueUnit': '元',
        'componentValueRange': { 'min': '0', 'max': '2147480000' },
        'componentValueArray': null,
        'componentValueSwitch': null,
        'visible': false
      }, {
        'id': 5,
        'name': '线上投币总数',
        'length': 4,
        'disabled': false,
        'description': '',
        'componentType': 'inputInt',
        'componentValueType': 'int',
        'componentValue': '0',
        'componentValueUnit': '个',
        'componentValueRange': { 'min': '0', 'max': '2147480000' },
        'componentValueArray': null,
        'componentValueSwitch': null,
        'visible': true
      }],
      'refresh': false
    }, {
      'name': '恢复出厂设置',
      'queryFunctionCode': 0,
      'functionCode': 11,
      'disabled': false,
      'paramsLength': 0,
      'params': null,
      'refresh': false
    }, {
      'name': '清奖池',
      'queryFunctionCode': 0,
      'functionCode': 28,
      'disabled': false,
      'paramsLength': 0,
      'params': null,
      'refresh': false
    }, {
      'name': '清账目',
      'queryFunctionCode': 0,
      'functionCode': 12,
      'disabled': false,
      'paramsLength': 0,
      'params': null,
      'refresh': false
    }, {
      'name': '清当前局数',
      'queryFunctionCode': 0,
      'functionCode': 7,
      'disabled': false,
      'paramsLength': 0,
      'params': null,
      'refresh': false
    }],
    'errors': [{ 'errCode': 0, 'errMsg': '正常', 'errFlag': false }, {
      'errCode': 1,
      'errMsg': '投币器1错误',
      'errFlag': true
    }, { 'errCode': 2, 'errMsg': '投币器2错误', 'errFlag': true }, {
      'errCode': 3,
      'errMsg': '光眼错误',
      'errFlag': true
    }, { 'errCode': 4, 'errMsg': '天车后微动错误', 'errFlag': true }, {
      'errCode': 5,
      'errMsg': '天车前微动错误',
      'errFlag': true
    }, { 'errCode': 6, 'errMsg': '天车左微动错误', 'errFlag': true }, {
      'errCode': 7,
      'errMsg': '天车上微动错误',
      'errFlag': true
    }, { 'errCode': 8, 'errMsg': '天车下微动错误', 'errFlag': true }, {
      'errCode': 9,
      'errMsg': '天车到达礼品口错误',
      'errFlag': true
    }, { 'errCode': 10, 'errMsg': '天车回到起始位置错误', 'errFlag': true }, {
      'errCode': 11,
      'errMsg': '主板存储器错误',
      'errFlag': true
    }, { 'errCode': 12, 'errMsg': '奖池错误', 'errFlag': true }],
    'group': true
  }
}

export const addressType = [
  { 'name': '商场', 'value': 'Mall_Aisle' },
  { 'name': '电影院', 'value': 'Cinema' },
  { 'name': 'KTV', 'value': 'KTV' },
  { 'name': '游艺厅', 'value': 'Games_Hall' },
  { 'name': '酒店', 'value': 'MALL,002' },
  { 'name': '步行街', 'value': 'MALL,004' },
  { 'name': '4S店', 'value': 'MALL,003' },
  { 'name': '旅游景点', 'value': 'SCENIC_SPOT,001' },
  { 'name': '机场', 'value': 'STATION,001' },
  { 'name': '火车站', 'value': 'STATION,002' },
  { 'name': '汽车站', 'value': 'STATION,003' },
  { 'name': '地铁站', 'value': 'STATION,004' },
  { 'name': '工厂', 'value': 'FACTORY,001' },
  { 'name': '社区', 'value': 'COMMUNITY,001' },
  { 'name': '办公楼', 'value': 'OFFICE,001' },
  { 'name': '医院', 'value': 'HOSPITAL,001' },
  { 'name': '政府机构', 'value': 'GOVERNMENT,001' },
  { 'name': '大学', 'value': 'SCHOOL,005' },
  { 'name': '初中', 'value': 'SCHOOL,003' },
  { 'name': '小学', 'value': 'SCHOOL,002' },
  { 'name': '幼儿园', 'value': 'SCHOOL,001' },
  { 'name': '培训机构', 'value': 'SCHOOL,006' },
  { 'name': '高中&职业技术学院', 'value': 'SCHOOL,004' },
  { 'name': '其他', 'value': 'OTHERS,001' }
]

export const shjBusinessTypeList = [
  {
    value: 3,
    label: '自动售货机'
  },
  {
    value: 1,
    label: '福袋机'
  },
  {
    value: 2,
    label: '口红机'
  },
  {
    value: 4,
    label: '冰淇淋机'
  },
  {
    value: 8,
    label: '电子烟售货机'
  },
  {
    value: 11,
    label: '豆浆机'
  },
  {
    value: 12,
    label: '咖啡机'
  },
  {
    value: 13,
    label: '格子机'
  }
]
