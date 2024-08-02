$(document).ready(function () {
  $('#searchButton').on('click', function () {
    $.fn.superheroe();
  });
});


//Validar el form
document.getElementById('searchForm').addEventListener('submit', function(event) {
 
  const input = document.getElementById('heroId').value;
  // Sólo números entre 1 y 732
  const regex = /^(?:[1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;
 
  // Alerta de error si no se cumple la restricción
  if (!regex.test(input)) {
      alert("¡Lo sentimos! Ese número no tiene asignado a un personaje, intenta del 1 al 732 🐱‍🏍")
      event.preventDefault();
  }
});