<template>
<div id="calendarBox">
  <div class="input-date-picker" @click="showPicker = !showPicker">
    <span class="date-icon">
      <svg height="32" class="octicon octicon-diff" viewBox="0 0 14 16" version="1.1" width="28" aria-hidden="true"><path fill="#3cc5c7" fill-rule="evenodd" d="M13 2h-1v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H6v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H2c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H2V5h11v9zM5 3H4V1h1v2zm6 0h-1V1h1v2zM6 7H5V6h1v1zm2 0H7V6h1v1zm2 0H9V6h1v1zm2 0h-1V6h1v1zM4 9H3V8h1v1zm2 0H5V8h1v1zm2 0H7V8h1v1zm2 0H9V8h1v1zm2 0h-1V8h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1zm2 0h-1v-1h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1z"></path></svg>
      <!-- <svg height="32" class="octicon octicon-clock" viewBox="0 0 14 16" version="1.1" width="28" aria-hidden="true"><path fill="#3cc5c7" fill-rule="evenodd" d="M8 8h3v2H7c-.55 0-1-.45-1-1V4h2v4zM7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"></path></svg> -->
    </span>
    <span class="date-box">
      2018-09-09
    </span>
  </div>

  <transition name="slide-fade">
      <date-template v-if="showPicker"></date-template>
    </transition>
</div>
</template>

<script>
import DateTemplate from "./components/DateTemplate";

export default {
  name: "DatePicker",
  data () {
    return {
      showPicker: 1,
    };
  },
  components: {
    DateTemplate
  },
  created() {
    setTimeout(() => {
      var _this = this;
      var calendarBox = document.getElementById("calendarBox");
      var chk = 0;

      // 点击整个界面关闭弹窗
      document.onclick = function(e) {
        if (chk != 1) {
          _this.showPicker = 0;
        } else {
          chk = 0;
        }
      }
        
      // 防止点击弹窗也关闭弹窗，需要防止其关闭
      calendarBox.onclick = function() {
        chk = 1;
        return false;
      }
    }, 100);
  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  /* transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
  display: none;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

.input-date-picker {
  position: relative;
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  /* padding: 2px 10px; */
  font-size: 1rem;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  cursor: pointer;
}
.input-date-picker .date-box,.date-icon {
  padding: 0;
  margin: 0;
  float: left;
  height: calc(2.25rem + 2px);
  line-height: 33px;
  margin-left: 10px;
}
.input-date-picker span.date-box {
  line-height: calc(2.25rem + 2px);
}
</style>

