$(document).ready(function () {
  let initialTime1 = 10;
  let remainingTime = initialTime1;
  let interval;

  // function setInitialTime(data)

  function Timer() {
    this.running = false;

    function updateTime() {
      if (remainingTime > 0) {
        remainingTime = remainingTime - 1;
        console.log(remainingTime);
      } else {
        remainingTime = 0;
      }
    }

    this.startStop = function () {
      if (this.running) {
        clearInterval(interval);
        interval = null;
        this.running = false;
      } else {
        interval = setInterval(updateTime, 1000);
        this.running = true;
      }
    };

    this.reset = function () {
      remainingTime = initialTime1;
    };
  }

  $("#timer1").drum({
    min: 1,
    max: 60,
    value: 25,
    change: function (event, data) {
      initialTime1 = data.value * 60;
      console.log(initialTime1);
    },
  });

  $("#timer2").drum({
    min: 1,
    max: 60,
    value: 5,
  });

  let timer = new Timer();

  $("#start-btn").click(function () {
    timer.startStop();
  });
});
