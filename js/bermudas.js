class bermudas {
    constructor(id, tipo, modelo, color, precio, imagen) {
        this.id = id,
            this.tipo = tipo,
            this.modelo = modelo,
            this.color = color,
            this.precio = precio,
            this.imagen = imagen
    }
}


const arrayBermudas = []

const cargarBermudas = async () => {
    const response = await fetch("../bermudas.json")
    const data = await response.json()
    let divBermudas = document.getElementById("catBermudas")
    for (let bermuda of data) {
        let bermudaNva = new bermudas(bermuda.id, bermuda.tipo, bermuda.modelo, bermuda.color, bermuda.precio, bermuda.imagen)
        arrayBermudas.push(bermudaNva)

        let nuevaBermuda = document.createElement("div")
        nuevaBermuda.classList.add("classBermudas")
        nuevaBermuda.innerHTML = `<div class="card" style="width: 18rem;">
    <img src=../Assets/${bermuda.imagen} class="card-img-top" alt="jean">
    <div class="card-body">
      <h5 class="card-title">${bermuda.tipo} ${bermuda.modelo}</h5>
      <h6 class="">$${bermuda.precio}</h6>
      <a href="#" id="AgrCarro${bermuda.id}" class="btn btn-primary add-cart">Agregar al Carrito</a>
    </div>
  </div>`
        divBermudas.appendChild(nuevaBermuda)
        let btnCarro = document.getElementById(`AgrCarro${bermuda.id}`)
        btnCarro.addEventListener("click", (e) => {
            e.preventDefault()
            agregarAlCarrito(bermuda)
            cargarProductosCarrito(productosEnCarrito)
        })
    }
}

cargarBermudas()

productosEnCarrito = []


if (localStorage.getItem("carrito")) {
    for (let bermuda of JSON.parse(localStorage.getItem("carrito"))) {
        let bermudaEnCarrito = new bermudas(bermuda.id, bermuda.tipo, bermuda.modelo, bermuda.color, bermuda.precio, bermuda.imagen)
        productosEnCarrito.push(bermudaEnCarrito)
    }
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
                        <h4 class="card-title">${bermuda.tipo} ${bermuda.modelo} de color ${bermuda.color}</h4>
                         <h6 class="card-text">Precio unitario: $${bermuda.precio}</h6>
                         <div class= "botonesCarrito">
                         <button class= "btn btn-danger" id="botonEliminar${bermuda.id}"><i class="fa-solid fa-trash-can fa-lg"></i></button>
                         </div>
                 </div>    
            </div>
        `
    })

    for (let bermuda of productosEnCarrito) {
        document.getElementById(`botonEliminar${bermuda.id}`).addEventListener("click", () => {
            let cardProductoCarrito = document.getElementById(`productoCarrito${bermuda.id}`)
            cardProductoCarrito.remove()
            let borrarPrenda = productosEnCarrito.find((bermuda) => bermuda.id == bermuda.id)
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
            confirmButtonColor: "green",
            confirmButtonText: "Aceptar",
            timer: 3000,
            imageUrl: `../assets/${bermuda.imagen}`,
            imageHeight: 200
        })

    } else {
        Swal.fire({
            title: 'Prenda ya agregada',
            text: `La prenda ${bermuda.tipo} ${bermuda.modelo} ya existe en el carrito.`,
            icon: "info",
            showConfirmButton: false,
            timer: 1500,

        })
    }
}

cargarProductosCarrito(productosEnCarrito)

precioTotal = document.getElementById("precioTotal")

function calcularTotal(productosEnCarrito) {
    let total = productosEnCarrito.reduce((acc, bermuda) => acc + bermuda.precio, 0)
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


