<template>
  <div id="layout">
    <el-container class="site-container">
      <el-header style=" height: 64px; background: #1d84ef;">
        <fdt-header />
      </el-header>
      <el-container>
        <el-main class="system-site-main" style=" height: calc(100vh - 64px);">
          <section class="system-container">
            <router-view> </router-view>
          </section>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import FdtHeader from './header.vue';
import { mapGetters } from 'vuex';
// import FdtBreadcrumb from './breadcrumb.vue';

export default {
  name: 'Layout',
  components: {
    FdtHeader,
  },
  data() {
    return {
      // pathOld: '',
    };
  },
  watch: {
    // $route: {
    //   handler(valN, valO) {
    //     if (this.userInfo.uid) {
    //       if (valN.path === '/systemSet' && this.userInfo.isFundFlowAdmin === 1) {
    //         this.$store.dispatch('app/getMenuKey', '2');
    //       }
    //       if (valN.path === '/systemSet' && this.userInfo.isFundFlowAdmin !== 1) {
    //         this.$store.dispatch('app/getMenuKey', '1');
    //         this.$router.push({ path: '/analysisReport' });
    //       }
    //       if (valN.path === '/fundApplicationApproval' && this.userInfo.isFundFlowNormal !== 1) {
    //         this.$store.dispatch('app/getMenuKey', '1');
    //         this.$router.push({ path: '/analysisReport' });
    //       }
    //       if (valN.path !== '/systemSet') {
    //         this.$store.dispatch('app/getMenuKey', '1');
    //       }
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    // userInfo: {
    //   handler(valN, valO) {
    //     const { path } = this.$route;
    //     if (valN.isFundFlowAdmin === 1 && path === '/systemSet') {
    //       this.$store.dispatch('app/getMenuKey', '2');
    //     } else if (valN.isFundFlowAdmin === 1 && path !== '/systemSet') {
    //       this.$store.dispatch('app/getMenuKey', '1');
    //     } else {
    //       this.$store.dispatch('app/getMenuKey', '1');
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },

  computed: {
    ...mapGetters({ menuKey: 'menuKey', userInfo: 'userInfo' }),
  },
  mounted() {
    this.$nextTick(async () => {
      // await this.$store.dispatch('app/getUser');
      await this.timeout();
      const { path } = this.$route;
      if (path === '/systemSet' && this.userInfo.isFundFlowAdmin !== 1) {
        this.$store.dispatch('app/getMenuKey', '1');
        this.$router.push({ path: '/analysisReport' });
      }
      if (path === '/fundApplicationApproval' && this.userInfo.isFundFlowNormal !== 1) {
        this.$store.dispatch('app/getMenuKey', '1');
        this.$router.push({ path: '/analysisReport' });
      }
    });
  },
};
</script>
<style lang="scss" scoped>
#layout {
  height: 100%;
  min-height: 100%;

  .site-container {
    height: 100%;
    min-height: 100%;

    .site-main {
      scroll-behavior: smooth;
      padding-top: 20px;
      background: #f5f5f5;

      .fdt-container {
        min-width: 870px;
        padding: 20px;
        overflow: hidden;
        background: #fff;
      }
    }

    .system-site-main {
      scroll-behavior: smooth;
      //  padding-top: 20px;
      background: #f5f5f5;

      .system-container {
        max-width: 1200px;
        min-width: 1000px;
        margin: 0 auto;
        overflow: hidden;
      }
    }
  }
}
</style>
