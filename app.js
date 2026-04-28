let livros = [
{
id:1,
titulo:"Dom Casmurro",
img:"https://covers.openlibrary.org/b/id/8231856-L.jpg",
link:"https://www.gutenberg.org/ebooks/55752"
},
{
id:2,
titulo:"Frankenstein",
img:"https://covers.openlibrary.org/b/id/8226191-L.jpg",
link:"https://www.gutenberg.org/ebooks/84"
},
{
id:3,
titulo:"Drácula",
img:"https://covers.openlibrary.org/b/id/8231990-L.jpg",
link:"https://www.gutenberg.org/ebooks/345"
}
];

// HERO ROTATIVO
let atual = 0;

function hero(){
  let h=document.getElementById("hero");
  let t=document.getElementById("heroTitle");

  h.style.backgroundImage=`url(${livros[atual].img})`;
  t.innerText=livros[atual].titulo;

  atual = (atual+1) % livros.length;
}

setInterval(hero,4000);
hero();

// ABRIR HERO
function abrirHero(){
  window.open(livros[atual].link,"_blank");
}

// RENDER
function render(){
  let grid=document.getElementById("grid");
  grid.innerHTML="";

  livros.forEach(l=>{
    grid.innerHTML+=`
    <div class="card">
      <img src="${l.img}" onclick="abrir('${l.link}')">
      <div class="actions">
        <button class="like" onclick="like(this)">❤️</button>
        <button onclick="fav()">⭐</button>
      </div>
    </div>`;
  });

  top10();
}

// LIKE
function like(btn){
  btn.classList.toggle("active");
}

// FAVORITO
function fav(){
  alert("Salvo!");
}

// ABRIR
function abrir(link){
  window.open(link,"_blank");
}

// TOP 10 (SIMPLES VISUAL)
function top10(){
  let box=document.getElementById("top10");
  box.innerHTML="";

  livros.forEach((l,i)=>{
    box.innerHTML+=`
    <div class="card">
      <img src="${l.img}">
      <span style="position:absolute;font-size:40px;opacity:0.3">${i+1}</span>
    </div>`;
  });
}

render();
