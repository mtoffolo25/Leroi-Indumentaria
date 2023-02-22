class remeras {
    constructor(id, tipo, modelo, marca, color, precio, imagen) {

        this.id = id
        this.tipo = tipo,
            this.modelo = modelo,
            this.marca = marca,
            this.color = color,
            this.precio = precio
        this.imagen = imagen
        this.cantidad = 1
    }
    sumarUnidad() {
        this.cantidad = this.cantidad + 1
        return this.cantidad
    }
    restarUnidad() {
        this.cantidad = this.cantidad - 1
        return this.cantidad
    }
}

const arrayRemeras = []

const cargarRemeras = async () => {
    const response = await fetch("../remeras.json")
    const data = await response.json()
    let divRemeras = document.getElementById("catRemeras")
    for (let remera of data) {
        let remeraNva = new remeras(remera.id, remera.tipo, remera.modelo, remera.color, remera.precio, remera.imagen)
        arrayRemeras.push(remeraNva)
        let nuevaRemera = document.createElement('div');
        nuevaRemera.classList.add('classRemeras');
        nuevaRemera.innerHTML = `<div class="card" style="width: 18rem;">
    <img src=../Assets/${remera.imagen} class="card-img-top" alt="remera">
    <div class="card-body">
      <h5 class="card-title">${remera.tipo} ${remera.modelo}</h5>
      <h6 class=${remera.marca}> $${remera.precio}</h6>
      <a href="#" id="${remera.id}" class="btn btn-primary agregar-carrito">Agregar al Carrito</a>
    </div>
  </div>`;

        divRemeras.appendChild(nuevaRemera);

        let agregarAlCarro = document.getElementById(`${remera.id}`);

        agregarAlCarro.addEventListener("click", (e) => {
            console.log(`La prenda ${remera.tipo} ${remera.modelo} de color ${remera.color} ha sido agregada al carrito`)
            e.preventDefault()
            agregarAlCarrito(remera)
            cargarProductosCarrito(productosEnCarrito)
        })
    }
}

cargarRemeras()

let productosEnCarrito = []

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
    productosEnCarrito.forEach((remera) => {
        modalBodyCarrito.innerHTML +=
            `
        <div class="card border-primary mb-3" id ="productoCarrito${remera.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="200px" src="../assets/${remera.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${remera.tipo} ${remera.modelo} de color ${remera.color}</h4>
                    
                         <p class="card-text">$${remera.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${remera.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `
    })

    for (let remera of productosEnCarrito) {
        document.getElementById(`botonEliminar${remera.id}`).addEventListener("click", () => {
            console.log(`La prenda ${remera.tipo} ${remera.modelo} fue removida del carrito`)
            let cardProductoCarrito = document.getElementById(`productoCarrito${remera.id}`)
            cardProductoCarrito.remove()
            let borrarPrenda = productosEnCarrito.find((remera) => remera.id == remera.id)
            let indice = productosEnCarrito.indexOf(borrarPrenda)
            productosEnCarrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
            calcularTotal(productosEnCarrito)
        })
    }
    calcularTotal(productosEnCarrito)
}

function agregarAlCarrito(remera) {
    let remeraAgregada = productosEnCarrito.find((elem) => elem.id == remera.id)
    if (remeraAgregada == undefined) {
        productosEnCarrito.push(remera)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        Swal.fire({
            title: 'Prenda agregada al carrito',
            text: `La prenda ${remera.tipo} ${remera.modelo} ha sido agregada al carrito`,
            icon: "info",
            confirmButtonColor: "green",
            confirmButtonText: "Aceptar",
            timer: 3000,
            imageUrl: `../assets/${remera.imagen}`,
            imageHeight: 200
        })

    } else {
        Swal.fire({
            title: 'Prenda ya agregada',
            text: `La prenda ${remera.tipo} ${remera.modelo} ya existe en el carrito`,
            icon: "info",
            showConfirmButton: false,
            timer: 1500,

        })
    }
}

cargarProductosCarrito(productosEnCarrito)

precioTotal = document.getElementById("precioTotal")

function calcularTotal(productosEnCarrito) {
    let total = productosEnCarrito.reduce((acc, remera) => acc + remera.precio, 0)
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
            localStorage.removeItem("carrito")
            modalBodyCarrito.remove()
            calcularTotal(productosEnCarrito)
            finalizarCompra.remove()
        }
    })
}



