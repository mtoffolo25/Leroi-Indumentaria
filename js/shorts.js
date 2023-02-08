class shorts {
    constructor(id, tipo, modelo, color, precio, imagen) {

        this.id = id
        this.tipo = tipo,
            this.modelo = modelo,
            this.color = color,
            this.precio = precio
        this.imagen = imagen
    }
    mostrarInfoPrenda() {
        console.log(`Es un/a ${this.tipo}, modelo ${this.modelo}, es de color ${this.color} y vale ${this.precio}`)
    }
}

const short1 = new shorts(`28`, `Short`, `Liso`, `Rosa`, 5200, "short-baño-nuevo.jpg")
const short2 = new shorts(`29`, `Short`, `Rayado`, `Marrón`, 5000, "short1.jpg")
const short3 = new shorts(`30`, `Short`, `Rayado`, `Celeste y Rosa`, 4700, "short2.jpg")
const short4 = new shorts(`31`, `Short`, `Rayado`, `Rosa`, 5200, "short3.jpg")
const short5 = new shorts(`32`, `Short`, `Rayado`, `Celeste`, 5800, "short4.jpg")
const short6 = new shorts(`33`, `Short`, `Rayado`, `Verde`, 6000, "short5.jpg")
const short7 = new shorts(`34`, `Short`, `Rayado`, `Azul`, 5700, "short6.jpg")
const short8 = new shorts(`35`, `Short`, `Rayado`, `Negro, Blanco y Rojo`, 5300, "short7.jpg")


const arrayShorts = [short1, short2, short3, short4, short5, short6, short7, short8]

let productosEnCarrito = []

let divShorts = document.getElementById("catShorts")
for (let short of arrayShorts) {
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
            localStorage.setItem("carrito", productosEnCarrito)
            modalBodyCarrito.remove()
            calcularTotal(productosEnCarrito)
            finalizarCompra.remove()
        }
    })
}
