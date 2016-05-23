'use strict';
// Functions

function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(endtime){
  var days = document.getElementById("days");
  var hours = document.getElementById("hours");
  var minutes = document.getElementById("minutes");
  var seconds = document.getElementById("seconds");
  // Helper function
  function updateClock() {
    var t = getTimeRemaining(birthdayRaw);
    days.innerHTML = t.days;
    hours.innerHTML = ('0' + t.hours).slice(-2);
    minutes.innerHTML = ('0' + t.minutes).slice(-2);
    seconds.innerHTML = ('0' + t.seconds).slice(-2);
    if(t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  updateClock(); // run function once at first to avoid delay
  var timeinterval = setInterval(updateClock, 1000);
}

function refreshAt(hours, minutes, seconds) {
  var now = new Date();
  var then = new Date();

  if(now.getHours() > hours ||
     (now.getHours() == hours && now.getMinutes() > minutes) ||
      now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
      then.setDate(now.getDate() + 1);
  }
  then.setHours(hours);
  then.setMinutes(minutes);
  then.setSeconds(seconds);

  var timeout = (then.getTime() - now.getTime());
  // console.log("Setting alarm for ~" + Math.floor( (timeout/1000/60) % 60 ) + " minutes");
  setTimeout(function() { window.location.reload(true); }, timeout);
}

/******** Logic *********/

var now = new Date();
var currentYear = now.getFullYear();

var birthdayRaw = 'April 30' + ' ' + currentYear + ' ' + '23:59:59 GMT+05:30';
var birthday = Date.parse(birthdayRaw);

// If it's the birthday, don't show countdown, else show it
if (now.getDate() == 1 && now.getMonth() + 1 == 5) {
  // BIRTHDAY! :D
  var ans = document.getElementsById("ans");
  ans.innerHTML = "Yes! It's his birthday! Go wish him!";

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
