import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM
const container = document.getElementById("post-content");

// 📌 Pega ID da URL
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (!postId) {
  container.innerHTML = "<p>Postagem não encontrada.</p>";
  throw new Error("ID do post não informado.");
}

// 🔎 Busca o post
const postRef = doc(db, "posts", postId);
const postSnap = await getDoc(postRef);

if (!postSnap.exists()) {
  container.innerHTML = "<p>Postagem não encontrada.</p>";
  throw new Error("Post inexistente.");
}


// Contador de visualizações

async function registerView(postId) {
  const viewedKey = `viewed_post_${postId}`;

  // Já visualizou?
  if (localStorage.getItem(viewedKey)) return;

  const postRef = doc(db, "posts", postId);

  await updateDoc(postRef, {
    views: increment(1)
  });

  localStorage.setItem(viewedKey, "true");
}

const post = postSnap.data();

// 🧱 Renderiza post completo
container.innerHTML = `
  <div class="post-cover-wrapper">
    <img src="${post.coverImage}" class="post-cover">
  </div>

  <header class="post-header">
    <div class="post-title-area">
      <h1 style="font-size: 30px;">${post.title}</h1>
      <small class="post-dates">
 <br>
 Publicado em ${post.createdAt.toDate().toLocaleDateString()}
 ${post.authorCoord ? `• por <b><a style="text-decoration:none;" href="author.html?id=${post.authorId}" class="author-link">
 ${post.authorCoord}
</a></b>` : ""}
<hr>
      </small>
    </div>

    <div class="post-meta">
      <div class="author-color">
      </div>
    </div>
  </header>

  <div style="padding: 0.5rem; margin-top: -4rem; margin-bottom: 0.5rem;"class="post-body">
 ${post.content}
  </div>

  <div onclick="window.location.href='author.html?id=${post.authorId}';" class="post-meta">
  <img src="${post.authorPhoto}" class="author-avatar">
  <div style="margin-bottom: 1.5rem;">
    <h4><strong>${post.authorName}</strong></h4>
   <small><p style="margin-top: -0.9rem; color:#444;">${post.authorCoord}</p></small>
  </div>
</div>

<small class="post-views">
${post.views || 0} visualizações
</small>
`;

const postUrl = `${window.location.origin}/post.html?id=${postId}`;
const shareText = `
${post.title}

${post.excerpt}

👉 Leia mais:
${postUrl}
`;

// 🐦 Instagram
document.getElementById("share-twitter").onclick = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    post.title + " - " + postUrl
  )}`;
  window.open(url, "_blank");
};

// 📘 Facebook (apenas link)
document.getElementById("share-facebook").onclick = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    postUrl
  )}`;
  window.open(url, "_blank");
};

// 🔗 Copiar link
document.querySelector(".copy-link").onclick = async () => {
  if (!navigator.clipboard) {
    // Fallback or error message
    console.error("Clipboard API not supported in this browser/context.");
    // Optionally use document.execCommand('copy') as a fallback
    return;
  }
  try {
    await navigator.clipboard.writeText(textToCopy);
    console.log("Text copied to clipboard successfully!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
registerView(postId);
