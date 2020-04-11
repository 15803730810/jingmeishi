<template>
  <div>
    <!-- product.html 12~98 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href>首页</a>&gt;
          <a href>产品中心</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="pl_header">
        <router-link to="/product/1" :class="{cur:type==1}">净美仕净化器</router-link>
        <router-link to="/product/2" :class="{cur:type==2}">净美仕滤网</router-link>
      </div>
      <!-- 产品列表-->
      <ul class="product_list clearfloat" v-if="data">
        <li v-for="(item, index) in data.data" :key="index">
          <router-link :to="{name:'productdetails', params:{pid:item.pid}}">
            <img :src="item.pic" alt />
          </router-link>
          <div class="pdlist_text clearfloat">
            <h3>
              <p>{{item.model}}</p>
              <span>{{item.title2}}</span>
            </h3>
            <router-link :to="{name:'productdetails', params:{pid:item.pid}}">查看详情</router-link>
          </div>
        </li>
      </ul>
      <!-- 分页导航-->
      <div class="pages">
        <a class="default" v-show="curP==1">上一页</a>
        <a v-show="curP!=1" @click="curP--;getProducts()">上一页</a>
        <a
          v-for="(item, index) in data.pageCount"
          :key="index"
          @click="curP=item;getProducts()"
          :class="{cur:item==curP}"
        >{{item}}</a>
        <!--<a href="" class="cur">2</a>-->
        <!--<a href="">3</a>-->
        <!--<a href="">4</a>-->
        <!--<a href="">5</a>-->
        <a class="default" v-show="curP==data.pageCount">下一页</a>
        <a v-show="curP!=data.pageCount" @click="curP++;getProducts()">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  data() {
    return {
      type: this.$route.params.type,
      data: null, //默认值是null
      curP: 1 //当前页:默认1
    };
  },
  mounted() {
    this.getProducts();
  },
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(from);
      this.type = to.params.type;

      this.getProducts();
    }
  },
  methods: {
    getProducts() {
      let params = `type=${this.type}&pageNum=${this.curP}`;
      this.axios
        .post("product_select.php", params)
        .then(res => {
          console.log(res);
          this.data = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style>
</style>