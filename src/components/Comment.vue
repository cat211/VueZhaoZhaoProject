<template>
  <div class="comment-body container">
    <!--评论输入区域-->
    <div class="comment-input-area">
      <!--输入框-->
      <div>
        <input type="text" v-model="comment_text">
      </div>
      <div>
        <button class="btn btn-primary" @click="comment">发表评论</button>
      </div>
    </div>
    <!--每条评论的总区域-->
    <div class="comment-area" v-for="comment in result_list">
      <!--评论和头像的区域-->
      <div class="comment-top">
        <!--评论头像区域-->
        <div class="con-user-icon">
          <div>
            <!--头像图片-->
            <img :src="comment.user_img" alt="">
          </div>
          <div>
            <!--用户昵称-->
            <a href="javascript:void 0"><span v-text="comment.user_name"></span></a>
          </div>
        </div>
        <!--评论内容区域-->
        <div class="con-content">
          <!--文字区-->
          <div class="con-font">
            <span v-text="comment.comment_content"></span>
          </div>
          <!--显示时间和按钮区-->
          <div class="time-btn">
              <div>
                <!--显示时间-->
                <span v-text="comment.time"></span>
              </div>
              <div>
                <!--收起/显示回复的按钮-->
                <button class="btn btn-default" @click="hideReplyInput(comment.comment_id)">回复</button>
              </div>
              <div>
                <!--收起/显示回复的按钮-->
                <button class="btn btn-primary" v-text="comment.btnvalue" @click="hideReply(comment.comment_id,comment.btnvalue)"></button>
              </div>
          </div>
        </div>
      </div>
      <!--回复框-->
      <div class="reply-input" v-show="comment.showreplyinput">
        <div class="reply-content-input">
          <input type="text" v-model="reply_content">
        </div>
        <div>
          <button class="btn btn-sm btn-default" @click="hideReplyInput(comment.comment_id)">取消</button>
          <button class="btn btn-sm btn-primary" @click = reply(comment.comment_id)>回复</button>
        </div>
      </div>
      <!--回复的总区域-->
      <div class="reply-area" v-show="comment.showreply">
        <!--每条回复的区域-->
        <div class="reply-con" v-for="(reply,index) in comment.replys" v-show="index<comment.showreplysize">
          <!--回复人信息区域-->
          <div class="reply-userinfo">
            <div>
              <img :src="reply.user_img" alt="">
            </div>
            <div>
              <a href="javascript:void 0"><span v-text="reply.user_name"></span></a>
            </div>
          </div>
          <div class="reply-font">
            <!--回复的内容区域-->
            <div >
              <span v-text="reply.content">这里是回复内容</span>
            </div>
            <div class="reply-time">
              <span v-text="reply.time"></span>
            </div>
          </div>
        </div>
        <!--加载更多按钮-->
        <div class="show-more text-right">
          <button class="btn btn-primary btn-sm" @click="showMoreReply(comment.comment_id)">加载更多</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
    name: 'PageList',
    props :['page_size'],
    data () {
      return {
        reply_isShow:true, // 是否显示回复
        result_list:[], // 请求到的所有评论
        reply_content:'', // 回复内容
        comment_text:'', // 评论内容
      }
    },
    mounted () {
      this.getData();
    },
    watch:{
      "result_list": function(newpage,oldpage) {
      },
    deep:true,
  },
    methods:{
      // 显示隐藏回复方法
      hideReply:function (commentid,btnvalue) {
        for (let i in this.result_list) {
          if (this.result_list[i].comment_id === commentid) {
            this.result_list[i].showreply = !this.result_list[i].showreply;
            if(this.result_list[i].btnvalue === '收起回复'){
              this.result_list[i].btnvalue = '查看回复';
              this.result_list[i].showreplysize = 3
            }else {
              this.result_list[i].btnvalue = '收起回复'
            }
            break;
          }
        }
      },
      // 隐藏显示回复框
      hideReplyInput:function(commentid){
        for (let i in this.result_list) {
          if (this.result_list[i].comment_id === commentid) {
            this.result_list[i].showreplyinput = !this.result_list[i].showreplyinput;
            break;
          }
        }
      },
      // 获得文章所有评论
      getData:function () {
        let that = this;
        axios.get('http://127.0.0.1:8000/article/getcommentsbyarticleid/5//')
          .then(function (response) {
            that.result_list = response.data;
            for (let i in that.result_list){
              if(that.result_list[i].replys.length<1){
                that.result_list[i].showreply=false
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      // 显示更多回复
      showMoreReply:function (commentid) {
        for (let i in this.result_list) {
          if (this.result_list[i].comment_id === commentid) {
            this.result_list[i].showreplysize += 3;
            break;
          }
        }
      },
      // 重置显示的回复数量
      resetReplySize:function (commentid) {
        for (let i in this.result_list) {
          if (this.result_list[i].comment_id === commentid) {
            this.result_list[i].showreplysize = 3;
            break;
          }
        }
      },
      // 回复函数
      reply:function (commentid) {
        let data = {
          "user_id":sessionStorage.getItem('u_id'),
          "comment_id":commentid,
          "content":this.reply_content,
          "article_id":5,
        };
        this.reply_content = '';
        let that = this;
        axios.post('http://127.0.0.1:8000/article/replycomment/',data,{
          headers:{
            "token":sessionStorage.getItem('token')
          }
        })
        .then(function (response) {
            if(response.data.statuscode ==='202'){
              that.getData();
            }
        })
        .catch(function (error) {
            console.log(error)
        })
      },
      // 发表评论函数
      comment:function () {
        let data = {
          "user_id":sessionStorage.getItem('u_id'),
          "content":this.comment_text,
          "article_id":5,
        };
        let that = this;
        this.comment_text = '';
        axios.post('http://127.0.0.1:8000/article/commentarticle/',data,{
          headers:{
            "token":sessionStorage.getItem('token')
          }
        })
        .then(function (response) {
          if(response.data.statuscode ==='202'){
            that.getData();
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
  }
</script>

<style scoped>
  /*发表评论区域*/
  .comment-input-area{
    height: 150px;
    width: 100%;
  }
  /*评论输入框div*/
  .comment-input-area div:first-child{
    width: 100%;
    height: 70%;
  }
  /*评论输入框*/
  .comment-input-area div:first-child input{
    width: 100%;
    height: 100%;
    font-size: 22px;
  }
  /*发表评论按钮div*/
  .comment-input-area div:nth-child(2){
    width: 10%;
    height: 30px;
    margin-top: 5px;
    line-height: 30px;
    margin-left: 90%;
  }
  .comment-body{
    width: 1150px;
    border: 2px solid;
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
  }
  /*评论总区域*/
  .comment-area{
    width: 100%;
  }
  /*评论和头像的总区域*/
  .comment-top{
    width: 100%;
    height: 220px;
    display: flex;
    border-bottom: 1px solid #c6c3bf;
    border-top: 1px solid #c6c3bf;
  }
  /*评论的头像的区域*/
  .con-user-icon{
    height:100%;
    width: 20%;
    border-right: 1px solid #c6c3bf;;
  }
  /*头像图片的div*/
  .con-user-icon div:first-child{
    width: 60%;
    height: 60%;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 5%;
  }
  /*头像图片的大小*/
  .con-user-icon img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    border: 1px solid;
  }
  /*用户昵称的div*/
  .con-user-icon div:nth-child(2){
    width: 100%;
    height: 30px;
    margin-top: 20px;
    line-height: 30px;
    font-size: 18px;
    text-align: center;
  }
  /*评论内容区域*/
  .con-content{
    height:100%;
    width: 80%;
  }
  /*评论内容文字区*/
  .con-font{
    height:80%;
    width: 100%;
    font-size: 22px;
    line-height: 120px;
  }
  /*时间和按钮区域*/
  .time-btn{
    height: 20%;
    width: 100%;
    line-height: 100%;
    display: flex;
  }
  /*评论的时间显示*/
  .time-btn div:first-child{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    margin-left: 65%;
    margin-right: 2%;
  }
  /*显示回复的按钮*/
  .time-btn div:nth-child(3),.time-btn div:nth-child(2){
    height: 40px;
    line-height: 40px;
  }
  /*回复框的总区域*/
  .reply-input{
    width: 80%;
    height: 100px;
    margin-left: 20%;
  }
  /*输入区域的div*/
  .reply-content-input{
    width: 75%;
    height: 60%;
    margin-left: 25%;
  }
  /*回复的输入框*/
  .reply-content-input input{
    width: 100%;
    height: 100%;
  }
  .reply-input div:last-child{
    width: 15%;
    text-align: center;
    margin-left: 85%;
    height: 40px;
    line-height: 40px;
  }
  /*回复的总区域*/
  .reply-area{
    width: 80%;
    margin-left: 20%;
    background: #f3f0ec;
  }
  /*每条回复的区域*/
  .reply-con{
    height: 80px;
    width: 100%;
    display: flex;
  }
  /*每条回复的用户信息区域*/
  .reply-userinfo{
    height: 100%;
    width: 10%;
  }
  /*回复用户头像div*/
  .reply-userinfo div:first-child{
    width: 80%;
    height: 80%;
    border-radius: 10px;
    border: 1px solid;
    margin-left: 10%;
  }
  /*回复用户头像img*/
  .reply-userinfo img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
  /*回复用户昵称*/
  .reply-userinfo div:last-child{
    font-size: 8px;
    text-align: center;
  }
  /*回复内容和时间区域*/
  .reply-font{
    width: 100%;
    height: 100%;
  }
  /*回复的内容*/
  .reply-font div:first-child{
    font-size: 18px;
    height: 70%;
  }
  .reply-font div:last-child{
    margin-left: 80%;
  }
  /*加载更多区域*/
  .show-more{
    height: 35px;
    width: 100%;
    line-height: 35px;
  }

</style>
