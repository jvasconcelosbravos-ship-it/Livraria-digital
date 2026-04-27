import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc,
  onSnapshot, collection, getDocs, arrayUnion
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔑 SUA CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBH1vIpFemRWbsUDgn0tuQ5kzFwoh4v8XA",
  authDomain: "livraria-344b5.firebaseapp.com",
  projectId: "livraria-344b5",
  storageBucket: "livraria-344b5.firebasestorage.app",
  messagingSenderId: "615166629723",
  appId: "1:615166629723:web:93b908633f9948459d6c7e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🎧 SOM
window.onload=()=>document.getElementById("som").play();

// 🔎 SEARCH
function toggleSearch(){
  let s=document.getElementById("search");
  s.style.display = s.style.display=="block" ? "none":"block";
}

// 📚 LIVROS
let base=[
["Dom Casmurro","55752"],
["Frankenstein","84"],
["Drácula","345"],
["Sherlock Holmes","1661"],
["Alice","11"]
];

let livros=[];
let id=1;

for(let i=0;i<20;i++){
  base.forEach(b=>{
    livros.push({
      id:id.toString(),
      titulo:b[0]+" "+i,
      img:`https://covers.openlibrary.org/b/id/${8231000+id}-L.jpg`,
      link:`https://www.gutenberg.org/ebooks/${b[1]}`
    });
    id++;
  });
}

// HERO
function hero(){
  let l=livros[Math.floor(Math.random()*livros.length)];
  let h=document.getElementById("hero");
  h.style.backgroundImage=`url(${l.img})`;
  h.innerHTML=l.titulo;
}
setInterval(hero,4000);
hero();

// RENDER
function render(){
  let busca=document.getElementById("search").value.toLowerCase();
  let grid=document.getElementById("grid");
  grid.innerHTML="";

  livros.filter(l=>l.titulo.toLowerCase().includes(busca))
  .forEach(l=>{
    grid.innerHTML+=`
    <div class="card">
      <img src="${l.img}" onclick="abrir('${l.id}')">
      <div class="actions">
        <button class="like" onclick="like('${l.id}',this)">👍</button>
        <button onclick="coment('${l.id}')">💬</button>
        <button onclick="fav('${l.id}')">⭐</button>
      </div>
      <div id="likes_${l.id}">0</div>
    </div>`;

    ouvirLikes(l.id);
  });

  top10();
}

// ABRIR
function abrir(id){
  let livro=livros.find(l=>l.id==id);
  localStorage.setItem("ultimo",id);
  window.open(livro.link,"_blank");
}

// LIKE
async function like(id,btn){
  btn.classList.toggle("active");

  let ref=doc(db,"livros",id);
  let snap=await getDoc(ref);

  if(!snap.exists()){
    await setDoc(ref,{likes:1,comentarios:[]});
  }else{
    await updateDoc(ref,{
      likes:(snap.data().likes||0)+1
    });
  }
}

// TEMPO REAL
function ouvirLikes(id){
  let ref=doc(db,"livros",id);

  onSnapshot(ref,(d)=>{
    if(d.exists()){
      document.getElementById("likes_"+id).innerText =
        d.data().likes;
    }
  });
}

// COMENT
async function coment(id){
  let t=prompt("Comentário:");
  if(!t) return;

  let ref=doc(db,"livros",id);

  await updateDoc(ref,{
    comentarios:arrayUnion(t)
  });
}

// FAVORITO
function fav(id){
  localStorage.setItem("fav_"+id,true);
}

// TOP 10
async function top10(){
  let snap=await getDocs(collection(db,"livros"));

  let lista=[];
  snap.forEach(d=>{
    lista.push({id:d.id,...d.data()});
  });

  lista.sort((a,b)=>b.likes-a.likes);

  let box=document.getElementById("top10");
  box.innerHTML="";

  lista.slice(0,10).forEach(l=>{
    let livro=livros.find(x=>x.id==l.id);
    if(livro){
      box.innerHTML+=`<div class="card"><img src="${livro.img}"></div>`;
    }
  });
}

render();
