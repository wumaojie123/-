export const saveSession = (key, val) => {
  if (typeof val === 'undefined' || val === null) {
    val = ''
  }
  val = typeof val === 'string' ? val : JSON.stringify(val)
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

/*
* save localStorage
* */
export const saveLocalStorage = (key, val) => {
  if (typeof val === 'undefined' || val === null) {
    val = ''
  }
  val = typeof val === 'string' ? val : JSON.stringify(val)
  localStorage.setItem(key, val)
}

export const getLocalStorage = (key) => {
  if (typeof key !== 'string') {
    return ''
  }
  return localStorage.getItem(key)
}

export const clearLocalStorage = (key) => {
  if (typeof key !== 'string') {
    return ''
  }
  localStorage.removeItem(key)
}
