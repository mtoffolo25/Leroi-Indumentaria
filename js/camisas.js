class camisas {
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

const camisa1 = new camisas(`11`, `Camisa`, `Lino`, `Bando`, `Azul`, 4500, "camisa-azul.jpg")
const camisa2 = new camisas(`12`, `Camisa`, `Lino`, `Guns`, `Beige`, 4000, "camisa-beige.jpg")
const camisa3 = new camisas(`13`, `Camisa`, `Lino`, `Vandal`, `Blanco`, 4700, "camisa-blanca.jpg")
const camisa4 = new camisas(`14`, `Camisa`, `Lino`, `Bando`, `Celeste`, 5200, "camisa-celeste.jpg")
const camisa5 = new camisas(`15`, `Camisa`, `Lino`, `Vanda`, `Celeste`, 5800, "camisa-celeste2.jpg")
const camisa6 = new camisas(`16`, `Camisa`, `Lino`, `May`, `Marron`, 6000, "camisa-marron.jpg")
const camisa7 = new camisas(`17`, `Camisa`, `Cuello Mao`, `Bando`, `Negro`, 7500, "camisa-negra-mao.jpg")
const camisa8 = new camisas(`18`, `Camisa`, `Lino`, `Koda`, `Negro`, 7300, "camisa-negra.jpg")
const camisa9 = new camisas(`19`, `Camisa`, `Lino`, `Vandal`, `Blanco`, 6900, "camisa.jpg")



const arrayCamisas = [camisa1, camisa2, camisa3, camisa4, camisa5, camisa6, camisa7, camisa8, camisa9]
productosEnCarrito = []

let divCamisas = document.getElementById("catCamisas")
for (let camisa of arrayCamisas) {
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
        console.log(`La prenda ${camisa.tipo} ${camisa.modelo} de color ${camisa.color} ha sido agregada al carrito`)
        e.preventDefault()
        agregarAlCarrito(camisa)
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
    productosEnCarrito.forEach((camisa) => {
        modalBodyCarrito.innerHTML +=
            `
    <div class="card border-primary mb-3" id ="productoCarrito${camisa.id}" style="max-width: 540px;">
             <img class="card-img-top" height="200px" src="../assets/${camisa.imagen}" alt="">
             <div class="card-body">
                    <h4 class="card-title">${camisa.tipo} ${camisa.modelo} de color ${camisa.color}</h4>
                
                     <p class="card-text">$${camisa.precio}</p> 
                     <button class= "btn btn-danger" id="botonEliminar${camisa.id}"><i class="fas fa-trash-alt"></i></button>
             </div>    
        </div>
    `
    })

    for (let camisa of productosEnCarrito) {
        document.getElementById(`botonEliminar${camisa.id}`).addEventListener("click", () => {
            console.log(`La prenda ${camisa.tipo} ${camisa.modelo} fue removida del carrito`)
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
            icon: "info",
            confirmButtonColor: "green",
            confirmButtonText: "Aceptar",
            timer: 3000,
            imageUrl: `../assets/${camisa.imagen}`,
            imageHeight: 200
        })

    } else {
        Swal.fire({
            title: 'Prenda ya agregada',
            text: `La prenda ${camisa.tipo} ${camisa.modelo} ya existe en el carrito`,
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

