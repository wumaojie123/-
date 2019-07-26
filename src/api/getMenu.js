import request from '@/utils/request'

export function getMenu(data) {
  return request({
    url: '/authority/getCatalogAndMenu',
    method: 'get',
    params: data
  })
}
export function userMapRoles() {
  return request({
    url: '/authority/userMapRoles',
    method: 'get'
  })
}
