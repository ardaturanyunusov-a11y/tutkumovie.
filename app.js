const movies = [
  { title: "Inception", img: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg" },
  { title: "Interstellar", img: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { title: "The Dark Knight", img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { title: "Avengers: Endgame", img: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg" }
];

let currentMovieIndex = 0;

// Ana Səhifə Düymələri
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

// Otaq Səhifəsi İdarəetməsi
const displayRoomCode = document.getElementById("display-room-code");
if (displayRoomCode) {
  const urlParams = new URLSearchParams(window.location.search);
  const roomCode = urlParams.get("room");
  displayRoomCode.textContent = roomCode ? roomCode : "Bilinmir";

  // 3 saniyəlik gözləmə ekranı (simulyasiya)
  setTimeout(() => {
    const waitingScreen = document.getElementById("waiting-screen");
    const movieContainer = document.getElementById("movie-container");
    if (waitingScreen) waitingScreen.style.display = "none";
    if (movieContainer) movieContainer.style.display = "block";
    loadMovie();
  }, 3000);
}

function loadMovie() {
  const titleEl = document.getElementById("movie-title");
  const imgEl = document.getElementById("movie-img");
  const containerEl = document.getElementById("movie-container");

  if (currentMovieIndex < movies.length) {
    if (titleEl) titleEl.textContent = movies[currentMovieIndex].title;
    if (imgEl) imgEl.src = movies[currentMovieIndex].img;
  } else {
    if (containerEl) {
      containerEl.innerHTML = "<h2 style='padding:20px; color:#fff;'>Bütün filmlərə baxdınız! 🎬</h2>";
    }
  }
}

// Bəyən / Bəyənmə Düymələri
document.addEventListener("click", (e) => {
  if (e.target && (e.target.id === "like-btn" || e.target.id === "dislike-btn")) {
    currentMovieIndex++;
    loadMovie();
  }
});

// Chat Sistemi
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

function sendMessage() {
  if (!chatInput || !chatMessages) return;
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

if (sendBtn) {
  sendBtn.addEventListener("click", sendMessage);
}

if (chatInput) {
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}
