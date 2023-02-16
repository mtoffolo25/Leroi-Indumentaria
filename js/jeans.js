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
    mostrarInfoPrenda() {
        console.log(`Es un/a ${this.tipo}, modelo ${this.modelo} su marca es ${this.marca}, es de color ${this.color} y vale ${this.precio}`)
    }
}

const jeans1 = new jeans(`25`, `Jeans`, `Elastizado`, `Bando`, `Azul`, 8500, "jeans-chupin.jpg")
const jeans2 = new jeans(`26`, `Joger`, `Jeans`, `Guns`, `Azul`, 8800, "joger.jpg")
const jeans3 = new jeans(`27`, `Joger`, `Gabardina`, `Vandal`, `Marron`, 7900, "joger-gabardina.jpg")



const arrayJeans = [jeans1, jeans2, jeans3]

let divJeans = document.getElementById("catJeans")
for (let jean of arrayJeans) {
    let nuevoJean = document.createElement("div")
    nuevoJean.classList.add("classJeans")
    nuevoJean.innerHTML = `<div class="card" style="width: 18rem;">
    <img src=../Assets/${jean.imagen} class="card-img-top" alt="jean">
    <div class="card-body">
      <h5 class="card-title">${jean.tipo} ${jean.modelo}</h5>
      <h6 class=${jean.marca}> $${jean.precio}</h6>
      <a href="#" id="${jean.id}" class="btn btn-primary">Agregar al Carrito</a>
    </div>
  </div>`

    divJeans.appendChild(nuevoJean)

    let agregarCarro = document.getElementById(`${jean.id}`);

    agregarCarro.addEventListener("click", (e) => {
        console.log(`La prenda ${jean.tipo} ${jean.modelo} de color ${jean.color} ha sido agregada al carrito`)
        e.preventDefault()
        agregarAlCarrito(jean)
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
    productosEnCarrito.forEach((jean) => {
        modalBodyCarrito.innerHTML +=
            `
        <div class="card border-primary mb-3" id ="productoCarrito${jean.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="200px" src="../assets/${jean.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${jean.tipo} ${jean.modelo} de color ${jean.color}</h4>
                    
                         <p class="card-text">$${jean.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${jean.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `
    })

    for (let jean of productosEnCarrito) {
        document.getElementById(`botonEliminar${jean.id}`).addEventListener("click", () => {
            console.log(`La prenda ${jean.tipo} ${jean.modelo} fue removida del carrito`)
            let cardProductoCarrito = document.getElementById(`productoCarrito${jean.id}`)
            cardProductoCarrito.remove()
            let borrarPrenda = productosEnCarrito.find((jean) => jean.id == jean.id)
            let indice = productosEnCarrito.indexOf(borrarPrenda)
            productosEnCarrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
            calcularTotal(productosEnCarrito)
        })
    }
    calcularTotal(productosEnCarrito)
}

function agregarAlCarrito(jean) {
    let remeraAgregada = productosEnCarrito.find((elem) => elem.id == jean.id)
    if (remeraAgregada == undefined) {
        productosEnCarrito.push(jean)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        Swal.fire({
            title: 'Prenda agregada al carrito',
            text: `La prenda ${jean.tipo} ${jean.modelo} ha sido agregada al carrito`,
            icon: "info",
            confirmButtonColor: "green",
            confirmButtonText: "Aceptar",
            timer: 3000,
            imageUrl: `../assets/${jean.imagen}`,
            imageHeight: 200
        })

    } else {
        Swal.fire({
            title: 'Prenda ya agregada',
            text: `La prenda ${jean.tipo} ${jean.modelo} ya existe en el carrito`,
            icon: "info",
            showConfirmButton: false,
            timer: 1500,

        })
    }
}

cargarProductosCarrito(productosEnCarrito)

precioTotal = document.getElementById("precioTotal")

function calcularTotal(productosEnCarrito) {
    let total = productosEnCarrito.reduce((acc, jean) => acc + jean.precio, 0)
    precioTotal.innerHTML = `TOTAL DE LA COMPRA <strong>$${total}</strong>`
    total == 0 ? precioTotal.innerHTML = "No hay productos en el carrito por el momento." : precioTotal.innerHTML = `TOTAL DE LA COMPRA <strong>$${total}</strong>`
}

let finalizarCompra = document.getElementById("finalizarCompra")
finalizarCompra.addEventListener("click", finCompra)
function finCompra() {
    Swal.fire({
        title: '¿Estás seguro que quieres finalizar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'Cerrar'
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Gracias por su compra!',
                icon: 'success',
            })
            productosEnCarrito = []
            localStorage.setItem("carrito", productosEnCarrito)
            modalBodyCarrito.remove()
            calcularTotal(productosEnCarrito)
            finalizarCompra.remove()
        }
    })
}


