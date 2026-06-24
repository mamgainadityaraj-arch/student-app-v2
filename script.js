/* NAVIGATION */
function openPage(page) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(page).classList.add("active");
}

function goHome() {
    openPage("home");
}

/* STORAGE */
let streak = Number(localStorage.getItem("streak")) || 0;
let best = Number(localStorage.getItem("best")) || 0;
let last = localStorage.getItem("last") || "";

/* HOMEWORK */
function addHomework() {
    alert("Homework added");
}

/* EXAMS */
function addExam() {
    alert("Exam added");
}

/* MARKS */
let chart;

function addMarks() {
    let subject = document.getElementById("subject").value;
    let m = Number(document.getElementById("marks").value);
    let t = Number(document.getElementById("total").value);

    alert("Marks added");

    updateGraph(subject, m, t);
}

function updateGraph(subject, m, t) {
    const ctx = document.getElementById("marksChart");

    if (!ctx) return;

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [subject],
            datasets: [{
                label: "Score %",
                data: [(m / t) * 100],
                backgroundColor: "#4f46e5"
            }]
        }
    });
}

/* GOALS */
function addGoal() {
    alert("Goal added");
}

/* REMINDERS */
function addReminder() {
    alert("Reminder saved (notifications later)");
}

/* TIMETABLE */
function addTimetable() {
    alert("Timetable saved");
}

/* STREAK */
function markStudy() {
    let today = new Date().toDateString();

    if (last !== today) {
        streak++;
        last = today;

        if (streak > best) best = streak;

        localStorage.setItem("streak", streak);
        localStorage.setItem("best", best);
        localStorage.setItem("last", last);

        document.getElementById("streakCount").innerText = streak;
        document.getElementById("bestStreak").innerText = best;

        alert("Streak updated 🔥");
    } else {
        alert("Already done today");
    }
}

/* INIT */
window.onload = function () {
    document.getElementById("streakCount").innerText = streak;
    document.getElementById("bestStreak").innerText = best;
};

/* PWA */
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}