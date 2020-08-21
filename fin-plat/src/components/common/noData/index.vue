<template>
  <div class="table-nodata">
    <div class="table-nodata-wrap">
      <div class="ico-nodata"><!-- 无结果图标 --></div>
      <p>{{ text }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无数据',
    },
  },
};
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
.table-nodata {
  font-size: 18px;
  color: #000;
  text-align: center;

  .table-nodata-wrap {
    display: inline-block;
    padding: 20px 0;

    .ico-nodata {
      width: 260px;
      height: 150px;
      margin: 0 auto;
      background: url('../../../assets/img/global/no-data.png') no-repeat 0 0;
      background-size: 100%;
    }
  }
}

.table-nodata .table-nodata-wrap p {
  margin: 0;
  font-size: 12.5px;
  color: #80848f;
  text-align: center;
}
</style>
