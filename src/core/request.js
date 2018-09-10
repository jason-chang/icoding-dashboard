import { getApp } from '@/core/hub';

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import vStore from '@/store';
import upperFirst from 'lodash/upperFirst';

Vue.use(VueAxios, axios);

// const Base64 = require('js-base64').Base64;

// Add a request interceptor
axios.interceptors.request.use(async config => {

  // 允许跨域 cookie
  config.withCredentials = true;

  const { tokenType, jwt } = vStore.state.session;

  // modify headers
  config.headers.Authorization = upperFirst(`${tokenType} ${jwt}`);

  return config;
}, error => Promise.reject(error));

// Add a response interceptor
axios.interceptors.response.use(response => {

  const vApp = getApp();

  if (response.status !== 200) {
    // vApp.weLoadEnd();
    // vApp.weNotify(`[${response.status}]服务端繁忙请稍后再试!`);
    throw new Error('');
  }

  const contentType = response.headers['Content-Type'] ? response.headers['Content-Type'] : response.headers['content-type'];

  // 响应类型非 Json
  if (contentType.indexOf('application/json') === -1) {
    // vApp.weLoadEnd();
    // vApp.weNotify('响应错误:非 application/json !');
    throw new Error('');
  }

  // 响应为空
  if (!response.data) {
    // vApp.weLoadEnd();
    // vApp.weNotify(`${response.status} 服务端无响应请稍后再试!`);
    throw new Error('');
  }

  // 直接响应服务端错误
  if (response.data.status === 500) {
    // vApp.weLoadEnd();
    // vApp.weNotify(response.data.msg);
    throw new Error(response.data.msg);
  }

  // 授权过期
  if (response.data.status === 401) {
    // vApp.weLoadEnd();
    vApp.apappNotify('您的登录已经过期,请重新授权!');

    vApp.$cookie.clear('session_token');

    if ($lib.env.not('dev')) {
      vStore.dispatch('callLogin');
    }

    throw new Error('您的登录已经过期');
  }

  return response;

}, error => Promise.reject(error));
