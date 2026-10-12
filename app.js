// Film Listesi (Örnek Afişler)
const movies = [
  { title: "Inception", img: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg" },
  { title: "Interstellar", img: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { title: "The Dark Knight", img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { title: "Avengers: Endgame", img: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg" }
];

let currentMovieIndex = 0;
let roomCode = "";

// Oda Oluşturma Butonu
const createBtn = document.getElementById("create-room-btn");
if (createBtn) {
  createBtn.addEventListener("click", () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000); // 6 haneli rastgele kod
    window.location.href = `room.html?room=${randomCode}`;
  });
}

// Odaya Katılma Butonu
const joinBtn = document.getElementById("join-room-btn");
if (joinBtn) {
  joinBtn.addEventListener("click", () => {
    const codeInput = document.getElementById("room-code-input").value.trim();
    if (codeInput) {
      window.location.href = `room.html?room=${codeInput}`;
    } else {
      alert("Lütfen geçerli bir oda kodu girin!");
    }
  });
}

// Oda Sayfası İşlemleri
const displayRoomCode = document.getElementById("display-room-code");
if (displayRoomCode) {
  const urlParams = new URLSearchParams(window.location.search);
  roomCode = urlParams.get("room");
  displayRoomCode.textContent = roomCode ? roomCode : "Bilinmiyor";
  
  loadMovie();
}

function loadMovie() {
  if (currentMovieIndex < movies.length) {
    document.getElementById("movie-title").textContent = movies[currentMovieIndex].title;
    document.getElementById("movie-img").src = movies[currentMovieIndex].img;
  } else {
    document.getElementById("movie-container").innerHTML = "<h2>Tüm filmleri incelediniz! 🎬</h2>";
  }
}

// Beğen / Beğenme Butonları
const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");

if (likeBtn) {
  likeBtn.addEventListener("click", () => {
    currentMovieIndex++;
    loadMovie();
  });
}

if (dislikeBtn) {
  dislikeBtn.addEventListener("click", () => {
    currentMovieIndex++;
    loadMovie();
  });
}
