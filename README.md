
# JavaScript Interval Timer

A simple interval timer app. Check it out [here](https://www.sunkenworld.com/interval-timer).

This app was written as an exercise in vanilla JavaScript. Ironically I ended up using some jQuery, but that was mostly just to reduce the clutter of having to write "document.getElementById..." and "addEventListener..." dozens of times. You know how it is.

This basic timer is made a bit more complex through the introduction of a second timer. The main timing functionality uses JavaScript's `setInterval()` method to run a function that updates the time every second, and clears the interval upon pausing. The time displayed is derived from the variable `secondsRemaining`, which is initially set to be the value of Timer 1, `timer1`. Most of the time, this function simply runs
```
remainingSeconds = remainingSeconds - 1;
$("#display").html(formatTime(remainingSeconds));  // updates the display with the current time remaining
```
But when the timer reaches zero, there are a few possibilities that need to be taken into consideration. The variable `currentTimer1` is checked to see if `timer1` is the current timer running, and then `loop` is checked to see if the timers should repeat. There are three possibilities:

Case 1: Timer 1 was the timer that was running and just finished. In this case, `remainingSeconds` is set to the value of Timer 2, `timer2`, which then counts down.

Case 2: Timer 2 was running and Loop is on. This is simply the reverse of Case 1, and `remainingSeconds` is set to `timer1`.

Case 3: Timer 2 was running and Loop is off. Here, the timer must stop, the interval is cleared and `remainingSeconds` is reset to `time1`.

In each case, audio plays to signal the end of the timer. All of this code looks like this:
```
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
        $("#reset-btn, #timer1-incr, #timer1-decr, #timer2-incr, #timer2-decr").removeClass("no-click");
        remainingSeconds = time1 * 60;
      }
      // play audio
      audio.play();
      currentTimer1 = !currentTimer1;
```

Let's look at one more function of particular interest: Setting the time on the timers. This wouldn't normally be too complicated, but since the app will update the displayed time depending on which timer is being adjusted, we need to know which timer is running. To do this, we pass the variable `timer` to the function, and depending on which button is pressed, it will be set to either `timer1` or `timer2`. Of course we also need to know whether we want to increment or decrement the value, so we pass another variable `direction`. To see if the timer that's running is the same timer that's being adjusted, we check
```
if (currentTimer1 && timer === "timer1")
```
and 
```
else if (!currentTimer1 && timer === "timer2")
```
If neither of these conditions are met, then we don't need to update the display. Otherwise, we do. The whole function looks like this:
```
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
```

***

There is, of course, lots more going on, but this was just a look at the slightly more complex aspects. If you want to see the rest of the code, please do have a look at `index.html`, `main.js`, and `style.scss`. 

Check out my portfolio at https://www.sunkenworld.com/ if you want to see more of my work. Thanks for reading!

***

(The icons were downloaded from www.flaticons.com from the user Freepik under the Flaticon License.)
