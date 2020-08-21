const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const resolve = dir => path.join(__dirname, dir);
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  indexPath: './index.html',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '',
  // 输出文件目录
  outputDir: './dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: './',
  configureWebpack: config => {
    // 外部扩展，通过cdn引入，不会被webpack打包
    config.externals = {
      // 'vue': 'Vue',
      // 'vue-router': 'VueRouter',
      // 'element-ui': 'ELEMENT',
      // 'lodash': '_',
      // 'axios': 'axios',
      // 'qs': 'Qs',
    };

    if (isProduction) {
      config.plugins.push(
        new TerserPlugin({
          minify: (file, sourceMap) => {
            // https://github.com/mishoo/UglifyJS2#minify-options
            const uglifyJsOptions = {
              /* your `uglify-js` package options */
              compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true,
              },
            };

            if (sourceMap) {
              uglifyJsOptions.sourceMap = {
                content: sourceMap,
              };
            }

            return require('uglify-js').minify(file, uglifyJsOptions);
          },
        }),
      );
    } else {
      // 为开发环境修改配置...
    }
  },

  chainWebpack: config => {
    // ...your other webpack config overrides here

    // 静态资源引用分析
    if (process.argv && process.argv.indexOf('--report') !== -1) {
      config.plugin('analyzer').use(new BundleAnalyzerPlugin.BundleAnalyzerPlugin());
    }

    // handle stylelint
    config.plugin('stylelint').use(
      new StyleLintPlugin({
        files: ['**/*.{html,vue,css,sass,scss}'],
        fix: true,
        cache: true,
        emitErrors: true,
        failOnError: false,
      }),
    );

    // 修复 HMR
    // config.resolve.symlinks(true);

    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'));

    // 生产环境配置
    if (isProduction) {
      // 删除预加载
      config.plugins.delete('preload');
      config.plugins.delete('prefetch');

      // 压缩代码
      // config.optimization.minimize(true);

      // 分割代码
      // config.optimization.splitChunks({
      //   chunks: 'all',
      // });

      // 生产环境注入cdn
      // config.plugin('html').tap(args => {
      //   args[0].cdn = cdn;
      //   return args;
      // });
    }
  },

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProduction ? true : false,
    // 开启 CSS source maps?
    sourceMap: isProduction ? true : false,
    // css预设器配置项
    loaderOptions: {
      // pass options to sass-loader
      scss: {
        // 引入全局变量样式
        prependData: `@import "@/assets/scss/variables.scss";
          @import "@/assets/scss/mixins.scss";`,
      },
    },
  },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,

  devServer: {
    port: 9999, // 端口
    open: true, // 自动开启浏览器
  },
};
