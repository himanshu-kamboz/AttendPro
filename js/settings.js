import { updateTimeDate } from js/dashboard.js;

let logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
});
