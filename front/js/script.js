// Variaveis do Rio
var lat = -22.944993;
var lng = -43.181595;

//instância do mapa
var defaultZoom = 14;
var map = L.map('location-map').setView([lat, lng], defaultZoom);

var mainGroup = new L.layerGroup();
mainGroup.addTo(map);

//marcadores de inicio e destino
var startMarker = L.marker(
    [0,0], {
        draggable:true,
        title: "Ponto de partida",})
    .bindPopup("<b>Marcador de</b><br />Início.")
    .openPopup().addTo(map).on('click', clickZoom);

var destinMarker = L.marker(
    [0,0],{
        draggable:true,
        title: "Ponto de destino",})
    .bindPopup("<b>Marcador de</b><br />Destino.")
    .openPopup().addTo(map).on('click', clickZoom);

//main layers
function init(){
    //custom markers logo
    var bikeIcon = new L.icon({
        iconUrl: 'assets/images/bike_icon.png',
        iconSize:     [30, 30], 
        iconAnchor:   [25, 25],
    });
    
    var metroIcon = new L.icon({
        iconUrl: 'assets/images/metro_icon.png',
        iconSize:     [30, 30], 
        iconAnchor:   [25, 25],
    });

    var fireIcon = new L.icon({
        iconUrl: 'assets/images/bombeiro_icon.png',
        iconSize:     [30, 30], 
        iconAnchor:   [25, 25],
    });
    
    var policeIcon = new L.icon({
        iconUrl: 'assets/images/police_icon.png',
        iconSize:     [30, 30], 
        iconAnchor:   [25, 25],
    });

    var mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
    // OpenStreetMap
    var mainLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; ' + mapLink,
            maxZoom: 20,
        });
    // Stamen Layer
    var stamenToner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    });
    // WaterColor Layer
    var waterColor =  L.tileLayer('http://b.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    });
    /* 
    var map = L.Wrld.map("map", "your_api_key_here", {
        center: [37.7950, -122.401],
        zoom: 15
      }); */


    var ciclofaixas = L.geoJSON(ciclovias,
        {
            opacity: 0.8,
            dashArray: "2",
            color: 'brown',
            weight: 5,
            attribution: 'Ciclofaixas'
        });
    
    var metro = L.geoJSON(metroStations,
        {
            pointToLayer: function(feature,latlng){
                return L.marker(latlng,{icon: metroIcon});},
            opacity: 0.8,
            dashArray: "2",
            color: 'brown',
            weight: 5,
            highway: 'bus_stop',
            attribution: 'Estações de metrô'
        });
    
    var biciclet = L.geoJSON(bicicletarios,
        {
            pointToLayer: function(feature,latlng){
                return L.marker(latlng,{icon: bikeIcon});},
            opacity: 0.8,
            dashArray: "2",
            color: 'brown',
            weight: 5,
            attribution: 'Bicicletários' 
        });
    
    var bombeiros = L.geoJSON(bombeiros,
        {
            pointToLayer: function(feature,latlng){
                return L.marker(latlng,{icon: fireIcon});},
            opacity: 0.8,
            dashArray: "2",
            color: 'brown',
            weight: 5,
            attribution: 'Bombeiros'
        });
    
    var policia = L.geoJSON(delegacias,
        {
            pointToLayer: function(feature,latlng){
                return L.marker(latlng,{icon: policeIcon})
                .bindPopup('<b>'+delegacias["features"]+'</b><br />de polícia.')
                .openPopup();},
            opacity: 0.8,
            dashArray: "2",
            color: 'brown',
            weight: 5,
            attribution: 'Delegacias de polícia' 
        });

    var controlLayer = L.control.layers({
        'OpenStreetMap': mainLayer,
        'Stamen': stamenToner,
        'WaterColor': waterColor,
    }, {
        'Ciclovias': ciclofaixas,
        'Metrô': metro,
        'Bicicletários': biciclet,
        'Bombeiros': bombeiros,
        'Delegacias': policia,
    })
    
    mainLayer.addTo(map);
    controlLayer.addTo(map);
    var customIcon = L.icon({
        iconUrl: 'assets/images/fgvbrasao.png',
        iconSize:     [70, 30], // tamanho do ícone
        iconAnchor:   [25, 25], // pino do ícone
    });
    var fgvMarker = L.marker(
        [lat, lng],
        {
            icon: customIcon,
            title: "FGV",
            riseOnHover: true,
        }
    );
    fgvMarker.bindPopup("<div class='fgv-popup'>FGV é aqui!<br><img src='assets/images/fgvLogo.png' width='200'></div>", {className: 'fgv-popup-container'})
    fgvMarker.bindTooltip("<span>Localização da FGV (Botafogo)</span>")
    fgvMarker.addTo(map);
}

//limpa os traçados
function cleanMap() {
    //mainGroup.clearLayers();  
    drawLayer.clearLayers(); 
}

//algoritmo selecionado
var algoritmoSelected = 1;
//seleção do algoritmo
function selectAlg(id) {
    for (var i = 1;i <= 2; i++)
    {
        document.getElementById("Alg" + i).checked = false;
    }
    document.getElementById(id).checked = true;

    if (document.getElementById(id).id == "Alg2") {
        //A*
        return algoritmoSelected = 1;
    }
    else {
        //Djks
        return algoritmoSelected = 0;
    }
}

//exibir pontos
var showPoints;
//seleção da opção
function selectShow(id) {
    for (var i = 1;i <= 2; i++)
    {
        document.getElementById("Path" + i).checked = false;
    }
    document.getElementById(id).checked = true;

    if (document.getElementById(id).id == "Path1") {
        //Sim
        return showPoints = 1;
    }
    else {
        //Não
        return showPoints = 0;
    }
}

//exibe o caminho de menor tempo
var showTime;
//seleção da opção
function selectTime(id) {
    for (var i = 1;i <= 2; i++)
    {
        document.getElementById("Time" + i).checked = false;
    }
    document.getElementById(id).checked = true;

    if (document.getElementById(id).id == "Time1") {
        //Sim
        return showTime = 1;
    }
    else {
        //Não
        return showTime = 0;
    }
}

//roda quando algo é escrito na entrada
function submitForm(event) {
    event.preventDefault();
    
    //atribuindo os dados de entrada e de saída
    begin = document.getElementById('start').value;
    end = document.getElementById('destination').value;
}

//retorna as coordenadas do endereço
function findAddress() {
    //instacia nominatin
    var geocoding_url = "https://nominatim.openstreetmap.org/search?format=json&limit=5&accept-language=pt-BR&countrycodes=br&q=";
    //variável para armazenar os resultados da busca
    var results = document.getElementById('results');

    if(start_input == document.activeElement) {
    //fetch para obter os resultados da busca
        var whichInput = 0;
        fetch(geocoding_url + start_input.value)
                .then(response => response.json())
                .then(data => fieldAddress = data)
                .then(show => showAddress(fieldAddress,whichInput))
                .catch(err => console.log(err));
        console.log("start ta em foco");
        
        
    }
    if(end_input == document.activeElement) {
        //fetch para obter os resultados da busca
            var whichInput = 1;
            fetch(geocoding_url + end_input.value)
                    .then(response => response.json())
                    .then(data => fieldAddress = data)
                    .then(show => showAddress(fieldAddress,whichInput))
                    .catch(err => console.log(err));
            console.log("end ta em foco");
        }
    return whichInput;
}

//exibe os resultados da busca
function showAddress(fieldAddress,whichInput) {
    results.innerHTML = ''
    //se a busca retorna resultados, eles são exibidos
    
    if(fieldAddress.length > 0) {
        fieldAddress.forEach(element => {
            var place_name = element.display_name.split(",", 3);
            results.innerHTML += 
            "<li onclick='select(["+element.lat+","+element.lon+"],"+whichInput+");'>" + 
            place_name + "</li>"
        });
        
    }
    if(fieldAddress.length == 0) {
        results.innerHTML += "<p style='color:[element.lat,element.lon] red> Nenhum resultado encontrado </p>"
        console.log(fieldAddress.length)
    }
};

//add zoom no click
function clickZoom(e) {
    map.setView(e.latlng, defaultZoom);
}

//add zoom na seleção
function selZoom(coord) {
    map.setView(coord, defaultZoom);
}

function select(list,whichInput) {
    //coordenadas[whichInput]=list;
    //console.log(coordenadas[whichInput])

    if (whichInput == 0) {
        startMarker.setLatLng(list);
        coordenadas[0] = startMarker.getLatLng();
        add_path_sb(startMarker);
    }
    else {
        destinMarker.setLatLng(list);
        coordenadas[1] = destinMarker.getLatLng();
        add_path_sb(destinMarker);
    }


}


//collapsible
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
} 


//variável para o form
const form = document.querySelector('form');
const all_input = document.querySelectorAll('input');
const start_input = form.querySelector('#start');
const end_input = form.querySelector('#destination');

//chama a função quando o form é enviado
form.addEventListener('submit', submitForm);
function select_input() {
    all_input.forEach(element => {
        element.addEventListener('focus', findAddress)
        console.log(element.id)
        element.onkeyup = (e)=>{
            
            console.log(e.target.value);
            findAddress(e.target.value);
        }
    })
}

select_input();
