export default {
  date: new Date(),
  year: Number,
  fullYear: Number,
  month: Number,
  day: Number,
  hour: Number,
  minutes: Number,
  seconds: Number,
  week: Number,
  timezone: String,
  init(dateTime = '') {
    if (dateTime != '') {
      this.date = new Date(dateTime.replace(/-/g, '/'));
    }

    this.year = Number(this.date.getFullYear().toString().substring(2, 4));
    this.fullYear = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    this.day = this.date.getDate();
    this.hour = this.date.getHours();
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();
    this.week = this.date.getDay();
    this.timezone = this.date.toString().substring(
      this.date.toString().indexOf('GMT') + 3,
      this.date.toString().indexOf('GMT') + 8
    );

    console.log(this.format());
  },
  /**
   * 判断闰年
   */
  isLeapYear() {
    return (0 == this.date.getYear() % 4 && ((this.date.getYear() % 100 != 0) || (this.date.getYear() % 400 == 0)));
  },
  /**
   * 日期格式化
   *
   * 格式 YYYY/yyyy/YY/yy 表示年份
   * MM/M 月份
   * W/w 星期
   * dd/DD/d/D 日期
   * hh/HH/h/H 时间
   * mm/m 分钟
   * ss/SS/s/S 秒
   * Z/z 时区
   */
  format(formatStr = 'YYYY-MM-DD HH:mm:ss') {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.fullYear);
    str = str.replace(/yy|YY/, this.year > 9 ? this.year.toString() : '0' + this.year);

    str = str.replace(/MM/, this.month > 9 ? this.month.toString() : '0' + this.month);
    str = str.replace(/M/g, this.month);

    str = str.replace(/w|W/g, Week[this.week]);

    str = str.replace(/dd|DD/, this.day > 9 ? this.day.toString() : '0' + this.day);
    str = str.replace(/d|D/g, this.day);

    str = str.replace(/hh|HH/, this.hour > 9 ? this.hour.toString() : '0' + this.hour);
    str = str.replace(/h|H/g, this.hour);
    str = str.replace(/mm/, this.minutes > 9 ? this.minutes.toString() : '0' + this.minutes);
    str = str.replace(/m/g, this.minutes);

    str = str.replace(/ss|SS/, this.seconds > 9 ? this.seconds.toString() : '0' + this.seconds);
    str = str.replace(/s|S/g, this.seconds);

    str = str.replace(/z|Z/g, this.timezone);

    return str;   
  },
  /**
   * 取得当前日期所在月的最大天数
   * 
   * @params {offset|Number} 月偏移量
   * 
   * @return {int} 偏移月最后一天
   */
  maxDayOfDate(offset = 0) {
    var date = new Date(this.fullYear, this.month + offset, 0);

    return date.getDate();
  },
  /**
   * 
   */
};
