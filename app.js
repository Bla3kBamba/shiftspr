let emailInputLogin = document.querySelector('.email-input-login');
let passlInputLogin = document.querySelector('.password-input-login');
let buttonLogin = document.querySelector('.save-login');
let buttonRegi = document.querySelector('.Back-to-register');

function loginTosystem() {

    

    let userEmail = emailInputLogin.value;
    let userPass = passlInputLogin.value;
    let storedUser = localStorage.getItem(userEmail);

    if (storedUser) {
        storedUser = JSON.parse(storedUser);
        if (userPass === storedUser.password) {
            localStorage.setItem('currentUser', userEmail); 
            localStorage.setItem('userName', storedUser.userName); 
            alert("Welcome to the system! :)");
            window.location.href = 'dashbo';
        } else {
            alert("You Have an error! :(");
        }
    } else {
        alert("User not found! Please register.");
    }
}
function go_back() {
    window.location.href = 'http://127.0.0.1:5500/regipage.html';
}

buttonLogin.addEventListener('click', loginTosystem);
buttonRegi.addEventListener('click', go_back);
