import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/ISAPI/Security/userCheck',
    method: 'get',
    auth: {
      username: username,
      password: password
    }
  })
}

export function getInfo(token) {
  /* return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  }) */
  return true
}

export function logout() {
  return request({
    url: '/ISAPI/Security/userCheck',
    method: 'get'
  })
}
