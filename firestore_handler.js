// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCjbbnlCLXE8FXQHkZM-8h4hSvp0Ra6ijI",
    authDomain: "shiftswork-99de1.firebaseapp.com",
    projectId: "shiftswork-99de1",
    storageBucket: "shiftswork-99de1.appspot.com",
    messagingSenderId: "758620038197",
    appId: "1:758620038197:web:92620342c72624b5cebd7c",
    measurementId: "G-RJ0YD87T87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


// await setDoc(doc(db, "users", "ABC"), {
//     "age": "Los Angeles",
//     "email": "CA",
//     "first name": "USA",
//     "last name": "asdasd",
//     "user name": "asdasdasdasd"
// });
    

async function addNewUser(age, email, firstName, lastName, userName){
    const docRef = await addDoc(collection(db, "users"), {
        "age": age,
        "email": email,
        "first name": firstName,
        "last name": lastName,
        "user name": userName
    });
    console.log("Document written with ID: ", docRef.id);
}




