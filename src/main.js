// 引入了 vue 模块
import Vue from "vue";
// 引入了 App.vue 组件, 就是单页应用的 单页
// SPA: Single web Page Application
import App from "./App.vue";
import { router } from "./router";

import { store } from "./store";

//axios注册到vue中进行使用
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

// axios配合服务器使用的配置项:
// * 基础路径, 发送的所有请求就会自动带有此路径
Vue.axios.defaults.baseURL = "http://101.96.128.94:9999/mfresh/data/";
// * 服务器要求请求必须是form格式, 此处写错会报 跨域错误
Vue.axios.defaults.headers = {
  "content-type": "application/x-www-form-urlencoded",
};

import { date } from "./filters";
// 注册函数到全局的过滤器
Vue.filter("date", date);

Vue.config.productionTip = false;

new Vue({
  // render:  vue中负责渲染页面的属性
  // 参数是一个函数, 函数调用时可以挂载组件到Vue中
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");

// render: h => h(App),
// render: (keai) => { keai(App) }
