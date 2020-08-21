<template>
  <el-menu
    unique-opened
    :default-active="getMenuActive"
    class="el-menu-vertical-demo site-menu"
    :collapse="isCollapse"
    :collapse-transition="true"
  >
    <template v-for="menu in menus">
      <el-submenu
        :index="menu.index"
        :key="menu.index"
        v-if="menu.children && menu.children.length > 0"
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.title }}</span>
        </template>
      </el-submenu>

      <el-menu-item
        :index="menu.title"
        :key="menu.title"
        v-if="menu.isFundFlowAdmin === 1"
        @click="pathTo(menu.path)"
      >
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import menus from '@/config/menu';

export default {
  data() {
    return {
      menus,
      isFundFlowAdmin: '',
    };
  },
  watch: {
    userInfo: {
      handler(valN, valO) {
        if (valN.isFundFlowNormal === 1) {
          for (const x in this.menus) {
            this.menus[x].isFundFlowAdmin = 1;
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      isCollapse: state => state.app.isCollapse,
    }),
    ...mapGetters({ userInfo: 'userInfo' }),
    getMenuActive() {
      return this.$route.name;
    },
  },
  methods: {
    pathTo(path) {
      this.$router.push({ path });
    },
  },
};
</script>

<style lang="scss" scoped>
.site-aside {
  display: flex;
  flex-direction: column;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-width: 200px;
}

.site-menu {
  position: relative;
  z-index: 1;
  border: none;
  // flex-grow: 1;
  // box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

  /deep/ .el-submenu__title {
    display: flex;
    padding-left: 20px !important;
    text-align: left;
    align-items: center;
  }

  /deep/ .el-menu {
    // background: #f9fdff;
  }

  /deep/ .el-menu-item {
    padding-left: 42px !important;
    text-align: left;
  }

  /deep/ .el-menu-item.is-active {
    color: #0054fe;
    background-color: #ecf5ff;
    // background-color: rgb(230, 247, 255);
    border-right: 2px solid rgba($color: #0054fe, $alpha: 0.5);
  }

  /deep/ .el-submenu .el-submenu__title > i {
    // position: relative;
    // top: -1px;
  }

  /deep/ .el-submenu.is-active .el-submenu__title {
    color: #0054fe;

    > i {
      color: #0054fe;
    }
  }
}
</style>
