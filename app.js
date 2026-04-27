// 🔥 GERADOR DE 100 LIVROS AUTOMÁTICO
const baseLivros = [
  ["Dom Casmurro","classicos","55752"],
  ["Memórias Póstumas","classicos","54829"],
  ["Frankenstein","populares","84"],
  ["Drácula","populares","345"],
  ["Sherlock Holmes","aventura","1661"],
  ["Alice no País das Maravilhas","classicos","11"],
  ["A Ilha do Tesouro","aventura","120"],
  ["Orgulho e Preconceito","classicos","1342"],
  ["O Conde de Monte Cristo","aventura","1184"],
  ["Os Miseráveis","classicos","135"]
];

// DUPLICA ATÉ 100 (pra biblioteca gigante)
let livros = [];
let id = 1;

for(let i=0;i<10;i++){
  baseLivros.forEach(b=>{
    livros.push({
      id:id++,
      titulo:b[0]+" "+i,
      cat:b[1],
      img:`https://covers.openlibrary.org/b/id/${8231800+id}-L.jpg`,
      link:`https://www.gutenberg.org/files/${b[2]}/${b[2]}-h/${b[2]}-h.htm`
    });
  });
}

// 🎬 TOP 10
let i=0;
setInterval(()=>{
  let t=document.getElementById("top10");
  let l=livros[i];
  t.style.backgroundImage=`url(${l.img})`;
  t.innerHTML=`<h1>${l.titulo}</h1>`;
  i=(i+1)%livros.length;
},2500);

// 🔎 RENDER
function renderTudo(){
  let busca=document.getElementById("search").value.toLowerCase();
  renderCat("populares","populares",busca);
  renderCat("classicos","classicos",busca);
  renderCat("aventura","aventura",busca);
}

function renderCat(id,cat,busca){
  let box=document.getElementById(id);
  box.innerHTML="";

  livros
  .filter(l=>l.cat==cat && l.titulo.toLowerCase().includes(busca))
  .forEach(l=>{
    box.innerHTML+=`
      <div class="card" onclick="abrir(${l.id})">
        <img src="${l.img}">
      </div>
    `;
  });
}

// 📖 LEITOR
let atual=null;

function abrir(id){
  atual=livros.find(l=>l.id==id);
  document.getElementById("leitor").style.display="block";
  document.getElementById("frame").src=atual.link;
  carregarComentarios();
}

function fechar(){
  document.getElementById("leitor").style.display="none";
}

// ⭐ FAVORITOS
function favoritar(){
  localStorage.setItem("fav_"+atual.id,true);
  alert("Favoritado!");
}

// 👍 LIKE
function like(){
  let n=localStorage.getItem("like_"+atual.id)||0;
  n++;
  localStorage.setItem("like_"+atual.id,n);
  alert("Likes: "+n);
}

// 💬 COMENTÁRIOS
function comentar(){
  let txt=document.getElementById("comentInput").value;
  let arr=JSON.parse(localStorage.getItem("c_"+atual.id)||"[]");
  arr.push(txt);
  localStorage.setItem("c_"+atual.id,JSON.stringify(arr));
  carregarComentarios();
}

function carregarComentarios(){
  let box=document.getElementById("comentLista");
  box.innerHTML="";
  let arr=JSON.parse(localStorage.getItem("c_"+atual.id)||"[]");
  arr.forEach(c=>{
    box.innerHTML+=`<p>${c}</p>`;
  });
}

renderTudo();
