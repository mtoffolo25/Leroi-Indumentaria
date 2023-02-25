class camisas {
    constructor(id, tipo, modelo, color, precio, imagen) {

        this.id = id
        this.tipo = tipo,
            this.modelo = modelo,
            this.color = color,
            this.precio = precio
        this.imagen = imagen
    }
}

const arrayCamisas = []

const cargarCamisas = async () => {
    const response = await fetch("../camisas.json")
    const data = await response.json()
    let divCamisas = document.getElementById("catCamisas")
    for (let camisa of data) {
        let camisaNva = new camisas(camisa.id, camisa.tipo, camisa.modelo, camisa.color, camisa.precio, camisa.imagen)
        arrayCamisas.push(camisaNva)
        let nuevaCamisa = document.createElement("div")
        nuevaCamisa.classList.add("classCamisas")
        nuevaCamisa.innerHTML = `<div class="card" style="width: 18rem;">
    <img src=../Assets/${camisa.imagen} class="card-img-top" alt="camisa">
    <div class="card-body">
      <h5 class="card-title">${camisa.tipo} ${camisa.modelo}</h5>
      <h6 class=${camisa.marca}> $${camisa.precio}</h6>
      <a href="#" id="AgrCarro ${camisa.id}" class="btn btn-primary">Agregar al Carrito</a>
    </div>
  </div>`
        divCamisas.appendChild(nuevaCamisa)
        let AgrCarrito = document.getElementById(`AgrCarro ${camisa.id}`)
        AgrCarrito.addEventListener("click", (e) => {
            e.preventDefault()
            agregarAlCarrito(camisa)
            cargarProductosCarrito(productosEnCarrito)
        })
    }
}

cargarCamisas()

productosEnCarrito = []

if (localStorage.getItem("carrito")) {
    for (let camisa of JSON.parse(localStorage.getItem("carrito"))) {
        let camisaEnCarrito = new camisas(camisa.id, camisa.tipo, camisa.modelo, camisa.color, camisa.precio, camisa.imagen)
        productosEnCarrito.push(camisaEnCarrito)
    }
} else {
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)

}

modalBodyCarrito = document.getElementById("modal-bodyCarrito")

function cargarProductosCarrito(productosEnCarrito) {
    modalBodyCarrito.innerHTML = ""
    productosEnCarrito.forEach((camisa) => {
        modalBodyCarrito.innerHTML +=
            `
        <div class="card border-primary mb-3" id ="productoCarrito${camisa.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="200px" src="../assets/${camisa.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${camisa.tipo} ${camisa.modelo} de color ${camisa.color}</h4>
                         <h6 class="card-text">Precio unitario: $${camisa.precio}</h6>
                         <div class= "botonesCarrito">
                         <button class= "btn btn-danger" id="botonEliminar${camisa.id}"><i class="fa-solid fa-trash-can fa-lg"></i></button>
                         </div>
                 </div>    
            </div>
        `
    })

    for (let camisa of productosEnCarrito) {
        document.getElementById(`botonEliminar${camisa.id}`).addEventListener("click", () => {
            let cardProductoCarrito = document.getElementById(`productoCarrito${camisa.id}`)
            cardProductoCarrito.remove()
            let borrarPrenda = productosEnCarrito.find((remera) => remera.id == camisa.id)
            let indice = productosEnCarrito.indexOf(borrarPrenda)
            productosEnCarrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
            calcularTotal(productosEnCarrito)
        })
    }
    calcularTotal(productosEnCarrito)
}



function agregarAlCarrito(camisa) {
    let camisaAgregada = productosEnCarrito.find((elem) => elem.id == camisa.id)
    if (camisaAgregada == undefined) {
        productosEnCarrito.push(camisa)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        Swal.fire({
            title: 'Prenda agregada al carrito',
            text: `La prenda ${camisa.tipo} ${camisa.modelo} ha sido agregada al carrito`,
            confirmButtonColor: "green",
            confirmButtonText: "Aceptar",
            timer: 3000,
            imageUrl: `../assets/${camisa.imagen}`,
            imageHeight: 200
        })

    } else {
        Swal.fire({
            title: 'Prenda ya agregada',
            text: `La prenda ${camisa.tipo} ${camisa.modelo} ya existe en el carrito.`,
            icon: "info",
            showConfirmButton: false,
            timer: 1500,

        })
    }
}

cargarProductosCarrito(productosEnCarrito)

precioTotal = document.getElementById("precioTotal")

function calcularTotal(productosEnCarrito) {
    let total = productosEnCarrito.reduce((acc, camisa) => acc + camisa.precio, 0)
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

