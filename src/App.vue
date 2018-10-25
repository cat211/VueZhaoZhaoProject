<template>
  <div id="app">
    <nav-main :islogin="my_token"></nav-main>
    <router-view @send="tochange"/>
    <div-footer></div-footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data:function () {
    return{
      my_token:false,
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
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
