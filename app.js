const movies = [
  { title: "Inception", img: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg" },
  { title: "Interstellar", img: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { title: "The Dark Knight", img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { title: "Avengers: Endgame", img: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg" }
];

let currentMovieIndex = 0;

// Ana Sayfa Butonları
const createBtn = document.getElementById("create-room-btn");
if (createBtn) {
  createBtn.addEventListener("click", () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    window.location.href = `room.html?room=${randomCode}`;
  });
}

const joinBtn = document.getElementById("join-room-btn");
if (joinBtn) {
  joinBtn.addEventListener("click", () => {
    const codeInput = document.getElementById("room-code-input").value.trim();
    if (codeInput) {
      window.location.href = `room.html?room=${codeInput}`;
    } else {
      alert("Zəhmət olmasa otaq kodu daxil edin!");
    }
  });
}

// Otaq Səhifəsi
const displayRoomCode = document.getElementById("display-room-code");
if (displayRoomCode) {
  const urlParams = new URLSearchParams(window.location.search);
  const roomCode = urlParams.get("room");
  displayRoomCode.textContent = roomCode ? roomCode : "Bilinmir";

  // Simulyasiya: 3 saniyə sonra "yeni adam qoşuldu" kimi fırlanmanı dayandırıb filmləri göstərək
  setTimeout(() => {
    document.getElementById("waiting-screen").style.display = "none";
    document.getElementById("movie-container").style.display = "block";
    loadMovie();
  }, 3000);
}

function loadMovie() {
  if (currentMovieIndex < movies.length) {
    document.getElementById("movie-title").textContent = movies[currentMovieIndex].title;
    document.getElementById("movie-img").src = movies[currentMovieIndex].img;
  } else {
    document.getElementById("movie-container").innerHTML = "<h2 style='padding:20px;'>Bütün filmlərə baxdınız! 🎬</h2>";
  }
}

// Bəyən / Bəyənmə
const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");

if (likeBtn) {
  likeBtn.addEventListener("click", () => { currentMovieIndex++; loadMovie(); });
}
if (dislikeBtn) {
  dislikeBtn.addEventListener("click", () => { currentMovieIndex++; loadMovie(); });
}

// Chat Sistemi
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

if (sendBtn) {
  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (text) {
    const msgDiv = document.createElement("div");
    msgDiv.style.margin = "5px 0";
    msgDiv.innerHTML = `<span style="color: #e50914; font-weight: bold;">Sən:</span> ${text}`;
    chatMessages.appendChild(msgDiv);
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}
