changeLogin;

function changeLogin(){
	const log = document.getElementById("login");
	if(localStorage.getItem('connecté') == "1"){
		log.innerHTML = localStorage.getItem('prenom');	
	}
  }