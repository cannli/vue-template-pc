const getters = {
  // demo name
  rtxname: state => state.demo.rtxname,
  // app name
  isCollapse: state => state.app.isCollapse,
  // top 菜单 的key
  menuKey: state => state.app.menuKey,
  // 记录上次的路由
  pathOld: state => state.app.pathOld,
  // 登录信息
  userInfo: state => state.app.userInfo,
};

export default getters;
