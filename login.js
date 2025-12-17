// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
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
const auth = getAuth(app);
const db = getFirestore(app);

// DOM
const form = document.getElementById("auth-form");
const errorMessage = document.getElementById("error-message");
const photoURLInput = document.getElementById("photoURL");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const username = document.getElementById("username").value.trim();
  const photoURL = photoURLInput?.value.trim();

  if (!email || !password) {
    errorMessage.textContent = "Preencha email e senha.";
    return;
  }

  try {
    // 🟢 CADASTRO
    if (isRegisterMode) {
      if (!username) {
        errorMessage.textContent = "Informe o nome de usuário.";
        return;
      }

      if (!photoURL) {
        errorMessage.textContent = "Informe a URL da foto de perfil.";
        return;
      }

      // 1️⃣ Cria usuário no Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2️⃣ Salva dados no Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        photoURL,
        role: "admin",
        createdAt: serverTimestamp()
      });

      alert("Cadastro realizado com sucesso!");
      showLogin();
      return;
    }

    // 🔵 LOGIN
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      errorMessage.textContent = "Usuário não cadastrado.";
      return;
    }

    window.location.href = "admin.html";

  } catch (error) {
    console.error(error);
    alert(error.code + " - " + error.message);
  }
});

