<template>
  <div>
    <div>
      <div class="act-header">
        <div class="row">
          <div class="col-lg-2">

          </div>
          <div class="col-lg-6">
            <h1 v-text="details.title">健康生活：每天一杯水，医生远离我</h1>
          </div>
          <div class="col-lg-4">
          </div>
        </div>
        <div class="row art-from">
          <div class="col-sm-2">
            <div v-text="details.date">2018-10-14 17:37:58</div>
          </div>
          <div class="col-sm-7">
            <p><a v-text="details.beadhouse__name">来源：小太阳养老公寓</a></p>
          </div>
          <div class="col-sm-1 art-cllo"  v-show="b_cllo" v-on:click="cllo_art">
            <div>收藏<img src="../assets/images/b_coll.png" alt=""></div>
          </div>
          <div class="col-sm-1 a-art-cllo" v-show="!b_cllo" v-on:click="canl_cllo_art">
            <div>取消<img src="../assets/images/a_coll.png" alt=""></div>
          </div>
          <div class="col-sm-1">
            <a>举报</a>
          </div>
        </div>
      </div>
      <div class="h-xian"></div>
      <div class="right">
        <div class="row">
          <h2 class="col-lg-12 panel panel-success">专题推荐</h2>
          <div class="cccr-hot">
            <div class="cccr-hot-left panel-body">
              <h4><a  v-on:click="torecommend(10)">养生要从年轻开始</a></h4>
              <div class="xian"></div>
              <h4><a  v-on:click="torecommend(82)">哪些人需要做Hcy检查</a></h4>
              <div class="xian"></div>
              <h4><a  v-on:click="torecommend(64)">肠胃不好不适合吃哪些水果</a></h4>
              <div class="xian"></div>
              <h4><a  v-on:click="torecommend(30)">老人免疫力低下该怎么办</a></h4>
              <div class="xian"></div>
              <h4><a  v-on:click="torecommend(13)">秋季养生吃果蔬能预防中风</a></h4>
              <div class="xian"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="art-cont" v-for="c in details.content">
        <div class="row">
          <p v-text="c">新华社北京8月30日电（记者刘华、王卓伦）国家主席习近平30日在人民大会堂同科特迪瓦总统瓦塔拉举行会谈。两国元首一致同意，推动中科关系迈向更高水平，实现互利共赢。</p>
        </div>
      </div>
      <!--评论组件-->
      <page-comment></page-comment>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "ArticleDetails",
    data: function () {
      return {
        details: {},
        //评论文章的回复
        comment: '',
        art_id: 0,
        all_comment: {},
        com_flag: true,
        dis_flag:true,
        replay_comm_word:'',
        b_cllo:true,
        showre:false,
        want_replay:false,
        err_message_info:'',
        err_message:'',
      }
    },
    mounted: function () {
      this.getart();
      this.getallreplay();
      this.iscoll();
    },
    methods: {
      getart: function () {
        var that = this;
          var art_id=sessionStorage.getItem('artid');
          console.log(that.art_id);
        axios.get(sysConf.djangoUrl+'/article/getarticlebyid/' + art_id + '/')
          .then(function (response) {
            console.log(response);
            that.details = response.data[0];
          })
          .catch(function (error) {
            console.log(error)
          })

      },

      getallreplay: function (f,i) {

        var that = this;
        var u_id=sessionStorage.getItem('u_id');

        var art_id = sessionStorage.getItem('artid');
        // var ii=i
        if (u_id){
          // this.art_id = this.$route.query.article_id;
          axios.get(sysConf.djangoUrl+'/article/getcommentsbyarticleid/' + art_id + '/'+u_id+'/')
            .then(function (response) {
              if (response.data.length != 0) {
                console.log(response.data);
                that.all_comment = response.data;
                that.all_comment.forEach((item, index) => {
                  console.log(item);
                  item.showreplay=false
                });
                if (!that.want_replay) {
                  that.all_comment[i].showreplay = true;
                  that.want_replay=true;
                }else {
                  that.all_comment[i].showreplay = false;
                  that.want_replay=false;
                }
                // console.log('看看状态加进来没')
                console.log(that.all_comment)
              }
              else {

                that.com_flag = false
              }


            })
            .catch(function (error) {
              console.log(error)
            })
        }else {

            var art_id=sessionStorage.getItem('artid');

          axios.get(sysConf.djangoUrl+'/article/getcommentsbyarticleid/' + art_id + '/'+'/')
            .then(function (response) {
              if (response.data.length != 0) {
                console.log(response.data);
                that.all_comment = response.data;
                console.log(that.all_comment)
              }
              else {

                that.com_flag = false
              }


            })
            .catch(function (error) {
              console.log(error)
            })
        }

      },
      cllo_art:function () {
        var u_id=sessionStorage.getItem('u_id');
        if (u_id) {
          if (sessionStorage.getItem('artid')){
              var art_id = sessionStorage.getItem('artid');
            var user={
              "user_id":u_id,
              "article_id":art_id
            }
          } else {
            var user={
              "user_id":u_id,
              "article_id":art_id
            }
          }
          var user={
            "user_id":u_id,
            "article_id":art_id
          }
          var that=this;
          axios.post(sysConf.djangoUrl+'/article/collectarticle/',user,{
            headers:{
              "token":sessionStorage.getItem('token')
            }
          })
            .then(function (response) {
              console.log(response.data)
              if(response.data.statuscode=='202'){
                that.b_cllo=false;
                that.err_message = '收藏成功';
                that.err_message_info = '详情请在个人中心-我的收藏查看';
              }else {

              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }else {
          sessionStorage.setItem('from', '/articlelist');
          this.$router.push({path: "/login"});
        }

      },
      canl_cllo_art:function () {
        var u_id=sessionStorage.getItem('u_id');
        if (u_id) {
            var art_id = sessionStorage.getItem('artid');
          var user={
            "user_id":u_id,
            "article_id": art_id
          }
          var that=this
          axios.post(sysConf.djangoUrl+'/article/cancelarticlecollect/',user,{
            headers:{
              "token":sessionStorage.getItem('token')
            }
          })
            .then(function (response) {
              console.log(response.data)
              if(response.data.statuscode=='202'){
                that.b_cllo=true;
                that.err_message = '取消成功';
                that.err_message_info = '您已取消收藏该文章';
              }else {

              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }else {
          sessionStorage.setItem('from', '/articlelist');
          this.$router.push({path: "/login"});
        }
      },
      iscoll:function () {
        var u_id=sessionStorage.getItem('u_id');
        if (u_id) {
            var art_id = sessionStorage.getItem('artid');
          var user={
            "user_id":u_id,
            "article_id":art_id
          }
          var that=this;
          axios.post('http://127.0.0.1:8000/article/isarticlecollect/',user,{
            headers:{
              "token":sessionStorage.getItem('token')
            }
          })
            .then(function (response) {
              console.log(response.data);
              if(response.data.collectstatus){
                that.b_cllo=false
              }else {
                that.b_cllo=true
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      torecommend:function (id) {
        sessionStorage.setItem('artid',id);
        // alter(sessionStorage.getItem('artid'))
        this.$router.push({path: "/articledetails"});
        this.$router.go(0)
      },
      // show_re:function (i,index) {
      //   alert(i)
      //   alert(index)
      //   alert(this.all_comment[index].user_id)
      //   alert(i)
        //
        // if(this.all_comment[index].showreplay){
        //   this.all_comment[index].showreplay=false
        // }
        // else {
        //   this.all_comment[index].showreplay=true
        //   alert(this.all_comment[index].showreplay)
        //
        // }



    }
  }
</script>

<style scoped>
  @import "../../static/css/articledetails.css";
</style>
