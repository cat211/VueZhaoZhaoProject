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
            <div>收藏<img src="../assets/images/a_coll.png" alt=""></div>
          </div>
          <div class="col-sm-1">
            <a >举报</a>
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


      <div class="art-reply">
        <div class="reply-title-xian"></div>
        <h2>参与互动</h2>
        <div class="art-reply-content">
          <form action="">
            <textarea class="form-control" rows="3" v-model="comment"></textarea>
            <div>
              <input type="button" class="i-reset" value="重置" v-on:click="m_reset">
              <input type="button" class="i-submit" value="提交" v-on:click="m_submit">
            </div>
          </form>
        </div>
        <div class="m_re" >
          <div class="select-art" v-for="(ac,index) in all_comment" v-show="com_flag">
            <div class="select-art-left">
              <img :src="ac.user_img" alt="">
              <p v-text="ac.user_name">天生丽质小可爱</p>
            </div>
            <div class="select-art-right">
              <div class="com-time"v-text="ac.time"></div>
              <p v-text="ac.comment_content">
                自从健康喝水之后年轻了十岁。喝年轻了多喝水好，我都喝白了！喝年轻了多喝水好，我都喝白了！喝年轻了多喝水好，我都喝白了！喝年轻了多喝水好，我都喝白了！喝年轻了多喝水好，我都喝白了！喝年轻了多喝水好，我都喝白了！喝年轻了多喝水好，我都喝白了！喝年轻了！</p>
              <form action="" class="re-form">
                <div class="praise" v-on:click.prevent="zan(ac.comment_id,ac.islike)" v-if="ac.islike" >
                  <img src="../assets/images/b_zan.png" alt="">
                </div>
                <div class="liked" v-on:click.prevent="zan(ac.comment_id)" v-if="!ac.islike" v-bind:disabled="dis_flag">
                  <img src="../assets/images/a_zan.png" alt="">
                </div>
                <div v-text="ac.likes" class="n_likes"></div>
                <div class="icon-replay">
                  <img src="../assets/images/replay.png" alt="" v-on:click="getallreplay(ac.showreplay,index)">
                </div>

                <!--<input type="submit" name="" value="踩" class="tread">-->
                <div v-show="ac.showreplay">
                  <div class="huifu">
                    <input type="text" ref='input1' >
                    <input value="回复" class="replay" v-on:click="replay_comm(ac.comment_id,index)">
                  </div>
                  <div class="re-xian"></div>
                  <div class="re-comm">评论</div>
                  <div v-for="r in ac.replys" class="replay-replay">
                    <div class="row" >
                      <div class="col-md-1 re-re-im" ><img :src="r.user_img" alt=""></div>
                      <div class="col-md-7 re-re-com" v-text="r.content">回复内容</div>
                      <div class="col-md-2 r-c" v-text="r.time">时间</div>
                    </div>
                    <div class="row" v-text="r.user_name">用户名</div>

                  </div>
                </div>


              </form>

            </div>

          </div>
          <div v-show="!com_flag" class="no_one"><h3>还没有人发布评论</h3></div>
        </div>


      </div>

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
      }
    },
    mounted: function () {
      this.getart();
      this.getallreplay();
      this.iscoll();
    },
    methods: {
      getart: function () {
        var that = this
          var art_id=sessionStorage.getItem('artid')
          console.log(that.art_id)
        axios.get('http://127.0.0.1:8000/article/getarticlebyid/' + art_id + '/')
          .then(function (response) {
            console.log(response)
            that.details = response.data[0];

          })
          .catch(function (error) {
            console.log(error)
          })

      },
      m_submit: function () {
        var u_id = sessionStorage.getItem('u_id')
        //如果用户登录
        if (u_id) {
            var art_id=sessionStorage.getItem('artid')
          //如果在登录前输入了文字
          if (this.comment) {
            var user = {
              "content": this.comment,
              "article_id": art_id,
              "user_id": u_id,
            }
            var istoken = sessionStorage.getItem('token');
            var that = this
            axios.post('http://127.0.0.1:8000/article/commentarticle/', user, {
              headers: {
                "token": istoken
              }
            })
              .then(function (response) {
                // console.log(response.data)
                if (response.data.statuscode == '202') {
                  var u_id = sessionStorage.getItem('u_id')
                    var art_id = sessionStorage.getItem('artid')
                  if (u_id) {

                    axios.get('http://127.0.0.1:8000/article/getcommentsbyarticleid/' + art_id + '/' + u_id + '/')
                      .then(function (response) {
                        if (response.data.length != 0) {
                          console.log(response.data)
                          that.all_comment = response.data
                          console.log(that.all_comment)
                        }
                        else {

                          that.com_flag = false
                        }
                      })
                      .catch(function (error) {
                        console.log(error)
                      })
                  that.comment = '';

                  }
                }

              })
              .catch(function (error) {
                console.log(error)
              })

          } else {
            this.comment = '内容不能为空'
          }
        }
        //如果用户没有登录
        else {
          // 如果没登陆且输入了文字
          if (this.comment) {
            sessionStorage.setItem('already_con', this.comment)
            sessionStorage.setItem('from', '/articlelist')
            this.$router.push({path: "/login"});
          }
          //如果没登陆，没有输入文字
          else {
            sessionStorage.setItem('from', '/articlelist')
            this.$router.push({path: "/login"});
          }

        }

      },
      m_reset: function () {
        this.comment = ''
      },
      getallreplay: function (f,i) {

        var that = this
        var u_id=sessionStorage.getItem('u_id')

        var art_id = sessionStorage.getItem('artid')
        // var ii=i
        if (u_id){
          // this.art_id = this.$route.query.article_id;
          axios.get('http://127.0.0.1:8000/article/getcommentsbyarticleid/' + art_id + '/'+u_id+'/')
            .then(function (response) {
              if (response.data.length != 0) {
                console.log(response.data)
                that.all_comment = response.data
                that.all_comment.forEach((item, index) => {
                  console.log(item)
                  item.showreplay=false
                })
                if (!that.want_replay) {
                  that.all_comment[i].showreplay = true
                  that.want_replay=true;
                }else {
                  that.all_comment[i].showreplay = false

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

            var art_id=sessionStorage.getItem('artid')

          axios.get('http://127.0.0.1:8000/article/getcommentsbyarticleid/' + art_id + '/'+'/')
            .then(function (response) {
              if (response.data.length != 0) {
                console.log(response.data)
                that.all_comment = response.data
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
      zan:function (c_id,islike) {
        if (sessionStorage.getItem('u_id')) {
          var user={
            "comment_id":c_id,
            "user_id":sessionStorage.getItem('u_id'),
          }
          var token = sessionStorage.getItem('token');
          var that=this;

          axios.post('http://127.0.0.1:8000/article/clickagree/', user, {
            headers: {
              "token": token
            }
          })
            .then(function (response) {
              console.log(response.data)
              if (response.data.statuscode=='202') {

                  var art_id = sessionStorage.getItem('artid')
                var u_id=sessionStorage.getItem('u_id')
                axios.get('http://127.0.0.1:8000/article/getcommentsbyarticleid/' + art_id + '/' + u_id + '/')
                  .then(function (response) {
                    if (response.data.length != 0) {
                      console.log(response.data)
                      that.all_comment = response.data
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
            })
            .catch(function (error) {
              console.log(error)
            })
        }else {
          sessionStorage.setItem('from','/articlelist');
          this.$router.push({path: "/login"});
        }

      },
      replay_comm:function (comment_id,index) {
        if (sessionStorage.getItem('u_id')) {
          if (this.$refs.input1[index].value){

              var art_id = sessionStorage.getItem('artid')
            var user={
              "user_id":sessionStorage.getItem('u_id'),
              "article_id":art_id,
              "content":this.$refs.input1[index].value,
              "comment_id":comment_id

            }
            var that=this
            axios.post('http://127.0.0.1:8000/article/replycomment/',user,{
              headers:{
                "token":sessionStorage.getItem('token')
              }
            })
              .then(function (response) {
                console.log(user)
                // vm.list = response.data;
                console.log(response)
                if (response.data.statuscode=='202'){

                    var art_id = sessionStorage.getItem('artid')
                  var u_id = sessionStorage.getItem('u_id')
                  if (u_id) {
                    axios.get('http://127.0.0.1:8000/article/getcommentsbyarticleid/' + art_id + '/' + u_id + '/')
                      .then(function (response) {
                        if (response.data.length != 0) {
                          console.log(response.data)
                          that.all_comment = response.data
                          console.log(that.all_comment)
                        }
                        else {

                          that.com_flag = false
                        }
                      })
                      .catch(function (error) {
                        console.log(error)
                      })
                    that.comment = '';
                    that.$refs.input1[index].value = ''

                  }

                }

              })
              .catch(function (error) {
                console.log(error)
              })
          }else {
            this.$refs.input1[index].value = ''
          }

        }else {
          sessionStorage.setItem('from', '/articlelist')
          this.$router.push({path: "/login"});
        }

      },
      cllo_art:function () {
        var u_id=sessionStorage.getItem('u_id')
        if (u_id) {
          if (sessionStorage.getItem('artid')){
              var art_id = sessionStorage.getItem('artid')
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
          var that=this
          axios.post('http://127.0.0.1:8000/article/collectarticle/',user,{
            headers:{
              "token":sessionStorage.getItem('token')
            }
          })
            .then(function (response) {
              console.log(response.data)
              if(response.data.statuscode=='202'){
                that.b_cllo=false
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
          axios.post('http://127.0.0.1:8000/article/cancelarticlecollect/',user,{
            headers:{
              "token":sessionStorage.getItem('token')
            }
          })
            .then(function (response) {
              console.log(response.data)
              if(response.data.statuscode=='202'){
                that.b_cllo=true
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
              console.log(response.data)
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
        sessionStorage.setItem('artid',id)
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
