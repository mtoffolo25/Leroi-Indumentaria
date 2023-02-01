class jeans {
    constructor(id, tipo, modelo, marca, color, precio, imagen) {

        this.id = id
        this.tipo = tipo,
            this.modelo = modelo,
            this.marca = marca,
            this.color = color,
            this.precio = precio
        this.imagen = imagen
    }
}

const jeans1 = new jeans(`1`, `Jeans`, `Elastizado`, `Bando`, `Azul`, 8500, "jeans-chupin.jpg")
const jeans2 = new jeans(`2`, `Joger`, `Jeans`, `Guns`, `Azul`, 8800, "joger.jpg")
const jeans3 = new jeans(`3`, `Joger`, `Gabardina`, `Vandal`, `Marron`, 7900, "joger-gabardina.jpg")



const arrayJeans = [jeans1, jeans2, jeans3]

let divJeans = document.getElementById("catJeans")
for (pantalon of arrayJeans) {
    let nuevoJean = document.createElement("div")
    nuevoJean.classList.add("classJeans")
    nuevoJean.innerHTML = `<div class="card" style="width: 18rem;">
    <img src=../Assets/${pantalon.imagen} class="card-img-top" alt="jean">
    <div class="card-body">
      <h5 class="card-title">${pantalon.tipo} ${pantalon.modelo}</h5>
      <h6 class=${pantalon.marca}> $${pantalon.precio}</h6>
      <a href="#" id="AgrCarro ${pantalon.id}" class="btn btn-primary">Agregar al Carrito</a>
    </div>
  </div>`

    divJeans.appendChild(nuevoJean)
    }
