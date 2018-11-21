// 最大支持最近60天
export const options = {
  disabledDate: (time) => {
    const NOW = Date.now()
    const timeItem = time.getTime()
    return timeItem < NOW - 24 * 60 * 60 * 60 * 1000 || timeItem > NOW
  }
}
