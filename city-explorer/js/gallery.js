const gallery = document.getElementById("gallery");

// листа на слики
const images = [
  { src: "images/egiped.jpg", title: "Египет" },
  { src: "images/moskva.jpg", title: "Москва" },
  { src: "images/rio.jpg", title: "Рио" },
  { src: "images/pariz.jpg", title: "Париз" }
];

// генерирање галерија
images.forEach((img, index) => {
  const card = document.createElement("div");
  card.classList.add("photo-card");
  
  card.innerHTML = `
    <img src="${img.src}" alt="${img.title}" title="${img.title}">
    <h3>${img.title}</h3>
    <div class="controls">
      <button class="likeBtn">👍 <span class="likeCount">0</span></button>
      <button class="dislikeBtn">👎 <span class="dislikeCount">0</span></button>
    </div>
    <div class="comments">
      <textarea class="commentInput" placeholder="Остави коментар..."></textarea><br>
      <button class="btn sendComment">Прати</button>
      <div class="commentsList"></div>
    </div>
  `;
  
  gallery.appendChild(card);
});

// додавање функционалност за секоја слика
document.querySelectorAll(".photo-card").forEach((card) => {
  const likeBtn = card.querySelector(".likeBtn");
  const dislikeBtn = card.querySelector(".dislikeBtn");
  const likeCount = card.querySelector(".likeCount");
  const dislikeCount = card.querySelector(".dislikeCount");
  const sendComment = card.querySelector(".sendComment");
  const commentInput = card.querySelector(".commentInput");
  const commentsList = card.querySelector(".commentsList");

  let likes = 0;
  let dislikes = 0;

  likeBtn.addEventListener("click", () => {
    likes++;
    likeCount.textContent = likes;
  });

  dislikeBtn.addEventListener("click", () => {
    dislikes++;
    dislikeCount.textContent = dislikes;
  });

  sendComment.addEventListener("click", () => {
    const text = commentInput.value.trim();
    if (text !== "") {
      const p = document.createElement("p");
      p.textContent = text;
      commentsList.appendChild(p);
      commentInput.value = "";
    }
  });
});
