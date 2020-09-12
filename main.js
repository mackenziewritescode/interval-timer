$(document).ready(function () {
  let defaultTime1 = 10;
  let defaultTime2 = 5;
  let time1 = defaultTime1;
  let time2 = defaultTime2;
  let remainingSeconds = time1 * 60;
  let interval;
  let running = false;
  let currentTimer1 = true;
  let loop = true;
  let audio = new Audio("audio/alarm.wav");

  // Set displayed values
  $("#timer1-val").html(time1);
  $("#timer2-val").html(time2);
  $("#display").html(formatTime(time1 * 60));

  function setTimer(timer, direction) {
    if (!running) {
      if (timer === "timer1") {
        if (direction === "up") {
          if (time1 < 60) {
            time1 += 1;
          }
        } else if (direction === "down") {
          if (time1 > 1) {
            time1 -= 1;
          }
        }
      }
      if (timer === "timer2") {
        if (direction === "up") {
          if (time2 < 60) {
            time2 += 1;
          }
        } else if (direction === "down") {
          if (time2 > 0) {
            time2 -= 1;
          }
        }
      }
      // if the current timer is timer1, setting timer1 will reset the running time on display and vice versa
      if (currentTimer1 && timer === "timer1") {
        remainingSeconds = time1 * 60;
        $("#display").html(formatTime(time1 * 60));
      } else if (!currentTimer1 && timer === "timer2") {
        remainingSeconds = time2 * 60;
        $("#display").html(formatTime(time2 * 60));
      }
      // setting the time on the timers
      $("#timer1-val").html(time1);
      $("#timer2-val").html(time2);
    }
  }

  function updateTime() {
    if (remainingSeconds > 0) {
      remainingSeconds = remainingSeconds - 1;
      $("#display").html(formatTime(remainingSeconds));
      console.log(remainingSeconds);
    } else {
      if (currentTimer1) {
        //if timer1 and loop on or off
        remainingSeconds = time2 * 60 + 1;
        updateTime();
      } else if (loop) {
        // if timer2 and loop on
        remainingSeconds = time1 * 60 + 1;
        updateTime();
      } else {
        // if timer2 and loop off
        clearInterval(interval);
        interval = null;
        running = false;
        $("#play-img").attr("src", "icons/play.svg");
        $(
          "#reset-btn, #timer1-incr, #timer1-decr, #timer2-incr, #timer2-decr"
        ).removeClass("no-click");
        remainingSeconds = time1 * 60;
      }
      // play audio
      audio.play();
      currentTimer1 = !currentTimer1;
    }
  }

  function formatTime(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60).toString();
    let seconds = (timeInSeconds % 60).toString();

    while (minutes.length < 2) {
      minutes = "0".concat(minutes);
    }
    while (seconds.length < 2) {
      seconds = "0".concat(seconds);
    }
    return minutes + ":" + seconds;
  }

  function startStop() {
    if (running) {
      clearInterval(interval);
      interval = null;
      running = false;
      $("#play-img").attr("src", "icons/play.svg");
      $(
        "#reset-btn, #timer1-incr, #timer1-decr, #timer2-incr, #timer2-decr"
      ).removeClass("no-click");
    } else {
      interval = setInterval(updateTime, 1000);
      running = true;
      $("#play-img").attr("src", "icons/pause.svg");
      $(
        "#reset-btn, #timer1-incr, #timer1-decr, #timer2-incr, #timer2-decr"
      ).addClass("no-click");
    }
    audio.pause();
    audio.currentTime = 0;
  }

  function setLoop() {
    if (loop) {
      $("#loop-img").attr("src", "icons/loop-off.svg");
      loop = false;
    } else {
      $("#loop-img").attr("src", "icons/loop.svg");
      loop = true;
    }
  }

  function setReset() {
    if (!running) {
      time1 = defaultTime1;
      time2 = defaultTime2;
      remainingSeconds = time1 * 60;
      $("#display").html(formatTime(time1 * 60));
      $("#timer1-val").html(time1);
      $("#timer2-val").html(time2);
    }
  }

  $("#timer1-incr").click(function () {
    setTimer("timer1", "up");
  });
  $("#timer1-decr").click(function () {
    setTimer("timer1", "down");
  });

  $("#timer2-incr").click(function () {
    setTimer("timer2", "up");
  });
  $("#timer2-decr").click(function () {
    setTimer("timer2", "down");
  });

  $("#reset-btn").click(function () {
    setReset();
  });

  $("#start-btn").click(function () {
    startStop();
  });

  $("#loop-btn").click(function () {
    setLoop();
  });
});
