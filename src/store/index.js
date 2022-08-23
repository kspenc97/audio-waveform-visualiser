import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clipsAndOptions: [
      {
        reverbVal: 1,
        chorusVal: -1,
        delayVal: 0,
        trebleVal: 1,
        bassVal: -1,
        panVal: 0,
        id: 5,
      }
    ]
  },
  mutations: {
    updateAClip(state, newClipData) {
      state.clipsAndOptions.forEach((currentClip) => {
        if (currentClip.id === newClipData.id) {
          Object.assign(currentClip, newClipData)
        }
      })
    }
  },
  actions: {
    updateAClip({commit}, newClipData) {
      commit('updateAClip', newClipData);
    }
  },
  modules: {
  }
})
