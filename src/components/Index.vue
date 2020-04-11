<template>
  <div>
    <!-- 复制 index.html 中 12 ~ 56 行内容 -->
    <!--banner-->
    <div class="banner">
      <!-- 练习：编写banner的html和css-->
      <!-- 图片列表-->

      <transition-group tag="ul" name="fade">
        <li
          v-for="(item, index) in pageCount"
          :key="index"
          :class="{'banner-show':curP==item}"
          v-show="curP==item"
        >
          <a href="#" class="link"></a>
        </li>
      </transition-group>

      <!-- 左右箭头-->
      <span class="cut prev" @click="doPrev()"></span>
      <span class="cut next" @click="doNext()"></span>
      <!-- 小圆点指示器-->
      <div class="indicator">
        <!-- 此处让 class 能够通过逻辑操作发生变化, 则必须使用js代码 -->
        <!-- :class="{}" 值是对象类型, 属性名为样式名, 值是true或 false, 来代表样式是否生效! -->
        <a
          v-for="(item, index) in pageCount"
          :key="index"
          @click="curP=item"
          :class="{cur:curP==item}"
        ></a>
      </div>
    </div>
    <!--main-->
    <div class="main container">
      <div class="ind_con1">
        <h2 class="title">
          <a href="#" class="more">more</a>净美仕产品
        </h2>
        <ul class="clearfloat">
          <li>
            <a href="#" class="link">
              <img src="../assets/images/01.jpg" alt />
            </a>
          </li>
          <li>
            <a href="#" class="link">
              <img src="../assets/images/02.jpg" alt />
            </a>
          </li>
          <li>
            <a href="#" class="link">
              <img src="../assets/images/03.jpg" alt />
            </a>
          </li>
        </ul>
      </div>
      <div class="ind_con2 clearfloat">
        <div class="ind_about">
          <h2 class="title">
            <a href="#" class="more">more</a>关于净美仕
          </h2>
          <p>
            北京净美仕环境科技有限公司自诞生起一直关注人类呼吸健康的问题，并专注于室内空气质量的研究与改善。2003年，非典来袭，环境安全威胁到了每个人的生命，全国陷入一片恐慌。净美仕肩负着为人类创造健康安全生活环境的使命应运而生。2012年7月，亿朗以“净美仕(Mfresh)”为品牌重塑，以崭新的面貌屹立在净化行业。
            <a
              href="#"
            >查看更多</a>
          </p>
        </div>
        <div class="ind_news">
          <h2 class="title">
            <a href="#" class="more">more</a>公司动态
          </h2>
          <ul>
            <li>
              <span>2016-02-21</span>
              <a href>空气净化器要逆天？ “玫瑰金”“土豪金”齐上阵</a>
            </li>
            <li>
              <span>2016-02-21</span>
              <a href>净美仕新风净化系统 助力校园新风行动</a>
            </li>
            <li>
              <span>2016-02-21</span>
              <a href>全国新风行动全面启动 助推净美仕战略升级</a>
            </li>
            <li>
              <span>2016-02-21</span>
              <a href>智能空气净化器翻盘：净美仕能否领衔?</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      curP: 1, //当前页, 1 ~ 4
      pageCount: 4, //总页数
      timer: null
    };
  },
  methods: {
    doPrev() {
      //上一页
      this.curP--;
      if (this.curP < 1) {
        this.curP = this.pageCount;
      }
    },
    doNext() {
      // 下一页
      this.curP++;
      if (this.curP > this.pageCount) {
        this.curP = 1;
      }
    }
  },
  mounted() {
    // 挂载时:
    this.timer = setInterval(() => {
      this.doNext();
    }, 5000);
  },
  beforeDestroy() {
    //销毁之前,删除定时器
    clearInterval(this.timer);
  }
};
</script>

<style>
.banner-show {
  display: block !important;
  z-index: 20 !important;
}

/* 风格样式 必须写在 style 标签中, 才会被特殊关照: webpack才会处理 */
.banner > ul > li:first-child {
  background: url(../assets/images/banner_01.jpg) center 0 no-repeat;
}

.banner > ul > li:nth-child(2) {
  background: url(../assets/images/banner_02.jpg) center 0 no-repeat;
}

.banner > ul > li:nth-child(3) {
  background: url(../assets/images/banner_03.jpg) center 0 no-repeat;
}

.banner > ul > li:nth-child(4) {
  background: url(../assets/images/banner_04.jpg) center 0 no-repeat;
}

/* 对应的 <transition-group name="fade"></transition-group> */
/* .name-enter-active */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>