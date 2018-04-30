function fillBio(){
	var person = JSON.parse(localStorage.getItem("person"));
	console.log(person);

	document.getElementById("name").innerHTML = person.name;
	document.getElementById("message").innerHTML = person.message;
	var url = person.url;
	var urlLength = url.length;
	if(person.url.substring(0,1) == "/"){
		document.getElementById("website").href = "http://"+url.substring(2,urlLength);
	}
	else{
		document.getElementById("website").href += url;
	}

	console.log(document.getElementById("website").href);
	
	for(var i=0; i<person.project.length; i++){
		document.getElementById("projects").innerHTML += person.project[i]+", ";
	}
	var proj = document.getElementById("projects");
	proj.innerHTML = proj.innerHTML.substring(0, proj.innerHTML.length-2);

	for(var i=0; i<person.terms_on.length; i++){
		document.getElementById("terms").innerHTML += person.terms_on[i]+", ";
	}
	var proj = document.getElementById("terms");
	proj.innerHTML = proj.innerHTML.substring(0, proj.innerHTML.length-2);
	console.log(proj.innerHTML);

	document.getElementById("profpic").src += person.iconUrl;
}