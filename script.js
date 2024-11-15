const nameBoxes = document.querySelectorAll('.name-box');
const dropboxes = document.querySelectorAll('.dropbox');
const originDrops = document.querySelectorAll('.origin-drop');
const submitBtn = document.getElementById('submit-btn');

// Bagian drag dan drop
nameBoxes.forEach(box => {
    box.addEventListener('dragstart', dragStart);
    box.addEventListener('dragend', dragEnd);
});

dropboxes.forEach(dropbox => {
    dropbox.addEventListener('dragover', dragOver);
    dropbox.addEventListener('drop', drop);
});

originDrops.forEach(originDrop => {
    originDrop.addEventListener('dragover', dragOver);
    originDrop.addEventListener('drop', dropToOrigin);
});

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.closest('.name-box').id);
    setTimeout(() => {
        e.target.style.visibility = 'hidden';
    }, 0);
}

function dragEnd(e) {
    e.target.style.visibility = 'visible';
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const droppedItemId = e.dataTransfer.getData('text');
    const droppedItem = document.getElementById(droppedItemId);
    e.target.appendChild(droppedItem);
}

function dropToOrigin(e) {
    e.preventDefault();
    const droppedItemId = e.dataTransfer.getData('text');
    const droppedItem = document.getElementById(droppedItemId);
    
    e.target.appendChild(droppedItem); 
}

submitBtn.addEventListener('click', validateGame);
function validateGame() {
    let correct = true;
    
    dropboxes.forEach(dropbox => {
        const nameBox = dropbox.querySelector('.name-box');
        if (!nameBox || nameBox.id !== dropbox.getAttribute('data-correct')) {
            correct = false;
        }
    });

    if (correct) {
        alert('Selamat, semua benar!');
    } else {
        alert('Ada kesalahan, ulangi lagi!');
        resetGame();
    }
}

function resetGame() {
    originDrops.forEach(originDrop => {
        const boxId = originDrop.getAttribute('data-box');
        const nameBox = document.getElementById(boxId);
        originDrop.appendChild(nameBox); // Kembalikan setiap box ke area asal masing-masing
    });
}

// Bagian Kuis
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 10; 

    // Kumpulan pertanyaan dan jawaban benar
const quizData = [
    {
      question: '1. Tahun berapa Sustainable Development Goals (SDGs) mulai diadopsi PBB?',
      options: ['2015', '2016', '2014', '2013'],
      correct: 'A'
    },
    {
      question: '2. Apa tujuan pertama dalam SDGs?',
      options: ['Mengakhiri Kemiskinan', 'Mengakhiri Kelaparan', 'Kesehatan yang Baik', 'Keadilan untuk Semua'],
      correct: 'A'
    },
    {
      question: '3. Tujuan SDG ke-5 adalah tentang?',
      options: ['Kesehatan yang Baik', 'Kesetaraan Gender', 'Aksi Iklim', 'Air Bersih dan Sanitasi'],
      correct: 'B'
    },
    {
      question: '4. Berapa jumlah total tujuan dalam SDGs?',
      options: ['10', '15', '17', '20'],
      correct: 'C'
    },
    {
      question: '5. SDG ke-13 berfokus pada?',
      options: ['Aksi Iklim', 'Air Bersih', 'Kota yang Berkelanjutan', 'Konsumsi yang Bertanggung Jawab'],
      correct: 'A'
    },
    {
      question: '6. Apa fokus utama dari SDG ke-7?',
      options: ['Pendidikan Berkualitas', 'Energi Bersih dan Terjangkau', 'Kesetaraan Gender', 'Perdamaian dan Keadilan'],
      correct: 'B'
    },
    {
      question: '7. Tujuan ke-10 dalam SDGs adalah?',
      options: ['Pekerjaan Layak dan Pertumbuhan Ekonomi', 'Mengurangi Ketimpangan', 'Infrastruktur Industri', 'Lautan dan Ekosistem'],
      correct: 'B'
    },
    {
      question: '8. SDGs bertujuan dicapai pada tahun berapa?',
      options: ['2020', '2025', '2030', '2040'],
      correct: 'C'
    },
    {
      question: '9. SDG ke-15 berfokus pada?',
      options: ['Ekosistem Darat', 'Kehidupan di Bawah Laut', 'Kesehatan yang Baik', 'Kota dan Komunitas Berkelanjutan'],
      correct: 'A'
    },
    {
      question: '10. SDG ke-3 bertujuan untuk?',
      options: ['Kesehatan yang Baik dan Kesejahteraan', 'Pendidikan Berkualitas', 'Kesetaraan Gender', 'Pekerjaan Layak'],
      correct: 'A'
    }
];
  

function loadQuestion() {
    const currentData = quizData[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const optionContainer = document.getElementById('option-container');

    questionElement.innerText = currentData.question;

    optionContainer.innerHTML = '';

    currentData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.innerText = `${String.fromCharCode(65 + index)}. ${option}`;
        button.onclick = () => checkAnswer(button, String.fromCharCode(65 + index)); // 'A', 'B', 'C', 'D'
        optionContainer.appendChild(button);
    });

    document.getElementById('next-question').disabled = true;
}

window.onload = function() {
    loadQuestion(); 
};

function checkAnswer(selectedOption, answer) {
    const options = document.querySelectorAll('.option');
    const correctAnswer = quizData[currentQuestionIndex].correct;

    options.forEach(option => {
        option.disabled = true;
    });

    if (answer === correctAnswer) {
        selectedOption.classList.add('correct');
        score++; 
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

function nextQuestion() {
    currentQuestionIndex++; 

    if (currentQuestionIndex < quizData.length) {
        loadQuestion(); 
    } else {
        document.getElementById('question').innerText = 'Quiz Completed!';
        document.getElementById('option-container').innerHTML = '';
        document.getElementById('next-question').style.display = 'none'; 

        document.getElementById('restart-quiz').style.display = 'block';
    }

    document.getElementById('score').innerText = `Score: ${score}/10`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('next-question').style.display = 'block';
    document.getElementById('restart-quiz').style.display = 'none';
    loadQuestion();
    document.getElementById('score').innerText = `Score: ${score}/10`;
}

// Bagian SDG Favorit
const sdgNumberInput = document.getElementById("sdg-number");
const sdgImage = document.getElementById("sdg-image");
const sdgWishInput = document.getElementById("sdg-wish");
const sdgWishDisplay = document.getElementById("sdg-wish-display");

    // Fungsi untuk memperbarui logo SDG
sdgNumberInput.addEventListener("input", function () {
    const sdgNumber = sdgNumberInput.value;

    if (sdgNumber >= 1 && sdgNumber <= 17) {
        sdgImage.src = `assets/image/sdg${sdgNumber}.png`;
        sdgImage.style.display = "block"; 
    } else {
        sdgImage.style.display = "none"; 
    }
});

// Fungsi untuk memperbarui teks harapan
sdgWishInput.addEventListener("input", function () {
    const wishText = sdgWishInput.value;

    if (wishText.trim() !== "") {
        sdgWishDisplay.textContent = wishText;
        sdgWishDisplay.style.display = "block"; 
    } else {
        sdgWishDisplay.style.display = "none"; 
    }
});

// Fungsi untuk mengatur tampilan menu berdasarkan status login
function updateMenuBasedOnAuthStatus(user) {
    if (user) {
        // User is logged in, tampilkan opsi Logout, sembunyikan Register dan Login
        registerLink.style.display = "none";
        loginLink.style.display = "none";
        logoutLink.style.display = "block";
    } else {
        // User is not logged in, tampilkan opsi Register dan Login, sembunyikan Logout
        registerLink.style.display = "block";
        loginLink.style.display = "block";
        logoutLink.style.display = "none";
    }
}