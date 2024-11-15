// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
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
const db = getDatabase();


document.addEventListener("DOMContentLoaded", function () {
  
  // Bagian SDG Favorit
    let sdgNumberInput = document.getElementById("sdg-number");
    let sdgWishInput = document.getElementById("sdg-wish");
    let sdgImage = document.getElementById("sdg-image");
    let sdgWishDisplay = document.getElementById("sdg-wish-display");
    let saveBtn = document.getElementById("save-fav-btn");
  
    saveBtn.addEventListener("click", function () {
      addFav();
    });
  
    function addFav() {
      let sdgNumber = sdgNumberInput.value;
      let sdgWish = sdgWishInput.value;
      let sdgImageSrc = `../assets/image/sdg${sdgNumber}.png`;
      let wishText = sdgWishInput.value;

      console.log("Saving SDG number:", sdgNumber);
      console.log("Saving SDG wish:", sdgWish);
  
      onAuthStateChanged(auth, (user) => {
        if (user) {
          set(ref(db, 'userSDG/' + user.uid), {
            sdgNumber: sdgNumber,
            sdgWish: sdgWish,
            sdgImage: sdgImageSrc,
            wishText: wishText
          // }).then(() => {
          //   alert("Data saved successfully!");
          }).catch((error) => {
            alert("Failed to save data: " + error.message);
          });
        } else {
          alert("No user is signed in.");
        }
      });
    }
  
    function loadFav() {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const userRef = ref(db, 'userSDG/' + user.uid);
            get(userRef).then((snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.val();
                // sdgNumberInput.value = data.sdgNumber;
                // sdgWishInput.value = data.sdgWish;
                sdgImage.src = data.sdgImage;
                sdgWishDisplay.textContent = data.wishText;
                sdgImage.style.display = 'block';
                sdgWishDisplay.style.display = 'block';
              } 
              // else {
              //   alert("No data available");
              // }
            }).catch((error) => {
              alert("Failed to load data: " + error.message);
            });
          } 
          // else {
          //   alert("No user is signed in.");
          // }
        });
      }    
    loadFav();
  });

// 
let draggedItem = null;