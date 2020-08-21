<template>
  <div>
    <div id="steps" v-if="type === 1">
      <ul class="progressbar">
        <li
          v-for="(row, index) in progress"
          :key="index"
          :class="statusSty(index + 1, row.active)"
          :style="{ width: 100 / progress.length + '%' }"
          @click="stepFn(index, row)"
        >
          <div class="title" :class="titleStatus(index + 1, row.active)">{{ row.statusName }}</div>
          <div class="text-subtitle">{{ row.createTime }}</div>
          <i v-show="row.active" class="abs-icon el-icon-check" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Steps',
  props: {
    progress: {
      type: Array,
      default: () => [],
    },
    type: {
      type: Number,
      default: () => 2,
    },
    // 步骤是否可以点击
    stepActive: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {};
  },
  methods: {
    // 控制圆形step的样式
    statusSty(index, active) {
      if (active) {
        // 完成步骤后的样式
        return ['achieve'];
      }
      return ['disable'];
    },
    // step文字的样式
    titleStatus(index, active) {
      if (active) {
        return ['text'];
      }
      return ['text-disable'];
    },

    /** ************* type === 2 ***************/
    // 给可以点击的step跳转
    stepFn(index, item) {
      const { steps, stepActive } = this;
      if (!stepActive) return;
      if (index * 1 + 1 > steps[index].doneStep || steps[index].active) return;
      for (const x in steps) {
        steps[x].active = false;
      }
      steps[index].active = true;
      // 将点击的信息返回给调用方
      this.$emit('stepActiveFn', index, item);
    },
  },
};
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
@import 'assets/css/base/basicStyle.scss';

.progressbar {
  z-index: 99;
  overflow: hidden;
  text-align: center;
  counter-reset: step;

  li {
    position: relative;
    float: left;
    font-size: 16px;
    list-style-type: none;
    cursor: pointer;
    // 文字初始样式
    .title {
      display: inline-block;
      margin-top: 10px;
      font-size: 16px;
    }
    // 没有激活时的颜色
    .text-disable {
      color: #c0c4cc;
    }

    .text-subtitle {
      margin-top: 5px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  // li禁用的样式
  li.disable {
    cursor: not-allowed;
  }
  // 按钮圆圈的配置
  li::before {
    display: block;
    width: 36px;
    margin: 0 auto 5px;
    font-size: 18px;
    line-height: 36px;
    color: #c0c4cc;
    background: $background-color-base;
    border-radius: 50%;
    content: counter(step);
    counter-increment: step;
  }

  // 线的颜色
  li::after {
    position: absolute;
    top: 18px;
    left: calc((-100% + 45px) / 2);
    width: calc(100% - 45px);
    height: 2px;
    background: #b2b2b2;
    content: '';
  }

  li:first-child::after {
    content: none;
  }

  // 在当前step的状态
  li.active::before,
  li.active::after {
    color: #fff;
    background: $color-subject;
  }

  // 完成有钩的姿态
  li.achieve::before {
    width: 32px;
    line-height: 32px;
    color: #fff;
    background: #fff;
    border: 2px solid $color-subject;
  }

  li.achieve::after {
    background: $color-subject;
  }

  // icon的样式
  .abs-icon {
    @include Absolute(22%);

    font-size: 20px;
    font-weight: 400;
    color: $color-subject;
  }
}
</style>
