import Vue from 'vue'
import Vuex from 'vuex'

import * as type from './constant'

import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
    loading: false,
    crumbs: [],
    userInfo: null
  },
  actions: {
    loading: ({
      commit
    }, loading = true) => {
      commit(type.APP_LOADING, loading)
    },
    change_title: ({
      commit,
      state
    }, title) => {
      commit(type.APP_TITLE, title)
    },
    change_crumb: ({ commit }, paths) => {
      commit(type.APP_CRUMB, paths)
    },
    login: ({ commit }, user) => {
      return api.login(user).then((data) => {
        commit(type.APP_LOGIN, data)
      })
    },
    logout: ({ commit }) => {
      return api.logout().then(() => {
        commit(type.APP_LOGOUT)
      })
    }
  },
  mutations: {
    [type.APP_TITLE]: (state, title) => {
      state.title = title
      document.title = title
    },
    [type.APP_LOADING]: (state, isLoading) => {
      state.loading = isLoading
    },
    [type.APP_CRUMB]: (state, paths) => {
      state.crumbs = paths
    },
    [type.APP_LOGIN]: (state, user) => {
      state.userInfo = user
    },
    [type.APP_LOGOUT]: (state) => {
      state.userInfo = null
    }
  },
  getters: {
    title: (state) => {
      return state.title
    },
    loading: (state) => {
      return state.loading
    },
    userInfo: (state) => {
      return state.userInfo
    },
    crumbs: (state) => {
      return state.crumbs
    }
  },
  modules: {

  }
})
