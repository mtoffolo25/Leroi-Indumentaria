
function solicitarUsuario() {
    let nombreUsuario = (prompt("Ingresá tu nombre de usuario"));
    console.log(nombreUsuario)
    while (nombreUsuario == "") {
        alert("NO INGRESASTE TU NOMBRE DE USUARIO");
        nombreUsuario = prompt("Por favor ingresá tu nombre de usuario para continuar con la compra");
        console.log(nombreUsuario)
    }
}


function consultarCatalogo(arrayRemeras) {
    (console.log`Nuestro catálogo es:`)
    for (let elem of arrayRemeras) {
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
        buscarXcolor()
    }
}

function buscarXprecio(arrayPrendas) {
    let precioBuscado = parseInt(prompt("ingrese el precio máximo que pagaría por alguna prenda:"))
    let investigarPrecio = arrayPrendas.filter(
        (prenda) => prenda.precio <= precioBuscado)
    console.log(investigarPrecio)
    if (investigarPrecio != Number) {
        alert("Por favor ingrese un número para poder verificar el precio.")
        buscarXprecio()
    }
}


