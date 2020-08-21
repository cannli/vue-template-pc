/* eslint-disable import/prefer-default-export */
export const approveType = [
  { name: '或签（一名审批人同意即可）', val: 1 },
  { name: '会签（需所有审批人同意）', val: 2 },
];

export const flowTypeArr = [
  { name: '额度维护', val: 1 },
  { name: '资金调拨', val: 2 },
];

export const approveStatusArr = [
  { name: '初始化', val: 0 },
  { name: '审批中', val: 1 },
  { name: '通过', val: 2 },
  { name: '驳回', val: 3 },
  { name: '撤回', val: 4 },
];
export const operationArr = [
  { name: '查看', val: 1 },
  { name: '修改', val: 2 },
  { name: '复核', val: 3 },
];
