const livros = [
{
id: "1",
titulo: "Dom Casmurro",
capa: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
capitulos: [
"Capítulo 1: Uma noite destas, vindo da cidade...",
"Capítulo 2: Continuando a história...",
"Capítulo 3: Final do exemplo..."
]
},
{
id: "2",
titulo: "Sherlock Holmes",
capa: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
capitulos: [
"Capítulo 1: Mr. Sherlock Holmes...",
"Capítulo 2: O mistério continua...",
"Capítulo 3: Conclusão..."
]
}
];

let atual = null;
let cap = 0;

function carregar(){
const home = document.getElementById("home");
home.innerHTML="";

livros.forEach(l=>{
home.innerHTML += `
<div class="card" onclick="abrir('${l.id}')">
<img src="${l.capa}">
<h3>${l.titulo}</h3>
</div>`;
});
}

function abrir(id){
atual = livros.find(x=>x.id===id);
cap = localStorage.getItem("cap_"+id) || 0;

document.getElementById("home").style.display="none";
document.getElementById("leitor").style.display="block";

mostrar();
}

function mostrar(){
document.getElementById("titulo").innerText = atual.titulo;
document.getElementById("conteudo").innerText = atual.capitulos[cap];

localStorage.setItem("cap_"+atual.id, cap);
}

function proximo(){
if(cap < atual.capitulos.length-1){
cap++;
mostrar();
}
}

function anterior(){
if(cap > 0){
cap--;
mostrar();
}
}

function voltar(){
document.getElementById("home").style.display="grid";
document.getElementById("leitor").style.display="none";
}

function buscar(){
let v = document.getElementById("busca").value.toLowerCase();
document.querySelectorAll(".card").forEach(c=>{
c.style.display = c.innerText.toLowerCase().includes(v) ? "block":"none";
});
}

function favoritar(){
let f = JSON.parse(localStorage.getItem("fav")||"[]");

if(!f.includes(atual.id)){
f.push(atual.id);
}

localStorage.setItem("fav", JSON.stringify(f));
alert("Favoritado!");
}

function like(){
let l = localStorage.getItem("like_"+atual.id)||0;
l++;
localStorage.setItem("like_"+atual.id,l);
alert("Likes: "+l);
}

function avaliar(n){
localStorage.setItem("rate_"+atual.id,n);
alert("Avaliação: "+n+" estrelas");
}

window.onload = carregar;
