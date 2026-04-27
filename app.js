import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// 🔥 FIREBASE CONFIG (o seu)
const firebaseConfig = {
  apiKey: "AIzaSyBH1vIpFemRWbsUDgn0tuQ5kzFwoh4v8XA",
  authDomain: "livraria-344b5.firebaseapp.com",
  databaseURL: "https://livraria-344b5-default-rtdb.firebaseio.com",
  projectId: "livraria-344b5",
  storageBucket: "livraria-344b5.firebasestorage.app",
  messagingSenderId: "615166629723",
  appId: "1:615166629723:web:93b908633f9948459d6c7e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📚 livros fake (pra funcionar já)
const livros = [
  { titulo: "1984", autor: "George Orwell" },
  { titulo: "Dom Quixote", autor: "Cervantes" },
  { titulo: "O Pequeno Príncipe", autor: "Saint-Exupéry" },
  { titulo: "Orgulho e Preconceito", autor: "Jane Austen" }
];

// renderizar livros
const container = document.getElementById("books");

livros.forEach(livro => {
  const div = document.createElement("div");
  div.classList.add("book");
  div.innerHTML = `
    <h3>${livro.titulo}</h3>
    <p>${livro.autor}</p>
  `;
  container.appendChild(div);
});
