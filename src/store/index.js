import { get } from '@/utils/http'
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    row:{},
    role:""
  },
  getters: {
  },
  mutations: {
    setRow(state,playload){
      state.row=playload
    },
    clearRow(state){
      state.row={}
    },
    setRole(state,playload){
      state.role=playload
    }
  },
  actions: {
    async getRole({commit}){
      let {role}=await get("/getRole")
      commit("setRole",role)
    }
  },
  modules: {
  }
})
