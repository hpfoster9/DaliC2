function fillBio(){
	var person = JSON.parse(localStorage.getItem("person"));
	console.log(person);

	document.getElementById("name").innerHTML = person.name;
	document.getElementById("message").innerHTML = person.message;
	document.getElementById("website").innerHTML = person.url;
	
	for(var i=0; i<person.project.length; i++){
		document.getElementById("projects").innerHTML += person.project[i]+", ";
	}
	var proj = document.getElementById("projects").innerHTML;
	proj = proj.substring(0, proj.length-3);

	for(var i=0; i<person.terms_on.length; i++){
		document.getElementById("terms").innerHTML += person.terms_on[i]+", ";
	}
	var proj = document.getElementById("terms").innerHTML;
	proj = proj.substring(0, proj.length-3);
}