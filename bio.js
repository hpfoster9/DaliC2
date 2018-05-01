function fillBio(){
	var person = JSON.parse(localStorage.getItem("person"));

	document.getElementById("name").innerHTML = person.name;
	document.getElementById("message").innerHTML = person.message;

	//I had to do this because 'person.url.length' was giving a weird bug
	var url = person.url;
	var urlLength = url.length;

	//Deals with the different url formats
	//website html is initialized to 'http://mappy.dali.dartmouth.edu/'
	if(person.url.substring(0,1) == "/"){
		document.getElementById("website").href = "http://"+url.substring(2,urlLength);
	}
	else{
		document.getElementById("website").href += url;
	}
	
	//Fills in all projects and terms on. Then removes the trailing ', '
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