function fillBio(){
	var person = JSON.parse(localStorage.getItem("person"));
	console.log(person);

	document.getElementById("name").innerHTML = person.name;
	document.getElementById("message").innerHTML = person.message;
}