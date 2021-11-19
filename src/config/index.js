import { extend } from 'quasar';

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

Object.nestValue = (obj, p) => {
  if (!obj || !p) return undefined;

  if (p === '.') return obj;

  let v = obj;
  const pList = p.split('.');

  for (let i = 0; i < pList.length; i += 1) {
    const pl = pList[i];

    if (typeof v[pl] === 'object') v = v[pl];
    else { return v[pl]; }
  }

  return v;
};

Object.setValue = (obj, n, v) => {
  if (!obj || !n) return undefined;

  let t = obj;
  const nList = n.split('.');
  for (let i = 0; i < nList.length; i += 1) {
    const nl = nList[i];

    if (i < nList.length - 1) {
      if (!t[nl]) {
        t[nl] = typeof nList[i + 1] === 'number' ? [] : {};
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
  if(typeof o !== 'object') return o;

  let ret;
  o.__cycle_mark = 1;

  if(Array.isArray(o)) {
    ret = [];
    for(let oi of o) {
      if(!oi.__cycle_mark){
        ret.push(decycle(oi));
      }
    }
  } else {
    ret = {};

    for(let ok of Object.keys(o)) {
      if(!o[ok].__cycle_mark) {
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

const finalConfig = Object.merge(config, allConfigs[`${process.env.env || 'development'}`]);

export default finalConfig;
