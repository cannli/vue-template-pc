/* eslint-disable eqeqeq */
/* eslint-disable no-var */
/* eslint-disable no-param-reassign */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-collapsible-if */
import moment from 'moment';

export default function(Vue) {
  'use strict';
  // 数字三位一份 Money传1就会保留2位小数
  Vue.prototype.formatNum = function(str, Money, f) {
    if (str === '-') {
      return str;
    }

    if (f) {
      if (typeof str === 'string') {
        if (str.indexOf('-') > -1) return str;
      }
    }
    const isMoney = Money === 1;
    let newStr = '';
    let islose = false;
    let count = 0;
    if (str == null || str === '' || isNaN(str)) {
      // 算术运算（如求负数的平方根）的结果不是数字 无穷与非数值
      return isMoney ? '0.00' : '0';
    }
    str = Money ? (str * 1).toFixed(2) : str;
    str = str.toString();
    if (str[0] === '-') {
      islose = true;
      str = str.substring(1, str.length);
    }
    if (str.indexOf('.') === -1) {
      // 无小数点后面数字
      for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 === 0 && count !== 0) {
          newStr = `${str.charAt(i)},${newStr}`;
        } else {
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      str = newStr + (isMoney ? '.00' : ''); // 自动补小数点后两位
    } else {
      for (var i = str.indexOf('.') - 1; i >= 0; i--) {
        if (count % 3 == 0 && count !== 0) {
          newStr = `${str.charAt(i)},${newStr}`;
        } else {
          newStr = str.charAt(i) + newStr; // 逐个字符相接起来
        }
        count++;
      }

      if (isMoney) {
        // 若是金额 需先判断小数位数
        const lastStr = str.substring(str.indexOf('.') + 1, str.length);
        if (lastStr.length === 2) {
          // 两位小数 输出
          str = `${newStr}.${lastStr}`;
        } else if (lastStr.length === 1) {
          // 一位小数 补零输出
          str = `${newStr}.${lastStr}${lastStr * 1 < 10 ? '0' : ''}`;
        } else {
          // 多位小数 四舍五入输出
          str = parseFloat(str).toFixed(2);
        }
      } else {
        str = newStr + str.substr(str.indexOf('.'), 3);
      }
    }
    return islose ? `-${str}` : str;
  };

  /**
   *  为null，undfined,为空时变成杠-, 是number时
   */
  Vue.prototype.numFormatter = function(val, type = 'num') {
    if (val == null || val === '') {
      return '-';
    }
    if (typeof val === 'number') {
      return this.formatNum(val, type);
    }
    return val;
  };
  // 纯粹的alert框 success error warning
  Vue.prototype.elAlert = function(
    text,
    type = 'warning',
    title = '提示',
    cancel = true,
    confirm = false,
  ) {
    this.$alert(text, title, {
      showCancelButton: cancel,
      showConfirmButton: confirm,
      dangerouslyUseHTMLString: true,
      type,
    }).catch(() => {
      // errCb
    });
  };
  // message提示  success  warning  error
  Vue.prototype.message = function(text, type = 'success') {
    if (type === 'error') {
      this.$message.error(text);
    } else {
      this.$message({
        message: text,
        type,
      });
    }
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  Vue.prototype.debounce = function(func, wait, immediate) {
    let timeout;
    let args;
    let context;
    let timestamp;
    let result;
    const later = function() {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp;
      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) {
            args = null;
            context = args;
          }
        }
      }
    };
    return function(...args) {
      context = this;
      timestamp = +new Date();
      const callNow = immediate && !timeout;
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = null;
      }
      return result;
    };
  };

  Vue.prototype.timeout = function(time = 100) {
    return new Promise(resolve => setTimeout(resolve, time));
  };

  /**
   * @desc 获取当前日期
   * */
  Vue.prototype.getCurrDate = (e = '') => moment(e).format('YYYY-MM-DD');
  /**
   * @desc 将unix时间戳转成普通时分秒时间
   * */
  Vue.prototype.transformUnixStampToTime = function(time) {
    return moment(time).format('YYYY-MM-DD');
  };

  /**
   * 获取最近一个月的开始，结束日期
   */
  Vue.prototype.startToEndMoon = function(date = 0) {
    const nlit = 3600 * 1000 * 24;
    const time = new Date().getTime() + date * nlit;
    const curr = moment(time).format('YYYY-MM-DD');
    const end = moment(new Date().getTime() - nlit * 30).format('YYYY-MM-DD');
    return [end, curr];
  };
  /**
   esc 数组中根据 得出 name
   * key 是 相当 数组 中 的id
   */
  Vue.prototype.arrValToName = function(arr, val, key = 'val', name = 'name') {
    if (val === '' || val === null || arr.length <= 0) {
      return '-';
    }
    for (const x in arr) {
      if (String(arr[x][key]) === String(val)) {
        return arr[x][name];
      }
    }
  };
  // 判断文件的格式
  Vue.prototype.BaseConfigFn = function(val) {
    if (val == null || val === '' || val.length <= 0) {
      return;
    }
    const MediumType = {
      '.jpg|.gif|.png|.jpeg': 'image',
      '.doc|.docx|.xls|.xlsx|.ppt|.pptx|.pdf': 'document',
      '.wmv|.asf|.flv|.mp4|.rmvb': 'video',
      '.wav|.mp3|.ogg': 'audio',
    };
    const extension = val.substring(val.lastIndexOf('.'));
    for (const key in MediumType) {
      const reg = new RegExp(key);
      if (reg.test(extension.toLowerCase())) {
        return MediumType[key];
      }
    }
    return '其他';
  };
  Vue.prototype.timeout = function(time = 100) {
    return new Promise(resolve => setTimeout(resolve, time));
  };
}
