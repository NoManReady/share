import Vue from 'vue'
import axios from 'axios'

import * as type from './constant'

export default {
  state: {
    load: false,
    type: '福利',
    gallerys: Object.freeze([])
  },
  actions: {
    //   获取福利图片列表
    query_gallery({
      commit,
      state
    }, search = {
      ps: 100,
      pi: 1
    }) {
      axios.get(`/福利/${search.ps}/${search.pi}`)
        .then(d => {
          commit(type.GALLERYS, d.results)
        })
    }
  },
  mutations: {
    [type.GALLERYS](state, payload) {
      state.gallerys = Object.freeze(payload || [])
    }
  },
  getters: {
      gallerys(state){
          return state.gallerys
      }
  }
}
