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

function initializeClock(id, endtime){
  var clock = document.getElementById(id);
  // Helper function
  function updateClock() {
    var t = getTimeRemaining(birthdayRaw);
    clock.innerHTML = t.days + ' day(s) | ' +
                      ('0' + t.hours).slice(-2) + ' hour(s) | ' +
                      ('0' + t.minutes).slice(-2) + ' minute(s) | ' +
                      ('0' + t.seconds).slice(-2) + ' sec(s)';
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
  console.log("Setting alarm for ~" + Math.floor( (timeout/1000/60) % 60 ) + " minutes");
  setTimeout(function() { window.location.reload(true); }, timeout);
}

/******** Logic *********/

// Constants
var BIRTHDAY_MONTH = "5";
var BIRTHDAY_MONTH_STR = "May";
var BIRTHDAY_DAY = "22";

var now = new Date();
var currentYear = now.getFullYear();

var birthdayRaw = BIRTHDAY_MONTH_STR + ' ' + BIRTHDAY_DAY + ' ' + currentYear + ' ' + '23:59:59 GMT+05:30';
var birthday = Date.parse(birthdayRaw);

// If it's the birthday, don't show countdown, else show it
if (now.getDate() == BIRTHDAY_DAY && now.getMonth() + 1 == BIRTHDAY_MONTH) {
  // BIRTHDAY!!!!!! :D
  var clock = document.getElementById("text");
  clock.innerHTML = "HAPPY BIRTHDAY!";

  // Need to set a refresh-alarm for when the clock strikes 00:00
  refreshAt(23, 59, 59) // Will refresh the page at 23:59:59
} else {
  // NO BIRTHDAY :(

  // Is the birthday done for this year?
  var nowParsed = Date.parse(now);
  if (birthday < nowParsed) {
    currentYear += 1;
    birthdayRaw = BIRTHDAY_MONTH_STR + ' ' + BIRTHDAY_DAY + ' ' + currentYear + ' ' + '23:59:59 GMT+05:30';
    birthday = Date.parse(birthdayRaw);
  }

  // init clock
  initializeClock('text', birthdayRaw);
}
