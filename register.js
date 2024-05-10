import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// הגדרות Firebase האישי שלך
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// פונקציה להוספת משמרות
async function addNewShift(userId, branch, startTime, endTime, hourlyWage, role) {
    try {
        // חישוב השכר הכולל
        const start = new Date('1970-01-01T' + startTime + 'Z');
        const end = new Date('1970-01-01T' + endTime + 'Z');
        const diff = (end - start) / (1000 * 60 * 60); // משך המשמרת בשעות
        const totalWage = diff * hourlyWage;

        
        await addDoc(collection(db, 'shifts'), {
            userId,
            branch,
            startTime,
            endTime,
            hourlyWage,
            role,
            totalWage
        });

        alert('המשמרת נוספה בהצלחה!');
    } catch (error) {
        console.error('Error adding shift:', error);
        alert('שגיאה בהוספת המשמרת.');
    }
}