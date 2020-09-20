export const state = () => ({
    counter: 0
  })
  
  export const mutations = {
    increment(state,v=3) {
      state.counter +=v
    },
    reset(state) {
        state.counter =0
      }
  }

  export const actions = {
    inc({commit},v=10) {
        commit('increment',v)
    },
    reset({commit}) {
        commit('reset')
    }
  }