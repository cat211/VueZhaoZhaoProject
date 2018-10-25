<template>
  <div class="login-background">
    <div class="mian">
      <div class="div-inner">
        <label for="chtel" class="labtel">手机号：</label><input class="chtel" id="chtel" type="text" v-model.trim="f_tel">
        <button class="getnum" v-on:click="sendMessage" v-bind:disabled="dis_flag" v-show="sendAuthCode">获取验证码</button>
        <button class="getnum" v-on:click="sendMessage" v-bind:disabled="dis_flag" v-text="code_word" v-show="!sendAuthCode"></button>
        <div class="telstatue" v-text="f_truetel"></div>
        <label for="chnum" class="labnum">验证码：</label><input class="chnum" id="chnum" v-model.trim="f_code">
        <div class="sec" v-text="f_err"></div>
        <button class="next" v-on:click="next">下一步</button>
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
      f_tel: '',
      f_code: '',
      f_truetel: '',
      f_err:'',
      count:60,
      curCount:0,
      dis_flag:false,
      sendAuthCode:true,
      code_word:0,
    }
  },
  mounted: function () {
    setTimeout(() => {
      // alert('coming')
      this.f_err = ''
      this.f_truetel=''
    }, 5000);
  },

  methods: {
    sendMessage:function(){
      var reg=/^1[3456789]\d{9}$/;
      if (reg.test(this.f_tel)) {
        var user = this.f_tel
        var that = this
        console.log(user)
        axios.get('http://127.0.0.1:8000/user/updatepwd/'+user+'/')
          .then(function (response) {
            // vm.list = response.data;
            console.log(response)
            if (response.data=='202') {
              that.dis_flag=true;
              this.$options.methods.next()
            }

          })
          .catch(function (error) {
            console.log(error)
          })
        this.sendAuthCode = false;
        this.code_word = 60;
        var auth_timetimer =  setInterval(()=>{
          this.code_word--;
          if(this.code_word<=0){
            this.sendAuthCode = true;
            clearInterval(auth_timetimer);
          }
        }, 1000);


      } else {
        this.f_truetel = '请输入正确的手机号'
      }


    },

    next: function () {

      if (this.f_code){
        var user={
          "v_code":this.f_code,
          "telephone":this.f_tel
        }
        var that=this
        axios.post('http://127.0.0.1:8000/user/forgetpassword/',user)
          .then(function (response) {
            // vm.list = response.data;
            console.log(response)
            if (response.data.statuscode=='202'){
              sessionStorage.setItem('token', response.headers.token);
              that.$router.push({path: "/changepwd"});
            }else {
              that.f_err='验证码不正确';
            }

          })
          .catch(function (error) {
            console.log(error)
          })
        // var that=this
        // axios.post('http://127.0.0.1:8000/getcode/', code)
        //   .then(function (response){
        //     console.log(response.data)
        //     if (response.data=='203'){
        //       this.$router.push({path: "/changepwd"});
        //     }else {
        //       that.f_err='验证码错误'
        //     }
        //   })
        //   .catch(function (error) {
        //     console.log(error)
        //   })
      } else {
        this.f_err='请输入验证码'
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../static/css/forget.css";
</style>
