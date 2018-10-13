export const saveSession = (key, val) => {
  if (typeof val === 'undefined' || val === null) {
    val = ''
  }
  val = JSON.stringify(val)
  sessionStorage.setItem(key, val)
}

export const getSession = (key) => {
  if (typeof key !== 'string') {
    return ''
  }
  return sessionStorage.getItem(key)
}

export const clearSession = (key) => {
  if (typeof key !== 'string') {
    return ''
  }
  sessionStorage.removeItem(key)
}
