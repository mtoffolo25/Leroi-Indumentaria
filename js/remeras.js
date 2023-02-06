// Remeras

class remeras {
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

const remera1 = new remeras(`1`, `Remera`, `Algodon`, `Bando`, `Negro`, 4500, "remera-negra.jpg")
const remera2 = new remeras(`2`, `Remera`, `Musculosa`, `Guns`, `Gris`, 4000, "musculosa-gris.jpg")
const remera3 = new remeras(`3`, `Remera`, `Chomba`, `Vandal`, `Blanco`, 4700, "chomba-negra.jpg")
const remera4 = new remeras(`4`, `Remera`, `Chomba`, `Bando`, `Blanco`, 5200, "chomba-blanca.jpg")
const remera5 = new remeras(`5`, `Remera`, `Musculosa`, `Vanda`, `Beige`, 5800, "musculosa-beige.jpg")
const remera6 = new remeras(`6`, `Remera`, `Algodon`, `May`, `Blanca`, 6000, "remera-blanca-bonita.jpg")
const remera7 = new remeras(`7`, `Remera`, `Algodon`, `Bando`, `Gris`, 7500, "remera-gris.lastsoul.jpg")
const remera8 = new remeras(`8`, `Remera`, `Musculosa`, `Koda`, `Blanca`, 7300, "musculosa-blanca.jpg")
const remera9 = new remeras(`9`, `Remera`, `Elastizada`, `Vandal`, `Negra`, 6900, "remera-negra2.jpg")
const remera10 = new remeras(`10`, `Remera`, `Musculosa`, `Guns`, `Negra`, 8000, "musculosa-nueva.jpg")


const arrayRemeras = [remera1, remera2, remera3, remera4, remera5, remera6, remera7, remera8, remera9, remera10]

let productosEnCarrito = []

let divRemeras = document.getElementById("catRemeras")
for (let remera of arrayRemeras) {
    let nuevaRemera = document.createElement("div")
    nuevaRemera.classList.add("classRemeras")
    nuevaRemera.innerHTML = `<div class="card" style="width: 18rem;">
    <img src=../Assets/${remera.imagen} class="card-img-top" alt="remera">
    <div class="card-body">
      <h5 class="card-title">${remera.tipo} ${remera.modelo}</h5>
      <h6 class=${remera.marca}> $${remera.precio}</h6>
      <a href="#" id="BtnCarro${remera.id}" class="btn btn-primary">Agregar al Carrito</a>
    </div>
  </div>`
    divRemeras.appendChild(nuevaRemera)
    let btnCarrito = document.getElementById(`BtnCarro${remera.id}`)
    btnCarrito.addEventListener("click", (e) => {
        console.log(`La prenda ${remera.tipo} ${remera.modelo} de color ${remera.color} ha sido agregada al carrito`)
        e.preventDefault()
        agregarAlCarrito(remera)
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
    productosEnCarrito.forEach((remera) => {
        modalBodyCarrito.innerHTML +=
            `
        <div class="card border-primary mb-3" id ="productoCarrito${remera.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="200px" src="../assets/${remera.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${remera.tipo}</h4>
                    
                         <p class="card-text">$${remera.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${remera.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `
    })

 for (let remeras of productosEnCarrito) {
 document.getElementById(`botonEliminar${remeras.id}`).addEventListener("click",()=>{
     console.log(`La prenda ${remeras.tipo} ${remeras.modelo} fue removida del carrito`)
     let cardProductoCarrito = document.getElementById(`productoCarrito${remeras.id}`)
     cardProductoCarrito.remove()
     let borrarPrenda = productosEnCarrito.find((remera) => remera.id == remeras.id)
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

precioTotal = document.getElementById("precioTotal")

function calcularTotal(productosEnCarrito){
    let total = productosEnCarrito.reduce((acc, remera)=>acc + remera.precio ,0)
    precioTotal.innerHTML = `TOTAL DE LA COMPRA <strong>$${total}</strong>`
    total == 0 ? precioTotal.innerHTML = "No hay productos en el carrito por el momento." : precioTotal.innerHTML = `TOTAL DE LA COMPRA <strong>$${total}</strong>`
}

// // Bermudas

// class bermudas {
//     constructor (id, tipo, modelo, color, precio, imagen) {
//         this.id = id,
//         this.tipo = tipo,
//         this.modelo = modelo,
//         this.color = color,
//         this.precio = precio,
//         this.imagen = imagen
//     }
//     mostrarInfoPrenda() {
//       console.log(`Es un/a ${this.tipo}, modelo ${this.modelo} su marca es ${this.marca}, es de color ${this.color} y vale ${this.precio}`)
//   }
// }

// const bermuda1 = new bermudas (`1`, `Bermuda`, `Jeans`, `Azul`, `$7400`, `bermuda-jean.jpg`)
// const bermuda2 = new bermudas (`2`, `Bermuda`, `Gabardina`, `Negro`, `$7600`, `bermuda-lacoste-negra.jpg`)
// const bermuda3 = new bermudas (`3`, `Bermuda`, `Gabardina`, `Marrón`, `$7600`, `bermuda-lacoste.jpg`)
// const bermuda4 = new bermudas (`4`, `Bermuda`, `Jeans`, `Negro`, `$7800`, `bermuda-negra.jpg`)
// const bermuda5 = new bermudas (`5`, `Bermuda`, `Jeans`, `Negro`, `$8000`, `bermuda.jpg`)

// const arrayBermudas = [bermuda1, bermuda2, bermuda3, bermuda4, bermuda5]

// let divBermudas = document.getElementById("catBermudas")
// for(bermuda of arrayBermudas) {
//     let nuevaBermuda = document.createElement("div")
//     nuevaBermuda.classList.add("classBermudas")
//     nuevaBermuda.innerHTML = `<div class="card" style="width: 18rem;">
//     <img src=../Assets/${bermuda.imagen} class="card-img-top" alt="jean">
//     <div class="card-body">
//       <h5 class="card-title">${bermuda.tipo} ${bermuda.modelo}</h5>
//       <h6 class=""> $${bermuda.precio}</h6>
//       <a href="#" id="AgrCarro ${bermuda.id}" class="btn btn-primary">Agregar al Carrito</a>
//     </div>
//   </div>`

//     divBermudas.appendChild(nuevaBermuda)
//     let agregarAlCarrito = document.getElementById(`AgrCarro ${bermuda.id}`)
//     agregarAlCarrito.addEventListener("click", (e) => {
//         e.preventDefault();
//     })
// }

// // Jeans/Jogers

// class jeans {
//     constructor(id, tipo, modelo, marca, color, precio, imagen) {

//         this.id = id
//         this.tipo = tipo,
//             this.modelo = modelo,
//             this.marca = marca,
//             this.color = color,
//             this.precio = precio
//         this.imagen = imagen
//     }
// }

// const jeans1 = new jeans(`1`, `Jeans`, `Elastizado`, `Bando`, `Azul`, 8500, "jeans-chupin.jpg")
// const jeans2 = new jeans(`2`, `Joger`, `Jeans`, `Guns`, `Azul`, 8800, "joger.jpg")
// const jeans3 = new jeans(`3`, `Joger`, `Gabardina`, `Vandal`, `Marron`, 7900, "joger-gabardina.jpg")



// const arrayJeans = [jeans1, jeans2, jeans3]

// let divJeans = document.getElementById("catJeans")
// for (pantalon of arrayJeans) {
//     let nuevoJean = document.createElement("div")
//     nuevoJean.classList.add("classJeans")
//     nuevoJean.innerHTML = `<div class="card" style="width: 18rem;">
//     <img src=../Assets/${pantalon.imagen} class="card-img-top" alt="jean">
//     <div class="card-body">
//       <h5 class="card-title">${pantalon.tipo} ${pantalon.modelo}</h5>
//       <h6 class=${pantalon.marca}> $${pantalon.precio}</h6>
//       <a href="#" id="AgrCarro ${pantalon.id}" class="btn btn-primary">Agregar al Carrito</a>
//     </div>
//   </div>`

//     divJeans.appendChild(nuevoJean)
//     }

// // Otras funciones
// function consultarCatalogo(arrayRemeras) {
//     (console.log`Nuestro catálogo es:`)
//     for (let elem of arrayRemeras) {
//         elem.mostrarInfoPrenda()
//     }
// }


// function buscarCatalogoXprenda(arrayPrendas) {
//     let prendaBuscada = prompt("Ingrese el tipo de prenda que esta buscando:")
//     let buscar = arrayPrendas.filter(
//         (obj) => obj.tipo.toLowerCase() == prendaBuscada.toLowerCase()

//     )
//     console.log(buscar)
//     if (buscar.length == 0) {
//         console.log(`Para la prenda ${prendaBuscada} no hay coincidencias en nuestro catalogo`)
//         buscarCatalogoXprenda()
//     }

// }


// function buscarXcolor(arrayPrendas) {
//     let colorBuscado = prompt("Ingrese el color de prenda que esta buscando:")
//     let busqueda = arrayPrendas.filter(
//         (prenda) => prenda.color.toLowerCase() == colorBuscado.toLowerCase()
//     )
//     console.log(busqueda)
//     if (busqueda.length == 0) {
//         console.log(`Para el color ${colorBuscado} no hay coincidencias en nuestro catalogo`)
//         buscarXcolor()
//     }
// }

// function buscarXprecio(arrayPrendas) {
//     let precioBuscado = parseInt(prompt("ingrese el precio máximo que pagaría por alguna prenda:"))
//     let investigarPrecio = arrayPrendas.filter(
//         (prenda) => prenda.precio <= precioBuscado)
//     console.log(investigarPrecio)
//     if (investigarPrecio != Number) {
//         alert("Por favor ingrese un número para poder verificar el precio.")
//         buscarXprecio()
//     }
// }


