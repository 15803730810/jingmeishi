<template>
  <div>
    <!-- login.html 12~40 -->
    <!--页面主体-->
    <div class="login_box">
      <div class="container">
        <div class="login">
          <h2>用户登录</h2>
          <dl class="clearfloat">
            <dt>
              <span class="tips" id="uname_prompt_text" v-show="unameEmpty">用户名不能为空</span>
              <span class="tips" id="uname_prompt_text" v-show="success==false">用户名或密码不正确</span>
              <span>用户名：</span>
            </dt>
            <dd>
              <input
                type="text"
                id="uname"
                placeholder="邮箱/手机号"
                @blur="checkUname()"
                v-model="uname"
              />
              <em class="icon_user"></em>
              <i class="icon_error" v-show="unameEmpty"></i>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="tips" id="pwd_prompt_text" v-show="upwdEmpty">请输入密码</span>密码：
            </dt>
            <dd>
              <input type="password" id="pwd" placeholder="密码" v-model="upwd" @blur="checkUpwd()" />
              <em class="icon_pwd"></em>
              <i class="icon_error" id="pwd_prompt_icon" v-show="upwdEmpty"></i>
            </dd>
          </dl>
          <p>
            <label>
              <input type="checkbox" />
              <span>自动登录</span>
            </label>
          </p>
          <button type="button" id="login" @click="login()">立 即 登 录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      uname: "",
      upwd: "",
      unameEmpty: false, //用户名为空
      upwdEmpty: false, //密码为空
      success: undefined
    };
  },
  methods: {
    checkUname() {
      this.unameEmpty = this.uname == "";
    },
    checkUpwd() {
      this.upwdEmpty = this.upwd == "";
    },
    login() {
      let params = `unameOrPhone=${this.uname}&upwd=${this.upwd}`;
      this.axios
        .post("user_login.php", params)
        .then(res => {
          console.log(res);
          //code 1 成功  400失败
          if (res.data.code == 1) {
            sessionStorage.setItem("uname", res.data.uname);
            sessionStorage.setItem("uid", res.data.uid);
            sessionStorage.setItem("phone", res.data.phone);

            this.$store.commit("updateUser");

            this.$router.go(-1);
          } else {
            this.success = false;
          }
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