/* eslint-disable func-style */
import axios from '@/assets/js/axios.js';

// 将参数拼接成get请求需要的形式
const handleGetParams = params => {
  const paramsLists = [];
  for (const key in params) {
    paramsLists.push(
      `${key}=${typeof params[key] === 'undefined' ? '' : encodeURIComponent(params[key])}`,
    );
  }
  return paramsLists.join('&');
};

/**
 *
 * @param {导出} data
 */
export function getExport() {
  return axios({
    url: `/bus-ledger/export`,
    method: 'get',
  });
}
/**
 *
 * @param {导入} data
 */
export function getImport(data) {
  return axios({
    url: '/bus-ledger/import',
    method: 'post',
    data,
    unqs: true,
  });
}


