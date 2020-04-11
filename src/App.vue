<template>
  <div id="app">
    <Header />
    <!-- 路由视图在此标签中切换 -->
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
/* 引入css文件 */
@import "./assets/css/common.css";
@import "./assets/css/mycss.css";
</style>
