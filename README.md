
# Javascript Interval Timer

Check it out [here](https://mackenziewritescode.github.io/interval-timer/).

This app was written as an exercise in vanilla Javascript. Ironically I ended up using some jQuery, but that was mostly just to reduce clutter from having to write "document.getElementById..." and "addEventListener..." dozens of times. You know how it is.

This simple timer app is made a bit more complex through the introduction of a second timer. The main timing functionality uses Javascript's `setInterval()` method to run a function named  `updateTime()` every second, and clears the interval upon pausing. The time displayed is derived from the variable `secondsRemaining`, which is initially set to be the value of Timer 1, `timer1`. Most of the time, this function simply runs
```
remainingSeconds = remainingSeconds - 1;
$("#display").html(formatTime(remainingSeconds));  // updates the display with the current time remaining
```
But when the timer reaches zero, there are a few possibilities that need to be taken into consideration. 

Case 1: Timer 1 is was running. In this case, `remainingSeconds` is set to the value of Timer 2, `timer2`.

Case 2: Timer 2 was running and Loop is on. This is simply the reverse of Case 1, and `remainingSeconds` is set to `timer1`.

Case 3: Timer 2 was running and Loop is off. Here, the timer must stop, the interval cleared and be reset to the initial time `time1`.

In all of the cases, audio plays to signal the end of the timer. All of this code looks like this:
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
The variable `currentTimer1` is checks to see if `timer1` is the current timer running.

Let's look at one more funciton of particular interest: Setting the time on the timers. This wouldn't be too complicated, but 


(The icons were downloaded from www.flaticons.com from the user Freepik under the Flaticon License.)
