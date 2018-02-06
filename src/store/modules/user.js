import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
var xmlParse = require('fast-xml-parser')

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const xmlData = response
          if (xmlParse.validate(xmlData) === true) {
            var jsonObj = xmlParse.parse(xmlData)
            if (jsonObj.userCheck.statusValue === 200) {
              var authData = new Buffer(username + ':' + userInfo.password).toString('base64')
              setToken(authData)
              commit('SET_NAME', username)
              commit('SET_TOKEN', authData)
              resolve()
              return
            }
          }
          reject()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      /* return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }) */
      return new Promise((resolve, reject) => {
        var token = getToken()
        if (token) {
          var userData = new Buffer(token, 'base64')
          commit('SET_NAME', userData.toString().split(':')[0])
          resolve()
        } else {
          reject()
        }
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
