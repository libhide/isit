'use strict';

var now = new Date();
var currentYear = now.getFullYear();

var birthdayRaw = 'April 30' + ' ' + currentYear + ' ' + '23:59:59 GMT+05:30';
var birthday = Date.parse(birthdayRaw);

// If it's the birthday, don't show countdown, else show it
if (now.getDate() == 1 && now.getMonth() + 1 == 5) {
  // BIRTHDAY! :D
  var ans = document.getElementById("ans");
  ans.innerHTML = "Yes, it's his birthday! Go wish him!!!";

  // Hide countdown
  document.getElementById("countdown").style.display = 'none';

  // Need to set a refresh-alarm for when the clock strikes 00:00
  refreshAt(23, 59, 59) // Will refresh the page at 23:59:59
} else {
  // NO BIRTHDAY :(

  // Is the birthday done for this year?
  var nowParsed = Date.parse(now);
  if (birthday < nowParsed) {
    currentYear += 1;
    birthdayRaw = 'April 30' + ' ' + currentYear + ' ' + '23:59:59 GMT+05:30';
    birthday = Date.parse(birthdayRaw);
  }

  // init clock
  initializeClock(birthdayRaw);
}
