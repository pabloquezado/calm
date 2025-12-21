// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById("posts");

const q = query(
  collection(db, "posts"),
  where("published", "==", true),
  orderBy("createdAt", "desc")
);

const snap = await getDocs(q);

snap.forEach(docSnap => {
  const post = docSnap.data();

  const article = document.createElement("article");
  article.className = "post";

  article.innerHTML = `
    <img src="${post.coverImage}" class="post-image">

    <div class="post-header">
    <h2>${post.title}</h2>
    <small>
    Publicado em ${post.createdAt.toDate().toLocaleDateString()}
      ${post.updatedAt ? `• por <b>${post.authorName}</b>` : ""}
    </small>
  </div>
  
    <p style="color: #444;">${post.excerpt}</p>
    <a href="post.html?id=${docSnap.id}">Ler mais...</a>
  `;
  container.appendChild(article);
});
