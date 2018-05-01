function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      jArray = JSON.parse(this.responseText);
      filterMap();
    }
  };
  xhttp.open("GET", "http://mappy.dali.dartmouth.edu/members.json", true);
  xhttp.send();
}
loadDoc();

//This is the format plot.ly likes
function Datapoint(name,lat,lon){
  this.type = 'scattermapbox';
  this.lat = [lat];
  this.lon = [lon];
  this.mode = 'markers';
  this.marker = {size:14};
  this.text = [name];
}

//Gets rid of people that do not fix the checked boxes
function filterMap(){
  var W17 = document.getElementById("17W").checked;
  var S17 = document.getElementById("17S").checked;
  var filter = jArray.slice();

  if(W17){
     filter = filter.filter(function( person ) {
     return person.terms_on.indexOf("17W") > -1;
     });
  }
  if(S17){
    filter = filter.filter(function( person ) {
     return person.terms_on.indexOf("17S") > -1;
     });
  }
  loadMap(filter);
}


//Main map building function
function loadMap(jArray){
  console.log(jArray);

  var layout = {
    visible: false,
    showlegend: false,
    autosize: true,
    hovermode:'closest',
    mapbox: {
      bearing:0,
      center: {
        lat: 40,
        lon:-95
      },
      pitch:0,
      zoom:3
    },
  }
  var data = [];

  //Creates the newly formated datapoint
  jArray.forEach( function(p){
    data.push(new Datapoint(p.name, p.lat_long[0], p.lat_long[1]));
  });
    

  Plotly.setPlotConfig({
  mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
  });


  var div = document.getElementById("myDiv");
  //This is some tricky stuff I googled. It creates an event function for all datapoints
  Plotly.newPlot(div, data, layout)
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

//Finds the person according to the datapoint
function findPerson(pt, jArray){
  var people = jArray.filter(function( person ) {
    return person.name == pt.text && person.lat_long[0] == pt.lat && person.lat_long[1] == pt.lon;
  });
  return people[0];
}


