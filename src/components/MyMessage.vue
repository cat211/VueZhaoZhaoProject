<template>
    <div class="col-md-9">
      <div class="row">
        <div class=" panel panel-warning">
          <div class="panel-heading">您的消息</div>
          <div class="panel-body">
            <ul>
              <li v-for="mess in message">
                <a href="javascript:void 0">
                  <span v-text="mess.title">系统消息</span>:
                  <span v-text="mess.time">2018-10-29 8:00-2018-10-30 8:00</span>
                  <span v-text="mess.content">系统维护。</span>
                </a>
              </li>
            </ul>
          </div>
        </div>


      </div>
    </div>
</template>

<script>
    export default {
        name: "",
      data() {
        return {
          message:[{
            "title":"系统消息",
            "time":"2018-05-09",
            "content":"系统维护，预计2018-05-09 8:00-20:00",
          },
            {
              "title":"系统消息",
              "time":"2018-05-18",
              "content":"系统维护，预计2018-05-18 8:00-20:00",
            }
          ,{
              "title":"系统消息",
              "time":"2018-05-29",
              "content":"系统维护，预计2018-05-29 8:00-20:00",
            },]
        }
        }
    }
</script>

<style scoped>

  .my-active a:hover ,li:hover,.panel-body a{
    color: black;
  }
  .panel-body a span:nth-child(1){
    color: red;
  }
  .panel-body a span:nth-child(2){
    color: green;
  }
  .panel-body li{
    line-height: 35px;
  }
</style>
