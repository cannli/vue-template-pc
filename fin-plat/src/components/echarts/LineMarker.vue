<template>
  <div class="marker-box" :style="{ height: height, width: width }">
    <!-- <div class="forecast-back"></div> -->
    <div ref="marker" :id="id" :class="className" :style="{ height: height, width: width }" />
  </div>
</template>

<script>
import echarts from 'echarts';
import { mapState } from 'vuex';
// import { delete } from 'vue/types/umd';
// import { delete } from 'vue/types/umd';

export default {
  name: 'LineMarker',
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    id: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '200px',
    },
    height: {
      type: String,
      default: '300px',
    },
    xRotate: {
      type: Number,
      default: 0,
    },
    fontSize: {
      type: String,
      default: '12PX',
    },
    // 图表标识
    markerName: {
      type: String,
      default: 'chart',
    },
    // y轴的单位名字
    unitName: {
      type: Array,
      default: () => ['万元'],
    },
    boundaryGap: {
      type: Boolean,
      default: false,
    },
    yAxisIndex: {
      type: Array,
      default: () => [0],
    },
    // 画布名字
    titleName: {
      type: String,
      default: '',
    },
    // item 的 名字
    legendData: {
      type: Array,
      default: () => [],
    },
    // x 轴 的各点的那么
    xAxisData: {
      type: Array,
      default: () => [],
    },
    // 渲染的数据
    seriesData: {
      type: Array,
      default: () => [],
    },
    // 预测占比 百分比
    forecastIndex: {
      type: Number,
      default: null,
    },
    // 预测数据
    forecastData: {
      type: Array,
      default: () => [],
    },
    // 数据的形状，bar , lint
    itemType: {
      type: Array,
      default: () => [],
    },
    // x轴name的间隔跟旋转度
    xAxisLabel: {
      type: Object,
      default: () => ({ interval: 0, rotate: 0 }),
    },
    // 注意stack---数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加。
    // 所以最后的解决方法是，，stack去掉，，或者stack给不同的值。
    stack: {
      type: Array,
      default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    lineColor: {
      // 设置线条颜色
      type: Array,
      default() {
        return [
          '#4472c4',
          '#ed7e33',
          '#1CAA3C',
          '#ffc000', // ffc000
          '#FF7E65',
          '#9E39FD',
          '#6764F4',
          '#5DE1C7',
        ];
      },
    },
    colorCoy: {
      // 设置线条颜色
      type: Array,
      default: () => [
        '#4472c4',
        '#ed7e33',
        '#1CAA3C',
        '#ffc000', // ffc000
        '#FF7E65',
        '#9E39FD',
        '#6764F4',
        '#5DE1C7',
      ],
    },
  },
  data() {
    return {
      chart: null,
      markerWidth: '', // 图表宽度
      right: 88, // 预测背景右边距离
      left: 88, // 预测背景 左边距
    };
  },
  watch: {
    legendData: {
      handler() {
        this.initChart();
      },
      deep: true,
    },
    seriesData: {
      handler() {
        this.initChart();
      },
      deep: true,
    },
    isCollapse() {
      this.chart.resize();
    },
  },
  computed: {
    ...mapState({
      isCollapse: state => state.app.isCollapse,
    }),
  },
  mounted() {
    this.initChart();
    this.markerWidth = this.$refs.marker.clientWidth;
    this.__resizeHanlder = this.debounce(() => {
      if (this.chart) {
        this.chart.resize();
        this.markerWidth = this.$refs.marker.clientWidth;
        this.setSeriesArr();
      }
    }, 100);
    window.addEventListener('resize', this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener('resize', this.__resizeHanlder);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.marker, 'macarons');
      const self = this;
      const {
        legendData,
        seriesData,
        lineColor,
        stack,
        unitName,
        forecastData,
        setFormAtter,
        yAxisIndex,
        colorCoy,
        xRotate,
        fontSize,
        markerName,
      } = self;
      if (!seriesData || seriesData.length <= 0) return;
      const seriesArr = [];
      // 实际发生数据
      for (const x in seriesData) {
        seriesArr.push({
          name: legendData[x],
          type: self.itemType[x],
          //  step: 'start',
          stack: stack[x],
          barMinHeight: 2,
          barMinWidth: 10,
          smooth: false, // 关键点，为true是不支持虚线的，实线就用true
          data: seriesData[x],
          symbol: 'circle', // 设定为实心点
          symbolSize: 4, // 设定实心点的大小
          yAxisIndex: yAxisIndex[x],
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                type: 'solid', // 'dotted'虚线 'solid'实线
              },
            },
          },
          color: [lineColor[x]], // 单独线条颜色设置 ['red', 'pink']
        });
      }
      // 预测数据 虚线
      if (self.forecastIndex !== null) {
        for (const x in forecastData) {
          seriesArr.push({
            name: legendData[x],
            type: self.itemType[x],
            // step: 'start',
            stack: stack[x],
            barMinHeight: 2,
            barMinWidth: 10,
            smooth: false, // 关键点，为true是不支持虚线的，实线就用true
            data: forecastData[x],
            symbol: 'circle', // 设定为实心点
            symbolSize: 4, // 设定实心点的大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'solid', // 'dotted'虚线 'solid'实线
                },
              },
            },
            color: [colorCoy[x]], // 单独线条颜色设置 ['red', 'pink']
            yAxisIndex: yAxisIndex[x], // 参照左右轴划线
            markArea: {
              silent: true,
              data: self.setBack(),
            },
          });
        }
      }
      // 初始化 y轴
      const yAxis = [];
      for (let i = 0; i < unitName.length; i++) {
        const push = {
          type: 'value',
          name: `单位：${self.unitName[i]}`,
          nameLocation: 'end',
          axisTick: {
            show: false,
          },
          axisLine: {
            show: markerName !== 'forecasFund',
            lineStyle: {
              color: '#333',
            },
          },
          // 轴 text 样式 配置
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: '14px',
            },
          },
          // 画布中线的配置
          splitLine: {
            show: !i,
            lineStyle: {
              color: '#f0efef',
            },
          },
        };
        yAxis.push(push);
      }
      // 设置图表
      const setOption = {
        backgroundColor: 'rgba(250,250,250,0)',
        title: {
          top: 10,
          right: 0,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14,
            color: '#101010',
          },
          left: '1%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B',
            },
          },
          textStyle: {
            align: 'left',
          },
          formatter(arr) {
            // console.log(arguments)
            return setFormAtter(arr, unitName);
          },
        },
        // item的标题
        legend: {
          top: 10,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: self.legendData,
          // right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#363636',
          },
        },
        grid: {
          top: 80,
          left: '2%',
          right: '3%',
          bottom: '4%',
          containLabel: true,
        },

        xAxis: [
          {
            type: 'category',
            boundaryGap: !this.boundaryGap, // 设置为false代表是零刻度开始，设置为true代表离零刻度间隔一段距离
            axisLine: {
              lineStyle: {
                color: '#333',
              },
              onZero: false,
            },
            // axisLabel设置成0则表示强制显示所有标签，设置为1的话，隔一个标签显示一个标签，以此类推。
            axisLabel: {
              // 坐标轴刻度标签的相关设置。
              showMaxLabel: true,
              interval: 'auto',
              formatter(value, index) {
                return value;
              },
              rotate: xRotate,
              textStyle: {
                color: 'rgba(0,0,0,1)',
                fontSize,
              },
            },

            // self.xAxisLabel,
            // {
            //   interval: 2,
            //   rotate: 35,
            // },
            data: self.xAxisData,
          },
        ],
        yAxis,
        // smooth:false,   //关键点，为true是不支持虚线的，实线就用true
        // 是否是阶梯线图。可以设置为 true 显示成阶梯线图，也支持设置成 'start', 'middle', 'end' 分别配置在当前点，当前点与下个点的中间点，下个点拐弯。
        series: seriesArr,
      };
      self.chart.setOption(setOption);
      console.log(self.legendData, 'self.legendData');
      // 初始化备份原始坐标数据 paramYAxis：y y轴数据, oldMin：y右轴Min, oldMax y右轴max
      const paramYAxis = JSON.parse(JSON.stringify(yAxis));
      let oldMin = 0;
      let oldMax = 0;
      let oldInterval = 0;
      self.chart.on('legendselectchanged', params => {
        // 获取点击图例的选中状态
        const isSelected = params.selected[params.name];
        // 在控制台中打印
        console.log(isSelected, '选中了', params.name);
        // 打印所有图例的状态
        for (const i in paramYAxis) {
          delete paramYAxis[i].min;
          delete paramYAxis[i].interval;
        }
        // 从新设置 y右轴刻度
        if (self.forecastIndex !== null && yAxis.length > 1) {
          self.setNumber(self.chart, paramYAxis, oldMin, oldMax, oldInterval);
        }
      });
      setTimeout(() => {
        // 设置预测背景
        self.setSeriesArr();
        if (self.forecastIndex !== null && yAxis.length > 1) {
          // 初始化 备份原始坐标数据 self.chart.getModel().getComponent('yAxis', 1) 右轴
          oldMin = self.chart.getModel().getComponent('yAxis', 1).axis.scale._extent[0];
          oldMax = self.chart.getModel().getComponent('yAxis', 1).axis.scale._extent[1];
          oldInterval = self.chart.getModel().getComponent('yAxis', 1).axis.scale._interval;
          // 初始化 重设 y 右轴数据
          self.setNumber(self.chart, paramYAxis, oldMin, oldMax, oldInterval);
        }
      }, 500);
    },
    /**
     * 提示框
     */
    setFormAtter(arr, unitName) {
      const list = {}; // 去重后数组对象
      const self = this;
      // console.log(arr, 'arr');
      for (const i in arr) {
        if (!list[arr[i].seriesName] && arr[i].data) {
          const loanPredictAmount = '放款';
          if (loanPredictAmount === arr[i].seriesName && self.forecastIndex !== null) {
            arr[i].data = Math.abs(arr[i].data);
          }
          let nameList = unitName[0];
          // 特殊处理 可用资金倍数 单位使用 unitName[1] '倍'
          const name = '可用资金覆盖倍数';
          if (name === arr[i].seriesName) {
            nameList = unitName[1] || unitName[0];
          }
          list[arr[i].seriesName] = Object.assign({}, arr[i], { nameList });
        }
      }
      let str = `${arr[0].axisValue}<br>`;
      Object.keys(list).forEach((item, index) => {
        if (this.markerName === 'forecasFund' && index === 0 && Object.keys(list).length > 2) {
        } else {
          const number = list[item].data;
          str += `${list[item].marker + list[item].seriesName} : ${self.numFormatter(number * 1)} ${
            list[item].nameList
          }<br>`;
        }
      });
      return str;
    },
    setBack() {
      // 设置具体区域的背景颜色，选择不同区间 设置图表对应的背景颜色
      const { forecastData, xAxisData, forecastIndex, boundaryGap } = this;
      if (forecastIndex === null || !boundaryGap) {
        return [];
      }
      return [
        [
          {
            xAxis: xAxisData[0],
            itemStyle: { color: 'rgba(250, 250, 250, 0)' },
          },
          {
            xAxis: xAxisData[forecastIndex],
          },
        ],
        [
          {
            xAxis: xAxisData[forecastIndex],
            itemStyle: { color: 'rgba(217, 242, 253, 0.25)', cursor: 'pointer' },
            name: '预测',
            label: {
              show: true,
              position: ['20px', '20px'],
              color: '#101010',
              fontSize: 14,
            },
          },
          {
            xAxis: [xAxisData.length - 1],
          },
        ],
      ];
    },
    /**
     * 取最大
     */
    calMax(arr) {
      let max = 0;
      if (!arr) return;
      arr.forEach((el, indexEl) => {
        el.forEach((el1, indexEl1) => {
          if (!(el1 === undefined || el1 === '' || el1 === null) && max < el1) {
            max = el1;
          }
        });
      });
      const maxint = Math.ceil(max / 8.5); // 不让最高的值超过最上面的刻度
      const length = maxint.toString();
      let uilt = 1;
      let newMax = maxint;
      for (let i = 1; i < length.length; i++) {
        uilt = uilt * 10;
      }

      if (uilt > 1) {
        newMax = Math.ceil(maxint / uilt) * uilt;
        // maxint = maxint * uilt;
      }
      return newMax * 10; // 让显示的刻度是整数
    },
    /**
     * 取最大小
     */
    calMin(arr) {
      let min = 0;
      arr.forEach((el, indexEl) => {
        el.forEach((el1, indexEl1) => {
          if (!(el1 === undefined || el1 === '' || el1 === null) && min > el1) {
            min = el1;
          }
        });
      });
      const minint = Math.floor(min / 10);
      return minint * 10; // 让显示的刻度是整数
    },

    /**
     * 设置预测背景
     */
    setSeriesArr() {
      const self = this;
      const {
        legendData,
        seriesData,
        lineColor,
        stack,
        unitName,
        forecastData,
        setFormAtter,
        yAxisIndex,
        colorCoy,
        forecastIndex,
        boundaryGap,
      } = self;
      // 没有预测 或者预测纯线段 不走这个方法
      if (forecastIndex === null || boundaryGap) return false;
      const setSeriesArr = [];
      //  重写 实际数据
      for (const x in seriesData) {
        setSeriesArr.push({
          name: legendData[x],
          type: self.itemType[x],
          //  step: 'start',
          stack: stack[x],
          barMinHeight: 2,
          barMinWidth: 10,
          smooth: false, // 关键点，为true是不支持虚线的，实线就用true
          data: seriesData[x],
          symbol: 'circle', // 设定为实心点
          symbolSize: 4, // 设定实心点的大小
          yAxisIndex: yAxisIndex[x],
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                type: 'solid', // 'dotted'虚线 'solid'实线
              },
            },
          },
          color: [lineColor[x]], // 单独线条颜色设置 ['red', 'pink']
        });
      }
      // 重写 虚线
      for (const x in forecastData) {
        setSeriesArr.push({
          name: legendData[x],
          type: self.itemType[x],
          // step: 'start',
          stack: stack[x],
          barMinHeight: 2,
          barMinWidth: 10,
          smooth: false, // 关键点，为true是不支持虚线的，实线就用true
          data: forecastData[x],
          symbol: 'circle', // 设定为实心点
          symbolSize: 4, // 设定实心点的大小
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                type: 'solid', // 'dotted'虚线 'solid'实线
              },
            },
          },
          color: [colorCoy[x]], // 单独线条颜色设置 ['red', 'pink']
          yAxisIndex: yAxisIndex[x], // 参照左右轴划线
          markArea: {
            silent: true,
            data: self.calcMarkAreaByBarIndex(self.chart), // 预测背景
          },
        });
      }
      const markedAreas = {
        series: setSeriesArr,
      };
      // 绘制带背景线段
      self.chart.setOption(markedAreas);
    },

    /**
     * 计算预测背景坐标
     */
    calcMarkAreaByBarIndex(chartInstance, join = true) {
      const { forecastData, xAxisData, forecastIndex } = this;
      const barIdx = [forecastIndex, forecastData[0].length - 1];
      const series = chartInstance.getModel().getSeriesByType('bar');
      const seriesData = series.map((s, idx) => s.getData())[2];
      const barNum = seriesData.count();
      const barCoors = [];
      const layout = idx => seriesData.getItemLayout(idx);
      console.log(barNum, 'barCoors', barIdx, layout(0));
      for (let i = 0; i < barNum; i++) {
        // console.log(barCoors, 'barCoors', barIdx, layout(i), barIdx.includes(i), barNum);
        if (!barIdx.includes(i)) continue;
        barCoors.push([{ x: layout(i).x }, { x: layout(i).x + layout(i).width }]);
      }
      if (join) {
        return [
          [
            {
              x: barCoors[0][0].x,
            },
            {
              x: barCoors[barCoors.length - 1][1].x,
              name: '预测',
              label: {
                show: true,
                position: ['20px', '20px'],
                color: '#57617B',
                fontSize: 14,
              },
              itemStyle: { color: 'rgba(217, 242, 253, 0.15)', cursor: 'pointer' },
            },
          ],
        ];
      }
      return barCoors;
    },
    /**
     * 设置 y 右轴 刻度 保持和左轴统一
     */
    setNumber(chartInstance, yAxis, oldMin = null, oldMax = null, oldInterval = null) {
      const axisL = this.getY(chartInstance.getModel().getComponent('yAxis', 0));
      const axisR = this.getY(chartInstance.getModel().getComponent('yAxis', 1));
      // if (axisL.lenght === 0 || axisL.count - axisL.lenght === 0) return;
      // 下刻度比较多的是，用下半区计算间隔
      let setMin = axisR.interval * axisL.lenght * -1;
      // 计算下半轴 换算 间距
      const intervalLow = Math.ceil((oldMax - axisR.setMin) / axisL.count);
      const setMinLow = axisR.interval * axisL.lenght * -1;
      // 计算上半轴 换上 间距
      const intervalUp = Math.ceil(oldMax / (axisL.count - axisL.lenght));
      // 挑选间距大的做间距，保证真实线段 max 和 min 都能展示 TODO 下期间距可以优化成 整10 整百 整千
      let interval = intervalLow;
      if (intervalLow < intervalUp) {
        interval = intervalUp;
      }
      interval = this.numberInt(interval);
      // 重绘 min
      setMin = Math.ceil(interval * axisL.lenght * -1);
      let max = (axisL.count - axisL.lenght) * interval;
      console.log(setMin, max, interval, 'console.log(interval)');
      if (axisL.lenght === 0) {
        setMin = oldMin;
        interval = oldInterval;
      }
      if (axisL.count - axisL.lenght === 0) {
        max = oldMax;
        setMin = oldMin;
        interval = oldInterval;
      }
      // 重绘 max
      axisR.setMin = setMin < oldMin ? setMin : oldMin;
      axisR.setLin = axisL.count;
      axisR.interval = interval;
      axisR.max = max > oldMax ? max : oldMax;
      console.log(
        axisR,
        oldMin,
        oldMax,
        oldInterval,
        axisL.lenght === 0,
        axisL.count - axisL.lenght === 0,
      );
      // 修改 y 轴原始数据
      [axisL, axisR].forEach((item, index) => {
        if (index) {
          yAxis[index].max = item.max;
          yAxis[index].min = item.setMin;
          yAxis[index].interval = item.interval;
          yAxis[index].splitNumber = item.setLin;
        }
      });
      chartInstance.setOption({ yAxis });
    },
    /**
     * 获取 y 轴
     */
    getY(param) {
      if (!param) {
        return { interval: 0, min: 0, max: 0, lenght: 0, setMin: 0 };
      }
      const interval = param.axis.scale._interval;
      const min = param.axis.scale._extent[0];
      const max = param.axis.scale._extent[1];
      let lenght = 0;
      const count = (max - min) / interval;
      if (min < 0) {
        lenght = Math.abs(min / interval);
      }
      return {
        interval,
        min: Math.floor(min / 10) * 10,
        max: Math.ceil(max / 10) * 10,
        lenght,
        setMin: 0,
        count,
      };
    },
    /**
     * 数据可读性
     * @param {Number} number 间隔数 1450
     */
    numberInt(number) {
      const length = number.toString();
      let uilt = 1;
      let newMax = 0;
      let yu = 0;
      for (let i = 1; i < length.length; i++) {
        uilt = uilt * 10;
      }
      // 入参大于10
      if (uilt > 1) {
        // 取出最大位整数 1450 => 1000
        newMax = parseInt(number / uilt, 10) * uilt; // 1000
        // 取余数 1450 => 450
        yu = number % uilt;
        // 余数整除 450 => 4
        yu = parseInt(yu / (uilt / 10), 10); // 4
        // maxint = maxint * uilt;
      } else {
        yu = number;
      }
      // 小于五 取5
      if (yu < 5) yu = 5;
      // 小于10 大于5 取 10
      if (yu > 5 && yu < 10) yu = 10;
      // 入参大于10还原入参
      if (uilt > 1) {
        // 开始还原 1000 + （5 * 1000）/ 10
        newMax += (yu * uilt) / 10; // 1450 => 1500
      } else {
        newMax = yu;
      }
      // newMax * uilt;
      return newMax;
    },
  },
};
</script>
<style lang="scss" scoped>
.marker-box {
  position: relative;

  .forecast-back {
    position: absolute;
    top: 80px;
    right: 48px;
    z-index: 0;
    width: 20%;
    height: 300px;
    padding: 10px;
    font-size: 14px;
    color: #101010;
    background: rgba(217, 242, 253, 1);
    box-sizing: border-box;
  }
}
</style>
