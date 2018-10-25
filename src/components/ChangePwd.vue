<template>
  <div class="login-background">
    <div class="mian">
      <div class="div-inner">
        <label for="newpwd">新密码：</label><input type="password" class="newpwd" id="newpwd"
                                               placeholder="数字、字母、符号两种以上组合6-20位密码" v-model="new_pwd">
        <label for="confipwd" class="conflab">确认密码：</label><input type="password" class="confipwd" id="confipwd"
                                                                  v-model="new_con_pwd">
        <div class="pwderr" v-text="n_err"></div>
        <button class="change" v-on:click="change">立即修改</button>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'NavMain',
    data: function () {
      return {
        new_pwd: '',
        new_con_pwd: '',
        n_err: '',
      }
    },
    mounted: function () {
      setTimeout(() => {
        // alert('coming')
        this.n_err = ''
      }, 5000);
    },

    methods: {
      change: function () {
        var reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
        if (reg.test(this.new_pwd)) {
          if (this.new_pwd.length === this.new_con_pwd.length) {
            var datas = {
              "password": this.new_pwd
            }
            var that = this;
            axios.post('http://127.0.0.1:8000/user/changepassword/', datas, {
              headers: {
                "token": sessionStorage.getItem('token')
              }
            })
              .then(function (response) {
                console.log(response.data)
                if (response.data.statuscode == '202') {
                  that.n_err = '密码修改成功，即将为你跳转'
                  that.$router.push({path: "/login"});
                } else {
                  that.n_err = '密码修改失败，请稍后重试'
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          } else {
            this.n_err = '两次密码不一致'
          }
        } else {
          this.n_err = '数字、字母、符号两种以上组合6-20位密码'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../static/css/changepwd.css";
</style>
