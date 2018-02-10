import request from '@/utils/request'

export function getDigitalChnList() {
  return request({
    url: '/ISAPI/ContentMgmt/InputProxy/channels/status',
    method: 'get'
  })
}
