<template>
  <div>
    <div v-if="type === 'subTitle'" class="head-line-sub" :style="{ height: subLineText }">
      <div class="title font">
        <span v-show="flagShow" class="flag" />
        <span
          class="title-text"
          :style="{ marginLeft: flagShow ? '13px' : '0', fontSize: titleSize }"
          >{{ title }}</span
        >
        <!--title右边的说明-->
        <div class="sub-right-text">
          <slot name="sub-right" />
        </div>
        <!--title下面的说明-->
        <div class="sub-bottom-text">
          <slot name="sub-bottom" />
        </div>
      </div>
      <!--right的html-->
      <div class="right-content" :style="{ right: right }">
        <slot name="right-content" />
      </div>
    </div>
    <!--大标题-->
    <div v-if="type === 'headline'" class="headline" :style="{ height: subLine }">
      <div class="title font">
        <div class="title-box">
          <span class="title-text">{{ title }}</span>
        </div>

        <div class="sub-right-text">
          <slot name="sub-right" />
        </div>
        <!--title下面的说明-->
        <div class="sub-bottom-text">
          <slot name="sub-bottom" />
        </div>
      </div>
      <!--right的html-->
      <div class="right-content">
        <slot name="right-content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // 返回按钮是否显示
    titleIconShow: {
      type: Boolean,
      default: false,
    },
    // 返回时可以自定义参数，例如 String   ?a=b&c=d
    urlParams: {
      type: String,
      default: '',
    },
    // 显示小标题subTitle 大标题 headline
    type: {
      type: String,
      default: 'subTitle',
    },
    // 当right没有时 height-line 只有60 默认是76
    subLine: {
      type: [String, Number],
      default: '76px',
    },
    // 当right没有时 height-line  默认是18
    subLineText: {
      type: [String, Number],
      default: '18px',
    },
    title: {
      type: String,
      default: '',
    },
    flagShow: {
      type: Boolean,
      default: true,
    },
    // slot 最右边 跟右边的距离
    right: {
      type: [String, Number],
      default: '0',
    },
    // title的size
    titleSize: {
      type: [String, Number],
      default: '18px',
    },
  },
  data() {
    return {
      breadcrumbSpecial: [],
    };
  },
  computed: {},
  watch: {
    $route: {
      handler(val) {
        this.breadcrumbSpecial = val.meta.breadcrumbArr;
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {},
};
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
@import '@/assets/css/base/basicStyle.scss';

.head-line-sub {
  position: relative;
  // background: #ffffff;
  width: 100%;
  height: 18px;
  margin-top: 0;
  margin-bottom: 20px;
  line-height: 18px;
  box-sizing: border-box;

  .title {
    @include Absolute(50%, 0, 0, -50%);

    font-size: 0;
    vertical-align: middle;

    .flag {
      display: inline-block;
      width: 6px;
      height: 18px;
      background: $color-subject;
      //  border-radius: 3px;

      @include Absolute(50%, 0, 0, -50%);
    }

    .title-text {
      @include verticalAlign;
      //    margin-left: 13px;
    }

    .sub-right-text {
      @include verticalAlign;

      margin-left: 10px;
    }

    .sub-bottom-text {
      @include verticalAlign;

      font-size: 12px;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .right-content {
    @include Absolute(50%, 20px, 0, -50%, right);

    box-sizing: border-box;
  }

  .font {
    font-size: 16px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.85);
  }
}

.headline {
  position: relative;
  width: 100%;
  height: 76px;
  margin-top: 0;
  background: #fff;
  border-bottom: 1px solid $color-divider;
  box-sizing: border-box;

  .title {
    @include Absolute(50%, 0, 0, -50%);
    @include verticalAlign;

    font-size: $font-size-0;

    .title-box {
      @include verticalAlign;
    }

    .header-icon {
      cursor: pointer;

      @include verticalAlign(top);

      .icon-sty {
        margin-right: 6px;
        font-size: 16px;
      }

      .icon-text {
        font-size: 16px;
        font-weight: 500;
      }
    }

    .sub-right-text {
      @include verticalAlign;

      margin-left: 10px;
    }

    .sub-bottom-text {
      @include title(12px, normal, rgba(0, 0, 0, 0.45));
    }
  }

  .font {
    @include title;
  }

  .right-content {
    @include Absolute(50%, 20px, 0, -50%, right);

    box-sizing: border-box;
  }

  .sub-line {
    height: 60px !important;
  }
}
</style>
