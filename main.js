$(document).ready(function () {
  let initialTime1 = 1500000;
  let remainingTime = initialTime1;
  let interval;
  let startTime;

  function Timer() {
    this.isOn = false;

    function updateTime() {
      let currentTime = Date.now();
      let elapsedTime = startTime - currentTime;
      StartTime = currentTime;

      remainingTime = remainingTime - elapsedTime;
      console.log(remainingTime);
    }

    this.startStop = function () {
      if (this.isOn) {
        clearInterval(interval);
        interval = null;
        this.isOn = false;
      } else {
        interval = setInterval(updateTime, 1000);
        startTime = Date.now();
        this.isOn = true;
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
      initialTime1 = data.value * 60000;
      console.log(initialTime1);
    },
  });

  $("#timer2").drum({
    min: 1,
    max: 60,
    value: 5,
  });

  // let go = new Timer();
  // go.startStop();
});
