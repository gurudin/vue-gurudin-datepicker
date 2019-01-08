export default {
  date: new Date(),
  fullYear: Number,
  month: Number,
  day: Number,
  init(dateTime = '') {
    if (dateTime != '') {
      // this.date = new Date(dateTime.replace(/-/g, '/'));
      var tmpDate = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1) + '-01';
    } else {
      var tmpDate = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-01';
    }
    this.date = new Date(tmpDate);

    this.fullYear = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    this.day = this.date.getDate();
  },
  gridDays() {
    var days = {
      'prev': [],
      'current': [],
      'next': [],
    };
    var currMonth = this.offsetMonthDate();

    // current
    for (let i = 1; i <= currMonth.getDate(); i++) {
      days.current.push({
        year: currMonth.getFullYear(),
        month: currMonth.getMonth() + 1,
        day: i
      });
    }

    // prev month
    if (this.week > 0) {
      var prevMonth = this.offsetMonthDate(-1);
      for (let i = prevMonth.getDate() - this.week + 1; i <= prevMonth.getDate() ; i++) {
        days.prev.push({
          year: prevMonth.getFullYear(),
          month: prevMonth.getMonth() + 1,
          day: i
        });
      }
    }

    // next month
    var nextMonth = this.offsetMonthDate(1);
    for (let i = 1; i <= (42-days['prev'].length-days['current'].length); i++) {
      days.next.push({
        year: nextMonth.getFullYear(),
        month: nextMonth.getMonth() + 1,
        day: i
      });
    }

    return days;
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
   * @param {Date} 日期对象
   * @param {String} 格式化字符串
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
  format(dateObj, formatStr = 'YYYY-MM-DD HH:mm:ss') {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, dateObj.getFullYear());
    str = str.replace(/yy|YY/, dateObj.getYear() > 9 ? dateObj.getYear().toString() : '0' + dateObj.getYear());

    str = str.replace(/MM/, dateObj.getMonth() > 9 ? dateObj.getMonth().toString() : '0' + dateObj.getMonth());
    str = str.replace(/M/g, dateObj.getMonth());

    str = str.replace(/w|W/g, Week[dateObj.getDay()]);

    str = str.replace(/dd|DD/, dateObj.getDate() > 9 ? dateObj.getDate().toString() : '0' + dateObj.getDate());
    str = str.replace(/d|D/g, dateObj.getDate());

    str = str.replace(/hh|HH/, dateObj.getHours() > 9 ? dateObj.getHours().toString() : '0' + dateObj.getHours());
    str = str.replace(/h|H/g, dateObj.getHours());
    str = str.replace(/mm/, dateObj.getMinutes() > 9 ? dateObj.getMinutes().toString() : '0' + dateObj.getMinutes());
    str = str.replace(/m/g, dateObj.getMinutes());

    str = str.replace(/ss|SS/, dateObj.getSeconds() > 9 ? dateObj.getSeconds().toString() : '0' + dateObj.getSeconds());
    str = str.replace(/s|S/g, dateObj.getSeconds());

    str = str.replace(/z|Z/g, dateObj.toString().substring(
      this.date.toString().indexOf('GMT') + 3,
      this.date.toString().indexOf('GMT') + 8
    ));

    return str;   
  },
  /**
   * date对象转换array
   * 
   * @param {Date} dateObj 
   * 
   * @return {Array}
   */
  dateToArray(dateObj) {

  },
  /**
   * 获取偏移月
   * 
   * @params {offset|Number} 月偏移量
   * 
   * @return {date} 偏移月(日期最后一天)
   */
  offsetMonthDate(offset = 0) {
    return new Date(this.fullYear, this.month + offset, 0);
  },
};
