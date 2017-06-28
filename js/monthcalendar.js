!(function($, window){
	$.fn.monthCalendar = function(opts){
		  var el = this,
		      ops = opts || {};
		  new MonthCalendar(el, ops);
		};
   function MonthCalendar(elem, config){
	     this.el = elem;
		 this.config = config;
		 this.init();
	   }
    MonthCalendar.prototype = {
        el: null,
        dayEl: null,
        config: null,
        isLoad: false,
        yearRange: 15,
        startYear: 1970,
        endYear: 2020,
        curMonth: '',
        init: function () {
            var self = this,
                _todyParam = self.dateTodayParam();
            self.bulid(_todyParam["year"], _todyParam["month"]);
        },
        initEvents: function () {
            var self = this,
                conF = self.config;
            $(self.el).on('click', '.core', function () {
                var me = $(this);
                self.dayEl ? self.dayEl.removeClass('active') : '';
                self.dayEl = me;
                me.addClass('active');
                if ($.type(conF.onClickDay) === 'function') {
                    conF.onClickDay(me, conF);
                }
                alert(me.attr("data-date") || '');
                return false;
            });
            $(self.el).on('click', '.a-prev', function(){
                var a = new Date(self.curMonth);
                    a.setMonth(a.getMonth() -1, 1);
                var b = self.dateYmd(a);
                self.bulid(b[0], b[1]);
                return false;
            });
            $(self.el).on('click', '.a-next', function(){
                var a = new Date(self.curMonth);
                    a.setMonth(a.getMonth() + 1, 1);
                var b = self.dateYmd(a);
                    self.bulid(b[0], b[1]);
                return false;
            });
        },
        bulid: function (curYear, curMonth) {
            var self = this,
                todyParam = self.dateTodayParam(),
                _calendarArr = [],
                _year = curYear,
                _month = curMonth;
              self.setCurrentDate(_year, _month + 1, todyParam['date']);
            //header选择月份
            var _selHtml = self.monthSelect(todyParam['year'], _year, todyParam['month'], _month) || '';
            _calendarArr.push(_selHtml);
            var _firstDay = self.firstDay(new Date(_year, _month, 1)),
                _date = '';
            if (_year === todyParam['year'] && _month === todyParam['month']) {
                _date = todyParam['date'];
            } else {
                _date = '';
            }
            _calendarArr.push(self.monthHtml(_year, _month, _date, _firstDay));
            _calendarArr.push("</div>");
            $(self.el).html(_calendarArr.join(''));
            if(!self.isLoad){
             self.initEvents();
             self.isLoad = true;
             }
        },
        monthSelect: function (year, curYear, month, curMonth) {
            var self = this,
                _strYear = parseInt(year) - self.yearRange,
                _endYear = parseInt(year) + self.yearRange;
            self.startYear = _strYear;
            self.endYear = _endYear;
            var _html = '<div id="monthcalendar" class="monthcalendar-warp">\n'
                + '<header class="monthcalendar-header">\n'
                + '<a href="#" class="a-prev"><</a>\n'
                + '   <span>' + curYear + '年' + (curMonth + 1) + '月</span>\n'
                + '    <a href="#" class="a-next">></a>\n'
                + '   </header>\n';
            return _html;
        },
        monthHtml: function (year, mon, day, firstDay) {
            var self = this,
                showMon = mon + 1,
                _week = self.weekDay,
                row = self.calendarRow(firstDay, year, mon);
            var _html = '<table class="monthcalendar-table">'
                + '<thead>'
                + '<tr>'
                + '  <th class="weekend">' + _week[0] + '</th>'
                + '  <th>' + _week[1] + '</th>'
                + '  <th>' + _week[2] + '</th>'
                + '  <th>' + _week[3] + '</th>'
                + '  <th>' + _week[4] + '</th>'
                + '  <th>' + _week[5] + '</th>'
                + '  <th class="weekend">' + _week[6] + '</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>';
            for (var m = 0; m < 6; m++) {
                //日期共 4-6 行
                if (row <= m) {
                    //第五、六行是否隐藏
                    _html += "<tr class='daylist hide daylist" + m + "'>\n";
                } else {
                    _html += "<tr class='daylist daylist" + m + "'>\n";
                }
                for (var n = 0; n < 7; n++) {
                    //日历列
                    if ((7 * m + n) < firstDay || (7 * m + n) >= (firstDay + self.monthDays(year, mon))) {
                        //某月日历中不存在的日期(头尾)
                        _html += "<td class='' data-date=''></td>";
                    } else {
                        var _theDay = 7 * m + n + 1 - firstDay,
                            _icon = self.readType(mon, _theDay);
                            _dataDate = year + "/" + showMon + "/" + _theDay;
                        if ((_theDay == day) && (((7 * m + n) % 7 == 0) || ((7 * m + n) % 7 == 6))) {
                            _html += "<td class='core todayweekend' data-date='" + _dataDate + "'>" + _theDay + "<div>"+ _icon +"</div></td>";
                        } else if ((( 7 * m + n ) % 7 == 0) || ((7 * m + n) % 7 == 6)) {
                            _html += "<td class='core weekended' data-date='" + _dataDate + "'>" + _theDay + "<div>"+ _icon +"</div></td>";
                        } else if (_theDay == day) {
                            _html += "<td class='core today' data-date='" + _dataDate + "'>" + _theDay + "<div>"+ _icon +"</div></td>";
                        } else {
                            _html += "<td class='core' data-date='" + _dataDate + "'>" + _theDay + "<div>"+ _icon +"</div></td>";
                        }
                    }
                }
                _html += "</tr>\n";
            }
            _html += " </tbody>\n</table>\n";
            return _html;
        },
        readType: function (mon, day) {
            var self = this;
            return '<em class="type-icon normal"></em><em class="type-icon off"></em><em class="type-icon absent"></em>';
        },
        isInArray: function (str, arr) {
            var type = typeof str;
            if ((type == 'string' || type == 'number') && arr.length > 0) {
                for (var i in arr) {
                    if (arr[i] === str) {
                        return true;
                    }
                }
            }
            return false;
        },
        isLeap: function (year) {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        },
        //返回每月天数
        leapYear: function (year) {
            var self = this;
            var fbDay = self.isLeap(year) ? 29 : 28;
            return [31, fbDay, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        },
        calendarRow: function (firstDay, year, mon) {
            var self = this;
            return Math.ceil((firstDay + self.monthDays(year, mon)) / 7);
        },
        monthDays: function (year, mon) {
            var self = this,
                yearArr = self.leapYear(year);
            return yearArr[mon];
        },
        //当月1号星期几
        firstDay: function (date) {
            return date.getDay();
        },
        showMonth: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        weekDay: ['日', '一', '二', '三', '四', '五', '六'],
        dateTodayParam: function () {
            var self = this,
                date = new Date(),
                todayArr = new Array();
            todayArr['year'] = date.getFullYear();
            todayArr['month'] = date.getMonth();
            todayArr['date'] = date.getDate();
            todayArr['hour'] = date.getHours();
            todayArr['minute'] = date.getMinutes();
            todayArr['second'] = date.getSeconds();
            todayArr['week'] = date.getDay();
            todayArr['firstDay'] = self.firstDay(new Date(todayArr['year'], todayArr['month'], 1));
            return todayArr;
        },
        setCurrentDate : function(y, m, d){
            var self = this,
                _todayParam = self.dateTodayParam(),
                _y = y || _todayParam['year'],
                _m = m || _todayParam['month'],
                _d = d || _todayParam['date'],
                _tplD = _y + '-' + _m + '-' + _d;
            self.curMonth = _tplD;
        },
        str2date: function (str) {
            var ar = str.split('-');
            return new Date(ar[0], ar[1] - 1, ar[2]);
        },
        date2ymd: function (d) {
            return [d.getFullYear(), (d.getMonth() + 1), d.getDate()];
        },
        dateYmd: function (d) {
            return [d.getFullYear(), d.getMonth(), d.getDate()];
        }
    };
})(window.jQuery || window.Zepto, window)


$(function(){

});