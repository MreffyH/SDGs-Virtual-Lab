// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_B0j8hU5NXHLpH31K8aW1kanoEgIzqwc",
    authDomain: "sdg-virtual-lab-5b7d9.firebaseapp.com",
    databaseURL: "https://sdg-virtual-lab-5b7d9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sdg-virtual-lab-5b7d9",
    storageBucket: "sdg-virtual-lab-5b7d9.firebasestorage.app",
    messagingSenderId: "972082215926",
    appId: "1:972082215926:web:55d997716d516f8b04e5d7"
};

// Initialize Firebase
if (!getApps().length) {
    initializeApp(firebaseConfig);
}
const auth = getAuth();


// Ambil elemen-elemen menu yang akan disembunyikan atau ditampilkan
const loginRegisterItems = document.querySelectorAll('.login-register');
const logoutItem = document.querySelector('.logout');


onAuthStateChanged(auth, (user) => {
    if (user) {
        // Pengguna sedang login
        console.log("User ID:", user.uid);
        console.log("User Email:", user.email);
        console.log("User Display Name:", user.displayName);
        loginRegisterItems.forEach(item => {
            item.style.display = 'none';
        });
        logoutItem.style.display = 'block';
    } else {
        // Tidak ada pengguna yang login
        console.log("No user is signed in.");
        loginRegisterItems.forEach(item => {
            item.style.display = 'block';
        });
        logoutItem.style.display = 'none';
    }
});