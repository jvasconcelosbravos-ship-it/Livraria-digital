let books = [
{
id:1,
title:"Dom Casmurro",
category:"Romance",
img:"https://covers.openlibrary.org/b/id/8231856-L.jpg",
link:"https://www.gutenberg.org/files/55752/55752-h/55752-h.htm"
},
{
id:2,
title:"Frankenstein",
category:"Terror",
img:"https://covers.openlibrary.org/b/id/8226191-L.jpg",
link:"https://www.gutenberg.org/files/84/84-h/84-h.htm"
},
{
id:3,
title:"Sherlock Holmes",
category:"Aventura",
img:"https://covers.openlibrary.org/b/id/8226191-L.jpg",
link:"https://www.gutenberg.org/files/1661/1661-h/1661-h.htm"
},
{
id:4,
title:"Química Básica",
category:"Estudo",
img:"https://openstax.org/sites/default/files/styles/social_share/public/2020-02/Chemistry2e.jpg",
link:"https://openstax.org/details/books/chemistry-2e"
}
];

let currentBook = null;

function loadBooks(list=books){
let box = document.getElementById("books");
box.innerHTML="";

list.forEach(b=>{
box.innerHTML += `
<div class="card" onclick="openBook(${b.id})">
<img src="${b.img}">
<h4>${b.title}</h4>
</div>`;
});
}

function openBook(id){
currentBook = books.find(b=>b.id==id);

document.getElementById("books").style.display="none";
document.querySelector(".categories").style.display="none";

document.getElementById("reader").style.display="block";

document.getElementById("title").innerText = currentBook.title;
document.getElementById("frame").src = currentBook.link;

loadComments();
}

function closeReader(){
document.getElementById("reader").style.display="none";
document.getElementById("books").style.display="grid";
document.querySelector(".categories").style.display="flex";
}

function searchBooks(){
let val = document.getElementById("search").value.toLowerCase();

let filtered = books.filter(b=>b.title.toLowerCase().includes(val));

loadBooks(filtered);
}

function filterCat(cat){
if(cat=="Todos") return loadBooks();

let filtered = books.filter(b=>b.category==cat);
loadBooks(filtered);
}

// FAVORITOS
function favBook(){
localStorage.setItem("fav_"+currentBook.id,true);
alert("Favoritado!");
}

// LIKE
function likeBook(){
let like = localStorage.getItem("like_"+currentBook.id)||0;
like++;
localStorage.setItem("like_"+currentBook.id,like);
alert("Likes: "+like);
}

// COMENTÁRIOS
function addComment(){
let text = document.getElementById("commentInput").value;

let comments = JSON.parse(localStorage.getItem("c_"+currentBook.id)||"[]");
comments.push(text);

localStorage.setItem("c_"+currentBook.id,JSON.stringify(comments));

loadComments();
}

function loadComments(){
let box = document.getElementById("comments");
box.innerHTML="";

let comments = JSON.parse(localStorage.getItem("c_"+currentBook.id)||"[]");

comments.forEach(c=>{
box.innerHTML += `<p>💬 ${c}</p>`;
});
}

loadBooks();
