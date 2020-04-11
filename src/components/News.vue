<template>
  <div>
    <!-- news.html 12~40 行 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href>首页</a>&gt;
          <a href>公司动态</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="news">
        <!-- 通过if防止爆红: 网络请求完成前的值是null. if判定为假, 则不执行循环, 就不会报错 -->
        <ul v-if="data">
          <li v-for="(item, index) in data.data" :key="index">
            <span>{{ item.pubTime | date }}</span>
            <router-link :to="{ name: 'newsdetails', params: { nid: item.nid } }">{{ item.title }}</router-link>
          </li>
          <!--<li><span>2016-02-21</span><a href="">净美仕新风净化系统 助力校园新风行动</a></li>-->
          <!--<li><span>2016-02-21</span><a href="">全国新风行动全面启动 助推净美仕战略升级</a></li>-->
          <!--<li><span>2016-02-21</span><a href="">智能空气净化器翻盘：净美仕能否领衔?</a></li>-->
        </ul>
      </div>
      <!-- 分页导航-->
      <div class="pages" v-if="data">
        <a v-if="curP == 1">上一页</a>
        <a v-else @click="curP--;getNews();">上一页</a>
        <a
          v-for="(item, index) in data.pageCount"
          :key="index"
          :class="curP == item ? 'cur' : ''"
          @click="curP = item;getNews();"
        >{{ item }}</a>
        <!-- :class后方的""中是js代码, 三元运算符判定 根据当前页来决定是否添加样式 -->
        <!-- <a href="">2</a> -->
        <!--<a href="">3</a>-->
        <!--<a href="">4</a>-->
        <!--<a href="">5</a>-->
        <a v-if="curP < data.pageCount" @click="curP++;getNews();">下一页</a>
        <a v-else>下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "News",
  //专门用于存放显示到页面上的数据
  data() {
    return {
      //   网络请求是异步的, 请求结束前循环null数据项会报错, 可以利用假数据来规避报错 or if判断方式
      data: null,
      curP: 1 //当前页
    };
  },
  // 生命周期: 准备创建->创建完毕->准备挂载->挂载完毕->准备更新->更新完毕->准备卸载->卸载完毕
  mounted() {
    //   挂载完毕时,触发
    this.getNews();
  },
  methods: {
    //   自定义方法应该书写在 methods中
    getNews() {
      this.axios
        .post("news_select.php", "pageNum=" + this.curP)
        .then(res => {
          console.log(res);
          this.data = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  // //   过滤器, ng中叫管道pipe.  使用 {{ 变量 | 过滤器  }}
  // filters: {
  //   //{{ 时间戳 | date }}
  //   date(timestamp) {
  //     //服务器传递的时间戳是字符串类型, 无法转换日期, 需要人为转成数字
  //     timestamp = parseInt(timestamp);
  //     let date = new Date(timestamp);

  //     let year = date.getFullYear();
  //     let month = date.getMonth() + 1;
  //     let day = date.getDate();

  //     return `${year}-${month}-${day}`;
  //   }
  // }
};
</script>

<style></style>
