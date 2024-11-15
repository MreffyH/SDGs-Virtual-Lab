// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_B0j8hU5NXHLpH31K8aW1kanoEgIzqwc",
  authDomain: "sdg-virtual-lab-5b7d9.firebaseapp.com",
  projectId: "sdg-virtual-lab-5b7d9",
  storageBucket: "sdg-virtual-lab-5b7d9.firebasestorage.app",
  messagingSenderId: "972082215926",
  appId: "1:972082215926:web:55d997716d516f8b04e5d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    // Sign-out successful.
    window.location.href = "login.html";
  }).catch((error) => {
    // An error happened.
    alert(error.message);
  });
});