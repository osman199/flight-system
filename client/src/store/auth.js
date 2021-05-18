import { Api } from '../Api'
export default {
  namespaced: true,
  state: {
    token: null,
    account: null,
    moderator: null
  },
  getters: {
    authenticated(state) {
      return state.token && state.account
    },
    account(state) {
      return state.account
    },
    moderator(state) {
      return state.moderator
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_ACCOUNT(state, account) {
      state.account = account
    },
    SET_MOD(state, isAuthorised) {
      state.moderator = isAuthorised
    }
  },
  actions: {
    async login({ dispatch }, info) {
      await Api.post('/accounts/login', {
        email: info.email, password: info.password
      })
        .then(response => {
          const token = response.data.token
          localStorage.setItem('token', token)
          return dispatch('attempt', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    async attempt({ commit, state }, data) {
      if (data.token) {
        commit('SET_TOKEN', data.token)
      }
      if (!state.token) {
        return
      }
      try {
        var response = await Api.get('/accounts/auth/me')
        commit('SET_ACCOUNT', response.data)
        localStorage.setItem('accountID', response.data._id)
        commit('SET_MOD', response.data.authorised)
      } catch (e) {
        commit('SET_TOKEN', null)
        commit('SET_ACCOUNT', null)
        commit('SET_MOD', null)
      }
    },
    signout({ commit }) {
      var token = localStorage.getItem('token')
      return Api.post('/accounts/logout', {
        token
      })
        .then(() => {
          commit('SET_TOKEN', null)
          commit('SET_ACCOUNT', null)
          commit('SET_MOD', null)
        })
        .catch(error => {
          this.message = error
        })
    },
    delete({ commit }) {
      var token = localStorage.getItem('token')
      var accountID = localStorage.getItem('accountID')
      Api.delete(`accounts/${accountID}`, {
        token
      })
        .then(() => {
          commit('SET_TOKEN', null)
          commit('SET_ACCOUNT', null)
          commit('SET_MOD', null)
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
