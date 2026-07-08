let loginBtn = document.getElementById("login-button");

loginBtn.addEventListener("click", function (e){
    e.preventDefault();
    login();
});

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;


    if (username === "admin" && password === "admin123") {

        localStorage.setItem("loggedIn", "true");

        window.location.href = "dashboard.html";

    } else {
        alert("Invalid username and password");
    }

}

