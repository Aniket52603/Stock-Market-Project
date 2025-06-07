// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLtp6obCCO3S8TTgF3dgIV-jxndXJaf10",
    authDomain: "stock-login-cacd4.firebaseapp.com",
    projectId: "stock-login-cacd4",
    storageBucket: "stock-login-cacd4.firebasestorage.app",
    messagingSenderId: "1042830979908",
    appId: "1:1042830979908:web:25e74c5e14729668a95d11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// Select elements
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const profileBtn = document.getElementById("profile-btn"); // New profile button
const message = document.getElementById("message");
const profileIcon = document.getElementById("profile-icon");

// Function to update UI based on user login state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        signupBtn.style.display = "none";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block"; // Show logout button
        profileBtn.style.display = "block"; // Show profile button

        // Show profile icon (You can replace src with user's profile picture)
        profileIcon.style.display = "block";
        profileIcon.src = "default-profile1.png"; // Use user's profile picture or a default one
    } else {
        // User is logged out
        signupBtn.style.display = "block";
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none"; // Hide logout button
        profileBtn.style.display = "none"; // Hide profile button
        profileIcon.style.display = "none"; // Hide profile icon
    }
});

// Sign Up Function
signupBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            message.innerText = "Signup successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        })
        .catch((error) => {
            message.innerText = error.message;
        });
});

// Login Function
loginBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            message.innerText = "Login successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "index.html";
            }, 0);
        })
        .catch((error) => {
            message.innerText = error.message;
        });
});

// Logout Function
logoutBtn.addEventListener("click", function () {
    signOut(auth)
        .then(() => {
            message.innerText = "Logged out successfully!";
        })
        .catch((error) => {
            message.innerText = error.message;
        });
});

// Profile Button Functionality
profileBtn.addEventListener("click", function () {
    // Redirect to profile page or show a dropdown menu
    window.location.href = "profile.html"; // Replace with your profile page URL
});
