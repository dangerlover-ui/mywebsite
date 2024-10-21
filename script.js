// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuWqK0Qoetp5pK_V1MAi7fA6Hg39GJk60",
    authDomain: "myfirebaseproject-1b442.firebaseapp.com",
    projectId: "myfirebaseproject-1b442",
    storageBucket: "myfirebaseproject-1b442.appspot.com",
    messagingSenderId: "654947963649",
    appId: "1:654947963649:web:62f2d563f4d714ef8b4100",
    measurementId: "G-N5XW9JP2QL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Function to fetch users from Firestore
async function fetchUsers() {
    const userContainer = document.getElementById("user-container");
    userContainer.innerHTML = ""; // Clear previous users

    try {
        const usersCol = collection(db, 'users'); // Change 'users' to your collection name
        const userSnapshot = await getDocs(usersCol);
        userSnapshot.forEach(doc => {
            const userData = doc.data();
            const userElement = document.createElement("div");
            userElement.textContent = `Name: ${userData.name}, Email: ${userData.email}`;
            userContainer.appendChild(userElement);
        });
    } catch (error) {
        console.error("Error fetching users: ", error);
    }
}

// Event listener for the button
document.getElementById("fetch-users").addEventListener("click", function() {
    fetchUsers(); // Fetch users from Firestore on button click
});
