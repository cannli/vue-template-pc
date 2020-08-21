<template>
  <div id="layout">
    <!-- <el-container id="site-container"> -->
    <!-- header -->
    <el-header style="border: 1px solid red;"></el-header>

    <!-- content -->
    <el-container style="border: 1px solid red;">
      <!-- sidebar -->
      <fdt-sidebar />

      <!-- main -->
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <!-- </el-container> -->

    <!-- <el-container>
      <fdt-sidebar />
      <el-main class="site-main">
        <router-view></router-view>
      </el-main>
    </el-container> -->
  </div>
</template>

<script>
import FdtSidebar from './sidebar.vue';
// import FdtHeader from './header.vue';
export default {
  name: 'Layout',
  components: {
    FdtSidebar,
    // FdtHeader,
  },
};
</script>
<style lang="scss" scoped>
.outline {
  border: 1px solid red !important;
}
</style>
