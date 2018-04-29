function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      loadMap(obj);
    }
  };
  xhttp.open("GET", "http://mappy.dali.dartmouth.edu/members.json", true);
  xhttp.send();
}
loadDoc();

function Datapoint(name,lat,lon){
  this.type = 'scattermapbox';
  this.lat = [lat];
  this.lon = [lon];
  this.mode = 'markers';
  this.marker = {size:14};
  this.text = [name];
}

function loadMap(jArray){
  console.log(jArray);
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
  var data = [];

  jArray.forEach( function(p){
    data.push(new Datapoint(p.name, p.lat_long[0], p.lat_long[1]));
  });
    

  Plotly.setPlotConfig({
  mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
  });

  var div = document.getElementById("myDiv");
  Plotly.plot(div, data, layout)
    .then(gd => {
      gd.on('plotly_click', d => {
        var pt = (d.points || [])[0]
        console.log(pt);
        redirectToBio(pt, jArray);
      });
    });
}


function redirectToBio(pt, jArray){
  var person = findPerson(pt, jArray);
  localStorage.setItem("person", JSON.stringify(person));
  window.location.href = 'bio.html';
}

function findPerson(pt, jArray){
  var people = jArray.filter(function( person ) {
    return person.name == pt.text && person.lat_long[0] == pt.lat && person.lat_long[1] == pt.lon;
  });
  return people[0];
}


