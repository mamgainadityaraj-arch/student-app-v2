/* =========================
   SCREEN NAVIGATION
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
   DATA STORAGE
========================= */

let homework = JSON.parse(localStorage.getItem("homework")) || [];
let exams = JSON.parse(localStorage.getItem("exams")) || [];
let marks = JSON.parse(localStorage.getItem("marks")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || [];
let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

/* =========================
   HOMEWORK
========================= */

function addHomework() {
    const inputs = document.querySelectorAll("#homework input, #homework select");

    const data = {
        title: inputs[0].value,
        date: inputs[1].value,
        status: inputs[2].value
    };

    homework.push(data);
    localStorage.setItem("homework", JSON.stringify(homework));

    alert("Homework added");
}

/* =========================
   EXAMS
========================= */

function addExam() {
    const inputs = document.querySelectorAll("#exams input");

    const data = {
        name: inputs[0].value,
        date: inputs[1].value
    };

    exams.push(data);
    localStorage.setItem("exams", JSON.stringify(exams));

    alert("Exam added");
}

/* =========================
   MARKS + GRAPH
========================= */

function addMarks() {
    const inputs = document.querySelectorAll("#marks input");

    const data = {
        subject: inputs[0].value,
        marks: Number(inputs[1].value),
        total: Number(inputs[2].value)
    };

    marks.push(data);
    localStorage.setItem("marks", JSON.stringify(marks));

    updateGraph();

    alert("Marks added");
}

/* GRAPH */
function updateGraph() {
    const ctx = document.getElementById("marksChart");

    if (!ctx) return;

    const labels = marks.map(m => m.subject);
    const data = marks.map(m => (m.marks / m.total) * 100);

    new Chart(ctx, {
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
    const input = document.querySelector("#goals input");

    goals.push(input.value);
    localStorage.setItem("goals", JSON.stringify(goals));

    alert("Goal added");
}

/* =========================
   REMINDERS
========================= */

function addReminder() {
    const inputs = document.querySelectorAll("#reminders input");

    const data = {
        text: inputs[0].value,
        time: inputs[1].value
    };

    reminders.push(data);
    localStorage.setItem("reminders", JSON.stringify(reminders));

    alert("Reminder saved (no notification system yet)");
}

/* =========================
   STREAK SYSTEM (simple)
========================= */

let streak = Number(localStorage.getItem("streak")) || 0;
let lastDate = localStorage.getItem("lastDate") || "";

function markStudy() {
    const today = new Date().toDateString();

    if (lastDate !== today) {
        streak++;
        localStorage.setItem("streak", streak);
        localStorage.setItem("lastDate", today);

        alert("Streak updated!");
    } else {
        alert("Already marked today");
    }
}

/* =========================
   INIT
========================= */

window.onload = function () {
    updateGraph();
};