// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from "vue";
// ctrl+shift+p ->输入 npm -> import module
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 路由关系映射:  规定什么路径 对应 哪个组件
import About from "./components/About.vue";
import Index from "./components/Index.vue";
import Contact from "./components/Contact.vue";
import News from "./components/News.vue";
import NewsDetails from "./components/NewsDetails";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Product from "./components/Product.vue";
import ProductDetails from "./components/ProductDetails.vue";
import Cart from "./components/Cart.vue";

const routes = [
  { path: "/cart", component: Cart },
  {
    path: "/productdetails/:pid",
    component: ProductDetails,
    name: "productdetails",
  },
  { path: "/product/:type", component: Product },
  { path: "/about", component: About },
  { path: "/index", component: Index },
  //重定向: 访问根目录, 则自动跳转到 /index
  { path: "/", redirect: "/index" },
  { path: "/contact", component: Contact },
  { path: "/news", component: News },
  //   规定参数 nid
  {
    path: "/newsdetails/:nid",
    name: "newsdetails",
    component: NewsDetails,
  },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// export default xxx; -> import xxx from xxx
// export xxx; -> import {xxx} from xxx
export const router = new VueRouter({
  //默认是 hash 路径模式, 自带 #/标识, 但是比较丑!
  //可以修改为 history模式, 此默认不带#, 但是上线时需要服务器做URL重写!
  mode: "history",
  routes, // (缩写) 相当于 routes: routes
});
