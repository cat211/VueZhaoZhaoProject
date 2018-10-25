<template>
  <div>

    <div class="intergral-ads">
      <img src="../assets/images/maojin.jpg" alt="">
    </div>
    <div class="intergral-content">
      <div class="intergral-hot">
        <a href="#">所有兑换</a>
      </div>
      <div class="intergral-can">
        <a href="#">我能兑换</a>
      </div>
      <div id="showintegral">

        <div class="getintegral">
          <a href="#" v-show="!logined" v-on:click="tologin" class="notlogin">请先登录</a>
          <a class="getintegral-p" v-show="logined" v-text="myintergral" v-on:click="topersonal"></a>
        </div>
      </div>

      <div class=" newlist  row">
        <div class="col-xs-6 col-md-3 mygoods" v-for="good in result_list ">
          <a href="#" class="thumbnail"><img v-bind:src="good.img"  :alt="good.name" :title="good.long_name"></a><br>
          <a href="#" v-text="good.name" class="g_name"></a><br>
          <p v-text="good.introduce" class="g_intr"></p>
          <p style="font-size: 20px;color: #ff4d15" v-text="good.price" class="g_p"></p>
          <!--<button v-bind:id="good.good_id" v-on:click="exchange(good.price)">-->
          <!--兑换 class="btn btn-primary btn-lg"-->
          <!--</button>-->
          <div id="app">
            <button type="button" class="btn g_b" @click="showModal(good.price)" >兑换</button>
            <modal v-show="isModalVisible"  @close="closeModal" :good_poins="fa_goodnum" :showinterl="myintergral"/>
          </div>
        </div>
      </div>




      <!--<div class="intergral-content-middle row">-->
        <!--<div class="col-lg-4 mygoods" v-for="good in result_list">-->
          <!--<a href="#"><img src="../assets/images/anmoqi.png" alt=""></a><br>-->
          <!--<a href="#" v-text="good.name"></a><br>-->
          <!--<p v-text="good.introduce"></p>-->
          <!--<p style="font-size: 20px;color: #ff4d15" v-text="good.price"></p>-->
          <!--&lt;!&ndash;<button v-bind:id="good.good_id" v-on:click="exchange(good.price)">&ndash;&gt;-->
          <!--&lt;!&ndash;兑换 class="btn btn-primary btn-lg"&ndash;&gt;-->
          <!--&lt;!&ndash;</button>&ndash;&gt;-->
          <!--<div id="app">-->
            <!--<button type="button" class="btn" @click="showModal(good.price)" >兑换</button>-->
            <!--<modal v-show="isModalVisible" @close="closeModal" :good_poins="fa_goodnum"/>-->
          <!--</div>-->

        <!--</div>-->
      <!--</div>-->
    </div>
    <page-list :page_size="page_size" @indexclick="getIndex" @lastindexclick="lastPage" @nextindexclick="nextPage"></page-list>
    <!--<modal good_poins:good.price></modal>-->
  </div>


  <!--</div>-->

  <!--</div>-->
</template>

<!--<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>-->
<script>
  import axios from 'axios'
  // import Modal from '../components/Modal.vue'

  export default {
    name: 'ShoppingMall',
    // components: {
    //   Modal
    // },

    data: function () {
      return {
        logined: true,
        myintergral: '',
        goods_list: [],
        isModalVisible: false,
        fa_goodnum:0,
        result_list : [],
        page_index : 1,
        page_size : 1,
      }
    },
    mounted: function () {
      this.islogin();
      this.getGoods();
    },
    methods: {
      // islogin: function () {
      //   var istoken = sessionStorage.getItem('token');
      //   var that = this
      //   if (istoken) {
      //     var user = {
      //       "user_id": sessionStorage.getItem('u_id')
      //     }
      //
      //     axios.post('http://127.0.0.1:8000/user/getuserinfo/', user, {
      //       headers: {
      //         "token": istoken
      //       }
      //     })
      //       .then(function (response) {
      //         if (response.data.id)
      //           sessionStorage.setItem('u_inter', '我的积分：' + response.data.points)
      //         sessionStorage.setItem('u_id', response.data.id)
      //         that.myintergral = '我的积分：' + response.data.points
      //       })
      //       .catch(function (error) {
      //         console.log(error)
      //       })
      //   } else {
      //     this.logined = false
      //   }
      // },
      tologin: function () {
        sessionStorage.setItem('from', '/shoppingmall');
        this.$router.push({path: "/login"});
      },
      topersonal: function () {
        this.$router.push({path: "/personalcenter"});
      },
      getGoods: function () {

        var that = this
        axios.get('http://127.0.0.1:8000/goods/getallgoods/')
            .then(function (response){
              response.data.forEach((item, index) => {
                item.fields.long_name=item.fields.name;
                if (item.fields.name.length>11){
                  item.fields.name=item.fields.name.substring(0,11)+'...'

                }
                that.goods_list.push(item.fields)
                that.showContent();
                if(that.goods_list.length/8 == 0){
                  that.page_size = that.goods_list.length/8;
                } else{
                  that.page_size = Math.ceil(that.goods_list.length/8);
                }
              })

                // if (response.data=='203'){
                //     that.goods_list=response
                //
                // }else {
                //
                // }
            })
            .catch(function (error) {
                console.log(error)
            })

      },
      showModal: function (p) {
          this.fa_goodnum=p
        setTimeout(() => {
          var user = {
            "user_id":sessionStorage.getItem('u_id')
          }
          var that=this
          console.log(sessionStorage.getItem('token'))
          axios.post('http://127.0.0.1:8000/user/getuserinfo/',user,{
            headers:{
              "token":sessionStorage.getItem('token')
            }
          })
            .then(function (response) {
              console.log('ok')
              if (response.data.id) {
                that.myintergral='我的积分：'+response.data.points
                sessionStorage.setItem('u_points',response.data.points)
                console.log('打开后的积分')
                console.log(that.myintergral)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
          this.isModalVisible = true
        }, 600);
          // this.isModalVisible = true


      },
      closeModal: function (state) {
        //0 是确认兑换 1 是关闭
        if (state===0){
          setTimeout(() => {
            var user = {
              "user_id":sessionStorage.getItem('u_id')
            }
            var that=this
            console.log(sessionStorage.getItem('token'))
            axios.post('http://127.0.0.1:8000/user/getuserinfo/',user,{
              headers:{
                "token":sessionStorage.getItem('token')
              }
            })
              .then(function (response) {
                console.log('ok')
                if (response.data.id) {
                  that.myintergral='我的积分：'+response.data.points
                  sessionStorage.setItem('u_points',response.data.points)
                  console.log('关闭后的积分')
                  console.log(that.myintergral)
                }
              })
              .catch(function (error) {
                console.log(error)
              })
            this.isModalVisible = false
          }, 900);

        } else {
          this.isModalVisible = false
        }

      },
      islogin: function () {
        var istoken = sessionStorage.getItem('token');
        var that = this;
        if (istoken) {
          var user = {
            "user_id":sessionStorage.getItem('u_id')
          }
          axios.post('http://127.0.0.1:8000/user/getuserinfo/',user,{
            headers:{
              "token":istoken
            }
          })
            .then(function (response) {
              console.log('ok1')
              if (response.data.id) {
                that.myintergral='我的积分：'+response.data.points
                sessionStorage.setItem('u_points',response.data.points)
                console.log(that.myintergral)
              }
            })
            .catch(function (error) {
              console.log(error)
            })


        } else {
          this.logined = false
        }
      },
      showContent:function () {
        let start = (this.page_index-1) * 8;
        // console.log(start)
        let end = this.goods_list.length<=this.page_index*8-1?this.goods_list.length:this.page_index*8-1;
        // console.log(end)
        this.result_list = [];
        for (let i = start;i<=end;i++){
          this.result_list.push(this.goods_list[i]);

        }
      },
      getIndex: function (i) {
        this.page_index = i;
        this.showContent();
      },
      lastPage: function () {
        if (this.page_index > 1) {
          this.page_index -= 1;
          this.showContent();
        }
      },
      nextPage: function () {
        if (this.page_size > this.page_index) {
          this.page_index += 1;
          this.showContent();
        }
      },
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../static/css/shoppingmall.css";
</style>
