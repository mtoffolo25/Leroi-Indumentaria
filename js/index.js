productosEnCarrito = []
if (localStorage.getItem("carrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
    console.log(productosEnCarrito)
} else {
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)

}

modalBodyCarrito = document.getElementById("modal-bodyCarrito");

function cargarProductosCarrito(productosEnCarrito) {
    modalBodyCarrito.innerHTML = ""
    productosEnCarrito.forEach((bermuda) => {
        modalBodyCarrito.innerHTML +=
            `
        <div class="card border-primary mb-3" id ="productoCarrito${bermuda.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="200px" src="../assets/${bermuda.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${bermuda.tipo} ${bermuda.modelo} de color ${bermuda.color}</h4>
                    
                         <p class="card-text">$${bermuda.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${bermuda.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `
    })

    for (let bermudas of productosEnCarrito) {
        document.getElementById(`botonEliminar${bermudas.id}`).addEventListener("click", () => {
            console.log(`La prenda ${bermudas.tipo} ${bermudas.modelo} fue removida del carrito`)
            let cardProductoCarrito = document.getElementById(`productoCarrito${bermudas.id}`)
            cardProductoCarrito.remove()
            let borrarPrenda = productosEnCarrito.find((bermuda) => bermuda.id == bermudas.id)
            let indice = productosEnCarrito.indexOf(borrarPrenda)
            productosEnCarrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
            calcularTotal(productosEnCarrito)
        })
    }
    calcularTotal(productosEnCarrito)
}



function calcularTotal(productosEnCarrito) {
    let total = productosEnCarrito.reduce((acc, remera) => acc + remera.precio, 0)
    precioTotal.innerHTML = `TOTAL DE LA COMPRA <strong>$${total}</strong>`
    total == 0 ? precioTotal.innerHTML = "No hay productos en el carrito por el momento." : precioTotal.innerHTML = `TOTAL DE LA COMPRA <strong>$${total}</strong>`
}


cargarProductosCarrito(productosEnCarrito)