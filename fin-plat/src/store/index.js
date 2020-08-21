import 'es6-promise/auto';

import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

// vuex modules
// import demo from './modules/demo';
const modulesFiles = require.context('./modules', true, /\.js$/);

// you do not need `import app form './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const noduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  modules[noduleName] = modulesFiles(modulePath).default;
  return modules;
}, {});

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  getters,
});

export default store;
