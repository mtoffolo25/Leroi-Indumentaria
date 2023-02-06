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

const bermuda1 = new bermudas (`20`, `Bermuda`, `Jeans`, `Azul`, 7400, `bermuda-jean.jpg`)
const bermuda2 = new bermudas (`21`, `Bermuda`, `Gabardina`, `Negro`, 7600, `bermuda-lacoste-negra.jpg`)
const bermuda3 = new bermudas (`22`, `Bermuda`, `Gabardina`, `Marrón`, 7600, `bermuda-lacoste.jpg`)
const bermuda4 = new bermudas (`23`, `Bermuda`, `Jeans`, `Negro`, 7800, `bermuda-negra.jpg`)
const bermuda5 = new bermudas (`24`, `Bermuda`, `Jeans`, `Negro`, 8000, `bermuda.jpg`)

const arrayBermudas = [bermuda1, bermuda2, bermuda3, bermuda4, bermuda5]
productosEnCarrito = []

let divBermudas = document.getElementById("catBermudas")
for(let bermuda of arrayBermudas) {
    let nuevaBermuda = document.createElement("div")
    nuevaBermuda.classList.add("classBermudas")
    nuevaBermuda.innerHTML = `<div class="card" style="width: 18rem;">
    <img src=../Assets/${bermuda.imagen} class="card-img-top" alt="jean">
    <div class="card-body">
      <h5 class="card-title">${bermuda.tipo} ${bermuda.modelo}</h5>
      <h6 class="">$${bermuda.precio}</h6>
      <a href="#" id="AgrCarro ${bermuda.id}" class="btn btn-primary">Agregar al Carrito</a>
    </div>
  </div>`
  divBermudas.appendChild(nuevaBermuda)
    let btnCarro = document.getElementById(`AgrCarro ${bermuda.id}`)
    btnCarro.addEventListener("click", (e) => {
        console.log(`La prenda ${bermuda.tipo} ${bermuda.modelo} de color ${bermuda.color} ha sido agregada al carrito`)
        e.preventDefault()
        agregarAlCarrito(bermuda)
        cargarProductosCarrito(productosEnCarrito)
    })
}
if (localStorage.getItem("carrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
    console.log(productosEnCarrito)
} else {
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)

}

modalBodyCarrito = document.getElementById("modal-bodyCarrito")

function cargarProductosCarrito(productosEnCarrito) {
    modalBodyCarrito.innerHTML = ""
    productosEnCarrito.forEach((bermuda) => {
        modalBodyCarrito.innerHTML +=
            `
        <div class="card border-primary mb-3" id ="productoCarrito${bermuda.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="200px" src="../assets/${bermuda.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${bermuda.tipo}</h4>
                    
                         <p class="card-text">$${bermuda.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${bermuda.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `
    })

 for (let bermudas of productosEnCarrito) {
 document.getElementById(`botonEliminar${bermudas.id}`).addEventListener("click",()=>{
     console.log(`La prenda ${bermudas.tipo} ${bermudas.modelo} fue removida del carrito`)
     let cardProductoCarrito = document.getElementById(`productoCarrito${bermudas.id}`)
     cardProductoCarrito.remove()
     let borrarPrenda = productosEnCarrito.find((bermuda) => bermuda.id == bermudas.id)
     let indice = productosEnCarrito.indexOf(borrarPrenda)
     productosEnCarrito.splice(indice, 1)
     localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
     calcularTotal(productosEnCarrito)
 })
}
calcularTotal(productosEnCarrito)
}

function agregarAlCarrito(bermuda) {
    let bermudaAgregada = productosEnCarrito.find((elem) => elem.id == bermuda.id)
    if (bermudaAgregada == undefined) {
        productosEnCarrito.push(bermuda)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        Swal.fire({
            title: 'Prenda agregada al carrito',
            text: `La prenda ${bermuda.tipo} ${bermuda.modelo} ha sido agregada al carrito`,
            icon: "info",
            confirmButtonColor: "green",
            confirmButtonText: "Aceptar",
            timer: 3000,
            imageUrl: `../assets/${bermuda.imagen}`,
            imageHeight: 200
        })

    } else {
        Swal.fire({
            title: 'Prenda ya agregada',
            text: `La prenda ${bermuda.tipo} ${bermuda.modelo} ya existe en el carrito`,
            icon: "info",
            showConfirmButton: false,
            timer: 1500,

        })
    }
}

precioTotal = document.getElementById("precioTotal")

function calcularTotal(productosEnCarrito){
    let total = productosEnCarrito.reduce((acc, remera)=>acc + remera.precio ,0)
    precioTotal.innerHTML = `TOTAL DE LA COMPRA <strong>$${total}</strong>`
    total == 0 ? precioTotal.innerHTML = "No hay productos en el carrito por el momento." : precioTotal.innerHTML = `TOTAL DE LA COMPRA <strong>$${total}</strong>`
}