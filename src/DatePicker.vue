<template>
  <div class="date-picker date-single">
    <div class="date-picker-header">
      <ul>
        <li class="date-time">2019年 06月</li>
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
      <ul class="days-picker">
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>

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
    </div>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
}
</script>

<style>
.date-picker ul,.date-picker ul li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.date-picker ul {
  padding: 0 0.5em;
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
}
.date-single {
  width: 20em;
  height: 25em;
}
.date-picker .date-picker-header {
  height: 45px;
  border-bottom: 1px solid #e2e2e2;
}
.date-picker .date-picker-header li {
  line-height: 46px;
  width: 2em;
}
.date-picker-header li.date-time {
  text-align: left;
  width: 13em;
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
  border-left: 0.1em solid #212529;
  border-top: 0.1em solid #212529;
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
  border-right: 0.1em solid #212529;
  border-bottom: 0.1em solid #212529;
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

.date-picker-body {
  min-height: 250px;
  margin-top: 10px;
}
.date-picker-body ul.days-picker li {
  width: 43px;
  height: 35px;
  line-height: 35px;
  color: #343a40;
}
.date-picker-body li.dark {
  color: #343a40!important;
}
.date-picker-body li.muted {
  color: #d3d5d8!important;
}
</style>

