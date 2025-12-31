// 🔥 Firebase imports
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  startAt,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// 🔧 Config
const firebaseConfig = {
    apiKey: "AIzaSyCCV3-Mjk8hYv5hba9qbCM0DUTXQNp9FDE",
    authDomain: "login-form-d0508.firebaseapp.com",
    databaseURL: "https://login-form-d0508-default-rtdb.firebaseio.com",
    projectId: "login-form-d0508",
    storageBucket: "login-form-d0508.firebasestorage.app",
    messagingSenderId: "319356886739",
    appId: "1:319356886739:web:c6f3d7a62f684e5079fe26"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById("posts");

// Notificações

let latestPostTimestamp = null;
let initialLoad = true;

const notification = document.getElementById("new-post-notification");
const refreshBtn = document.getElementById("refresh-btn");
//

const PAGE_SIZE = 2;
let pageStack = [];
let currentPage = 0;

// 🔹 Renderiza um post
function renderPost(docSnap) {
  const post = docSnap.data();

  const article = document.createElement("article");
  article.className = "post";

  article.innerHTML = `
    <img src="${post.coverImage}" class="post-image">

    <div class="post-header">
      <h2>${post.title}</h2>
      <small style="margin-top: -0.4rem;">
        Publicado em ${post.createdAt.toDate().toLocaleDateString()}
        • por <b>
          <a href="author.html?id=${post.authorId}" class="author-link">
            ${post.authorCoord}
          </a>
        </b>
      </small>
    </div>
    <p style="margin-top: 0.5rem;" style="color:#444">${post.excerpt}</p>
    <a href="post.html?id=${docSnap.id}">Ler mais...</a>
  `;

  container.appendChild(article);
}

// 🔹 Renderiza paginação
function renderPagination(hasNext) {
  const pagination = document.createElement("div");
  pagination.className = "pagination";

  pagination.innerHTML = `
    <button id="prev-btn" ${currentPage === 0 ? "disabled" : ""}>
      Anterior
    </button>

    <button id="next-btn" ${!hasNext ? "disabled" : ""}>
      Próximo
    </button>
  `;

  container.appendChild(pagination);

  document.getElementById("next-btn").onclick = () => loadPosts("next");
  document.getElementById("prev-btn").onclick = () => loadPosts("prev");
}

// 🔹 Carrega posts
async function loadPosts(direction = "next") {
  container.innerHTML = "";

  let q = query(
    collection(db, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(PAGE_SIZE)
  );

  // ▶️ PRÓXIMO
  if (direction === "next" && pageStack[currentPage]) {
    q = query(q, startAfter(pageStack[currentPage].lastDoc));
    currentPage++;
  }

  // ◀️ ANTERIOR
  if (direction === "prev") {
    currentPage--;
    const prevPage = pageStack[currentPage];
    q = query(q, startAt(prevPage.firstDoc));
  }

  const snap = await getDocs(q);

  if (snap.empty) return;

  snap.forEach(doc => renderPost(doc));

  // 🔹 salva cursores corretamente
  if (!pageStack[currentPage]) {
    pageStack[currentPage] = {
      firstDoc: snap.docs[0],
      lastDoc: snap.docs[snap.docs.length - 1]
    };
  }

  renderPagination(snap.size === PAGE_SIZE);
}

// 🔹 Inicializa
loadPosts();


const q = query(
  collection(db, "posts"),
  where("published", "==", true),
  orderBy("createdAt", "desc"),
  limit(1)
);

onSnapshot(q, snapshot => {
  if (snapshot.empty) return;

  const post = snapshot.docs[0].data();
  const postTime = post.createdAt?.toMillis();

  if (!latestPostTimestamp) {
    latestPostTimestamp = postTime;
    initialLoad = false;
    return;
  }

  if (!initialLoad && postTime > latestPostTimestamp) {
    notification.classList.remove("hidden");
  }
});

refreshBtn.addEventListener("click", () => {
  location.reload();
});
