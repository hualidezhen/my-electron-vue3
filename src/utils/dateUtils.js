//距离下班
export function getDayOfWeek() {
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const now = new Date();
    return days[now.getDay()];
}

//距离周末
export function nextWeekend(date) {
    const dayOfWeek = date.getDay();
    const daysUntilNextSaturday = (6 - dayOfWeek + 7) % 7; // 6 表示周六
    const nextSaturday = new Date(date);
    nextSaturday.setDate(date.getDate() + daysUntilNextSaturday);
    nextSaturday.setHours(0, 0, 0, 0); // 设置时间为 00:00:00.000
    return nextSaturday;
}

//距离发工资
export function nextPayday(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = 8; // 发工资的日期

    const nextPayday = new Date(year, month, day);

    if (nextPayday <= date) {
        // 如果当前日期已经过了这个月的8号，则计算下个月的8号
        nextPayday.setMonth(month + 1);
    }

    return nextPayday;
}
//距离过年
export function nextNewYear(date) {
    const year = date.getFullYear();
    const lunarNewYear = new Date(year + 1, 0, 28); // 假设农历新年的日期为每年的1月28日

    if (lunarNewYear <= date) {
        // 如果当前日期已经过了今年的农历新年，则计算明年的农历新年
        lunarNewYear.setFullYear(year + 1);
    }
    return lunarNewYear;
}
