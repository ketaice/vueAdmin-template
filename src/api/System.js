import request from '@/utils/request'

export function getAllChnList() {
  return request({
    url: '/ISAPI/System/Video/inputs/channels',
    method: 'get'
  })
}

export function getCapabilities() {
  return request({
    url: '/ISAPI/System/capabilities',
    method: 'get'
  })
}
