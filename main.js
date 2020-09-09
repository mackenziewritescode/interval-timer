$(document).ready(function () {
  let defaultTime1 = 0.1;
  let defaultTime2 = 1;
  let time1 = defaultTime1;
  let time2 = defaultTime2;
  let minutes = time1;
  let remainingSeconds = minutes * 60;
  let interval;
  let running = false;
  let currentTimer1 = true;

  $("#timer1-val").html(time1);
  $("#timer2-val").html(time2);

  $("#display").html(formatTime(minutes * 60));

  function setTimer(timer, direction) {
    if (!running) {
      if (timer === "timer1") {
        if (direction === "up") {
          if (minutes < 60) {
            minutes += 1;
          }
        } else if (direction === "down") {
          if (minutes > 1) {
            minutes -= 1;
          }
        }
      }
      if (timer === "timer2") {
        if (direction === "up") {
          if (time2 < 60) {
            time2 += 1;
          }
        } else if (direction === "down") {
          if (time2 > 1) {
            time2 -= 1;
          }
        }
      }
      remainingSeconds = minutes * 60;
      $("#timer1-val").html(minutes);
      $("#timer2-val").html(time2);
      $("#display").html(formatTime(minutes * 60));
    }
  }

  function updateTime() {
    if (remainingSeconds > 0) {
      remainingSeconds = remainingSeconds - 1;
      $("#display").html(formatTime(remainingSeconds));
      console.log(remainingSeconds);
    } else {
      if (currentTimer1) {
        currentTimer1 = !currentTimer1;
        minutes = time2;
        remainingSeconds = time2 * 60 + 1;
        updateTime();
      } else {
        currentTimer1 = !currentTimer1;
        minutes = time1;
        remainingSeconds = time1 * 60 + 1;
        updateTime();
      }
    }
  }

  function startStop() {
    if (running) {
      clearInterval(interval);
      interval = null;
      running = false;
    } else {
      interval = setInterval(updateTime, 1000);
      running = true;
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
    time1 = defaultTime1;
    time2 = defaultTime2;
    minutes = time1;
    remainingSeconds = minutes * 60;
    $("#display").html(formatTime(minutes * 60));
    $("#timer1-val").html(minutes);
  });

  $("#start-btn").click(function () {
    startStop();
  });
});
