<template>
  <section class="site-breadcrumb fdt-section">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
        <span v-if="index == levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
      <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>

    <!-- <div class="fdt-section__heading">敏感度配置</div>
    <div class="fdt-section__meta">
      段落示意：Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 value
      属性来指定当前选中的标签页。
    </div> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  mounted() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.levelList = this.$route.matched.filter(item => item.meta && item.meta.title);
    },
    handleLink(item) {
      // 获取当前路径
      const { path } = this.$route;

      if (path === item.path) return;
      this.$router.push({ path: item.path });
    },
  },
};
</script>

<style lang="scss" scoped>
.fdt-section {
  position: relative;
  z-index: 1;
  padding: 10px 0;
  text-align: left;
  background: #f0f2f5;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.fdt-section__heading {
  margin-top: 16px;
  font-family: PingFangSC-Medium, Arial, 'noto sans', sans-serif;
  font-size: 18px;
  text-align: left;
}

.fdt-section__meta {
  margin-top: 16px;
}
</style>
