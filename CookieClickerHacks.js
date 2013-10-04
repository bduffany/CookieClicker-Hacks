/**
 * This code written by Brandon Duffany, 2013, for use with 
 * http://orteil.dashnet.org/cookieclicker/
 */

// Paste this entire document into your browser's console
s = document.createElement("script"); 
s.src = "http://code.jquery.com/jquery-1.10.2.min.js"; 
document.getElementsByTagName('HEAD').item(0).appendChild(s);

/* Functional representation of a user-specified "hack" function
   func that runs (by default) every i_def milliseconds. */
function Interval(func, i_def) {
  this.interval = null;
  this.i_def = i_def || 10000;
  this.func = func || null;
}

Interval.prototype = {
  // Start the interval (or restart it), optionally with period i
  start: function(i) {
    i = i || this.i_def;
    this.stop();
    this.interval = setInterval(this.func, i);
  },
  // Stop the interval (it can still be restarted)
  stop: function() { 
    this.interval && clearInterval(this.interval); 
  }
}

// Autoclicker. Clicks the big cookie every millisecond by default.
var ac = new Interval($('#bigCookie').onclick, 1);

/* Golden Cookie spawner & clicker. Spawn golden cookies
   every 2000 ms by default. */
var gc = new Interval(
  function() {
    Game.goldenCookie.spawn();
    setTimeout(function() {$('#goldenCookie').click()}, 2000);
  }
);

// Upgrade clicker. Clicks random upgrades. Definitely not the best strategy.
var uc = new Interval(
  function() {
    var prod = $('#product' + Math.floor(Math.random() * 10));
    if (prod.hasClass('enabled')) {
      prod.click();
    }
  },
  100
);