//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})


function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
      //console.log('busqueda desactivada')
    } else {
      this.customSearch = false
      //console.log('busqueda activada')
    }
    $('#personalizada').toggleClass('invisible')
  })
}

function requestData(url, type, data){
    return $.ajax({
      url: url,
      type: type,
      data: data
    })
}

function mostrarData(data){
  var lista = $('.lista')
  var dataTemplate = `<div class="card horizontal">
                        <div class="card-image">
                            <img src="img/home.jpg">
                        </div>
                        <div class="card-stacked">
                          <div class="card-content">
                            <div> <b>Direccion: </b>:direccion:</div>
                            <div> <b>Ciudad: </b>:ciudad:</div>
                            <div> <b>Telefono: </b>:telefono:</div>
                            <div> <b>Código postal: </b>:postal:</div>
                            <div> <b>Precio: </b>:precio:</div>
                            <div> <b>Tipo: </b>:tipo:</div>
                          </div>
                          <div class="card-action right-align">
                            <a href="#">Ver más</a>
                          </div>
                        </div>
                     </div>`
   //traduce los elementos de matriz
  data.map((data) => {
    var newData = dataTemplate.replace(':direccion:', data.Direccion)
                              .replace(':ciudad:', data.Ciudad)
                              .replace(':telefono:', data.Telefono)
                              .replace(':postal:', data.Codigo_Postal)
                              .replace(':precio:', data.Tipo)
                              .replace(':tipo:', data.Precio)
    lista.append(newData)
  })
}
// funcion para cargar y mostrar opciones por seleccionar de ciudad y tipo
function cargarData(select, dataArray, tipo){
  let seleccion = [... new Set(dataArray.map(item => item[tipo]))]
  for (var i = 0; i < seleccion.length; i++){
    select.append($("<option></option>").attr("value", seleccion[i]).text(seleccion[i]));
  }
  $(select).material_select();
}

var dataArray = [];

$(function(){
  setSearch()
  var dataServer = [];
  var customSearch = false;
  var endpoint =  '/bdjson/'
  var data = 'nothing'
  requestData(endpoint, 'GET', data)
    .done((contenidoArray) =>{
        dataServer = contenidoArray
        //console.log('Invoca funcion cargarData para realizar seleccion ')
        cargarData($("#ciudad"),dataServer,"Ciudad")
        cargarData($("#tipo"),dataServer, "Tipo")
    }).fail((error) => {
        console.log(error)
  })

    $('#buscar').on('click', () =>{
    if($('#checkPersonalizada').prop("checked") == false){
       $(".lista").empty()
        // console.log('Invoca todas la datos')
        mostrarData(dataServer)
    } else {
      // obtener el rango de precios
      var slider = $("#rangoPrecio").data("ionRangeSlider");
      var from = slider.result.from;
      var to = slider.result.to;
      var ciu = document.getElementById("ciudad");
      var valciudad =  ciu.options[ciu.selectedIndex].value;
      var tip = document.getElementById("tipo");
      var valtipo =  tip.options[tip.selectedIndex].value;
      //console.log('Invoca datos segun los rangos')
      var filtroRango = jQuery.grep(dataServer, (value, index) =>{
        if (valciudad==""){
            return (value.Tipo == $("#tipo").val() &&
                    parseFloat(value.Precio.replace(/[$,]+/g,"")) >= from &&
                    parseFloat(value.Precio.replace(/[$,]+/g,"")) <= to
             )
        }else{
           if (valtipo==""){
              return (value.Ciudad == $("#ciudad").val() &&
                      parseFloat(value.Precio.replace(/[$,]+/g,"")) >= from &&
                      parseFloat(value.Precio.replace(/[$,]+/g,"")) <= to
              )
            }else{
                  return (value.Ciudad == $("#ciudad").val() &&
                      value.Tipo == $("#tipo").val() &&
                      parseFloat(value.Precio.replace(/[$,]+/g,"")) >= from &&
                      parseFloat(value.Precio.replace(/[$,]+/g,"")) <= to
                  )
            }
        }
      });
      $(".lista").empty()
      mostrarData(filtroRango)
    }
  })
})
