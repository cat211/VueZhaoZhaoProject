<template>
  <div>

    <div class="index-search-background">
      <div class="container ">
        <div class="row">
          <div class="col-lg-6">
            <div class="input-group">
              <input type="text" class="form-control input-search" placeholder="" v-model="ser_word">
              <span class="input-group-btn">
                <button id="input-submit" class="btn btn-default" type="button" v-on:click="search">搜索</button>
              </span>
            </div><!-- /input-group -->
          </div><!-- /.col-lg-6 -->
        </div><!-- /.row -->
      </div>

    </div>

    <content>
      <div class="index-rooms-back">
        <div class="row">
          <p class="col-md-5"></p>
          <p class="col-md-2 goodhouse"><button class="center-block center-button btn btn-warning"><h4><img src="../assets/images/index_hot_icon.png" alt="">优 选 公 寓</h4></button></p>
          <p class="col-md-5"></p>
        </div>
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <div class="row  ">
              <div class="col-md-3 single-room " v-for="h in house_list" v-on:click="toapartinfo(h.id)">
                <router-link to="/house" class="beadhouse-img">
                  <img  src="../assets/images/room_pic.jpg" alt="" :title=h.long_name>
                </router-link>
                <router-link to="/house" class="beadhouse-title">
                  <div>
                    <h4>
                      <span><img src="../assets/images/index_house_icon.png" alt=""></span>
                      <span v-text="h.name" :title=h.long_name></span>
                    </h4>
                    <h3>￥<span v-text="h.min_price" class="text-orange">888</span>起</h3>
                  </div>
                </router-link>

              </div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>

      </div>
    </content>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Index',
    data: function () {
      return {
        house_list: [],
        ser_word: '',

      }
    },
    mounted: function () {
      this.GetHouseData();
    },
    methods: {
      GetHouseData: function () {
        var that=this;
        axios.get('http://127.0.0.1:8000/beadhouse/gethouseby///1/1/')
          .then(function (response) {
            response.data.forEach((item, index) => {
              if (item.score >=4.8) {
                console.log(item);
                if(that.house_list.length<8){
                  that.house_list.push(item)
                }

                // console.log(this.house_list)
              }
            })
            for (let i of that.house_list) {
              i.long_name = i.name;
              if (i.name.length > 13) {
                i.name = i.name.substring(0, 13) + '...'
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      search: function () {
        if (this.ser_word) {
          sessionStorage.setItem('already_searched', this.ser_word);
          this.$router.push({path: "/apart"});
        } else {
          this.$router.push({path: "/apart"});
        }
      },
      toapartinfo:function (id) {
        sessionStorage.setItem('bhid',id);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .goodhouse{
    width: 100%;
    height: 85px;
  }
  .single-room{
    padding: 0;
    margin: 0;
  }
  .single-room img{
    width: 100%;

  }
  .center-button{
    margin-top:20px;
    width: 250px;
    height: 55px;
  }
  .beadhouse-img img,.beadhouse-title div{
    border: white solid 15px;
    border-bottom: white solid 8px;
  }
  .beadhouse-title h3{
   float: right;
    overflow: hidden;
  }

  p,h3,h4{
    margin: 0;
    padding: 0;
  }
  a:link,a:visited{
    color: black;
  }
  a{
    text-decoration: none;
  }
  .text-orange{
    color:orange;
  }
  .goodhouse h4 img,.beadhouse-title span img{
    width: 35px;
    height: 35px;
  }
  /*搜索部分*/
  .index-search-background{
    height: 400px;
    background: url("../../src/assets/images/index_search_background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  /*搜索框*/
  .index-search-background div{
    display: flex;
  }
  .index-search-background .input-group .input-search{
    height: 50px;
    width: 500px;
    margin-top: 260px;
    margin-left: 320px;
    font-size: 30px;
    border: none;
  }
  .index-search-background .input-group-btn #input-submit{
    height: 50px;
    width: 100px;
    margin-top: 260px;
    margin-left: -10px;
    background: #42b47a;
    outline: none;
    font-size: 18px;
  }
  .input-search{
    outline: none;
  }
  .index-rooms-back{
    margin-bottom: 70px;
  }
  #input-submit{
    color: white;
  }
</style>
