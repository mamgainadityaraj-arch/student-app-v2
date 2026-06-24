/* =========================
   NAVIGATION
========================= */

function openSection(id) {
    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

function goHome() {
    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active");
    });

    document.getElementById("homeScreen").classList.add("active");
}

/* =========================
   STORAGE
========================= */

let homework = [];
let exams = [];
let marks = [];
let goals = [];
let reminders = [];

let streak = Number(localStorage.getItem("streak")) || 0;
let bestStreak = Number(localStorage.getItem("bestStreak")) || 0;
let lastDate = localStorage.getItem("lastDate") || "";

/* =========================
   HOMEWORK
========================= */

function addHomework() {
    alert("Homework added (logic can be expanded later)");
}

/* =========================
   EXAMS
========================= */

function addExam() {
    alert("Exam added");
}

/* =========================
   MARKS + GRAPH
========================= */

let chart = null;

function addMarks() {
    const inputs = document.querySelectorAll("#marks input");

    let subject = inputs[0].value;
    let marksVal = Number(inputs[1].value);
    let total = Number(inputs[2].value);

    marks.push({ subject, marksVal, total });

    updateGraph();

    alert("Marks added");
}

function updateGraph() {
    const ctx = document.getElementById("marksChart");

    if (!ctx) return;

    let labels = marks.map(m => m.subject);
    let data = marks.map(m => (m.marksVal / m.total) * 100);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Performance %",
                data: data,
                borderColor: "#4f46e5",
                tension: 0.3
            }]
        }
    });
}

/* =========================
   GOALS
========================= */

function addGoal() {
    alert("Goal added");
}

/* =========================
   REMINDERS
========================= */

function addReminder() {
    alert("Reminder saved (notification system later upgrade)");
}

/* =========================
   STREAK SYSTEM
========================= */

function markStudy() {
    let today = new Date().toDateString();

    if (lastDate !== today) {
        streak++;
        lastDate = today;

        if (streak > bestStreak) bestStreak = streak;

        localStorage.setItem("streak", streak);
        localStorage.setItem("bestStreak", bestStreak);
        localStorage.setItem("lastDate", lastDate);

        document.getElementById("streak").innerText = streak;
        document.getElementById("bestStreak").innerText = bestStreak;

        alert("Streak updated 🔥");
    } else {
        alert("Already marked today");
    }
}

/* =========================
   INIT
========================= */

window.onload = function () {
    document.getElementById("streak").innerText = streak;
    document.getElementById("bestStreak").innerText = bestStreak;
};