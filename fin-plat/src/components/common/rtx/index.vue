<template>
  <div class="">
    <el-select
      v-model="value"
      multiple
      filterable
      remote
      :remote-method="fetchData"
      @change="rtxObj.event(value, rtxObj.flag)"
      placeholder=""
      :disabled="rtxObj.disabled"
      :style="{ width }"
    >
      <el-option v-for="item in options" :key="item.rtx" :label="item.label" :value="item.rtx">
        <div class="option-text">
          <!-- <img class="img" :src="`http://tapd.oa.com/20421536/users/avatar/${item.rtx}`" /> -->
          <span class="text_name">{{ item.label }}</span>
          <!-- <span>{{ `http://tapd.oa.com/20421536/users/avatar/${item.rtx}` }}</span> -->
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import fetchJsonp from 'fetch-jsonp';
export default {
  components: {},
  props: {
    rtxObj: {
      type: Object,
      default: () => ({ disabled: false, rtxOptions: [], rtxVal: [], flag: '', event() {} }),
    },
    width: {
      type: String,
      default: () => '60%',
    },
    // disabled: {
    //   type: Boolean,
    //   default: () => false,
    // },
    // rtxOptions: {
    //   type: Array,
    //   default: () => [],
    // },
    // rtxVal: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  data() {
    return { options: this.rtxObj.rtxOptions, value: this.rtxObj.rtxVal };
  },
  computed: {},
  watch: {
    rtxObj(val) {
      this.options = val.rtxOptions;
      this.value = val.rtxVal;
    },
    // rtxVal(val) {
    //   this.value = val;
    // },
  },
  methods: {
    // 查询
    fetchData(names) {
      const userList = [];
      const userListObj = {};

      if (names.length === 0) {
        return;
      }
      fetchJsonp(
        `http://gri.oa.com/portal/index.php/gri_staff_api/query?name=${
          Array.isArray(names) ? names.join(';') : names
        }`,
      )
        .then(res => res.json())
        .then(list => {
          list.map(l => {
            l.label = `${l.rtx}(${l.ch_name})`;
            if (!userListObj[l.rtx]) {
              userList.push(l);
              userListObj[l.rtx] = l.label;
            }
          });
          if (this.rtxObj.rtxOptions.length <= 0) {
            this.options = userList;
          } else {
            this.options = this.lodash.uniqBy([...this.rtxObj.rtxOptions, ...userList], 'rtx');
          }
        })
        .catch(function(error) {
          return [];
          throw Error('RtxJsonp Error', error);
        });
    },
  },
  created() {},
  mounted() {
    //  this.fetchData('v_cannli');
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>
<style lang="scss" scoped>
.option-text {
  .img {
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    border-radius: 50%;
  }

  .text_name {
    display: inline-block;
    padding-left: 20px;
    vertical-align: middle;
  }
}
</style>
