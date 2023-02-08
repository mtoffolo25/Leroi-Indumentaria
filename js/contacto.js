let botonEnviar = document.getElementById("botonEnviar")
let inputEmail = document.getElementById("exampleFormControlInput1")
let inputMensaje = document.getElementById("exampleFormControlTextarea1")
let botonCerrar = document.getElementById("botonCerrar")
let divEmail = document.getElementById("divEmail")
let divMensaje = document.getElementById("")

botonEnviar.addEventListener("click", enviarMsj)


function enviarMsj() {
    if ((inputEmail.value != "") && (inputMensaje.value != "")) {
        Swal.fire({
            title: 'Mensaje enviado con éxito',
            text: `En la brevedad nos estaremos comunicando con vos.`,
            timer: 2500,
        }) 
    }
    else {
        Swal.fire({
            title: '¡El mensaje no puede ser enviado!',
            text: `Por favor complete los campos que faltan.`,
            timer: 2500,
        })
    }
    localStorage.setItem("e-mail", JSON.stringify(inputEmail.value))
    localStorage.setItem("Mensajería", JSON.stringify(inputMensaje.value))
    inputEmail.value = ""
    inputMensaje.value = ""
}
