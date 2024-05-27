/*
 * @Description: 封装axios库，实现后台接口调用。包括请求体的包装、响应数据的解析、mock等。
 * 此boot file需要在free之前加载，因为这里面定义的mock方法在free中将被调用。
 *
 * @Author: zhiquan
 * @Date: 2021-06-21 15:14:42
 * @LastEditTime: 2023-05-07 12:14:52
 * @LastEditors: zhiquan
 */
import Cookies from 'js-cookie';
import { boot } from 'quasar/wrappers'
import axios from 'axios'
import config from '../config';
import { Platform, Notify } from 'quasar';
import { getLocale } from './i18n';

import useAppStore from '@/stores/app';

let requests;
const Mocks = [];
let { baseUrl } = config;
const ERROR_MESSAGES = {
  401: 'No permission!',
};

/**
 * capacitor环境下，接口路径前需要添加设置的后台地址
 */
if (Platform.is.capacitor) {
  baseUrl = `${config.backendURL}/${baseUrl}`;
}

axios.defaults.timeout = 15 * 60 * 1000 * 1000;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 15 * 60 * 1000 * 1000,
});

axiosInstance.interceptors.request.use((cfg) => {
  cfg.cancelToken = new axios.CancelToken((tk) => {
    cfg.cancelTokenFunc = tk;
  });
  return cfg;
});

// respone interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config && response.config.shouldCancelRequest
      && ((typeof response.config.shouldCancelRequest === 'function')
        ? response.config.shouldCancelRequest() : true)) {
      response.config.cancelTokenFunc();
      throw new Error('request canceled');
    } else {
      return response.data;
    }
  },
  (error) => {
    /**
     * TODO: 如下处理不应该写死，而应该提取一些设置使其可以更灵活处理
     */
    if (error && error.response && error.response.status === 401) {
      if (window.location.pathname !== '/login' && !window.location.pathname.startsWith('/login?')) {
        // clear cached token
        Cookies.set('token', '');

        window.location.href = `/login?redirect=${window.location.pathname}`;
      }
    } else if (error && error.response && error.response.status === 403 && error.response.data && error.response.data.msg === 'RSTPWD') {
      if (window.location.pathname !== '/recover' && !window.location.pathname.startsWith('/recover?')) {
        window.location.href = `/recover?redirect=${window.location.pathname}`;
      }
    } else if (error && error.response && error.response.status !== 404) {
      if (error.response.data && error.response.data.msg) {
        let errMsg = error.response.data.msg.message || error.response.data.msg;
        if (error.response.data.msg.code) {
          errMsg = ERROR_MESSAGES[error.response.data.msg.code] || errMsg;
        }

        Notify.create(errMsg);
      }
    }
  },
);

/**
 * 在必要时为请求自动添加locale信息。受到全局配置的控制。
 *
 * @param {Object} opts 需要一起携带的参数
 * @returns 在必要时自动添加当前locale信息的请求参数
 */
const addLocale = (opts) => {
  if (opts && opts.locale) return opts;

  const locale = getLocale();
  if (config.requestWithLocale && locale) {
    return { ...opts, locale };
  }

  return { ...opts };
};

/**
 * 针对指定的接口地址和请求方法，寻找定义的Mock，如果找到则返回其定义的响应。
 * 只有开发环境可以使用Mock。同时也受全局配置ignoreMock的控制。
 *
 * @param {String} url 需要Mock的接口地址
 * @param {String} method 需要Mock的请求方法
 * @param {Object} opts 需要传递给Mock方法的参数
 * @returns 在可以找到指定Mock时返回其定义的响应方法。否则返回undefined。
 */
const mockIt = (url, method, opts) => {
  if (!process.env.DEV || config.ignoreMock) return undefined;

  const theMock = Mocks.find(
    (mk) => mk.method === method && new RegExp(mk.url).test(url),
  );
  if (theMock && theMock.func) {
    return new Promise((resolve) => {
      resolve(typeof theMock.func === 'function' ? theMock.func(opts) : theMock.func);
    });
  }
  return undefined;
};

/**
 * 根据请求体生成键值对数组
 *
 * @param {Object|String} o 请求参数体，可以是对象，也可以是字符串。
 * @param {String} parent 当前请求体的上级名称
 * @returns 所有请求参数以及其值组成的数组
 */
const getQueryKVPare = (o, parent = '') => {
  let kv = [];
  if (typeof o === 'object') {
    for (let i = 0; i < Object.keys(o).length; i += 1) {
      const ok = Object.keys(o)[i];

      const kvl = getQueryKVPare(o[ok], parent ? `${parent}_DOT_${ok}` : ok);
      kv = kv.concat(kvl);
    }
  } else if (parent && o !== void 0 && o !== null) {
    kv.push(`${encodeURI(parent)}=${encodeURI(o)}`);
  }

  return kv;
};

export default boot(({ app }) => {
  /**
   * 封装GET请求
   *
   * @param {String} url 请求地址
   * @param {Object} options 请求数据
   * @param {Bool} newWin 是否在新窗口打开
   * @returns 响应数据
   */
  const getRequest = (url, options, newWin = false) => {
    let queryString = '';

    const shouldCancel = { shouldCancelRequest: options && options.cancel_request };
    if (options) delete options.cancel_request;

    options = addLocale(options);

    if (options && Object.keys(options).length) {
      if (url.indexOf('?') > 0) {
        queryString += '&';
      } else {
        queryString += '?';
      }

      queryString += getQueryKVPare(options).join('&') || '';
    }

    if (newWin) {
      return window.open(`${config.baseUrl}/${encodeURI(url)}${queryString}`);
    }

    return mockIt(`${url}${queryString}`, 'get', options) || axiosInstance.get(encodeURI(url) + queryString, shouldCancel);
  };

  /**
   * 封装POST请求
   *
   * @param {String} url 请求地址
   * @param {Object} data 请求数据
   * @returns 响应数据
   */
  const postRequest = (url, data, opts) => {
    if (!opts?.__ignoreDecycle) {
      data = addLocale(data);
    }

    return mockIt(url, 'post', data) || axiosInstance.post(url, opts?.__ignoreDecycle ? data : Object.decycle(data), opts);
  };

  /**
  * 封装PUT请求
  *
  * @param {String} url 请求地址
  * @param {Object} data 请求数据
  * @returns 响应数据
  */
  const putRequest = (url, data, opts) => {
    if (!opts?.__ignoreDecycle) {
      data = addLocale(data);
    }

    return mockIt(url, 'put', data) || axiosInstance.put(url, opts?.__ignoreDecycle ? data : Object.decycle(data), opts);
  };

  /**
   * 封装DELETE请求
   *
   * @param {String} url 请求地址
   * @param {Object} data 请求数据
   * @returns 响应数据
   */
  const deleteRequest = (url, data, opts) => {
    if (!opts?.__ignoreDecycle) {
      data = addLocale(data);
    }

    return mockIt(url, 'delete', { data }) || axiosInstance.delete(url, { data: opts?.__ignoreDecycle ? data : Object.decycle(data)}, opts);
  };

  // 封装所有可用的实例和方法，以绑定到全局
  requests = {
    $axios: axiosInstance,
    postRequest,
    getRequest,
    putRequest,
    deleteRequest,
    // nothing请求，通常用来检测当前登录状态是否依然有效等
    nothingRequest: () => axiosInstance.get('/nothing'),
    checkVersion: () => {
      // check version and refresh
      if (config.checkVersion) {
        const currentVersion = localStorage.getItem('version');
        axios.get(`/__v.json?ts=${Date.now()}`).then((dd) => {
          const nv = dd && dd.data && dd.data.v;
          if (nv && currentVersion !== nv) {
            console.log(`version: ${nv}`);

            localStorage.setItem('version', nv);
            window.location.reload();
          }
        });
      }
    },
    Mock: {
      mock: (url, method = 'get', func) => {
        Mocks.push({
          url,
          method,
          func,
        });
      },
    },
    // 检查当前用户对某些接口路径是否有权限访问
    canI: async (url, force = false) => {
      const store = useAppStore();

      if (!force && store && store.canI) {
        const storedCanI = store.canI.find((ci) => ci && ci.url === url);
        if (storedCanI && storedCanI.can !== void 0) {
          return new Promise(((resolve) => {
            resolve(!!storedCanI.can);
          }));
        }
      }

      return requests.postRequest('can_i', { url }).then((d) => {
        let can = d && d.data && d.data.can;
        const urlList = url.split(',');
        can = Array.isArray(can) ? can : [can];

        for (let i = 0; i < urlList.length; i += 1) {
          const u = urlList[i];

          store.ADD_CANI({ url: u, can: (can[i] || false) });
        }

        if (can.length === 1) return can[0];

        return can;
      }).catch(() => false);
    },
  };


  // for use inside Vue files (Options API) through this.$axios and this.$api

  // app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  // 绑定requests到全局
  Object.assign(app.config.globalProperties, requests);
})

export { requests };
