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
    
    // Fungsi untuk menyimpan skor ke Firebase
    function saveScore() {
      onAuthStateChanged(auth, (user) => {
          if (user) {
              const userRef = ref(db, 'userScores/' + user.uid);
              set(userRef, {
                  score: score,
                  totalQuestions: quizData.length,
                  completedAt: new Date().toISOString()
              }).then(() => {
                  console.log('Score saved successfully!');
                  loadPreviousScore(); // Update the displayed score after saving
                  updateScore(); // Memperbarui skor setelah kuis selesai
              }).catch((error) => {
                  console.error('Error saving score:', error);
              });
          } else {
              console.error("No user is logged in!");
          }
      });
    }
  

    // Variabel global untuk soal kuis dan skor
    let currentQuestionIndex = 0;
    let score = 0;
    let totalQuestions = 10; // Total soal kuis

    const quizData = [
      { question: '1. Tahun berapa Sustainable Development Goals (SDGs) mulai diadopsi PBB?', options: ['2015', '2016', '2014', '2013'], correct: 'A' },
      { question: '2. Apa tujuan pertama dalam SDGs?', options: ['Mengakhiri Kemiskinan', 'Mengakhiri Kelaparan', 'Kesehatan yang Baik', 'Keadilan untuk Semua'], correct: 'A' },
      { question: '3. Tujuan SDG ke-5 adalah tentang?', options: ['Kesehatan yang Baik', 'Kesetaraan Gender', 'Aksi Iklim', 'Air Bersih dan Sanitasi'], correct: 'B' },
      { question: '4. Berapa jumlah total tujuan dalam SDGs?', options: ['10', '15', '17', '20'], correct: 'C' },
      { question: '5. SDG ke-13 berfokus pada?', options: ['Aksi Iklim', 'Air Bersih', 'Kota yang Berkelanjutan', 'Konsumsi yang Bertanggung Jawab'], correct: 'A' },
      { question: '6. Apa fokus utama dari SDG ke-7?', options: ['Pendidikan Berkualitas', 'Energi Bersih dan Terjangkau', 'Kesetaraan Gender', 'Perdamaian dan Keadilan'], correct: 'B' },
      { question: '7. Tujuan ke-10 dalam SDGs adalah?', options: ['Pekerjaan Layak dan Pertumbuhan Ekonomi', 'Mengurangi Ketimpangan', 'Infrastruktur Industri', 'Lautan dan Ekosistem'], correct: 'B' },
      { question: '8. SDGs bertujuan dicapai pada tahun berapa?', options: ['2020', '2025', '2030', '2040'], correct: 'C' },
      { question: '9. SDG ke-15 berfokus pada?', options: ['Ekosistem Darat', 'Kehidupan di Bawah Laut', 'Kesehatan yang Baik', 'Kota dan Komunitas Berkelanjutan'], correct: 'A' },
      { question: '10. SDG ke-3 bertujuan untuk?', options: ['Kesehatan yang Baik dan Kesejahteraan', 'Pendidikan Berkualitas', 'Kesetaraan Gender', 'Pekerjaan Layak'], correct: 'A' }
    ];

    let questionElement = document.getElementById("question");
    let optionContainer = document.getElementById("option-container");
    let scoreElement = document.getElementById("score");
    let nextButton = document.getElementById("next-question");
    let restartButton = document.getElementById("restart-quiz");

    function loadQuestion() {
        const currentData = quizData[currentQuestionIndex];
        questionElement.innerText = currentData.question;
        optionContainer.innerHTML = ''; // Clear previous options

        currentData.options.forEach((option, index) => {
            const button = document.createElement('next-question');
            button.classList.add('option');
            button.innerText = `${String.fromCharCode(65 + index)}. ${option}`; // Menampilkan A, B, C, D
            button.onclick = () => checkAnswer(button, String.fromCharCode(65 + index)); // 'A', 'B', 'C', 'D'
            optionContainer.appendChild(button);
        });

        document.getElementById('next-question').disabled = true;
    }

    function checkAnswer(selectedOption, answer) {
        const options = document.querySelectorAll('.option');
        const correctAnswer = quizData[currentQuestionIndex].correct;

        options.forEach(option => {
            option.disabled = true;
        });

        if (answer === correctAnswer) {
            selectedOption.classList.add('correct');
            score++; // Jika jawaban benar, tambah skor
        } else {
            selectedOption.classList.add('incorrect');
            options.forEach(option => {
                if (option.innerText.startsWith(correctAnswer)) {
                    option.classList.add('correct');
                }
            });
        }

        document.getElementById('next-question').disabled = false;
    }

    nextButton.addEventListener('click', nextQuestion);

    function nextQuestion() {
      currentQuestionIndex++;
  
      if (currentQuestionIndex < quizData.length) {
          loadQuestion();
      } else {
          // Menyimpan skor setelah kuis selesai
          saveScore();
          document.getElementById('question').innerText = 'Quiz Completed!';
          document.getElementById('option-container').innerHTML = '';
          document.getElementById('next-question').style.display = 'none'; // Menyembunyikan tombol Next Question
          document.getElementById('restart-quiz').style.display = 'block'; // Menampilkan tombol Restart Quiz
      }
  
      document.getElementById('score').innerText = `Score: ${score}/10`; // Update skor saat ini
    }

    restartButton.addEventListener('click', restartQuiz);

    function restartQuiz() {

      currentQuestionIndex = 0;
      score = 0;
      document.getElementById('next-question').style.display = 'block';
      document.getElementById('restart-quiz').style.display = 'none';
      loadQuestion();
      document.getElementById('score').innerText = `Score: ${score}/10`;
  
      // Memperbarui skor pengguna di Firebase setelah restart
      updateScore(); // Pastikan update dilakukan di sini
    }
  
  

    window.onload = function() {
        loadQuestion(); 
    };

    function loadPreviousScore() {
      onAuthStateChanged(auth, (user) => {
          if (user) {
              const userRef = ref(db, 'userScores/' + user.uid);
              get(userRef).then((snapshot) => {
                  const previousScore = snapshot.val();
                  if (previousScore) {
                      // Menampilkan skor sebelumnya
                      const previousScoreText = `Previous Score: ${previousScore.score}/${previousScore.totalQuestions}`;
                      document.getElementById('previous-score').textContent = previousScoreText;
                      document.getElementById('previous-score').style.display = 'block'; // Menampilkan elemen skor sebelumnya
                  }
              }).catch((error) => {
                  console.error("Error getting previous score:", error);
              });
          }
      });
    } 
    
    function updateScore() {
      onAuthStateChanged(auth, (user) => {
          if (user) {
              const userRef = ref(db, 'userScores/' + user.uid);
              console.log("Updating score for user:", user.uid);
              set(userRef, {
                  score: score,
                  totalQuestions: quizData.length,
                  completedAt: new Date().toISOString()
              }).then(() => {
                  console.log('Score updated successfully after restarting the quiz!');
              }).catch((error) => {
                  console.error('Error updating score:', error);
              });
          } else {
              console.error("No user is logged in!");
          }
      });
    }
  
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
          // Menampilkan skor sebelumnya setelah login
          loadPreviousScore();
      } else {
          // Jika tidak ada user yang login, sembunyikan skor sebelumnya
          document.getElementById('previous-score').style.display = 'none';
      }
    });

  
  });

