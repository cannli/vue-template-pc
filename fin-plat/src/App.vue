<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script></script>
<style lang="scss">
@import 'assets/css/element/elementAdapt.scss';
@import 'assets/css/global.css';

#app {
  height: 100%;
  min-height: 100%;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    PingFangSC-Regular,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    'Noto Sans',
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
