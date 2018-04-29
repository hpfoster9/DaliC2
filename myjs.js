var data = [{
  type:'scattermapbox',
  lat:['45.5017'],
  lon:['-73.5673'],
  mode:'markers',
  marker: {
    size:14
  },
  text:['Montreal']
}]

var layout = {
  autosize: true,
  hovermode:'closest',
  mapbox: {
    bearing:0,
    center: {
      lat:45,
      lon:-73
    },
    pitch:0,
    zoom:3
  },
}

Plotly.setPlotConfig({
  mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
})
var div = document.getElementById("myDiv");
Plotly.plot(div, data, layout)