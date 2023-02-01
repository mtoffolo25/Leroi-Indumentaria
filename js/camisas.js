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

const camisa1 = new camisas(`1`, `Camisa`, `Lino`, `Bando`, `Azul`, 4500, "camisa-azul.jpg")
const camisa2 = new camisas(`2`, `Camisa`, `Lino`, `Guns`, `Beige`, 4000, "camisa-beige.jpg")
const camisa3 = new camisas(`3`, `Camisa`, `Lino`, `Vandal`, `Blanco`, 4700, "camisa-blanca.jpg")
const camisa4 = new camisas(`4`, `Camisa`, `Lino`, `Bando`, `Celeste`, 5200, "camisa-celeste.jpg")
const camisa5 = new camisas(`5`, `Camisa`, `Lino`, `Vanda`, `Celeste`, 5800, "camisa-celeste2.jpg")
const camisa6 = new camisas(`6`, `Camisa`, `Lino`, `May`, `Marron`, 6000, "camisa-marron.jpg")
const camisa7 = new camisas(`7`, `Camisa`, `Cuello Mao`, `Bando`, `Negro`, 7500, "camisa-negra-mao.jpg")
const camisa8 = new camisas(`8`, `Camisa`, `Lino`, `Koda`, `Negro`, 7300, "camisa-negra.jpg")
const camisa9 = new camisas(`9`, `Camisa`, `Lino`, `Vandal`, `Blanco`, 6900, "camisa.jpg")



const arrayCamisas = [camisa1, camisa2, camisa3, camisa4, camisa5, camisa6, camisa7, camisa8, camisa9]

let divCamisas = document.getElementById("catCamisas")
for (camisa of arrayCamisas) {
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
    let agregarAlCarrito = document.getElementById(`AgrCarro ${camisa.id}`)
    agregarAlCarrito.addEventListener("click", () => {
        console.log (`La prenda ${camisa.tipo} ${camisa.modelo} de color ${camisa.color} ha sido agregada al carrito. Vale $${camisa.precio}`)
    })
    }