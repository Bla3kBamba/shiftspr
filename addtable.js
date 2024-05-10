import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjbbnlCLXE8FXQHkZM-8h4hSvp0Ra6ijI",
  authDomain: "shiftswork-99de1.firebaseapp.com",
  projectId: "shiftswork-99de1",
  storageBucket: "shiftswork-99de1.appspot.com",
  messagingSenderId: "758620038197",
  appId: "1:758620038197:web:92620342c72624b5cebd7c",
  measurementId: "G-RJ0YD87T87"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function getUserRecord(userName) {
  try {
      const myCollection = collection(db, 'users');
      const q = query(myCollection, where('user name', '==', userName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          console.log(doc.id, '=>', doc.data());
          return doc.id; // החזרת מזהה המסמך
      } else {
          console.log("No record found for username:", userName);
      }
  } catch (error) {
      console.error("Error reading data:", error);
  }
}

async function addNewShift(userId, branch, endTime, hourlyWage, role, startTime) {
  if (!userId) {
      console.error("Invalid user ID.");
      return;
  }

  try {
      // שימוש ב-addDoc כדי ליצור מסמך חדש
      const docRef = await addDoc(collection(db, "shifts"), {
          "UserId": userId,
          "branch": branch,
          "endTime": endTime,
          "hourlyWage": hourlyWage,
          "role": role,
          "startTime": startTime
      });
      console.log("Document written with ID:", docRef.id);
  } catch (error) {
      console.error("Failed to write document:", error);
  }
}

document.querySelector('.shift-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  let date = document.querySelector('.date').value;
  let startTime = document.querySelector('.start-time').value;
  let endTime = document.querySelector('.end-time').value;
  let hourlyWage = parseFloat(document.querySelector('.hourly-wage').value);
  let role = document.querySelector('.role').value;
  let branch = document.querySelector('.branch').value;

  if (!date || !startTime || !endTime || isNaN(hourlyWage) || !role || !branch) {
      alert('אנא מלא את כל השדות.');
      return;
  } else {
      alert('הפרטים נקלטו במערכת');
  }

  let start = new Date('1970-01-01T' + startTime + 'Z');
  let end = new Date('1970-01-01T' + endTime + 'Z');
  let diff = (end - start) / (1000 * 60 * 60);
  let totalWage = diff * hourlyWage;

  let currentUserEmail = localStorage.getItem('currentUser');
  let shifts = JSON.parse(localStorage.getItem(currentUserEmail + '-shifts')) || [];
  shifts.push({
      date,
      startTime,
      endTime,
      hourlyWage,
      role,
      branch,
      totalWage
  });

  let curUser = localStorage.getItem('userName');
  let userId = await getUserRecord(curUser); // וודא המתנה לתוצאה
  await addNewShift(userId, branch, endTime, hourlyWage, role, startTime);

  localStorage.setItem(currentUserEmail + '-shifts', JSON.stringify(shifts));
});
