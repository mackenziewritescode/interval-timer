$(document).ready(function () {
  let initialTime1 = 25;
  let remainingTime = initialTime1 * 60;
  let interval;
  let running = false;

  $("#timer1-val").html(initialTime1);

  $("#display").html(formatTime(initialTime1 * 60));

  function setTimer(timer, direction) {
    if (!running) {
      if (timer === "timer1") {
        if (direction === "up") {
          if (initialTime1 < 60) {
            initialTime1 += 1;
          }
        } else if (direction === "down") {
          if (initialTime1 > 1) {
            initialTime1 -= 1;
          }
        }
      }
      if (timer === "timer2") {
        if (direction === "up") {
          if (initialTime2 < 60) {
            initialTime2 += 1;
          }
        } else if (direction === "down") {
          if (initialTime2 > 1) {
            initialTime2 -= 1;
          }
        }
      }
      remainingTime = initialTime1 * 60;
      $("#timer1-val").html(initialTime1);
      $("#display").html(formatTime(initialTime1 * 60));
    }
  }

  function updateTime() {
    if (remainingTime > 0) {
      remainingTime = remainingTime - 1;
      $("#display").html(formatTime(remainingTime));
      console.log(remainingTime);
    } else {
      remainingTime = 0;
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

  $("#reset-btn").click(function () {
    initialTime1 = 25;
    remainingTime = initialTime1 * 60;
    $("#display").html(formatTime(initialTime1 * 60));
    $("#timer1-val").html(initialTime1);
  });

  $("#start-btn").click(function () {
    startStop();
  });
});
