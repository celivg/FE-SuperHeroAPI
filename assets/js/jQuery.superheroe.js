jQuery.fn.superheroe = function () {

  let heroId = $('#heroId').val();
  let accessToken = token
  token = '39db0058bd42e47573dc6446532d4513'
  
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://superheroapi.com/api.php/${accessToken}/${heroId}`,
    "method": "GET",
    "dataType": "json",
    "headers": {
      "Accept": "*/*",
    }
  };


  $.ajax(settings).done(function (response) {

    //la super card
    let superheroeHtml = `
   <div class="card mb-3 border-white" style="max-width: 700px;">
    <div class="row g-0">
    <div class="col-md-4 h-100">
    <img src="${response.image.url}" class="card-img-top h-100 object-fit-cover" alt="${response.name}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
       <h5 class="card-title text-red">${response.name}</h5>
           <p class="card-text"><b>Nombre Real:</b> ${response.biography["full-name"]}</p>
            <em class="card-text"><small class="text-body-secondary">Publicado por: ${response.biography["publisher"]}</small></em>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Ocupación:</b> ${response.work["occupation"]}</li>
            <li class="list-group-item"><b>Primera Aparición:</b> ${response.biography["first-appearance"]}</li>
            <li class="list-group-item"><b>Altura:</b> ${response.appearance.height[1]}</li>
            <li class="list-group-item"><b>Peso:</b> ${response.appearance.weight[1]}</li>
            <li class="list-group-item"><b>Alianzas:</b> ${response.connections["group-affiliation"]}</li>
          </ul>
      </div>
    </div>
  </div>
</div>
  `;


  $("#resultado").html(superheroeHtml);

    // Data points para el gráfico de torta
    const powerstats = response.powerstats;
    const dataPoints = [
      { y: (powerstats.intelligence), label: "Inteligencia", name: "Inteligencia", showInLegend: true, color: "#D90404"},
      { y: (powerstats.strength), label: "Fuerza", name: "Fuerza", showInLegend: true, color: "#590202"},
      { y: (powerstats.speed), label: "Rapidez", name: "Rapidez", showInLegend: true, color: "#F2B705"},
      { y: (powerstats.durability), label: "Durabilidad", name: "Durabilidad", showInLegend: true, color: "#F2D43D"},
      { y: (powerstats.power), label: "Poder", name: "Poder", showInLegend: true, color: "#F16626"},
      { y: (powerstats.combat), label: "Combate", name: "Combate", showInLegend: true, color: "#0B0B0B"}
    ];

    //Filtro para que no salga un grafico si el personaje no tiene stats
    const chartData = dataPoints.filter(point => point.y !== null && point.y !== undefined && !isNaN(point.y));

    const upperCaseName = response.name.toUpperCase(); //para que salga el nombre en mayus porque salia en minuscula y se veía feo

    // Llamar al gráfico de torta
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        animationEnabled: true,
        text: `ESTADÍSTICAS DE PODER PARA ${upperCaseName}`,
        fontSize: 28
      },
      data: [{
        type: "pie",
        showInLegend: true,
        startAngle: 25,
        yValueFormatString: "#,##0\"%\"",
        indexLabel: "{label} {y}",
        dataPoints: chartData
      }]
    });
    chart.render(); 

});

  return this
}

