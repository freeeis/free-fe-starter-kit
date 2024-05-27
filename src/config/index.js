/*
 * @Description: 定义全局方法 + 全局配置入口。
 * 全局配置加载顺序为：默认配置 -> 当前环境对应的配置。后者覆盖前者。
 * 全局配置中，每个模块的配置信息，会覆盖模块内部定义的配置默认值。
 *
 * @Author: zhiquan <x.zhiquan@gmail.com>
 * @Date: 2021-06-21 15:22:03
 * @LastEditTime: 2023-06-16 10:43:55
 * @LastEditors: zhiquan
 */

import { extend } from 'quasar';

/**
 * Deep clone an object.
 * Be careful, if define Object.prototype.clone here (which should be better), it will conflict with mongoose lib. Not investigated yet!
 */
Object.clone = function (source) {
  // Handle null or undefined or function
  if (!source || ("object" != typeof source) || (Object.keys(source).length <= 0))
      return source;

  // Handle the 3 simple types, Number and String and Boolean
  if (source instanceof Number || source instanceof String || source instanceof Boolean)
      return source.valueOf();

  // Handle Date
  if (source instanceof Date) {
      var copy = new Date();
      copy.setTime(source.getTime());
      return copy;
  }
  // Handle Array or Object
  if (Array.isArray(source)) {
      const copy = [];
      for (let i = 0; i < source.length; i += 1) {
          const attr = source[i];

          copy[i] = attr ? Object.clone(attr) : attr;
      }

      return copy;
  } else if (typeof source === 'object') {
      const copy = {};
      Object.keys(source).forEach(attr => {
          if (source.hasOwnProperty(attr) && !attr.startsWith('_') && !attr.startsWith('$'))
              copy[attr] = source[attr] ? Object.clone(source[attr]) : source[attr];
      })

      return copy;
  }

  // not support other types yet!
  throw new Error(`${typeof source} is not supported!`);
}


/**
 * Merge (deep) multiple objects into the target object.
 */
Object.merge = (target, ...source) => {
  const mg = (t, s) => {
    s = s || {};
    Object.keys(s).forEach((k) => {
      const sv = s[k];
      if (!Array.isArray(sv) && typeof sv === 'object') {
        t[k] = t[k] || {};
        mg(t[k], sv);
      } else {
        t[k] = sv;
      }
    });
  };

  target = target || {};
  for (let i = 0; i < source.length; i += 1) {
    mg(target, source[i]);
  }

  return target;
};

/**
 * @description: 检查给定值是否有内容。
 * 如果不是对象，则检查其是否为空。如果是对象，则检查其是否为空对象。
 *
 * @param {any} o 要检查的值
 * @return {Boolean} 是否有内容的判定。
 */
Object.hasValue = (o) => {
  if ([undefined, null].indexOf(o) >= 0) return false;
  if (typeof o !== 'object' && !!o) return true;

  if (typeof o === 'object') {
    for (let j = 0; j < Object.keys(o).length; j += 1) {
      if (Object.hasValue(o[Object.keys(o)[j]])) return true;
    }
  }

  return false;
};

/**
 * @description: 获取对象中的嵌套值。
 * @param {Object} obj 要获取其嵌套值的对象
 * @param {String} p 要获取值的路径，可使用"."来连接多层级，以获取深层嵌套值
 * @return {any} 指定路径下的嵌套值
 */
Object.nestValue = (obj, p) => {
  if (!obj || !p) return undefined;

  if (p === '.') return obj;

  let v = obj;
  const pList = p.split('.');

  for (let i = 0; i < pList.length; i += 1) {
    if (!v) return v;

    const pl = pList[i];

    if (typeof v[pl] === 'object') v = v[pl];
    else { return v[pl]; }
  }

  return v;
};

/**
 * @description: 设置对象的嵌套值
 *
 * @param {Object} obj 要设置嵌套值的对象
 * @param {String} n 要设置嵌套值的路径
 * @param {any} v 要设置的值
 * @return {Object} 设置了嵌套值之后的对象
 */
Object.setValue = (obj, n, v) => {
  if (!obj || !n) return undefined;

  let t = obj;
  const nList = n.split('.');
  for (let i = 0; i < nList.length; i += 1) {
    const nl = nList[i];

    if (i < nList.length - 1) {
      if (!t[nl]) {
        t[nl] = Number(nList[i + 1]) >= 0 ? [] : {};
      }
      t = t[nl];
    } else {
      t[nl] = v;
    }
  }

  return obj;
};

/**
 * Remove cycle references from a given object
 * @param {*} o The object from which to remove the cycle reference
 */
 const decycle = (o) => {
  if(typeof o !== 'object' || !o) return o;

  let ret;
  o.__cycle_mark = 1;

  if(Array.isArray(o)) {
    ret = [];
    for(let oi of o) {
      if(!oi || !oi.__cycle_mark){
        ret.push(decycle(oi));
      }
    }
  } else {
    ret = {};

    for(let ok of Object.keys(o)) {
      if(!o[ok] || !o[ok].__cycle_mark) {
        ret[ok] = decycle(o[ok]);
      }
    }
  }

  delete o.__cycle_mark;
  delete ret.__cycle_mark;
  return ret;
}

Object.decycle = (obj) => {
  if(typeof obj !== 'object') return obj;

  const extObj = Array.isArray(obj) ? extend(true, [], obj) : extend(true, {}, obj);

  return decycle(extObj);
}

import config from './config.default';

const allConfigs = {};

// 获取所有环境的全局配置
const configContext = require.context('./', true, /\/config.[a-z]+.js$/);
const contextKeys = configContext.keys();
for (let i = 0; i < contextKeys.length; i += 1) {
  let cn = contextKeys[i];
  cn = cn.substr('./config.'.length);
  cn = cn.substr(0, cn.length - 3);

  if (cn && !allConfigs[cn]) {
    allConfigs[cn] = configContext(contextKeys[i]).default;
  }
}

// 根据当前运行环境返回需要的全局配置
const finalConfig = Object.merge(config, allConfigs[`${process.env.env || 'development'}`]);

export default finalConfig;
