<template >
  <div class="container-fluid register-body">
    <div style="height: 100px"></div>
    <div class="row">
      <div class="col-md-8">

      </div>
      <div class="col-md-3 register-form my-input">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <div class="first-line">
            <h2>注册朝朝优选平台</h2>
          </div>
          <div class="input-group">
            <span class="input-group-addon"><p>手机号码:</p></span>
            <input type="text" class=" form-control"  v-model.lazy="telephone">
          </div>
          <div class="input-group">
            <span class="input-group-addon "><p>密&nbsp;&nbsp;码:</p></span>
            <div><input type="password" class=" form-control"  v-model.lazy="password"></div>
          </div>
          <div class="input-group">
            <span class="input-group-addon "><p>确认密码:</p></span>
            <div><input type="password" class=" form-control" v-model.lazy="password_confirm"></div>
          </div>
          <div class="input-group ">
            <button class="btn btn-lg btn-success text-center btn-message" :disabled="btn_flag" @click = get_messagecode>短信验证码</button>
            <button class="btn btn-lg btn-success text-center btn-call" :disabled="btn_flag" @click = get_callcode>语音验证码</button>
          </div>
          <div class="input-group">
            <span class="input-group-addon"><p>验证码:</p></span>
            <input type="text" class=" form-control " v-model.lazy="message_code" style="width: 110px">
            <input v-model="time_count" class="form-control" style="width: 50px" v-show="time_count">
          </div>


          <div class=" text-center">
            <span v-text="err_message"></span>
          </div>
          <div class="input-group">
            <button class="btn btn-lg btn-success col-md-6"  @click = regist()>注册</button>
            <button class="btn btn-lg btn-default col-md-6" @click=goToLogin()>有账号？去登录</button>
          </div>

        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data:function () {
    return{
      telephone:'',
      password:'',
      password_confirm:'',
      message_code:'',
      err_message:'',
      reg_telephone:/^1[3456789]\d{9}$/,
      reg_password:/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
      btn_flag : false,
      time_count : 0,
    }
  },
  mounted:function(){

  },
  methods: {
    regist: function () {
      let that = this;
      if (this.check_form()){
        let user ={
          "telephone":this.telephone,
          "v_code":this.message_code,
          "password":this.password,
        };
        axios.post('http://127.0.0.1:8000/user/register/',user).then(function (response) {
          if(response.headers.token){
            sessionStorage.setItem('token',response.headers.token);
            sessionStorage.setItem('u_id',response.data.id);
            alert(response.data.id);
            that.$router.push({path:"/"});
          }
          else {
            if (response.data.statuscode == '407')
              that.err_message = '验证码过期';
            else if(response.data.statuscode == '401')
              that.err_message = '用户已存在';
            else
              that.err_message = '未知的错误';
          }
        })
      }
    },
    check_form : function () {
       if(!this.telephone || !this.password || !this.password_confirm || !this.message_code){
         this.err_message = '注册列表不能为空'
       }
       else if(!this.reg_telephone.test(this.telephone)){
         this.err_message = '请输入正确的手机号'
       }
       else if (!this.reg_password.test(this.password)||!this.reg_password.test(this.password_confirm)){
         this.err_message = '密码格式不规范'
       }
       else if (this.password != this.password_confirm){
         this.err_message = '两次密码输入不一致'
       }
       else{
         this.err_message = '';
         return true
       }
    },
    get_messagecode:function () {
      this.btn_flag = true;
      let that = this;
      this.time_count = 30;
      axios.get('http://127.0.0.1:8000/user/sendmessage/'+that.telephone+'/').
      then(function (response) {

      });
      let auth_timetimer =  setInterval(()=>{
        that.time_count--;
        if(that.time_count<=0){
          that.btn_flag = false;
          clearInterval(auth_timetimer);
        }
      },1000);
    },
    get_callcode:function () {
      this.btn_flag = true;
      let that = this;
      this.time_count = 30;
      axios.get('http://127.0.0.1:8000/user/sendcall/'+that.telephone+'/').
      then(function (response) {

      });
      let auth_timetimer =  setInterval(()=>{
        that.time_count--;
        if(that.time_count<=0){
          that.btn_flag = false;
          clearInterval(auth_timetimer);
        }
      },1000);
    },
    goToLogin:function(){
      this.$router.push({path: "/login"});
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register-body{
    padding: 0;
    margin: 0 auto;
    background: url("../assets/images/login_background.jpg");
    background-size: cover;
    height: 750px;
  }
  .register-form{
    height: 550px;
    background: rgba(255, 255, 255, 0.83)
  }
  .input-group-addon {
    margin: 0;
    padding: 0;
    width: 100px;
  }
  .my-input input {
    width: 200px;
  }
  .input-group{
    margin-top: 25px;
  }
  .btn-lg{
    width: 120px;
    height: 40px;
    font-size: 14px;
    margin: 5px;
  }
</style>
