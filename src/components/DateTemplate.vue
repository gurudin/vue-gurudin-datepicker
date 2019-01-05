<template>
  <div class="date-picker date-single">
    <div class="date-picker-header">
      <ul>
        <li class="date-time">
          <span :class="{'active':picker=='years'}" @click="togglePanel('years')">2019年</span>
          <span :class="{'active':picker=='months'}" @click="togglePanel('months')">06月</span>
        </li>
        <li class="date-prev-year">
          <button><i></i></button>
        </li>
        <li class="date-now">
          <button><i></i></button>
        </li>
        <li class="date-next-year">
          <button><i></i></button>
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

          <li class="muted">1</li>
          <li class="muted">2</li>
          <li class="muted">3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>

          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>

          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>

          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>

          <li>29</li>
          <li>30</li>
          <li>31</li>
          <li>32</li>
          <li>33</li>
          <li>34</li>
          <li>35</li>

          <li>36</li>
          <li>37</li>
          <li>38</li>
          <li>39</li>
          <li>40</li>
          <li class="muted">6</li>
          <li class="muted">7</li>
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
      <input type="text" value="12">
      :
      <input type="text" value="00">
      <input type="button" value="PM">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DateTemplate',
  data () {
    return {
      picker: 'days',
    };
  },
  methods: {
    togglePanel(type) {
      if (this.picker == type) {
        this.picker = 'days';
      } else {
        this.picker = type;
      }
    }
  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  /* transition: all .0s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
  display: none;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

.date-picker input:focus, textarea:focus {
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
  background-color: #17a2b8;
}
.date-picker-header span:hover {
  color: #ffffff;
  background-color: #17a2b8;
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
.date-picker-footer input {
  border: none;
  text-align: center;
  width: 125px;
  height: 49px;
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
