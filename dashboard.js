document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName') || 'אורח';
    const userGreetingElement = document.getElementById('user-greeting');
    if (userGreetingElement) {
        userGreetingElement.textContent = `שלום, ${userName}`;
    }

    
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('userName');
            window.location.href = 'login.html';
        });
    }

   
    const helpButton = document.getElementById('help-icon');
    if (helpButton) {
        helpButton.addEventListener('click', () => {
            window.location.href = 'help.html';
        });
    }
    document.getElementById('add-shift').addEventListener('click', function() {
        window.location.href = 'addtable.html';
    });
    document.getElementById('edit-profile').addEventListener('click', function() {
        window.location.href = 'profile.html';
    });
    document.getElementById('view-shifts').addEventListener('click', function() {
        window.location.href = 'view-shifts.html';
    });

    
    updateMetrics();
});

async function updateMetrics() {
    const shiftsCollection = await firebase.firestore().collection('shifts').get();
    const shifts = shiftsCollection.docs.map(doc => doc.data());
    
    const totalHourlyWages = shifts.reduce((total, shift) => total + shift.hourlyWage, 0);
    const averageHourlyWage = totalHourlyWages / shifts.length;

    const totalShiftWages = shifts.reduce((total, shift) => total + shift.shiftWage, 0);
    const averageShiftWage = totalShiftWages / shifts.length;

    const branchesCount = {};
    shifts.forEach(shift => {
        branchesCount[shift.branch] = (branchesCount[shift.branch] || 0) + 1;
    });
    const mostWorkedBranch = Object.keys(branchesCount).reduce((a, b) => branchesCount[a] > branchesCount[b] ? a : b);

    const rolesWages = {};
    shifts.forEach(shift => {
        rolesWages[shift.role] = (rolesWages[shift.role] || 0) + shift.shiftWage;
    });
    const highestPayingRole = Object.keys(rolesWages).reduce((a, b) => rolesWages[a] > rolesWages[b] ? a : b);

    document.getElementById('average-hourly-wage').textContent = `שכר שעתי ממוצע: ${averageHourlyWage.toFixed(2)}`;
    document.getElementById('average-shift-wage').textContent = `שכר משמרת ממוצע: ${averageShiftWage.toFixed(2)}`;
    document.getElementById('most-worked-branch').textContent = `הסניף הכי פעיל: ${mostWorkedBranch}`;
    document.getElementById('highest-paying-role').textContent = `התפקיד הכי משתלם: ${highestPayingRole}`;

    setTimeout(updateMetrics, 60000);
}
