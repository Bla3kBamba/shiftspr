document.addEventListener('DOMContentLoaded', updateNavbar);
function updateNavbar() {
    let userName = localStorage.getItem("userName");

    if (userName) {
        document.getElementById("user-greeting").textContent = "hey, " + userName;
    } else {
        document.getElementById("user-greeting").textContent = "שלום אורח";
    }

    let logout = document.querySelector(".log-out");
    if (logout) {
        logout.addEventListener('click', handleLogout);
    }
}

function handleLogout() {
    localStorage.removeItem("userName"); 
    window.location.href = 'login.html'; 
}
