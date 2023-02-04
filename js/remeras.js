class remeras {
    constructor(id, tipo, modelo, marca, color, precio, imagen) {

        this.id = id
        this.tipo = tipo,
            this.modelo = modelo,
            this.marca = marca,
            this.color = color,
            this.precio = precio
        this.imagen = imagen
    }
    mostrarInfoPrenda() {
        console.log(`Es un/a ${this.tipo}, modelo ${this.modelo} su marca es ${this.marca}, es de color ${this.color} y vale ${this.precio}`)
    }
}

const remera1 = new remeras(`1`, `Remera`, `Algodon`, `Bando`, `Negro`, 4500, "remera-negra.jpg")
const remera2 = new remeras(`2`, `Remera`, `Musculosa`, `Guns`, `Gris`, 4000, "musculosa-gris.jpg")
const remera3 = new remeras(`3`, `Remera`, `Chomba`, `Vandal`, `Blanco`, 4700, "chomba-negra.jpg")
const remera4 = new remeras(`4`, `Remera`, `Chomba`, `Bando`, `Blanco`, 5200, "chomba-blanca.jpg")
const remera5 = new remeras(`5`, `Remera`, `Musculosa`, `Vanda`, `Beige`, 5800, "musculosa-beige.jpg")
const remera6 = new remeras(`6`, `Remera`, `Algodon`, `May`, `Blanca`, 6000, "remera-blanca-bonita.jpg")
const remera7 = new remeras(`7`, `Remera`, `Algodon`, `Bando`, `Gris`, 7500, "remera-gris.lastsoul.jpg")
const remera8 = new remeras(`8`, `Remera`, `Musculosa`, `Koda`, `Blanca`, 7300, "musculosa-blanca.jpg")
const remera9 = new remeras(`9`, `Remera`, `Elastizada`, `Vandal`, `Negra`, 6900, "remera-negra2.jpg")
const remera10 = new remeras(`10`, `Remera`, `Musculosa`, `Guns`, `Negra`, 8000, "musculosa-nueva.jpg")


const arrayRemeras = [remera1, remera2, remera3, remera4, remera5, remera6, remera7, remera8, remera9, remera10]

let divRemeras = document.getElementById("catRemeras")
for (remera of arrayRemeras) {
    let nuevaRemera = document.createElement("div")
    nuevaRemera.classList.add("classRemeras")
    nuevaRemera.innerHTML = `<div class="card" style="width: 18rem;">
    <img src=../Assets/${remera.imagen} class="card-img-top" alt="remera">
    <div class="card-body">
      <h5 class="card-title">${remera.tipo} ${remera.modelo}</h5>
      <h6 class=${remera.marca}> $${remera.precio}</h6>
      <a href="#" id="AgrCarro${remera.id}" class="btn btn-primary">Agregar al Carrito</a>
    </div>
  </div>`

    divRemeras.appendChild(nuevaRemera)
    let agregarAlCarrito = document.getElementById(`AgrCarro${remera.id}`)
    agregarAlCarrito.addEventListener("click", () => {
        agregarProdCarrito(remera)
    })
}

let productosEnCarrito = []

function agregarProdCarrito(remera) {
    console.log(remera)
    console.log(`La prenda ${remera.tipo} ${remera.modelo} de color ${remera.color} ha sido agregada al carrito. Vale $${remera.precio}`)
}

