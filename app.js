document.addEventListener("DOMContentLoaded", function() {
    let timer;
    let milliseconds = 0;
    let seconds = 0;
    let isRunning = false;

    const display = document.querySelector(".display");
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const resetBtn = document.getElementById("resetBtn");
    
    const audio1 = new Audio('assets/start.mp3'); 
    const audio2 = new Audio('assets/stop.mp3'); 
    const audio3 = new Audio('assets/reset.mp3'); 

    function startTimer() {
        isRunning = true;
        timer = setInterval(function() {
            milliseconds += 10;
            if (milliseconds === 1000) {
                seconds++;
                milliseconds = 0;
            }
            displayTime();
        }, 10);

        audio1.play();
        audio2.pause();
        audio3.pause();
    }

    function stopTimer() {
        isRunning = false;
        clearInterval(timer);
        audio1.pause();
        audio2.play();
        audio3.pause();
    }

    function resetTimer() {
        isRunning = false;
        milliseconds = 0;
        seconds = 0;
        displayTime();
        audio1.pause();
        audio2.pause();
        audio3.play();
        audio1.currentTime = 0;
        audio2.currentTime = 0;
        audio3.currentTime = 0;
    }

    function displayTime() {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        display.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(secs) + ":" + formatMilliseconds(milliseconds);
    }

    function formatTime(value) {
        return value < 10 ? "0" + value : value;
    }

    function formatMilliseconds(value) {
        return value < 10 ? "00" + value : (value < 100 ? "0" + value : value);
    }

    startBtn.addEventListener("click", function() {
        if (!isRunning) {
            startTimer();
        }
    });

    stopBtn.addEventListener("click", function() {
        if (isRunning) {
            stopTimer();
        }
    });

    resetBtn.addEventListener("click", function() {
        resetTimer();
    });

    resetTimer();
});
