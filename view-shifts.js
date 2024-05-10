import {
    getFirestore,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const db = getFirestore();

async function getShiftsFromFirestore(userId) {
    try {
        
        const shiftsCollection = collection(db, "shifts");
        const q = query(shiftsCollection, where("UserId", "==", userId));
        const querySnapshot = await getDocs(q);

       
        const shifts = querySnapshot.docs.map(doc => doc.data());
        return shifts;
    } catch (error) {
        console.error("Error getting shifts from Firestore:", error);
        return [];
    }
}

async function updateTable() {
    // אחזור מזהה המשתמש הנוכחי מתוך LocalStorage
    const currentUserEmail = localStorage.getItem('currentUser');
    const userId = await getUserIdByEmail(currentUserEmail); // פונקציה למציאת המזהה לפי האימייל
    if (!userId) {
        console.error("User not found.");
        return;
    }

   
    const shifts = await getShiftsFromFirestore(userId);

  
    const tbody = document.querySelector('.shifts-table tbody');
    tbody.innerHTML = '';

    let totalWages = 0;
    shifts.forEach(shift => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${shift.date}</td>
            <td>${shift.startTime}</td>
            <td>${shift.endTime}</td>
            <td>${shift.hourlyWage}</td>
            <td>${shift.role}</td>
            <td>${shift.branch}</td>
            <td>${shift.totalWage.toFixed(2)}</td>
        `;
        totalWages += shift.totalWage;
    });

    const totalRow = tbody.insertRow();
    totalRow.innerHTML = `<td colspan="6">סה"כ שכר</td><td>${totalWages.toFixed(2)}</td>`;
}

async function getUserIdByEmail(email) {
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].id;
        } else {
            console.log(`No user found for email: ${email}`);
            return null;
        }
    } catch (error) {
        console.error("Error getting user ID:", error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateTable(); // 
});
document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = 'dashboard.html';
});
