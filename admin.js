import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
  deleteDoc
 } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔧 Firebase config
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
const auth = getAuth(app);
const db = getFirestore(app);

// DOM
const welcomeText = document.getElementById("welcome-text");
const logoutBtn = document.getElementById("logout-btn");
const avatar = document.querySelector(".admin-avatar");

// Postagens
const form = document.getElementById("post-form");
const myPostsDiv = document.getElementById("my-posts");

let currentUserData = null;

// Variável global dos botões de editar/excluir postagem
let editingPostId = null;

// 🔐 Protege a página
onAuthStateChanged(auth, async (user) => {

  
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {
    // Busca dados do usuário no Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();

    // Postagens
    currentUserData = {
      uid: user.uid,
      ...data
    };

      welcomeText.innerHTML = `Boas-vindas, <span class="highlight">${data.username}!</span>`;
      loadMyPosts();

      // 🖼️ Avatar
      if (currentUserData.photoURL) {
        avatar.src = currentUserData.photoURL;
      }
    } else {
      welcomeText.textContent = "Boas-vindas!";
    }

  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
  }
});

// 🚪 Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

// Parâmetros da postagem
const titleInput = document.getElementById("title");
const excerptInput = document.getElementById("excerpt");
const contentInput = document.getElementById("content");
const coverImageInput = document.getElementById("coverImage");

// Postar
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!currentUserData) return;

  const postData = {
    title: titleInput.value,
    excerpt: excerptInput.value,
    content: contentInput.value,
    coverImage: coverImageInput.value,
    updatedAt: serverTimestamp()
  };

  if (editingPostId) {
    // ✏️ ATUALIZAR
    await updateDoc(doc(db, "posts", editingPostId), postData);
    editingPostId = null;
  } else {
    // 🆕 CRIAR
    await addDoc(collection(db, "posts"), {
      ...postData,
      createdAt: serverTimestamp(),
      published: true,
      authorId: currentUserData.uid,
      authorName: currentUserData.username,
      authorCoord: currentUserData.coord,
      authorPhoto: currentUserData.photoURL
    });
  }

  form.reset();
  loadMyPosts();
});

  async function loadMyPosts() {
    myPostsDiv.innerHTML = "";
    
    const q = query(
      collection(db, "posts"),
      where("authorId", "==", currentUserData.uid),
      orderBy("createdAt", "desc")
    );
      
    const snap = await getDocs(q);
  
    snap.forEach(docSnap => {
      const data = docSnap.data();
      const div = document.createElement("div");
      div.className = "post-card";
    
      div.innerHTML = `
        ${data.coverImage ? `
          <img src="${data.coverImage}" class="post-cover-preview">
        ` : ""}
    
        <h3>${data.title}</h3>
        
        <small>
          Publicado em: ${data.createdAt?.toDate().toLocaleDateString()}
        </small>

        <p>${data.excerpt}</p>
    
        <div class="post-actions">
          <button class="delete-btn">Excluir</button>
        </div>
      `;
    
      // Botões
      div.querySelector(".delete-btn").onclick = () => deletePost(docSnap.id);
    
      myPostsDiv.appendChild(div);
    });

    async function deletePost(postId) {
      const confirmDelete = confirm("Tem certeza que deseja excluir esta postagem?");
      if (!confirmDelete) return;
    
      await deleteDoc(doc(db, "posts", postId));
      loadMyPosts();
    }    
  }    
    
