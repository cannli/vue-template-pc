import Aegis from '@tencent/aegis-web-sdk';

const aegisInstance = new Aegis({
  // 项目 ID（替换成你项目的ID）
  id: 1964,
  // 用户唯一 ID（可选）
  uin: '',
  // 接口测速
  reportApiSpeed: false,
  // 静态资源测速
  reportAssetSpeed: true,
});

export default aegisInstance;
