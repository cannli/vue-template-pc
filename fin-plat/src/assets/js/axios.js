import Vue from 'vue';
// import { Message } from 'element-ui';
import axios from 'axios';
import qs from 'qs';
// 模拟 线上 coolie
// const setCookie = (name, value, seconds = 0) => {
//   let expires = '';
//   if (seconds !== 0) {
//     // 设置cookie生存时间
//     const date = new Date();
//     date.setTime(date.getTime() + seconds * 1000);
//     expires = `; expires="${date.toGMTString()}`;
//   }
//   document.cookie = `${name}=${escape(value) + expires}; SameSite=None; Secure;`; // 转码并赋值
// };
// Message.success({ title: 'hello', message: 'world', type: 'success' })
// Cookie: t_uid=v_jianckang;
// t_u=6bc523f9cd672d16%7C79ce7a088e6ab680;
// tapdsession=d65be4055a13976112c1613ea132dcc9;
// TCOA=4W435QtuUr;
// x-host-key-ngn=173e057219e-87a3557f932c93a61532ac116ca07959e9c96929;
// x-host-key-idcback=173e0578b5e-73c77fbf3c8d29d3efc30cdb21a0d89ca79b2d5d;
// x-host-key-front=173e0578b7d-c9490e9bcf236bbb2f1d50a8d4917b62c654a110;
// console.log(Message);
// const Error_Network = '网络繁忙，请稍后再试！'
// const Error_404 = '找不到你要访问的资源！';

// const tuid = 'v_jianckang';
// const tu = '6bc523f9cd672d16%7C79ce7a088e6ab680';
// const tapdsession = 'd65be4055a13976112c1613ea132dcc9';
// const TCOA = '4W435QtuUr';

// const oaback = '173db967994-f9291e2b6dcf43d1393429abc984a608b6a36b02';
// const front = '173e0578b7d-c9490e9bcf236bbb2f1d50a8d4917b62c654a110';
// const ngn = '173e057219e-87a3557f932c93a61532ac116ca07959e9c96929';
// const d = '65DB0559EEEF876F613490D216D2138EB7AA12B26BF07C39E219A301167EACEA91A2043211AEFFE424025C076B7E74199FCBEFC7EB9DEE';
// const d2 = '08CB21924A7EF3C0E025F9FB8FDF0D3967785D22014C570ADE224728B0803980F7BD8FE45796E2D847D4020253F60D5813DF0B42EB70B694';
// const d3 = '0FB2E45D9CA88419BAF202266DBC4C914827331B76304F168862297FF48040F9E28D1F57AD0EBA9F4E22B453AE5CC9298592B8971A253FBF01';
// const e = 'tof:20200812_641396282B8A112A8B6E2AF06E06F5C916731E3CB967A62B1F4F7B95445B6D0094190DBCE0EFCE064A0C155F26FAF7';
// const e1 = '31ED67C3737FDCA17A15B55EC6102D2C3DB55638485F51AD8E4D326EEF3C00FCA29AE32F85F8BEAD969A1DFC84F2D2F3CD90563E';
// const e2 = 'A8704E13D7DA357D250241C2B05B81D5C4459B91260609260D1DD3D29E635160A0148E6E518866FF09B1926F34F061193F633421';
// const e3 = 'EF54666CFAB2E4BD04BDA9E66D7D30C48CDF5E8A108E5B56E5';

// const idcback = '173e0578b5e-73c77fbf3c8d29d3efc30cdb21a0d89ca79b2d5d';
// const TCOA_TICKET = d + d2 + d3;
// const RIO_TCOA_TICKET = e + e1 + e2 + e3;
// setCookie('t_uid', tuid);
// setCookie('t_u', tu);
// setCookie('tapdsession', tapdsession);
// setCookie('x-host-key-oaback', oaback);
// setCookie('x-host-key-front', front);
// setCookie('x-host-key-ngn', ngn);
// setCookie('TCOA_TICKET', TCOA_TICKET);
// setCookie('TCOA', TCOA);
// setCookie('RIO_TCOA_TICKET', RIO_TCOA_TICKET);
// setCookie('x-host-key-idcback', idcback);
// console.log(document.cookie)
// 创建axios实例
const Axios = axios.create({
  // 环境的不同，对应不同的API process.env.NODE_ENV === 'development' ?
  baseURL: process.env.VUE_APP_API_ENDPOINT,

  // 默认请求方式
  method: 'get',

  // 请求的超时时间
  timeout: 5000,

  // 设置默认请求头，使 post 请求发送的是 formdata 格式数据
  // Axios 的 header 默认的 Content-Type 是 'application/json;charset=UTF-8',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // 如果后端需要使用 formdata 格式传输需要改成：
    // 'Content-Type': 'application/x-www-form-urlencoded',

    // "Content-Type": "multipart/form-data",
    'X-Requested-With': 'XMLHttpRequest',
  },

  // 允许请求携带 cookie
  // 如果后端设置了：`Access-Control-Allow-Origin: *`
  // Axios 设置 `withCredentials: true` 会报跨域出错，但是接口还是可以请求成功的！
  // 应该设为 `withCredentials: false`
  withCredentials: false,
});

// `transformRequest` 允许在向服务器发送前，修改请求数据
// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
axios.defaults.transformRequest = [
  function transformRequest(data, headers) {
    // 对 data 进行任意转换处理
    // console.log('transformRequest', data)
    // console.log(data, headers);
    return data;
  },
];

// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
axios.defaults.transformResponse = [
  function transformResponse(data) {
    // 对 data 进行任意转换处理
    // console.log('transformResponse', data)

    return data;
  },
];

// `paramsSerializer` 是一个负责 `params` 序列化的函数
// (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
// axios.defaults.paramsSerializer = function(params) {
//     return QS.stringify(params, { arrayFormat: 'brackets' })
// }

// Request Interceptors
Axios.interceptors.request.use(
  config => {
    // 发送请求之前，要做的业务
    // console.log('Logs::axios.config', config);

    if (config && config.loading !== false) {
      // app.$loading.show()
    }

    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    // 让每个请求携带token--['X-Token']为自定义key || cookie, 请根据实际情况自行修改
    // 默认POST请求都会做序列化！但是真的特殊情况，有些接口不需要做序列化，通过 unqs 参数来控制
    if (
      !config.unqs &&
      (config.method === 'post' || config.method === 'put' || config.method === 'delete')
    ) {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptors
Axios.interceptors.response.use(
  response => {
    if (response.data.code === '200') {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response.data);
  },
  // response => {
  //     // 数据响应之后，要做的业务

  //     // hide loading
  //     // app.$loading.hide()

  //     // 错误提示(前提是接口跑通了，只是对里边某些值做下详细判断。要先跟后台商定好，对某个固定的字段进行判断，并且确定固定字段来承接 错误信息，方便展示)
  //     // if (response.data && response.data.status !== 'success') {
  //     //     app.$message.error(response.data.msg);
  //     // }

  //     return response.data;

  //     // return response.status === 200 || response.status === 201
  //     //     ? Promise.resolve(response)
  //     //     : Promise.reject(response);
  // },
  error => {
    // 请求错误时做些事(接口错误、超时等)

    // hide loading
    // app.$loading.hide()

    // 打开控制台，可以看到error包含了几个对象:message, config, code, request, response,可以拿来请求超时等问题
    console.log('Logs::XHR Error', error);

    //  判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      // app.$message.error(Error_Network)
      // 根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案
      // 例如再重复请求一次
      // return Axios.request(originalRequest);
    }

    return Promise.reject(error);
  },
);

Vue.prototype.$axios = Axios;

export default Axios;
