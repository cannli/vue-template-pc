'use strict';

module.exports = {
  types: [
    {
      value: 'WIP',
      name: '💪  WIP: 暂存工作',
    },
    {
      value: 'feat',
      name: '✨  feat: 新增功能',
    },
    {
      value: 'fix',
      name: '🐞  fix: 修复 bug',
    },
    {
      value: 'refactor',
      name: '🛠  refactor: 重构、优化代码、不是新功能或修复 bug',
    },
    {
      value: 'docs',
      name: '📚  docs: 修改文件',
    },
    {
      value: 'test',
      name: '🏁  test: 新增或修改现有的测试',
    },
    {
      value: 'chore',
      name:
        '🗯  chore: 修改构建流程、包管理、构建過程或辅助工具的变动。不包含修改测试用例、src 里的文件',
    },
    {
      value: 'style',
      name: '💅  style: 修改代码风格，不会对产品有任何的功能变动 (空白键、格式化、分号...等)',
    },
    {
      value: 'revert',
      name: '⏪  revert: 撤销、还原一次 git commit',
    },
  ],

  messages: {
    type: '<type> 说明 commit 的类别，只允许使用下面 9 个标识: \n',
    scope:
      '<scope> 影响范围，比如会影响到哪个模块/性能/哪一层（业务层，基础框架，缓存，rpc），如果是特性代码，可以写特性名称 (可选): \n',
    customScope: '<scope> 自定义影响范围，见面扼要但不失原意: \n',
    subject: '<subject> 目的的简短描述，不超过 100 个字符: \n',
    body:
      '<body> 对本次 commit 的详细描述，使用第一人称，应该说明代码变动的动机，以及与之前行为的对比，可以使用 "|" 分成多行 (可选):\n',
    breaking: '<breaking> 对破坏性变动(Breaking Change)的描述、以及变动理由和迁移方法 (可选):\n',
    footer: '<footer> 针对的 issue，像是：#520, #1314 (可选):\n',
    confirmCommit: '<confirm commit> 请确认以上描述',
  },
  upperCaseSubject: true,
  footerPrefix: 'Related issue:',
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'refactor'],
};
