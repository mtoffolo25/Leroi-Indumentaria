
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

let cantidadRemeras = parseInt(prompt("Ingrese la cantidad de remeras que desea comprar"))
console.log(cantidadRemeras)
while (cantidadRemeras < 0) {
    alert("No ingresaste ningun número para la cantidad de remeras")
    cantidadRemeras = prompt("Por favor, ingrese la cantidad de remeras que desea comprar")
    console.log(cantidadRemeras)
}
let precioRemera = 1800
let totalRemeras = precioRemera * cantidadRemeras
console.log("El total a pagar de las remeras es de" + " " + "$" + totalRemeras)

let cantidadBermudas = parseInt(prompt("Ingrese la cantidad de bermudas que desea comprar"))
console.log(cantidadBermudas)
while (cantidadBermudas < 0) {
    alert("No ingresaste ningun número para la cantidad de bermudas")
    cantidadBermudas = prompt("Por favor, ingrese la cantidad de bermudas que desea comprar")
    console.log(cantidadBermudas)
}
let precioBermuda = 2200
let totalBermudas = precioBermuda * cantidadBermudas
console.log("El Total a pagar de bermudas a pagar es" + " " + "$" + totalBermudas)

let cantidadCamisas = parseInt(prompt("Ingrese la cantidad de camisas que desea comprar"))
console.log(cantidadCamisas)
while (cantidadCamisas < 0) {
    alert("No ingresaste ningun número para la cantidad de camisas")
    cantidadCamisas = prompt("Por favor, ingrese la cantidad de camisas que desea comprar")
    console.log(cantidadCamisas)
}
let precioCamisa = 2800
let totalCamisas = precioCamisa * cantidadCamisas
console.log("El Total de camisas a pagar es" + " " + "$" + totalCamisas)

let cantidadJeans = parseInt(prompt("Ingrese la cantidad de jeans que desea comprar"))
console.log(cantidadJeans)
while (cantidadJeans < 0) {
    alert("No ingresaste ningun número para la cantidad de jeans")
    cantidadJeans = prompt("Por favor, ingrese la cantidad de jeans que desea comprar")
    console.log(cantidadJeans)
}
let precioJean = 3400;
let totalJeans = precioJean * cantidadJeans;
console.log("El Total de jeans a pagar es" + " " + "$" + totalJeans)

let total = (totalRemeras + totalCamisas + totalJeans + totalBermudas);
console.log("El precio total a pagar por todas las prendas es de" + " " + "$" + total)

if (total >= 10000) {
    console.log("Tu compra supera los $10000, por lo tanto tiene ENVIO GRATIS")
    alert("Tu compra supera los $10000, por tanto tiene ENVIO GRATIS")
}
else if (total < 10000) {
    console.log("Además de tu compra, el costo del envío es $350")
    alert("Además de tu compra, el costo del envío es $350")
}
