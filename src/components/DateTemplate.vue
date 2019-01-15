<template>
  <div class="date-picker date-single">
    <div class="date-picker-header">
      <ul>
        <li class="date-time" v-if="language == 'en'">
          <span :class="{'active':picker=='months'}" @click="togglePanel('months')">{{i18n.months[date.month - 1]}}</span>
          <span :class="{'active':picker=='years'}" @click="togglePanel('years')">{{date.fullYear}}</span>
        </li>
        <li class="date-time" v-else>
          <span :class="{'active':picker=='years'}" @click="togglePanel('years')">{{date.fullYear}}{{i18n.year}}</span>
          <span :class="{'active':picker=='months'}" @click="togglePanel('months')">{{date.month}}{{i18n.month}}</span>
        </li>
        <li class="date-prev-year">
          <button @click="prev"><i></i></button>
        </li>
        <li class="date-now">
          <button @click="reset"><i></i></button>
        </li>
        <li class="date-next-year">
          <button @click="next"><i></i></button>
        </li>
      </ul>
    </div>

    <div class="date-picker-body">
      <transition-group tag="span" name="slide-fade">
        <ul class="days-picker" v-if="picker=='days'" key="days">
          <li class="title" v-for="(week,inx) in i18n.weeks">{{week}}</li>

          <li class="muted"
            v-for="item in date.gridDays()['prev']"
            :class="{'active':isActive(item, 'day')}">{{item.day}}</li>
          
          <li v-for="item in date.gridDays()['current']"
            :class="{'active':isActive(item, 'day')}">{{item.day}}</li>

          <li class="muted"
            v-for="item in date.gridDays()['next']"
            :class="{'active':isActive(item, 'day')}">{{item.day}}</li>
        </ul>

        <ul class="months-picker" v-if="picker=='months'" key="months">
          <li v-for="(month,inx) in i18n.months"
            :class="{'active':isActive(inx+1, 'month')}"
            @click="changeMonth(inx + 1)">{{month}}</li>
        </ul>

        <ul class="years-picker" v-if="picker=='years'" key="years">
          <li v-for="year in date.gridYears()"
            :class="{'active':isActive(year, 'year')}"
            @click="changeYear(year)">{{year}}{{i18n.year}}</li>
        </ul>
      </transition-group>
    </div>

    <div class="date-picker-footer">
      <div @mouseover="activeArrow" @mouseout="deactiveArrow">
        <input type="text" v-model="currentValue.hours" @focus="$event.target.select()">
        <span class="arrowUp" @click="changeTime('hours', 'up')"></span>
        <span class="arrowDown" @click="changeTime('hours', 'down')"></span>
      </div>
      <div class="separated">:</div>
      <div @mouseover="activeArrow" @mouseout="deactiveArrow">
        <input type="text" v-model="currentValue.minutes" @focus="$event.target.select()">
        <span class="arrowUp" @click="changeTime('minutes', 'up')"></span>
        <span class="arrowDown" @click="changeTime('minutes', 'down')"></span>
      </div>
      <input type="button" :value="currentValue.hours >= 12 ? 'PM' : 'AM'">
    </div>
  </div>
</template>

<script>
import date from "../utils/date";
import zh from "../utils/zh.json";
import en from "../utils/en.json";

export default {
  name: 'DateTemplate',
  data () {
    return {
      picker: 'days',
      date: date,
      currentValue: Array,
      i18n: Object,
    };
  },
  props: {
    value: {
      type: null,
      required: false,
      default: ''
      // default: '2018-07-11 12:30'
    },
    language: {
      type: String,
      required: false,
      default: 'zh'
    }
  },
  computed: {
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
    isActive(item, type) {
      if (type == 'day') {
        return item.year == this.currentValue.fullYear
          && item.month == this.currentValue.month
          && item.day == this.currentValue.day;
      }

      if (type == 'month') {
        return this.date.month == item;
      }

      if (type == 'year') {
        return this.date.fullYear == item;
      }
    },
    changeTime(type, direction) {
      if (type == 'hours') {
        if (direction == 'up') {
          if (Number(this.currentValue.hours) > 0) {
            this.currentValue.hours = Number(this.currentValue.hours) - 1 > 9
              ? Number(this.currentValue.hours) - 1
              : '0' + (Number(this.currentValue.hours) - 1);
          }
        }
        if (direction == 'down') {
          if (Number(this.currentValue.hours) < 24) {
            this.currentValue.hours = Number(this.currentValue.hours) + 1 > 9
              ? Number(this.currentValue.hours) + 1
              : '0' + (Number(this.currentValue.hours) + 1);
          }
        }
      }

      if (type == 'minutes') {
        if (direction == 'up') {
          if (Number(this.currentValue.minutes) > 0) {
            this.currentValue.minutes = Number(this.currentValue.minutes) - 5 > 9
              ? Number(this.currentValue.minutes) - 5
              : '0' + (Number(this.currentValue.minutes) - 5 < 0 ? 0 : Number(this.currentValue.minutes) - 5);
          }
        }

        if (direction == 'down') {
          if (Number(this.currentValue.minutes) < 60) {
            this.currentValue.minutes = Number(this.currentValue.minutes) + 5 > 9
              ? Number(this.currentValue.minutes) + 5
              : '0' + (Number(this.currentValue.minutes) + 5);
            if (this.currentValue.minutes > 60) {
              this.currentValue.minutes = 60;
            }
          }
        }
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
    },
    reset() {
      this.currentValue = this.date.dateToArray(this.value != '' ? new Date(this.value.replace(/-/g, '/')) : new Date()); 
      this.date.init(this.date.arrayToDate(this.currentValue));
    },
    changeMonth(month) {
      this.date.month = month;
      this.picker = 'days';
      this.date.init(this.date.offsetMonthDate());
    },
    changeYear(year) {
      this.date.fullYear = year;
      this.picker = 'days';
      this.date.init(this.date.offsetMonthDate());
    }
  },
  created() {
    this.reset();

    switch (this.language) {
      case 'en':
        this.i18n = en;
        break;
      default:
        this.i18n = zh;
        break;
    }
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
.date-picker-body ul.days-picker li.active,
.date-picker-body ul.months-picker li.active,
.date-picker-body ul.years-picker li.active {
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
