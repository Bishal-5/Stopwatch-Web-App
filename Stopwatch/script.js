// Get references to HTML elements
const stopwatch_meter = document.getElementById("stopwatch_meter"), // Display area for stopwatch
    start = document.getElementById("start-btn"), // Start button
    pause = document.getElementById("pause-btn"), // Pause button
    reset = document.getElementById("reset-btn"), // Reset button
    lap = document.getElementById("lap-btn"); // Lap button
lapList = document.getElementById("lap_list"); // List to display lap records

// Initialize variables for time tracking
let hour = 0, minute = 0, second = 0, mili_sec = 0, timeInterval; // Variable to hold the interval reference for stopwatch updates

// Function to start the stopwatch
function startStopwatch() {
    timeInterval = setInterval(() => {
        mili_sec++;

        // Update seconds when milliseconds reach 100
        if (mili_sec == 100) {
            second++;
            mili_sec = 0;
        }

        // Update minutes when seconds reach 60
        if (second == 60) {
            minute++;
            second = 0;
        }

        // Update hours when minutes reach 60
        if (minute == 60) {
            hour++;
            minute = 0;
        }

        // Update the stopwatch display with formatted time
        stopwatch_meter.innerText = `${zeroPad(hour)}:${zeroPad(minute)}:${zeroPad(second)}:${zeroPad(mili_sec)}`;
    }, 10) // Update the stopwatch every 10 milliseconds

    // Adjust button states
    start.disabled = true; // Disable the start button while stopwatch is running
    pause.disabled = false; // Enable the pause button
    reset.disabled = false; // Enable the reset button
    lap.disabled = false; //Enable the lap button
};

// Function to format numbers to two digits (zero padding)
let zeroPad = (num) => {
    return String(num).padStart(2, "0");
};

// Function to pause the stopwatch
function pauseStopwatch() {
    pause.disabled = true; // Disable the pause button
    start.disabled = false; // Enable the start button
    lap.disabled = false; // Enable the lap button

    clearInterval(timeInterval) // Stop the stopwatch interval
};

// Function to record a lap time
let count = 0;
function recordLap() {
    count++; // Increment lap count
    // Create a new list item for lap time
    let create_lapList = document.createElement("li");
    create_lapList.innerText = `${zeroPad(hour)} : ${zeroPad(minute)} : ${zeroPad(second)} : ${zeroPad(mili_sec)}`; //Update the lap list's innet text
    // Append lap time to the lap list
    lapList.appendChild(create_lapList);
};

// Function to reset the stopwatch
function resetStopwatch() {
    lapList.innerText = "";  // Clear lap records display
    hour = minute = second = mili_sec = count = 0; // Reset all time variables and lap count
    clearInterval(timeInterval); // Stop the stopwatch interval
    stopwatch_meter.innerText = "00:00:00:00";  // Reset the stopwatch display

    // Adjust button states
    start.disabled = false; // Enable the start button
    pause.disabled = true; // Disable the pause button
    lap.disabled = true; // Disable the lap button
    reset.disabled = true; // Disable the reset button
};