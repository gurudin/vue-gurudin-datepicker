<template>
  <div class="container-fluid" id="app">   
    <date-picker></date-picker>
  </div>
</template>

<script>
import DatePicker from "./DatePicker";

export default {
  name: 'App',
  components: {
    DatePicker
  }
}
</script>

<style>
/* @import "https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.min.css"; */
@import "https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css";
#app {
  margin-top: 20px;
}
</style>
