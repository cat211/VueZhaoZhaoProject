<template id="logintpl">
  <div class="login-background row">
    <div class="col-lg-7"></div>
    <div class="col-lg-3">
      <div id="login" class="row">
        <div class="col-md-12">
          <h1>登录朝朝优选</h1>
        </div>
        <div class="col-md-12">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <div class="input-group">
              <span class="input-group-addon"><p>手机号码:</p></span>
              <input type="text" class=" form-control" v-model.trim="u_tel">
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>

        <div class="col-md-12">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <div class="input-group">
              <span class="input-group-addon "><p>密&nbsp;&nbsp;码:</p></span>
              <div><input type="password" class=" form-control" v-model.trim="u_pwd"></div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>
        <div class="col-md-12">
          <p v-text="u_err" class="err"></p>
        </div>
        <div class="col-md-12">
          <button class="btn btn-success" type="button" v-on:click="checklogin">登录</button>
        </div>
        <div class="col-md-12">
          <div class="col-md-6">
            <input type="checkbox" class="chcbox" v-on:click="remember" v-model="checked">
            <span>记住密码</span>
          </div>
          <div class="col-md-6">
            <router-link to="/forget" class="fpwd-a">忘记密码？</router-link>
          </div>
        </div>

        <div class="col-md-12">
          <span>还没注册？</span>
          <router-link to="/register"><span class="gotoregist">注册账号>></span></router-link>
        </div>
      </div>
      <!---->


      <!---->
    </div>
    <div class="col-lg-2"></div>


  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Login',
    data: function () {
      return {
        //用户电话
        u_tel: '',
        //用户密码
        u_pwd: '',
        u_err: '',
        checked: null,
        // remember_flag:false,
      }
    },
    mounted: function () {
      //延时
      setTimeout(() => {
        // alert('coming')
        this.u_err = ''
      }, 5000);
      if (sessionStorage.getItem('hav_reg_tel')) {
        this.u_tel = sessionStorage.getItem('hav_reg_tel');
        this.u_pwd = sessionStorage.getItem('hav_reg_pwd');


      }
      if (localStorage.getItem('tel')) {
        this.u_tel = localStorage.getItem('tel');
        this.u_pwd = localStorage.getItem('pwd');
        this.checked = true
      } else {
        this.checked = false
      }


    },

    methods: {
      checklogin: function () {
        var reg = /^1[3456789]\d{9}$/;
        if (reg.test(this.u_tel)) {
          var user = {
            "telephone": this.u_tel,
            "password": this.u_pwd,
          };
          var that = this;
          axios.post(sysConf.djangoUrl+'/user/login/', user)
            .then(function (response) {
              // vm.list = response.data;
              // console.log(response.data.id)
              // console.log(response)
              // console.log(response.data.statusCode)
              // console.log(response.headers.token)
              if (response && response.data.id) {
                sessionStorage.setItem('telephone', that.u_tel);
                sessionStorage.setItem('token', response.headers.token);
                sessionStorage.setItem('u_id', response.data.id);
                sessionStorage.setItem('u_points', response.data.points);
                var from = sessionStorage.getItem('from');
                that.WebSocketConnect();
                if (from) {
                  // location.href = from;
                  that.$router.push({path: from});
                } else {
                  that.$router.push({path: "/"});
                }
              }
              if (response && response.data.statuscode == '403') {
                // location.href='regist.html';
                that.$router.push({path: "/register"});
                sessionStorage.setItem('notregtel', that.u_tel);
                console.log(that.u_tel)

              }
              if (response && response.data.statuscode == '409') {

                that.u_err = '用户名或密码错误';
              }

            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          this.u_err = '请输入正确的手机号'
        }
        this.$emit('send',true)
      },
      // 触发父组件连接websocket函数
      WebSocketConnect:function(){
        this.$emit('connectwebsocket');
      },
      remember: function () {
        if (!this.checked) {
          this.checked = true;
          localStorage.setItem('tel', this.u_tel);
          localStorage.setItem('pwd', this.u_pwd);


        } else {
          this.checked = false;
          localStorage.setItem('tel', '');
          localStorage.setItem('pwd', '');

        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index-footer ul li:first-child {
    font-size: 20px;
    color: white;
  }

  .index-footer a:link {
    font-size: 16px;
    color: #fff2e3;
  }

  .index-footer a:visited {
    color: white;
  }

  .index-footer a:hover {
    color: #00cc66;
    text-decoration: #00cc66;
  }

  .login-background {
    min-height: 750px;
    background: url("../../src/assets/images/login_background.jpg");
    background-size: cover;
  }

  #login {
    width: 400px;
    height: 500px;
    position: relative;
    background: rgba(255, 255, 255, 0.83);
    text-align: center;
  }

  .input-group-addon {
    margin: 0;
    padding: 0;
    width: 100px;
  }

  .my-input input {
    width: 200px;
  }

  .input-group {
    margin-top: 20px;
  }

  #login h1{
    margin-top: 55px;
  }
  #login {
    margin-top: 90px;
  }

  .col-md-12 {
    margin: 8px 0px;
  }

  .gotoregist {
    color: #00cc66;
  }

  .btn-success {
    width: 100px;
    height: 35px;
  }

</style>
