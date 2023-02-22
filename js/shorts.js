class shorts {
    constructor(id, tipo, modelo, color, precio, imagen) {

        this.id = id
        this.tipo = tipo,
            this.modelo = modelo,
            this.color = color,
            this.precio = precio
        this.imagen = imagen
        this.cantidad = 1
    }
}

const arrayShorts = []

const cargarShorts = async () => {
    const response = await fetch("../shorts.json")
    const data = await response.json()
    let divShorts = document.getElementById("catShorts")
    for (let short of data) {
        let shortNva = new shorts(short.id, short.tipo, short.modelo, short.color, short.precio, short.imagen)
        arrayShorts.push(shortNva)
        let nuevoShort = document.createElement('div');
        nuevoShort.classList.add('classShorts');
        nuevoShort.innerHTML = `<div class="card" style="width: 18rem;">
        <img src=../Assets/${short.imagen} class="card-img-top" alt="Short">
        <div class="card-body">
          <h5 class="card-title">${short.tipo} ${short.modelo}</h5>
          <h6 class=""> $${short.precio}</h6>
          <a href="#" id="${short.id}" class="btn btn-primary agregar-carrito">Agregar al Carrito</a>
        </div>
      </div>`;

        divShorts.appendChild(nuevoShort);

        let agregarShort = document.getElementById(`${short.id}`);

        agregarShort.addEventListener("click", (e) => {
            console.log(`La prenda ${short.tipo} ${short.modelo} de color ${short.color} ha sido agregada al carrito`)
            e.preventDefault()
            agregarAlCarrito(short)
            cargarProductosCarrito(productosEnCarrito)
        })
    }
}

cargarShorts ()

let productosEnCarrito = []


for (let short of arrayShorts) {

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
    productosEnCarrito.forEach((short) => {
        modalBodyCarrito.innerHTML +=
            `
        <div class="card border-primary mb-3" id ="productoCarrito${short.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="200px" src="../assets/${short.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${short.tipo} ${short.modelo} de color ${short.color}</h4>
                    
                         <p class="card-text">$${short.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${short.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `
    })

    for (let short of productosEnCarrito) {
        document.getElementById(`botonEliminar${short.id}`).addEventListener("click", () => {
            console.log(`La prenda ${short.tipo} ${short.modelo} fue removida del carrito`)
            let cardProductoCarrito = document.getElementById(`productoCarrito${short.id}`)
            cardProductoCarrito.remove()
            let borrarPrenda = productosEnCarrito.find((short) => short.id == short.id)
            let indice = productosEnCarrito.indexOf(borrarPrenda)
            productosEnCarrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
            calcularTotal(productosEnCarrito)
        })
    }
    calcularTotal(productosEnCarrito)
}

function agregarAlCarrito(short) {
    let shortAgregado = productosEnCarrito.find((elem) => elem.id == short.id)
    if (shortAgregado == undefined) {
        productosEnCarrito.push(short)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        Swal.fire({
            title: 'Prenda agregada al carrito',
            text: `La prenda ${short.tipo} ${short.modelo} ha sido agregada al carrito`,
            icon: "info",
            confirmButtonColor: "green",
            confirmButtonText: "Aceptar",
            timer: 3000,
            imageUrl: `../assets/${short.imagen}`,
            imageHeight: 200
        })

    } else {
        Swal.fire({
            title: 'Prenda ya agregada',
            text: `La prenda ${short.tipo} ${short.modelo} ya existe en el carrito`,
            icon: "info",
            showConfirmButton: false,
            timer: 1500,

        })
    }
}

cargarProductosCarrito(productosEnCarrito)

precioTotal = document.getElementById("precioTotal")

function calcularTotal(productosEnCarrito) {
    let total = productosEnCarrito.reduce((acc, short) => acc + short.precio, 0)
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
