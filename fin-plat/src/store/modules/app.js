import { getUserInfo } from '../../servers/api';
import router from '../../router';
import watermark from 'watermark-dom';
const state = {
  isCollapse: false,
  userInfo: { name: '', isFundFlowAdmin: '', img: '' },
  menuKey: '1',
  // 记录上次的路由
  pathOld: '',
};

const mutations = {
  SET_SIDE_COLLAPSE: (states, isCollapse) => {
    states.isCollapse = isCollapse;
  },
  SET_USER: (states, userInfo) => {
    states.userInfo = userInfo;
  },
  SET_MENU_KEY: (states, menuKey) => {
    states.menuKey = menuKey;
  },
  SET_PATH_OLD: (states, path) => {
    states.pathOld = path;
  },
};

const actions = {
  toggleSidebar({ commit }, toggle) {
    commit('SET_SIDE_COLLAPSE', toggle);
  },
  getMenuKey({ commit }, key) {
    commit('SET_MENU_KEY', key);
  },
  getPathOld({ commit }, path) {
    commit('SET_PATH_OLD', path);
  },
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(
        res => {
          if (res) {
            // res.data.isFundFlowNormal = 0;
            // res.data.isFundFlowAdmin = 0;
            // const { isFundFlowAdmin, isFundFlowNormal } = res.data;
            // const { routes } = router.options;
            commit('SET_USER', res.data);
            watermark.load({
              watermark_txt: res.data.uid,
              watermark_x: 200, // 水印起始位置x轴坐标
              watermark_y: 60, // 水印起始位置Y轴坐标
              watermark_rows: 0, // 水印行数
              watermark_cols: 0, // 水印列数
              watermark_x_space: 50, // 水印x轴间隔
              watermark_y_space: 100, // 水印y轴间隔
              watermark_font: '微软雅黑', // 水印字体
              watermark_color: 'black', // 水印字体颜色
              watermark_fontsize: '30px', // 水印字体大小
              watermark_alpha: 0.04, // 水印透明度，要求设置在大于等于0.003
              watermark_width: 180, // 水印宽度
              watermark_height: 100, // 水印长度
              watermark_angle: 45, // 水印倾斜度数
            });
            resolve(res.data);
          }
        },
        err => {
          reject(err);
        },
      );
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
