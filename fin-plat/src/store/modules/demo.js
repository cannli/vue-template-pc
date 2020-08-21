// import API from '@path/api';

const state = {
  rtxname: '',
};

const mutations = {
  UPDATE_DEMO_NAME: (states, rtxname) => {
    states.rtxname = rtxname;
  },
};

const actions = {
  updateDemoName({ commit }, name) {
    commit('UPDATE_DEMO_NAME', name);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
