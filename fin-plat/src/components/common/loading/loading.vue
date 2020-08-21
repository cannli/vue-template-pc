<!--
@desc 菊花旋转loading
@isLoading {Boolean} 是否菊花是否显示
@svgWidth {Number} 菊花的宽度 有默认值可不传
@svgHeight {Number} 菊花的高度 有默认值可不传
@boxTop {Number} 上边距和影响蒙层的高度 calc 有默认值可不传
@boxLeft {Number} 做边距和影响的宽度 calc 有默认值可不传
e.g：
<loading :isLoading="isLoading" :boxLeft="boxLeft" :boxTop="boxTop" :svgWidth="svgWidth" :svgHeight="svgHeight"></loading>
-->
<template>
  <div v-if="myIsLoading" :style="loadingBox" class="loading_box">
    <!-- <img class="loadingImg" src="../../assets/img/global/icon-loading.gif"/> -->
    <div class="loading_container">
      <div class="loading_svg" :style="loadingSvg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          style="enable-background: new 0 0 50 50;"
          xml:space="preserve"
        >
          <circle cx="16" cy="3" r="2.17998">
            <animate
              attributeName="r"
              values="0;3;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(45 16 16)" cx="16" cy="3" r="0.736643">
            <animate
              attributeName="r"
              values="0;3;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.125s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(90 16 16)" cx="16" cy="3" r="0">
            <animate
              attributeName="r"
              values="0;3;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.25s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(135 16 16)" cx="16" cy="3" r="0">
            <animate
              attributeName="r"
              values="0;3;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.375s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
            <animate
              attributeName="r"
              values="0;3;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.5s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(225 16 16)" cx="16" cy="3" r="0.506847">
            <animate
              attributeName="r"
              values="0;3;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.625s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(270 16 16)" cx="16" cy="3" r="1.70866">
            <animate
              attributeName="r"
              values="0;3;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.75s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(315 16 16)" cx="16" cy="3" r="2.9174">
            <animate
              attributeName="r"
              values="0;3;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.875s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
          <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
            <animate
              attributeName="r"
              values="0;3;0;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0.5s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              calcMode="spline"
            />
          </circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
export default {
  props: {
    forceHide: {
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    svgWidth: {
      type: Number,
      default: 80,
    },
    svgHeight: {
      type: Number,
      default: 80,
    },
    boxTop: {
      type: Number,
      default: 64,
    },
    boxLeft: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      myIsLoading: this.isLoading,
      myBoxLeft: this.boxLeft,
    };
  },

  computed: {
    ...mapState({
      isCollapse: state => state.app.isCollapse,
    }),
    // 计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。
    loadingBox() {
      const self = this;

      if (this.isCollapse) {
        self.myBoxLeft = 200 - 176;
      } else {
        self.myBoxLeft = 200;
      }
      return {
        top: `${self.boxTop}px`,
        left: `${self.myBoxLeft}px`,
        width: `calc( 100% - ${self.myBoxLeft}px )`,
        height: `calc( 100% - ${self.boxTop}px )`,
      };
    },
    loadingSvg() {
      const self = this;
      return {
        width: `${self.svgWidth}px`,
        height: `${self.svgHeight}px`,
      };
    },
  },
  watch: {
    isLoading(val) {
      this.myIsLoading = val;
    },
    boxLeft(val) {
      this.myBoxLeft = val;
    },
  },
  mounted() {
    if (this.forceHide) {
      setTimeout(() => {
        this.myIsLoading = false;
      }, 10000);
    }
  },
};
</script>

<style type="text/css">
.loading_box {
  position: fixed;
  z-index: 1001;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.loading_container {
  width: 100%;
  height: 100%;
  text-align: center;
}

.loading_svg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  fill: #bbb;
}
</style>
