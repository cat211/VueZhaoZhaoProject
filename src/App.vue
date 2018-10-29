<template>
  <div id="app">
    <nav-main :islogin="my_token" :dyn_flag="dyn_flag" @exit="toexit" @cutwebsocket="DisConnectWebSocket"></nav-main>
    <router-view @send="tochange" @connectwebsocket="WebSocketCheckDyn"/>
    <div-footer></div-footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data:function () {
    return{
      my_token:false,
      ws:null, // websocket对象
      dyn_flag:false,
    }
  },
  mounted:function(){
    if (sessionStorage.getItem('u_id')){
      this.my_token=true
    }
  },
  methods:{
    tochange:function (f) {
      this.my_token=f
    },
    toexit:function (l) {
      this.my_token=l
    },
    // 动态推送，连接远程接口
    WebSocketCheckDyn:function(){
      if ("WebSocket" in window) {
        // 打开一个 web socket
        this.ws = new WebSocket("ws://localhost:8000/user/checkolddyn/"+sessionStorage.getItem('u_id')+"/");
        let that = this;
        this.ws.onopen = function () {
          that.ws.send('Hello World')
        };
        // 接收服务端发送的消息
        this.ws.onmessage = function (response) {
          // 改变个人中心右侧铃铛的显示状态
          that.dyn_flag = JSON.parse(response.data).flag;
          console.log(response.data);
        };
        // 连接关闭时执行的函数
        this.ws.onclose = function () {
          // 关闭 websocket
          console.log('连接已关闭');
        };
      }
      else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
      }
    },
    // 断开websocket连接
    DisConnectWebSocket:function () {
      this.ws.close();
      this.ws = null;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x:hidden;
}
</style>
