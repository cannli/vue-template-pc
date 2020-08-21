import echarts from 'echarts';
import { set } from 'vue/types/umd';
/**
 * 图表
 * @params {dom} html 节点
 * @params {backgroundColor} 图表背景颜色
 * @params {unitName} 单位名称
 * title 标题
 * tooltip 悬浮提示框
 *
 */
class echartsClass {
  constructor({
    dom,
    backgroundColor = 'rgba(250,250,250,0)',
    unitName,
    legendData = [],
    xAxis: [],
  }) {
    const cchart = this.initEcharts(dom);
    // 背景颜色
    let backgroundColor = backgroundColor;
    // 标题数据
    let legendData = legendData;
    // x轴
    let xAxis = [];
    xAxis = xAxis;
    // 标题样式
    const title = {};
    // 悬浮提示
    const tooltip = {};
    // item的标题
    const legend = {};
    // 单位
    const unitName = unitName;
  }

  /**
   * 初始化图表
   */
  initEcharts(dome) {
    const { backgroundColor } = this;
    const chart = echarts.init(dome, 'macarons');
    chart.setOption({ backgroundColor });
    return chart;
  }

  /**
   * 设置标题
   */
  setTitle(param = {}) {
    const title = {
      top: 10,
      right: 0,
      textStyle: {
        fontWeight: 'normal',
        fontSize: 14,
        color: '#101010',
      },
      left: '1%',
    };
    this.title = Object.assign(title, param);
    this.chart.setOption({ title: this.title });
  }

  /**
   * 设置图表标题
   */
  setLegend(param = {}) {
    this.legend = Object.assign(
      {
        top: 10,
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: this.legendData,
        // right: '4%',
        textStyle: {
          fontSize: 12,
          color: '#363636',
        },
      },
      param,
    );
    // 同步title 列表
    if (param.data) {
      this.legendData = param.data;
    }
    this.chart.setOption({ legend: this.legend });
  }

  /**
   * 设置提示框
   */
  setTooltip(param = {}) {
    this.tooltip = Object.assign(
      {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#57617B',
          },
        },
        formatter(arr) {
          return this.setFormAtter(arr, this.unitName);
        },
      },
      param,
    );
    this.chart.setOption({ legend: this.legend });
  }

  /**
   * 设置 x 轴
   * @param { boolean } boundaryGap  false:零刻度开始，true :代表离零刻度间隔一段距离
   * @param { boolean } onZero  false:零刻度开始，true :代表离零刻度间隔一段距离
   * @param { boolean } showMaxLabel ture 最大值 fase 不显示
   * @param { number } rotate  旋转角度
   * @param { Array } data  x轴刻度
   */
  setxAxis(param = {}) {
    const { boundaryGap = true, onZero = false, showMaxLabel = true, rotate = 0, data } = param;
    this.xAxis = [
      {
        type: 'category',
        boundaryGap, // 设置为false代表是零刻度开始，设置为true代表离零刻度间隔一段距离
        axisLine: {
          lineStyle: {
            color: '#333',
          },
          onZero,
        },
        // axisLabel设置成0则表示强制显示所有标签，设置为1的话，隔一个标签显示一个标签，以此类推。
        axisLabel: {
          // 坐标轴刻度标签的相关设置。
          showMaxLabel,
          interval: 'auto',
          formatter(value, index) {
            return value;
          },
          rotate,
          textStyle: {
            color: 'rgba(0,0,0,1)',
            fontSize: '12',
          },
        },
        data,
      },
    ];
    this.chart.setOption({ xAxis: this.xAxis });
  }

  /**
   * 设置 y 轴
   */
  setyAxis(param = {}) {
    // 初始化 y轴
    const { unitName } = this;
    const yAxis = [];
    for (let i = 0; i < unitName.length; i++) {
      const push = {
        type: 'value',
        name: `单位：${unitName[i]}`,
        nameLocation: 'end',
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#333',
          },
        },
        // 轴 text 样式 配置
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 14,
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
    this.chart.setOption({ yAxis });
  }
  /**
   * 设置折线柱状图
   */
  setSeries({ list = [], itemType: {}, yAxisIndex = [], lineColor = [], stack = [] }) {
    const seriesArr = [];
    const legendData = this;
    // 实际发生数据
    for (const x in list) {
      seriesArr.push({
        name: legendData[x],
        type: self.itemType[x],
        //  step: 'start',
        stack: stack[x],
        barMinHeight: 2,
        barMinWidth: 10,
        smooth: false, // 关键点，为true是不支持虚线的，实线就用true
        data: list[x],
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
  }
}
