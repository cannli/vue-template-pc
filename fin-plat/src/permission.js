import Vue from 'vue';
import router from './router';
import store from './store';
import { getUserInfo } from '@/servers/api';
router.beforeEach(async (to, from, next) => {
  const { uid, isFundFlowAdmin, isFundFlowNormal } = store.getters.userInfo;
  const toPath = to.path;
  console.log(uid, isFundFlowAdmin, isFundFlowNormal);
  // 第一次进来， 或 刷新 的时候
  try {
    if (!uid) {
      const data = (await store.dispatch('app/getUser')) || {};
      const { uid, isFundFlowAdmin, isFundFlowNormal } = data;
      if (isFundFlowAdmin !== 1 && toPath === '/systemSet') {
        store.dispatch('app/getMenuKey', '1');
        next('/analysisReport');
      }
      if (isFundFlowAdmin === 1 && toPath === '/systemSet') {
        store.dispatch('app/getMenuKey', '2');
      }
      if (isFundFlowNormal !== 1 && toPath === '/fundApplicationApproval') {
        store.dispatch('app/getMenuKey', '1');
        next('/analysisReport');
      }
      if (isFundFlowNormal === 1 && toPath === '/fundApplicationApproval') {
        store.dispatch('app/getMenuKey', '1');
      }
      if (toPath !== '/systemSet' && toPath !== '/fundApplicationApproval') {
        store.dispatch('app/getMenuKey', '1');
      }
      next();
    } else {
      if (isFundFlowAdmin !== 1 && toPath === '/systemSet') {
        store.dispatch('app/getMenuKey', '1');
        next('/analysisReport');
      }

      if (isFundFlowAdmin === 1 && toPath === '/systemSet') {
        store.dispatch('app/getMenuKey', '2');
        next();
      }

      if (isFundFlowNormal !== 1 && toPath === '/fundApplicationApproval') {
        store.dispatch('app/getMenuKey', '1');
        next('/analysisReport');
      }
      if (isFundFlowNormal === 1 && toPath === '/fundApplicationApproval') {
        store.dispatch('app/getMenuKey', '1');
        next();
      }
      if (toPath !== '/systemSet' && toPath !== '/fundApplicationApproval') {
        store.dispatch('app/getMenuKey', '1');
        next();
      }
    }
  } catch {
    store.dispatch('app/getMenuKey', '1');
    next();
  }
});
