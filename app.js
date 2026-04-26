let livros = [
  {
    id:1,
    titulo:"Dom Casmurro",
    imagem:"https://covers.openlibrary.org/b/id/8231856-L.jpg"
  },
  {
    id:2,
    titulo:"Frankenstein",
    imagem:"https://covers.openlibrary.org/b/id/8226191-L.jpg"
  },
  {
    id:3,
    titulo:"Sherlock Holmes",
    imagem:"https://covers.openlibrary.org/b/id/8228691-L.jpg"
  }
];

function render(){
  const grid = document.getElementById("grid");
  const search = document.getElementById("search").value.toLowerCase();

  grid.innerHTML = "";

  livros
  .filter(l => l.titulo.toLowerCase().includes(search))
  .forEach(l => {
    grid.innerHTML += `
      <div class="card">
        <img src="${l.imagem}">
        <p>${l.titulo}</p>
      </div>
    `;
  });
}

render();
