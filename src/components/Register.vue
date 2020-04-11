<template>
  <div>
    <!-- register.html 12~55 -->
    <!--页面主体-->
    <div class="register">
      <h2>新用户注册</h2>
      <ul>
        <li>
          <span>邮箱：</span>
          <input type="text" id="uname" placeholder="请输入邮箱名" v-model="email" @blur="checkemail()" />
          <!-- 阅读源代码的 js/register.js 发现的写法 -->
          <em class="icon_error" v-show="emailcode==1 || emailcode==3"></em>
          <em class="icon_ok" v-show="emailcode==2"></em>
          <i v-show="emailcode==1">此邮箱已被其他用户注册</i>
          <i v-show="emailcode==3">请输入您的注册邮箱</i>
        </li>
        <li>
          <span>密码：</span>
          <input
            type="password"
            id="upwd"
            placeholder="请输入密码"
            v-model="pass1"
            @blur="checkPass1();checkPass2()"
          />
          <em class="icon_error" v-show="pass1code==1 || pass1code==2"></em>
          <em class="icon_ok" v-show="pass1code==0"></em>
          <i v-show="pass1code==2">密码长度应为6~12个字符之间</i>
          <i v-show="pass1code==1">请输入您的密码</i>
        </li>
        <li>
          <span>重复密码：</span>
          <input
            type="password"
            id="upwd2"
            placeholder="请重复输入密码"
            v-model="pass2"
            @blur="checkPass2()"
          />
          <em class="icon_error" v-show="pass2code==1"></em>
          <em class="icon_ok" v-show="pass2code==0"></em>
          <i v-show="pass2code==1">两次输入的密码不一致</i>
        </li>
        <li>
          <span>手机号：</span>
          <input type="text" id="phone" placeholder="请输入手机号" v-model="phone" @blur="checkPhone()" />
          <em class="icon_error" v-show="phonecode==1 || phonecode==3"></em>
          <em class="icon_ok" v-show="phonecode==2"></em>
          <i v-show="phonecode==1">此手机号已被其他用户注册</i>
          <i v-show="phonecode==3">请填写您的手机号</i>
        </li>
        <li>
          <span>验证码：</span>
          <input type="text" class="inp_yzm" placeholder="请输入验证码" v-model="code" />
          <img src="../assets/images/yzm.png" alt />
          <strong class="icon_refresh"></strong>
        </li>
        <li class="li_checkbox">
          <label>
            <input type="checkbox" checked />
            <span>我已阅读并同意用户注册协议</span>
          </label>
        </li>
        <li class="li_btn">
          <button type="button" @click="doRegister()">提交注册</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  //双向数据绑定: 常见于输入框, 输入框的内容变化,导致数据变化, 数据变化输入框内容也会变化
  data() {
    return {
      email: "",
      pass1: "",
      pass2: "",
      phone: "",
      code: "",
      emailcode: undefined,
      phonecode: undefined,
      pass1code: undefined, //自定义: 0无错 1为空 2长度错误
      pass2code: undefined //0一致  1不一致
    };
  },
  methods: {
    checkPass2() {
      if (this.pass1 == this.pass2) {
        this.pass2code = 0;
      } else {
        this.pass2code = 1;
      }
    },
    checkPass1() {
      // 检查首个密码框
      if (this.pass1 == "") {
        this.pass1code = 1;
      } else if (this.pass1.length < 6 || this.pass1.length > 12) {
        this.pass1code = 2;
      } else {
        this.pass1code = 0;
      }
    },
    checkPhone() {
      if (this.phone == "") {
        this.phonecode = 3;
        return;
      }

      //检查手机号
      this.axios
        .post("user_check_phone.php", "phone=" + this.phone)
        .then(res => {
          console.log(res);
          //code: 1已存在  2不存在
          this.phonecode = res.data.code;
        })
        .catch(err => {
          console.error(err);
        });
    },
    doRegister() {
      // alert("注册操作!");
      this.checkemail();
      this.checkPhone();
      this.checkPass1();
      this.checkPass2();
      // 必须所有条件都通过, 才能注册
      if (
        this.phonecode == 2 &&
        this.emailcode == 2 &&
        this.pass1code == 0 &&
        this.pass2code == 0
      ) {
        // 满足条件 才可以发送注册请求
        let params = `uname=${this.email}&upwd=${this.pass1}&phone=${this.phone}`;
        this.axios
          .post("user_register.php", params)
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
              alert("恭喜您，注册成功！即将为您跳转到刚才的页面。");
              // 通过路由回到上一页
              this.$router.go(-1);
              // sessionStorage:用于存储数据到浏览器上, 可以识别用户登录态
              sessionStorage.setItem("uid", res.data.uid);
              sessionStorage.setItem("uname", res.data.uname);
            } else {
              alert("很遗憾, 注册失败! 请重新尝试.");
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    checkemail() {
      // 自定义: 数字3 代表为空
      if (this.email == "") {
        this.emailcode = 3;
        return; //让下方代码不执行
      }

      //   alert("检查邮箱");
      //POST请求: user_check_uname.php
      //参数: 'uname=邮箱'
      this.axios
        .post("user_check_uname.php", "uname=" + this.email)
        .then(res => {
          console.log(res);
          //code: 1存在  2不存在
          this.emailcode = res.data.code;
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