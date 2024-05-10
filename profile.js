document.addEventListener('DOMContentLoaded', function() {
    loadProfile();

    document.getElementById('save-profile').addEventListener('click', function() {
        saveProfile();
    });
});

function getCurrentUserEmail() {
    return localStorage.getItem("currentUserEmail");
}

function loadProfile() {
    let userEmail = getCurrentUserEmail();
    if (userEmail) {
        let userDetails = JSON.parse(localStorage.getItem(userEmail));

        if (userDetails) {
            document.getElementById('first-name').value = userDetails.firstName || '';
            document.getElementById('last-name').value = userDetails.lastName || '';
            document.getElementById('user-name').value = userDetails.userName || '';
            document.getElementById('email').value = userDetails.email || '';
            document.getElementById('age').value = userDetails.age || '';
        }
    }
}

function saveProfile() {
    let userEmail = getCurrentUserEmail();
    if (userEmail) {
        let userDetails = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            userName: document.getElementById('user-name').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value
        };

        localStorage.setItem(userEmail, JSON.stringify(userDetails));
        localStorage.setItem("userName", userDetails.userName);


        alert("הפרטים שלך עודכנו!");
    } else {
        alert("שגיאה: לא נמצא משתמש נוכחי.");
    }
}
