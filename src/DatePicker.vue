<template>
  <div>
    <input type="text" class="form-control">

    <br>

    <div class="input-date-picker">
      <!-- <svg height="32" class="octicon octicon-diff" viewBox="0 0 14 16" version="1.1" width="28" aria-hidden="true"><path fill="#3cc5c7" fill-rule="evenodd" d="M13 2h-1v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H6v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H2c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H2V5h11v9zM5 3H4V1h1v2zm6 0h-1V1h1v2zM6 7H5V6h1v1zm2 0H7V6h1v1zm2 0H9V6h1v1zm2 0h-1V6h1v1zM4 9H3V8h1v1zm2 0H5V8h1v1zm2 0H7V8h1v1zm2 0H9V8h1v1zm2 0h-1V8h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1zm2 0h-1v-1h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1z"></path></svg> -->
      <div>
        <svg height="32" class="octicon octicon-clock" viewBox="0 0 14 16" version="1.1" width="28" aria-hidden="true"><path fill="#3cc5c7" fill-rule="evenodd" d="M8 8h3v2H7c-.55 0-1-.45-1-1V4h2v4zM7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"></path></svg>
      </div>
      <div>
        2018-09-09
      </div>
    </div>

    

    

    <date-template></date-template>
  </div>
</template>

<script>
import DateTemplate from "./components/DateTemplate";

export default {
  name: "DatePicker",
  data () {
    return {
    };
  },
  components: {
    DateTemplate
  }
}
</script>

<style>
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
  
}
.input-date-picker div {
  padding: 0;
  margin: 0;
  float: left;
  height: calc(2.25rem + 2px);
}
</style>

