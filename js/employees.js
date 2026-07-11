import { updateTimeDate } from "./dashboard.js";

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
    });
}

updateTimeDate();
