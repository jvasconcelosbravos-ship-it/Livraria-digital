// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBH1vIpFemRWbsUDgn0tuQ5kzFwoh4v4XA",
  authDomain: "livraria-344b5.firebaseapp.com",
  projectId: "livraria-344b5",
  storageBucket: "livraria-344b5.appspot.com",
  messagingSenderId: "615166629723",
  appId: "1:615166629723:web:93b908633f9948459d6c7e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let livrosData = {};
let favoritosData = {};

// 👤 ID do usuário (favoritos privados)
let userId = localStorage.getItem("userId");

if (!userId) {
  userId = Math.random().toString(36).substring(2);
  localStorage.setItem("userId", userId);
}

// ➕ adicionar livro
function addBook() {
  db.ref("livros").push({
    titulo: titulo.value,
    autor: autor.value,
    link: link.value,
    imagem: imagem.value,
    categoria: categoria.value,
    likes: 0
  });

  titulo.value = "";
  autor.value = "";
  link.value = "";
  imagem.value = "";
}

// 📚 carregar livros
function loadBooks() {
  db.ref("livros").on("value", snap => {
    livrosData = snap.val() || {};
    render();
  });
}

// ⭐ favoritos
function loadFavs() {
  db.ref("favoritos/" + userId).on("value", snap => {
    favoritosData = snap.val() || {};
    render();
  });
}

// 📖 render
function render() {
  const search = document.getElementById("searchInput").value?.toLowerCase() || "";
  const lista = document.getElementById("lista");

  lista.innerHTML = "";

  for (let id in livrosData) {
    let b = livrosData[id];

    if (!b.titulo.toLowerCase().includes(search)) continue;

    lista.innerHTML += `
      <div class="book">
        <img src="${b.imagem}">
        <h3>${b.titulo}</h3>
        <p>${b.autor} - ${b.categoria}</p>

        <a href="${b.link}" target="_blank">📖 Ler</a>

        <div class="actions">
          <button onclick="likeBook('${id}', ${b.likes || 0}, this)">
            👍 ${b.likes || 0}
          </button>

          <button onclick="favBook('${id}')"
            class="${favoritosData[id] ? 'fav' : ''}">
            ⭐
          </button>
        </div>
      </div>
    `;
  }
}

// 👍 like GLOBAL
function likeBook(id, atual, btn) {
  db.ref("livros/" + id).update({
    likes: atual + 1
  });

  btn.classList.add("like-pop");
  setTimeout(() => btn.classList.remove("like-pop"), 300);
}

// ⭐ favorito PRIVADO
function favBook(id) {
  db.ref("favoritos/" + userId + "/" + id).set(true);
}

// 🚀 iniciar
loadBooks();
loadFavs();
