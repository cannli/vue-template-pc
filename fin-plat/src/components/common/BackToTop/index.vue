<template>
  <div>
    <transition :name="transitionName">
      <div v-show="true" class="back-to-ceiling" :style="customStyle" @click="backToTop">
        <i class="el-icon-top icon" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 400,
    },
    backPosition: {
      type: Number,
      default: 0,
    },
    customStyle: {
      type: Object,
      default() {
        return {
          'right': '60px',
          'bottom': '100px',
          'width': '40px',
          'height': '40px',
          'border-radius': '50%',
          'line-height': '40px',
          'background': '#f5f5f5',
          'boxShadow': '0 0 6px rgba(0,0,0,.12)',
        };
      },
    },
    transitionName: {
      type: String,
      default: 'fade',
    },
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false,
    };
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    handleScroll() {
      this.visible = window.pageYOffset > this.visibilityHeight;
    },
    backToTop() {
      if (this.isMoving) return;

      const start = window.pageYOffset;
      let i = 0;
      this.isMoving = true;
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500));
        if (next <= this.backPosition) {
          window.scrollTo(0, this.backPosition);
          clearInterval(this.interval);
          this.isMoving = false;
        } else {
          window.scrollTo(0, next);
        }
        i++;
      }, 16.7);
    },
    easeInOutQuad(t, b, c, d) {
      let myT = t;
      if ((myT /= d / 2) < 1) return (c / 2) * myT * myT + b;
      return (-c / 2) * (--myT * (myT - 2) - 1) + b;
    },
  },
};
</script>

<style scoped>
.back-to-ceiling {
  position: fixed;
  z-index: 10000;
  display: inline-block;
  font-size: 25px;
  font-weight: bold;
  color: #409eff;
  text-align: center;
  cursor: pointer;
}

.back-to-ceiling:hover {
  color: #fff;
  background: #409eff !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.back-to-ceiling .icon {
  fill: #9aaabf;
  background: none;
}
</style>
