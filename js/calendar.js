const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
    "Aug", "Sept", "Oct", "Nov", "Dec"];
const dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function getMonthYear() {
    let d = new Date();
    let month = d.getMonth();
    let year = d.getFullYear();

    generateCalendar(year, month);
}

function generateCalendar(year, month) {
    let date = new Date(year, month);

    document.getElementById("month").innerHTML = monthName[date.getMonth()];
    document.getElementById("year").innerHTML = year.toString();

    // total days for selected month
    let totalDays = new Date(year, month + 1, 0).getDate();

    let calendar = "<table class='calendar-border'>";
    calendar += "<tr>";

    for (let i = 0; i < dayName.length; i++) {
        calendar += "<th class='monthday'>";
        calendar += dayName[i];
        calendar += "</th>"
    }
    calendar += "</tr>";

    // start week day of select month
    let tempDay = new Date(year, month).getDay();
    // current date
    let currentDate = date.getDate();
    // the start weekday
    let startDay = date.getDay();

    let eachWeekInfo = "<tr>";

    // generate empty block for to reach the start weekday
    while (startDay > 0) {
        eachWeekInfo += "<td class='monthdate'></td>";
        startDay--;
    }

    // generate calendar for the selected month
    while (currentDate <= totalDays) {
        if (tempDay > 6) {
            tempDay = 0;
            eachWeekInfo += "</tr><tr>"
        }

        eachWeekInfo += "<td class='monthdate'>" + currentDate + "</td>";

        tempDay++;
        currentDate++;
    }

    // the weekday of the last date of the selected month
    let currentDay = new Date(year, month, totalDays).getDay();
    // generate extra empty block to fill out the whole calendar
    while (currentDay < 6) {
        eachWeekInfo += "<td class='monthdate'></td>";
        currentDay++;
    }

    eachWeekInfo += "</tr>";

    calendar += eachWeekInfo;
    calendar += "</table>";

    document.getElementById("calendar").innerHTML = calendar;
}

function getNextMonth() {
    let month = getMonth();
    let year = getYear();

    if (month === 11) {
        year += 1;
        month = 0;
    } else {
        month += 1;
    }
    generateCalendar(year, month);
}

function getPreviousMonth() {
    let month = getMonth();
    let year = getYear();

    if (month === 0) {
        year -= 1;
        month = 11;
    } else {
        month -= 1;
    }
    generateCalendar(year, month);
}

function getMonth() {
    let month = document.getElementById("month").innerHTML;
    for (let i = 0; i < monthName.length; i++) {
        if (month === monthName[i]) {
            month = i;
            break;
        }
    }
    return month;
}

function getYear() {
    let year = document.getElementById("year").innerHTML;
    return parseInt(year);
}
