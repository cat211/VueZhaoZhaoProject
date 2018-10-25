<template>
  <!--内容-->
  <div class="row my-index-center">
    <!--内容左空白-->
    <div class="col-md-3"></div>
    <!--内容左空白end-->
    <!--中间内容-->
    <div class="col-md-6" v-if="show">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="panel panel-danger">
          <div class="panel-heading">登录公寓账户</div>
          <div class="panel-body">
            <div class="input-group my-input">
              <span class="input-group-addon "><p>公寓id:</p></span>
              <input type="text" class="form-control" v-model="beadhouse_id">
            </div>
            <div class="input-group my-input">
              <span class="input-group-addon "><p>公寓密码:</p></span>
              <input type="password" class="form-control" v-model="password">
            </div>
            <button class="btn btn-success center-block" @click="adminLogin()">提交</button>
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="col-md-6" v-if="!show">
      <div class="panel panel-info center-block">
        <div class="panel-heading">状态报表数据更新</div>
        <div class="panel-body ">
          <div class="col-md-12">
            <!--<div class="input-group my-input">-->
              <!--<span class="input-group-addon " ><p>公寓id:</p></span>-->
              <!--<input type="text" class="form-control" >-->
            <!--</div>-->
            <div class="input-group my-input">
              <span class="input-group-addon "><p>入住人id:</p></span>
              <input type="text" class="form-control" v-model="check_info_id">
            </div>
            <div class="input-group my-input">
              <span class="input-group-addon " ><p>状态类别:</p></span>
              <select v-model="dyn_type_id">
                <option value ="1" >饮食动态</option>
                <option value ="2" >用药动态</option>
                <option value="3">活动动态</option>
              </select>
            </div>
            <div class="input-group my-input">
              <span class="input-group-addon time" ><p>动态时间:</p></span>
              <input type="datetime-local" class="form-control" v-model="update_time" >
            </div>
            <div class="input-group my-input">
              <span class="input-group-addon " ><p>动态内容:</p></span>
              <input type="text" class="form-control" v-model="content" >
            </div>
            <button class="btn btn-success center-block" @click="addState()">提交</button>
          </div>
        </div>
      </div>
    </div>
    <!--中间内容end-->

  </div>


</template>

<script>
  import axios from 'axios'
    export default {
        name: "",
        data(){
          return{
            check_info_id:'',
            dyn_type_id:'',
            update_time:'',
            content:'',
            show:true,
            beadhouse_id:'',
            password:'',
          }
        },
      methods:{
          adminLogin:function(){
            var data = {
              "beadhouse_id": this.beadhouse_id,
              "password": this.password,

            }
            var vm = this;
            axios.post('http://127.0.0.1:8000/user/beadhouseadminlogin/', data)
              .then(function (response) {
                if(response.headers.token){
                  alert('登录成功！')
                  vm.show=false;
                }
                else {
                  alert('登录失败！')
                  vm.show=true;
                }
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })


          },
          addState:function () {
            if(this.check_info_id&&this.dyn_type_id&&this.update_time&&this.content){
              var vm = this;
              var token = sessionStorage.getItem('token');
              var user_id = sessionStorage.getItem('u_id');
              var data = {
                "user_id": user_id,
                "check_info_id":this.check_info_id,
                "dyn_type_id":this.dyn_type_id,
                "update_time":this.update_time,
                "content":this.content
              }
              if (token) {
                axios.post('http://127.0.0.1:8000/user/addstate/', data, {headers: {"token": token}
                })
                  .then(function (response) {
                    if(response.data.code=='202'){
                      alert('添加成功！')
                    }
                    else {
                      alert('添加失败！')
                    }
                    console.log(response.data)
                    console.log(response)
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
              }
              else {
                alert('请先登录！')
                this.$router.push({path: "/login"});
              }
            }
            else{
              alert("数据不能为空！")
            }

          }
      }
    }
</script>

<style scoped>
  .my-nav-img img {
    height: 65px;

  }

  .my-nav a {
    color: white;
  }

  .my-every-btn button {
    color: white;
    width: 80px;
    height: 80px;
    border: solid 0px black;
    border-radius: 50%;
    box-shadow: #7b8099 2px 2px 2px;
  }

  .my-index-center {
    padding-top: 20px;
    min-height: 600px;
  }
  .my-input span p{
    margin: 0;
    padding: 0;
    width: 150px;
  }
  .my-input {
    margin-bottom: 10px;
  }
  select{
    height: 32px;
    width: 506px;
  }
</style>
