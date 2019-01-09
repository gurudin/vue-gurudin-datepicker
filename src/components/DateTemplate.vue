<template>
  <div class="date-picker date-single">
    <div class="date-picker-header">
      <ul>
        <li class="date-time">
          <span :class="{'active':picker=='years'}" @click="togglePanel('years')">{{currentDate.fullYear}}年</span>
          <span :class="{'active':picker=='months'}" @click="togglePanel('months')">{{currentDate.month}}月</span>
        </li>
        <li class="date-prev-year">
          <button @click="prev"><i></i></button>
        </li>
        <li class="date-now">
          <button><i></i></button>
        </li>
        <li class="date-next-year">
          <button @click="next"><i></i></button>
        </li>
      </ul>
    </div>

    <div class="date-picker-body">
      <transition-group tag="span" name="slide-fade">
        <ul class="days-picker" v-if="picker=='days'" key="days">
          <li class="title">日</li>
          <li class="title">一</li>
          <li class="title">二</li>
          <li class="title">三</li>
          <li class="title">四</li>
          <li class="title">五</li>
          <li class="title">六</li>

          <li class="muted" v-for="item in date.gridDays()['prev']">{{item.day}}</li>
          
          <li v-for="item in date.gridDays()['current']" :class="{'active':item.active}">{{item.day}}</li>

          <li class="muted" v-for="item in date.gridDays()['next']">{{item.day}}</li>
        </ul>

        <ul class="months-picker" v-if="picker=='months'" key="months">
          <li>一月</li>
          <li>二月</li>
          <li>三月</li>
          <li>四月</li>
          <li>五月</li>
          <li>六月</li>
          <li>七月</li>
          <li>八月</li>
          <li>九月</li>
          <li>十月</li>
          <li>十一月</li>
          <li>十二月</li>
        </ul>

        <ul class="years-picker" v-if="picker=='years'" key="years">
          <li>2007年</li>
          <li>2008年</li>
          <li>2009年</li>
          <li>2010年</li>
          <li>2011年</li>
          <li>2012年</li>
          <li>2013年</li>
          <li>2014年</li>
          <li>2015年</li>
          <li>2016年</li>
          <li>2017年</li>
          <li>2018年</li>
          <li>2007年</li>
          <li>2008年</li>
          <li>2009年</li>
          <li>2010年</li>
          <li>2011年</li>
          <li>2012年</li>
          <li>2013年</li>
          <li>2014年</li>
        </ul>
      </transition-group>
    </div>

    <div class="date-picker-footer">
      <div @mouseover="activeArrow" @mouseout="deactiveArrow">
        <input type="text" :value="currentDate.hours" @focus="$event.target.select()">
        <span class="arrowUp" @click="changeTime('hours', 'up')"></span>
        <span class="arrowDown" @click="changeTime('hours', 'down')"></span>
      </div>
      <div class="separated">:</div>
      <div @mouseover="activeArrow" @mouseout="deactiveArrow">
        <input type="text" :value="currentDate.minutes" @focus="$event.target.select()">
        <span class="arrowUp" @click="changeTime('minutes', 'up')"></span>
        <span class="arrowDown" @click="changeTime('minutes', 'down')"></span>
      </div>
      <input type="button" value="PM">
    </div>
  </div>
</template>

<script>
import date from "../utils/date";

export default {
  name: 'DateTemplate',
  data () {
    return {
      picker: 'days',
      date: date,
    };
  },
  props: {
    value: {
      type: null,
      required: false,
    },
  },
  computed: {
    currentDate() {
      if (typeof this.value == 'undefined') {
        var dateObj = new Date();
      } else {
        var dateObj = new Date(this.value.replace(/-/g, '/'));
      }
      
      return this.date.dateToArray(dateObj);
    }
  },
  methods: {
    togglePanel(type) {
      if (this.picker == type) {
        this.picker = 'days';
      } else {
        this.picker = type;
      }
    },
    activeArrow(event) {
      event.currentTarget.getElementsByTagName('span')[0].style.opacity = 1;
      event.currentTarget.getElementsByTagName('span')[1].style.opacity = 1;
    },
    deactiveArrow(event) {
      event.currentTarget.getElementsByTagName('span')[0].style.opacity = 0;
      event.currentTarget.getElementsByTagName('span')[1].style.opacity = 0;
    },
    changeTime(type, direction) {
      if (type) {

      }
    },
    prev() {
      // prev year month
      if (this.picker == 'days') {
        this.date.init(this.date.offsetMonthDate(-1));
      }
    },
    next() {
      // next year month
      if (this.picker == 'days') {
        this.date.init(this.date.offsetMonthDate(1));
      }
    }
  },
  created() {
    this.date.init(this.date.arrayToDate(this.currentDate));
  }
}
</script>

<style>
.date-picker input:focus, textarea:focus, button:focus {
  outline: none;
}
.date-picker ul,.date-picker ul li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.date-picker ul {
  padding: 0 8px;
}
.date-picker ul li {
  float: left;
  text-align: center;
}
.date-picker button {
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  position: relative;
  background-color: #e2e6ea;
  border-color: #dae0e5;
}
.date-picker {
  border: 1px solid #d2d2d2;
  box-shadow: 0 2px 4px rgba(0,0,0,.12);
  background-color: #fff;
  color: #666;
  overflow: hidden;
  clear:both;
  position: absolute;
}
.date-single {
  width: 320px;
  height: 360px;
}
.date-picker .date-picker-header {
  height: 45px;
  border-bottom: 1px solid #e2e2e2;
}
.date-picker .date-picker-header li {
  line-height: 46px;
  width: 32px;
}
.date-picker-header li.date-time {
  text-align: left;
  width: 205px;
}

.date-picker-header button {
  width: 25px;
  height: 25px;
}
.date-picker button:hover {
  background-color: #f8f9fa;
}
.date-picker-header .date-prev-year i::after {
  content: "";
  position: absolute;
  top: 8px;
  left: 10px;
  border-left: 1px solid #212529;
  border-top: 1px solid #212529;
  width: 6px;
  height: 6px;
  transform: rotate(-45deg);-o-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
}
.date-picker-header .date-next-year i::after {
  content: "";
  position: absolute;
  top: 8px;
  left: 7px;
  border-right: 1px solid #212529;
  border-bottom: 1px solid #212529;
  width: 6px;
  height: 6px;
  transform: rotate(-45deg);-o-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
}
.date-picker-header .date-now i::after {
  content: "";
  position: absolute;
  top: 7px;
  left: 7px;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: #212529;
}
.date-picker-header span {
  padding: 3px;
  border-radius: 3px;
  cursor: pointer;
}
.date-picker-header span.active {
  color: #ffffff;
  background-color: #3cc5c7;
}
.date-picker-header span:hover {
  color: #ffffff;
  background-color: #3cc5c7;
}

.date-picker-body {
  min-height: 252px;
  margin-top: 10px;
}
.date-picker-body ul.days-picker li {
  width: 43px;
  height: 35px;
  line-height: 35px;
  color: #343a40;
  cursor: pointer;
}
.date-picker-body ul.days-picker li.active {
  color: #ffffff!important;
  background-color: #3cc5c7;
}
.date-picker-body ul.days-picker li.title {
  cursor: unset;
}
.date-picker-body ul.days-picker li.title:hover {
  background-color: #ffffff;
}
.date-picker-body ul li:hover {
  background-color: #e8eaeb;
  color: #343a40!important;
}
.date-picker-body ul.months-picker li {
  cursor: pointer;
  width: 75px;
  height: 35px;
  line-height: 35px;
  color: #343a40;
  margin-top: 25px;
}
.date-picker-body ul.years-picker li {
  cursor: pointer;
  width: 75px;
  height: 35px;
  line-height: 35px;
  color: #343a40;
  margin-top: 15px;
}

.date-picker-body li.dark {
  color: #343a40!important;
}
.date-picker-body li.muted {
  color: #d3d5d8!important;
}

.date-picker-footer {
  border-top: 1px solid #e2e2e2;
}
.date-picker-footer div {
  width: 125px;
  height: 49px;
  float: left;
  position: relative;
}
.date-picker-footer div span {
  position: absolute;
  opacity: 0;
}
.date-picker-footer div span:after {
  display: block;
  content: "";
  position: absolute;
}
.date-picker-footer div span.arrowUp:after {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid rgba(57,57,57,.6);
  top: 26%;
}
.date-picker-footer span.arrowDown:after {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid rgba(57,57,57,.6);
  top: 40%;
}
.date-picker-footer div span.arrowUp{
  top: 0;
  right: 0;
  width: 14px;
  padding: 0 4px 0 2px;
  height: 25px;
  line-height: 50%;
  cursor: pointer;
  border: 1px solid rgba(57,57,57,.15);
  box-sizing: border-box;
}
.date-picker-footer div span.arrowDown{
  bottom: -1px;
  right: 0;
  width: 14px;
  padding: 0 4px 0 2px;
  height: 25px;
  line-height: 50%;
  cursor: pointer;
  border: 1px solid rgba(57,57,57,.15);
  box-sizing: border-box;
}
.date-picker-footer div.separated {
  width: 5px;
  line-height: 50px;
  font-weight: bold;
}
.date-picker-footer input {
  border: none;
  text-align: center;
  width: 125px;
  height: 50px;
  font-size: 16px;
}
.date-picker-footer input[type='button'] {
  margin-top: 0px;
  width: 49px;
  height: 51px;
  float: right;
  cursor: pointer;
}
.date-picker-footer input:hover {
  background-color: #d3d5d8;
}
</style>
