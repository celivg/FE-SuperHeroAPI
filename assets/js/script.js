$(document).ready(function() {
  // Validación
  // Escuchamos click del formulario
  $("form").on("submit", manejoFomulario)
})


const manejoFomulario = function(e) {
  e.preventDefault();
  // "id" Heroe
  let idHeroe = $("#heroId").val();
  
  validarFormulario(idHeroe);
}

function validarFormulario(datos) {
  const token = '39db0058bd42e47573dc6446532d4513'
  const regex = /^\d+$/;
  if (regex.test(datos) && datos > 0 && datos <= 733 ) {
    // aplicar plugin
    $("#resultado").superheroe(token, datos)
  } else {
    alert("¡Lo sentimos! Ese número no tiene asignado a un personaje, intenta del 1 al 732 🐱‍🏍")
  }
}