/**
 * @module ValidatorUtils
 */
import {FetchUtils} from '../index';
import emojiRegex from 'emoji-regex';

/**
 * 自定义正则验证规则
 *
 * @param regex 外部定义的正则表达式
 * @param rule 规则（暂时无用）
 * @param value 需要验证的字符串
 * @param callback 完成回调
 */
export function validateWithRegExp(
  regex: RegExp,
  rule: object = {},
  value: any,
  callback: Function
) {
  if (!(regex instanceof RegExp)) {
    regex = new RegExp(regex);
  }
  if (value && !regex.test(value)) {
    callback('匹配成功');
  } else {
    callback();
  }
}

/**
 * 验证表情
 *
 * @param rule 规则（暂时无用）
 * @param value 需要验证的字符串
 * @param callback 完成回调
 */
export function validateEmoji(
  rule: object = {},
  value: any,
  callback: Function
) {
  if (value && emojiRegex().test(value)) {
    callback('请不要输入表情符号');
  } else {
    callback();
  }
}

/**
 * 验证非法字符串
 *
 * @example 字符串验证的正则表达式为 /^[A-z0-9\\_\\#\\$\\\u4e00-\u9fa5]*$/
 *
 * @inner
 * @param {object} rule 规则（暂时无用）
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回请不要输入非法字符
 */
export function validateSpecialCharacters(
  rule: object = {},
  value: any,
  callback: Function
) {
  let message = '请不要输入非法字符';
  let regEx = /^[A-z0-9\\_\\#\\$\\\u4e00-\u9fa5]*$/;
  if (value && !regEx.test(value)) {
    callback(message);
  } else {
    callback();
  }
}

/**
 * 验证IP地址
 *
 * @example 字符串验证的正则表达式为/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
 *
 * @inner
 * @param {object} rule 规则（暂时无用）
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回IP地址不正确
 */
export function checkIP(rule: object = {}, value: any, callback: Function) {
  var reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  if (value && !reg.test(value)) {
    callback('IP地址不正确');
  } else {
    // console.log("callback")
    callback();
  }
}

/**
 * 验证端口
 *
 * @example 字符串验证的正则表达式为/^(\d)+$/g 且小于等于65535 且大于0
 *
 * @inner
 * @param {object} rule 规则（暂时无用）
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回请输入正确的端口
 */
export function validatePort(
  rule: object = {},
  value: any,
  callback: Function
) {
  let message = '请输入正确的端口';
  var parten = /^(\d)+$/g;
  if (!value) {
    callback();
  } else {
    if (parten.test(value) && parseInt(value) <= 65535 && parseInt(value) > 0) {
      callback();
    } else {
      callback(message);
    }
  }
}

/**
 * 验证端口或域名
 *
 * @example 字符串验证的正则表达式为/^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/
 *
 * @inner
 * @param {string} rule 规则（暂时无用）
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回端口或域名不正确！
 */
export function checkIPorDomain(
  rule: object = {},
  value: any,
  callback: Function
) {
  var reg =
    /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/;
  if (value && !reg.test(value)) {
    callback('端口或域名不正确！');
  } else {
    // console.log("callback")
    callback();
  }
}

/**
 * 验证IP地址
 *
 * @example 字符串验证的正则表达式为 /^[0-9a-fA-F\\.\\:////]{2,39}$/
 *
 * @inner
 * @param {object} rule 规则（暂时无用）
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回Ip地址不正确
 */
export function checkIPCust(rule: object = {}, value: any, callback: Function) {
  var reg = /^[0-9a-fA-F\\.\\:////]{2,39}$/;

  if (!reg.test(value)) {
    callback('Ip地址不正确');
  } else {
    callback();
  }
}

/**
 * 验证密码强度
 *
 * @example 字符串验证的正则表达式为 /^\d{1,6}$/
 *
 * @inner
 * @param {object} rule 规则（暂时无用）
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回密码为弱密码！
 */
export function checkWeekPassword(
  rule: object = {},
  value: any,
  callback: Function
) {
  if (/^\d{1,6}$/.test(value)) {
    callback('密码为弱密码！');
  } else {
    callback();
  }
}

/**
 * 验证手机号码格式
 *
 * Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
 * @example 字符串验证的正则表达式为 /^(0?1[123456789]\d{9})$/
 *
 * @inner
 * @param {object} rule 校验规则（暂时无用）
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回手机号码格式不正确！
 */
export function checkMobile(rule: object = {}, value: any, callback: Function) {
  var rexp = /^1\d{10}$/;
  if (value && !rexp.test(value)) {
    callback('手机号码格式不正确！');
  } else {
    callback();
  }
  // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
}

/**
 * 验证邮箱格式
 *
 * @example 字符串验证的正则表达式为 /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 来源 https://emailregex.com/ Javascript
 *
 * @inner
 * @param {object} rule 校验规则（暂时无用）
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回邮箱格式不正确！
 */
export function checkEmail(rule: object = {}, value: any, callback: Function) {
  var rexp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value && !rexp.test(value)) {
    callback('邮箱格式不正确！');
  } else {
    callback();
  }
}

/**
 * 验证身份证号码格式
 *
 * @example 字符串验证的正则表达式为 /(^\d{17}(\d|x|X)$)/i
 *
 * @inner
 * @param {object} rule 校验规则（暂时无用）
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回身份证号码格式不正确！
 */
export function checkIDCard(rule: object = {}, value: any, callback: Function) {
  var rexp = /(^\d{17}(\d|x|X)$)/i;
  if (!rexp.test(value)) {
    callback('身份证号码格式不正确！');
  } else {
    callback();
  }
}

/**
 * 验证数字边界
 *
 * @example [
 *  rangs: [1, 9]
 *  value: 8 -> 通过
 *  value: 11-> 请输入区间值[1, 9]
 * ]
 *
 * @inner
 * @param {object} rule 校验规则
 * @param {number[]} rule.ranges 边界数组[min, max]
 * @param {number} value 需要验证的值
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回请输入区间值[min, max]
 */

export function ranges(
  {ranges}: {ranges: number | number[]},
  value: number,
  callback: Function
) {
  if (ranges instanceof Array && ranges.length === 2) {
    if (ranges[0] > value || ranges[1] < value) {
      callback(`请输入区间值${JSON.stringify(ranges)}`);
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 验证文件尺寸
 *
 * @example [
 *  rule: { fileSize: 1024 * 1024 }
 *  value: { file: { size: 1024 } } -> 通过
 *  value: { file: { size: 1024 * 1024 * 1024 } }-> 文件大小不超过 1024 * 1024
 * ]
 * @inner
 * @param {object} rule 校验规则
 * @param {number} rule.fileSize 文件尺寸最大值
 * @param {object} value 需要验证的文件对象
 * @param {object} value.file 需要验证的文件对象
 * @param {number} value.file.size 文件尺寸大小
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回文件大小不超过fileSize
 */

export function fileSize(
  rule: {fileSize: number},
  value: any,
  callback: Function
) {
  if (value.file && value.file.size > rule.fileSize) {
    callback(`文件大小不超过 ${rule.fileSize}`);
  } else {
    callback();
  }
}

/**
 * 验证字符串/数组元素为正整数
 *
 * Note: 只验证数组的元素和字符串是否为正整数 其他的数据类型暂不校验
 *
 * @example 字符串验证的正则表达式为 /^([1-9]\d*|[0]{0,1})$/
 *
 * @inner
 * @param {string} rule 校验规则（暂时无用）
 * @param {string|number[]} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回必须为正整数！
 */
export function integer(rule: object = {}, value: any, callback: Function) {
  var rexp = /^([1-9]\d*|[0]{0,1})$/;
  if (value instanceof Array) {
    for (let i = 0; i < value.length; i++) {
      if (!rexp.test(value[i])) {
        return callback('必须为正整数！');
      }
    }
    return callback();
  } else if (typeof value === 'string') {
    if (!rexp.test(value)) {
      return callback('必须为正整数！');
    } else {
      return callback();
    }
  }
  return callback();
}

/**
 * 验证长度
 *
 * Note: 只验证数据类型可以获取.length的有效结果的数据类型，包括字符串和数组
 *
 * @example [
 *  rule: { value: 5 }
 *  value: '1234' -> 通过
 *  value: [1, 2, 3, 4, 5, 6] ->  不能大于5项
 * ]
 * @inner
 * @param {object} rule 校验规则
 * @param {number} rule.value 最大长度
 * @param {string|number[]} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回不能大于（最大长度）项
 */

export function maxLength(
  rule: {value: number},
  value: any,
  callback: Function
) {
  if (value && value.length > rule.value) {
    callback('不能大于' + rule.value + '项');
  } else {
    callback();
  }
}

/**
 * 验证是否与某字段相同
 *
 *
 * @example [
 *  rule: { field: '123' }
 *  value: '1234' -> 不通过
 *  value: '123' ->  通过
 * ]
 * @inner
 * @param {object} rule 校验规则
 * @param {any} rule.field 需要匹配的字段
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 */
export function compareToField(
  rule: {field?: any; message?: string} = {},
  value: string,
  callback: Function
) {
  const message = rule.message || '与需要匹配的字段不相同';
  if (rule.field === value) {
    callback();
  } else {
    callback(message);
  }
}

/**
 * 验证标签最大长度
 *
 * Note: 默认最大长度为5，标签以英文逗号分隔
 *
 * @example [
 *  value: '1,2,3' -> 通过
 *  value:'1,2,3,4,5,6,7,8' ->  备注标签最多5项
 * ]
 * @inner
 * @param {object} rule 校验规则（暂时无用）
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回备注标签最多5项
 */
export function tagMaxLength(
  rule: object = {},
  value: string,
  callback: Function
) {
  if (value && value.split(',').length > 5) {
    callback('备注标签最多5项');
  } else {
    callback();
  }
}

/**
 * 验证日期差
 *
 * Note: value的元素类型需要时moment类型，需要使用moment.diff比较函数,第一个元素日期要小于第二个元素日期
 *
 * @example [
 *  rule: { days: 5 }
 *  value: [moment('2019-01-01'), moment('2019-01-03')] -> 通过
 *  value：[moment('2019-01-01'), moment('2019-01-13')] -> 日期差不能超过5天
 * ]
 * @inner
 * @param {object} rule 校验规则
 * @param {number} rule.days 日期差（天数）
 * @param {array} value 需要验证的日期 [min, max]
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回日期差不能超过(days)天
 */

export function dateRangePicked(
  rule: {days: number},
  value: any,
  callback: Function
) {
  var days = rule.days;
  let diffDays = value[1].diff(value[0], 'days');
  if (diffDays > days) {
    callback('日期差不能超过' + days + '天');
  } else {
    callback();
  }
}

/**
 * 验证日期差
 *
 * Note: value的类型是moment类型，需要使用moment.diff比较函数,规则的比较类型不传或者传错，则不比较
 *
 * @example [
 *   rule: { date: [moment('2019-01-01'), type: 'bigger' }
 *   value: moment('2019-02-01') -> 通过
 *   value：moment('2018-01-01') -> 结束时间必须大于开始时间！
 * ]
 *
 * @inner
 * @param {object} rule 校验规则
 * @param {object} rule.date 日期(moment日期)
 * @param {string} rule.type 比较类型 bigger|smaller
 * @param {object} value 需要验证的日期(moment日期)
 * @param {function} callback 完成回调
 * @return {string} Desc: 通过校验的字符串返回undefined 未通过返回日期差不能超过(days)天
 */

export function dateCompare(
  rule: {date?: object; type: string},
  value: any,
  callback: Function
) {
  var date = rule.date;
  var type = rule.type;
  if (value && date) {
    let diff = value.diff(date);
    if (type === 'bigger') {
      if (diff < 0) {
        callback('结束时间必须大于开始时间！');
      } else {
        callback();
      }
    } else if (type == 'smaller') {
      if (diff > 0) {
        callback('开始时间必须小于结束时间！');
      } else {
        callback();
      }
    } else {
      callback();
    }
  } else {
    callback();
  }
}

function fetchWhich(isGet: Boolean, url: string, options: RequestInit) {
  return isGet
    ? FetchUtils.fetchGet(url, options)
    : FetchUtils.fetchPost(url, options);
}

/**
 * remote - 远程校验方法 （默认post 请求 ）
 *
 * @param  {json} rule     校验参数{ - url - params(选填) - method -options(选填) -callback(选填)}
 * @param  {type} value    description
 * @param  {type} callback antd 校验回调函数
 * @return {null}
 */

export function remote(
  rule: {
    field: string;
    url: string;
    method?: string;
    options?: RequestInit;
    callback?: Function;
    params?: any;
    paramsFormat?: Function;
  },
  value: any,
  callback: Function
) {
  let {url, field, paramsFormat} = rule;
  // let url = rule.url;
  // let name = rule.field;
  let params = typeof rule.params === 'function' ? rule.params() : rule.params;
  params = {[field]: value, ...params};
  let isGet = rule.method ? rule.method.toUpperCase() !== 'POST' : true;
  let options = rule.options ? rule.options : {};
  options.body =
    paramsFormat === undefined
      ? {[field]: value, ...params}
      : paramsFormat({[field]: value, ...params});
  fetchWhich(isGet, url, options)
    .then((res: Response | CommonResponseJson) => {
      if (rule.callback) {
        rule.callback(res, callback);
      } else {
        if (res.code == 0) {
          callback();
        } else {
          callback((<CommonResponseJson>res).message);
        }
      }
    })
    .catch((err) => {
      // console.error('fetch error', err.message)
    });
}

/**
 * 同时验证ipv4和ipv6
 *
 * Note: 同一个输入框验证分别验证ipv4格式和ipv6格式
 *
 * @example [
 *  rule: 暂时不需要
 *  value: '192.168.1.1' -> 通过
 *  value: ‘192.1.1’ ->  不通过
 * ]
 * @inner
 * @param {object} rule 校验规则
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {boolean} Desc: 通过验证返回true，否则返回false
 */
export function validateIpV4V6(
  rule: Object = {},
  value: string = '',
  callback: Function
) {
  if (!value) {
    callback();
  }
  if (value && value.includes(':')) {
    validateIpV6(rule, value, callback);
  } else if (value && value.includes('.')) {
    validateIpV4(rule, value, callback);
  } else {
    callback('Ip地址不正确');
  }
}

/**
 * 只验证ipv4格式
 * @inner
 * @param {object} rule 校验规则
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {boolean} Desc: 通过验证返回true，否则返回false
 */
export function validateIpV4(
  rule: Object = {},
  value: string = '',
  callback: Function
) {
  if (!value) {
    callback();
  }
  if (value && !ipV4(value)) {
    callback('Ip地址不正确');
  } else {
    callback();
  }
}

/**
 * 只验证ipv6格式
 * @inner
 * @param {object} rule 校验规则
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 * @return {boolean} Desc: 通过验证返回true，否则返回false
 * 目前不支持包含 ‘.’ 的 IPV6 格式
 */
export function validateIpV6(
  rule: Object = {},
  value: string = '',
  callback: Function
) {
  if (!value) {
    callback();
  }
  if (value && !ipV6(value)) {
    callback('Ip地址不正确');
  } else {
    callback();
  }
}

/**
 * 验证 IP 段
 * @param rule 校验规则
 * @param value 需要验证的字符串
 * @param callback 完成回调
 * @return {boolean} Desc: 通过验证返回 true，否则返回 false
 */
export function validateIpSection(
  rule: Object = {},
  value: string = '',
  callback: Function
) {
  if (!value) {
    callback('Ip地址不正确');
  }
  if (value && value.includes(':')) {
    validateIpV4Section(rule, value, callback);
  } else if (value && value.includes('.')) {
    validateIpV6Section(rule, value, callback);
  } else if (value) {
    validateIpV4Section(rule, value, callback);
  } else {
    callback('IP地址不正确');
  }
}

export function validateIpV4Section(
  rule: Object = {},
  value: string = '',
  callback: Function
) {
  if (!value) {
    callback();
  }
  if (value && !ipV4Section(value)) {
    callback('Ip地址不正确');
  } else {
    callback();
  }
}

export function validateIpV6Section(
  rule: Object = {},
  value: string = '',
  callback: Function
) {
  if (!value) {
    callback();
  }
  if (value && !ipV6Section(value)) {
    callback('Ip地址不正确');
  } else {
    callback();
  }
}

/**
 * 验证 Mac 地址
 * @param rule 校验规则
 * @param value 需要验证的字符串
 * @param callback 完成回调
 * @return {boolean} Desc: 通过验证返回 true，否则返回 false
 */
export function validateMac(
  rule: Object = {},
  value: string = '',
  callback: Function
) {
  if (!value) {
    callback();
  }
  if (value && !mac(value)) {
    callback('Mac地址不正确');
  } else {
    callback();
  }
}

/**
 * 同时验证ipv4和ipv6格式，并能验证逗号隔开的多个ip
 *
 * Note: 一个输入框内同时存在ipv4和ipv6，并使用,隔开0
 * 例如：192.168.0.1,192.168.0.2
 *
 * @inner
 * @param {object} rule 校验规则
 * @param {string} value 需要验证的字符串
 * @param {function} callback 完成回调
 */
export function validateIpV4AndV6(
  rule: Object = {},
  value: string = '',
  callback: Function
) {
  if (!value) {
    callback();
  } else if (validateIpArray(value)) {
    callback();
  } else {
    callback('Ip地址不正确');
  }
}

/**
 * 验证ipv4数组和ipv6数组
 * @inner
 * @param {string} value 需要验证的字符串
 * @return {boolean} Desc: 通过验证返回true，否则返回false
 */
function validateIpArray(value: string) {
  let flag = true;
  let valueArray = value.split(',');
  valueArray.map((item) => {
    if (!ipV4(item) && !ipV6(item)) {
      flag = false;
    }
  });
  return flag;
}

export function ipV4(value: string = '') {
  var reg: RegExp =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(value);
}

export function ipV6(value: string = '') {
  var reg: RegExp =
    /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  return reg.test(value);
}

export function ipV4Section(value: string = '') {
  var reg: RegExp =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.\*$/;
  return reg.test(value);
}

export function ipV6Section(value: string = '') {
  var reg: RegExp =
    /^((([0-9A-Fa-f]{1,4}:){7}\*)|(([0-9A-Fa-f]{1,4}:){6}(:\*))|(([0-9A-Fa-f]{1,4}:){5}((:[0-9A-Fa-f]{1,4}:\*)|:\*))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,2}:\*)|:\*))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,3}:\*)|:\*))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,4}:\*)|:\*))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,5}:\*)|:\*))|(:(((:[0-9A-Fa-f]{1,4}){1,6}:\*)|:\*)))$/;
  return reg.test(value);
}

export function mac(value: string = '') {
  var reg: RegExp =
    /^(([a-fA-F0-9]{2}(-[a-fA-F0-9]{2}){5})|([a-fA-F0-9]{2}(:[a-fA-F0-9]{2}){5})|([a-fA-F0-9]{12}))$/;
  return reg.test(value);
}
