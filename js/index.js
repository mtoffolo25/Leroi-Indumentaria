
function solicitarUsuario() {
    let nombreUsuario = (prompt("Ingresá tu nombre de usuario"));
    console.log(nombreUsuario)
    while (nombreUsuario == "") {
        alert("NO INGRESASTE TU NOMBRE DE USUARIO");
        nombreUsuario = prompt("Por favor ingresá tu nombre de usuario para continuar con la compra");
        console.log(nombreUsuario)
    }
}

solicitarUsuario()


class Prendas {
    constructor(tipo, modelo, marca, color, precio) {

        this.tipo = tipo,
            this.modelo = modelo,
            this.marca = marca,
            this.color = color,
            this.precio = precio

    }
    mostrarInfoPrenda() {
        console.log(`Es un/a ${this.tipo}, modelo ${this.modelo} su marca es ${this.marca}, es de color ${this.color} y vale ${this.precio}`)
    }
}

const prenda1 = new Prendas(`Remera`, `Oversize`, `Bando`, `Negro`, 4500)
const prenda2 = new Prendas(`Remera`, `Musculosa`, `Guns`, `Gris`, 4000)
const prenda3 = new Prendas(`Remera`, `Mangas Largas`, `Vandal`, `Blanco`, 4700)
const prenda4 = new Prendas(`Bermuda`, `Algodon`, `Bando`, `Gris`, 5200)
const prenda5 = new Prendas(`Bermuda`, `Mom`, `Vanda`, `Gris`, 5800)
const prenda6 = new Prendas(`Bermuda`, `Mom`, `May`, `Negro`, 6000)
const prenda7 = new Prendas(`Jeans`, `Gabardina`, `Hijos del Rey`, `Azul`, 7100)
const prenda8 = new Prendas(`Jeans`, `Mom`, `Bando`, `Negro`, 7500)
const prenda9 = new Prendas(`Jeans`, `Elastizado`, `Koda`, `Azul`, 7300)
const prenda10 = new Prendas(`Camisa`, `Elastizada`, `Vandal`, `Bordo`, 6900)
const prenda11 = new Prendas(`Camisa`, `Lino`, `Guns`, `Blanca`, 8000)
const prenda12 = new Prendas(`Camisa`, `Cuello Mao`, `Hijos del Rey`, `Negro`, 6800)

const arrayPrendas = [prenda1, prenda2, prenda3, prenda4, prenda5, prenda6, prenda7, prenda8, prenda9, prenda10, prenda11, prenda12]


function consultarCatalogo(arrayPrendas) {
    (console.log`Nuestro catálogo es:`)
    for (let elem of arrayPrendas) {
        elem.mostrarInfoPrenda()
    }
}


function buscarCatalogoXprenda(arrayPrendas) {
    let prendaBuscada = prompt("Ingrese el tipo de prenda que esta buscando:")
    let buscar = arrayPrendas.filter(
        (obj) => obj.tipo.toLowerCase() == prendaBuscada.toLowerCase()

    )
    console.log(buscar)
    if (buscar.length == 0) {
        console.log(`Para la prenda ${prendaBuscada} no hay coincidencias en nuestro catalogo`)
        buscarCatalogoXprenda()
    }
}


function buscarXcolor(arrayPrendas) {
    let colorBuscado = prompt("Ingrese el color de prenda que esta buscando:")
    let busqueda = arrayPrendas.filter(
        (prenda) => prenda.color.toLowerCase() == colorBuscado.toLowerCase()

    )
    console.log(busqueda)
    if (busqueda.length == 0) {
        console.log(`Para el color ${colorBuscado} no hay coincidencias en nuestro catalogo`)
        buscarCatalogoXprenda()
    }
}

function buscarXprecio(arrayPrendas) {
    let precioBuscado = parseInt(prompt("ingrese el precio máximo que pagaría por alguna prenda:"))
    let investigarPrecio = arrayPrendas.filter(
        (prenda) => prenda.precio <= precioBuscado)
    console.log(investigarPrecio)
}


function menu() {
    let salirMenu = false
    do {
        salirMenu = preguntarOpcion(salirMenu)
    } while (!salirMenu)
}

function preguntarOpcion() {
    let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada:
           1 - Consultar catálogo
           2 - Buscar catálogo por tipo de prenda:
           3 - Buscar prendas del mismo color:
           4 - investigar catálogo por precio:
           0 - Salir del menu`))

    switch (opcionIngresada) {
        case 1:
            consultarCatalogo(arrayPrendas)
            break
        case 2:
            buscarCatalogoXprenda(arrayPrendas)
            break
        case 3:
            buscarXcolor(arrayPrendas)
            break
        case 4:
            buscarXprecio(arrayPrendas)
            break
        case 0:
            console.log("¡GRACIAS POR LA VISITA!")
            alert("¡GRACIAS POR LA VISITA!")
            salir = true
            return salir
        default:
            console.log("Para continuar ingrese un número por favor")
            break
    }
}

preguntarOpcion()
