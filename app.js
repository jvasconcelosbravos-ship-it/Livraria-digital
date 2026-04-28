let livros = [
{
titulo:"Dom Casmurro",
img:"https://covers.openlibrary.org/b/id/8231856-L.jpg",
link:"https://machado.mec.gov.br/obra-completa-lista/item/download/10_7e5f78f4e0a0c5c8c2e8c8f8f63d3a6f"
},
{
titulo:"Frankenstein",
img:"https://covers.openlibrary.org/b/id/8226191-L.jpg",
link:"https://www.gutenberg.org/files/84/84-h/84-h.htm"
},
{
titulo:"Drácula",
img:"https://covers.openlibrary.org/b/id/8231990-L.jpg",
link:"https://www.gutenberg.org/files/345/345-h/345-h.htm"
}
];

// HERO
let atual = 0;

function hero(){
let h = document.getElementById("hero");
let t = document.getElementById("heroTitle");

h.style.backgroundImage = `url(${livros[atual].img})`;
t.innerText = livros[atual].titulo;

atual = (atual + 1) % livros.length;
}

setInterval(hero,4000);
hero();

// ABRIR HERO
function abrirHero(){
abrir(livros[atual].link);
}

// RENDER
function render(){
let row = document.getElementById("row");
row.innerHTML = "";

livros.forEach(l=>{
row.innerHTML += `
<div class="card" onclick="abrir('${l.link}')">
<img src="${l.img}">
</div>
`;
});
}

// LEITOR INTERNO
function abrir(link){
document.getElementById("reader").classList.remove("hidden");
document.getElementById("frame").src = link;
}

function fechar(){
document.getElementById("reader").classList.add("hidden");
document.getElementById("frame").src = "";
}

render();
