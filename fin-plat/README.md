# FDT-VUE-TEMPLATE

资金与数据部 PC 项目 Vue.js 基础模板

### VS Code 编辑器配置

安装 `ESLint`, `Prettier` 插件，尽量统一使用下面的配置，避免来回格式化

```json
{
  // 开启保存格式化
  "editor.formatOnSave": true,

  // 需要安装 Prettier
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // 如果你安装了 vetur，禁止 vetur 的格式化
  "vetur.format.enable": false,
  "vetur.validation.template": false,

  // 禁止VSCode 自动的 JS 格式化
  "javascript.format.enable": false,

  // 需要安装 ESLint
  "eslint.validate": ["javascript", "javascriptreact", "vue"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.tslint": false, // 如果你使用 ts
    "source.fixAll.stylelint": false // 根据项目是否启用 stylelint
  }
}
```

### Quick Start

```bash
> git clone git@git.code.oa.com:G_FDD_DDC_FDT/template_vue.git

# 项目使用了公司内部的 npm 包，所以需要 tnpm
> cd template_vue && tnpm install

> npm run serve
```

### 开发模式+热更新

```
npm run serve
```

### 打生产包

```
npm run build
```

### 打测试包

```
npm run staging
```

### 内置第三方库

- [axios](https://github.com/axios/axios)
- [element-ui](https://element.eleme.cn/)
- [lodash](https://lodash.com/)
- [qs](https://github.com/ljharb/qs)

### 特性

- 引入 aegis 做测速、错误上报
- 引入 MTA 做埋点上报
- 第三方包通过 script 引入、不打入 bundle 包
- 基于 axios 统一封装请求
- 封装基础 mixins
- 封装基础 filter
- FDT 基础 utils
- 扩展 vue

#### 替换 Aegis 项目 ID

注册 AegisID: https://aegis.ivweb.io/#/projectapply

```js
// 修改文件：src/config/aegis.js
const aegisInstance = new Aegis({
  id: 1962, // 替换成你项目的ID
  uin: '',
  reportApiSpeed: true,
  reportAssetSpeed: true,
});
```

#### 替换 MTA 项目 ID

注册 MTA 项目: https://mta.qq.com/mta/overview/ctr_all_app_new

```html
<!-- 修改文件：public/index.html -->
<script>
  var _mtac = {};
  (function() {
    var mta = document.createElement('script');
    mta.src = '//pingjs.qq.com/h5/stats.js?v2.0.4';
    mta.setAttribute('name', 'MTAH5');
    mta.setAttribute('sid', '500715972'); // 替换成你项目的 SID
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(mta, s);
  })();
</script>
```

### ESLint

- 使用公司的统一规范 `@tencent/eslint-config-tencent`
- 对 "推荐级别" 的规则做重写
- 引入 sonarjs 做简单的 code smell 检查。例如：

```js
// eslint 不会报错，但是这是的逻辑是有问题的
if (true) {
  console.log('a');
} else {
  console.log('a');
}

// sonarjs/no-all-duplicated-branches 会报错
if (true) {
  console.log('a');
} else {
  console.log('a');
}
```

### Stylelint

```bash
# .stylelintrc.js

# 具体的规则参考 doc/stylelint/
overwrite << stylelint-config-standard << stylelint-config-recommended

```

#### BEM

样式编码遵循 `BEM` 风格，例如：

```bash
section.box
  > section.box__top
  > section.box__body
  > section.box__footer

# modify --
section.box--red
section.box--greed

section.box
  > section.box__top
      > section.box__top-title
      > section.box__top-title--bold
      > section.box__top-meta
      > section.box__top-meta--red
  > section.box__body
  > section.box__footer
```

<!-- - `a` Atom
- `m` Molecule/Module（组件）
- `o` Organism（模块组成的 "多个模块组合"）
- `l` Layout（布局）、`t` Template
- `g` Grid（grid system）
- `p` Page（页面）
- `is`, `has` Helper（帮助性的 utils） -->

### 代码提交规范

引入 `commitizen` 做代码提交规范

### 目录规范

```bash
├─public                # SPA 挂载点
│ ├─static                  # 第三方库（webpack不处理）
│ index.html                # mount point
├─src                   # source code
├─src/assets                # assets
│ ├─js                      # 项目级别 js
│ ├─css                     # 项目级别 css
│ ├─img                     # 项目级别 image
│ ├─fonts                   # 项目级别 fonts
│ ├─scss                    # 项目级别 scss
├─src/doc                   # 文档
├─src/config                # 项目配置相关
├─src/components            # 项目级 components
├─src/router
├─src/store
├─src/view              # 模块
│  ├─demo                   # demo 模块、页面
│  │  ├─components          # demo 模块组件
│  │  ├─img                 # demo 模块 image
│  │  │  router.js          # 当前模块的路由
│  │  │  api.js             # 当前模块涉及的 API
│  │  └─index.vue
│  │  └─detail.vue
├─App.vue                # app entry point
├─main.js
├─.browserslistrc
├─.editorconfig          # editor config
├─.eslintignore          # eslint ignore
├─.eslintrc.js           # eslint config
├─.stylelintignore       # stylelint ignore
├─.stylelintrc.js        # stylelint config
├─.prettierignore        # prettier ignore
├─.prettierrc.js         # prettier config
├─.env.development
├─.env.production
├─.env.staging
├─.gitignore
├─.stylelintrc
├─babel.config.js        # babel config
├─vue.config.js
├─package-lock.json      # 依赖版本信息, 请使用支持`lock`功能的npm版本进行依赖下载
├─package.json           # 项目基本信息配置
├─README.md
```

### 不同环境的接口变量

```bash
# 开发环境接口变量 .env.development
VUE_APP_API_ENDPOINT = http://dev.domain.com

# 测试环境接口变量 .env.staging
VUE_APP_API_ENDPOINT = http://test.domain.com

# 生产环境接口变量 .env.production
VUE_APP_API_ENDPOINT = http://domain.com
```
