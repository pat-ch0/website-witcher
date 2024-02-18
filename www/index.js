changeLogin();

function changeLogin(){
	const log = document.getElementById("login");
    console.lgo(log);
	if(localStorage.getItem('connecté') == "1"){
		log.innerHTML = localStorage.getItem('prenom');	
	}
  }