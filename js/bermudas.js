class bermudas {
    constructor (id, tipo, modelo, color, precio, imagen) {
        this.id = id,
        this.tipo = tipo,
        this.modelo = modelo,
        this.color = color, 
        this.precio = precio,
        this.imagen = imagen
    }
    mostrarInfoPrenda() {
      console.log(`Es un/a ${this.tipo}, modelo ${this.modelo} su marca es ${this.marca}, es de color ${this.color} y vale ${this.precio}`)
  }
}

const bermuda1 = new bermudas (`1`, `Bermuda`, `Jeans`, `Azul`, `$7400`, `bermuda-jean.jpg`)
const bermuda2 = new bermudas (`2`, `Bermuda`, `Gabardina`, `Negro`, `$7600`, `bermuda-lacoste-negra.jpg`)
const bermuda3 = new bermudas (`3`, `Bermuda`, `Gabardina`, `Marrón`, `$7600`, `bermuda-lacoste.jpg`)
const bermuda4 = new bermudas (`4`, `Bermuda`, `Jeans`, `Negro`, `$7800`, `bermuda-negra.jpg`)
const bermuda5 = new bermudas (`5`, `Bermuda`, `Jeans`, `Negro`, `$8000`, `bermuda.jpg`)

const arrayBermudas = [bermuda1, bermuda2, bermuda3, bermuda4, bermuda5]

let divBermudas = document.getElementById("catBermudas")
for(bermuda of arrayBermudas) {
    let nuevaBermuda = document.createElement("div")
    nuevaBermuda.classList.add("classBermudas")
    nuevaBermuda.innerHTML = `<div class="card" style="width: 18rem;">
    <img src=../Assets/${bermuda.imagen} class="card-img-top" alt="jean">
    <div class="card-body">
      <h5 class="card-title">${bermuda.tipo} ${bermuda.modelo}</h5>
      <h6 class=""> $${bermuda.precio}</h6>
      <a href="#" id="AgrCarro ${bermuda.id}" class="btn btn-primary">Agregar al Carrito</a>
    </div>
  </div>`

    divBermudas.appendChild(nuevaBermuda)
    let agregarAlCarrito = document.getElementById(`AgrCarro ${bermuda.id}`)
    agregarAlCarrito.addEventListener("click", () => {
        console.log (`La prenda ${bermuda.tipo} ${bermuda.modelo} de color ${bermuda.color} ha sido agregada al carrito. Vale $${bermuda.precio}`)
    })
}

    