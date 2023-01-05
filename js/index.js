
let nombreIngresado = prompt("Ingrese su nombre y apellido aquí")
console.log(nombreIngresado)

let cantidadRemeras = parseInt(prompt("Ingrese la cantidad de remeras que desea comprar"))
console.log(cantidadRemeras)
let precioRemera = 1800
let totalRemeras = alert ("El Total de remeras a pagar es" + " " + "$" + precioRemera*cantidadRemeras)
console.log (totalRemeras)

let cantidadBermudas = parseInt(prompt("Ingrese la cantidad de bermudas que desea comprar"))
console.log(cantidadBermudas)
let precioBermuda = 2200
let totalBermudas = alert ("El Total de bermudas a pagar es" + " " + "$" + precioBermuda*cantidadBermudas)
console.log (totalBermudas)

let cantidadCamisas = parseInt(prompt("Ingrese la cantidad de camisas que desea comprar"))
console.log(cantidadCamisas)
let precioCamisa = 2800
let totalCamisas = alert ("El Total de camisas a pagar es" + " " + "$" + precioCamisa*cantidadCamisas)
console.log (totalCamisas)

let cantidadJeans = parseInt(prompt("Ingrese la cantidad de jeans que desea comprar"))
console.log(cantidadJeans)
let precioJean = 3400
let totalJeans = alert ("El Total de jeans a pagar es" + " " + "$" + precioJean*cantidadJeans)
console.log (totalJeans)

let total = alert("El total a pagar de todas las prendas es de" + " " + "$" + (totalRemeras + totalCamisas + totalJeans +  totalBermudas))
console.log (total)

if (total > 10000) {
    alert ("Tu compra tiene envío gratis por superar los $10000")
    console.log (total)
}
