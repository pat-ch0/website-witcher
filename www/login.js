const login = document.getElementsByName("login")[0];
const username = document.getElementsByName("username")[0];
const userpwd = document.getElementsByName("userpwd")[0];
const xhttp = new XMLHttpRequest();

login.addEventListener('submit',loginSend);
xhttp.onload = loginRecept;
changeLogin(); 

function loginRecept(){
	document.getElementById("password").innerHTML = "<span>" + this.responseText + "</span>";
	if(this.responseText[0] != 'L'){
		setTimeout(function(){
			location.href = "index.html";
		}, 3000);
		localStorage.setItem('connecté','1');
		localStorage.setItem('username',username.value);
		let prenomNom = this.responseText.substring(8,this.responseText.length - 3);
		let posEsp = 0;
		for(let i=0; i < prenomNom.length; i++){
		  if(prenomNom[i] == ' '){
			posEsp = i;
		  }
		}
		localStorage.setItem('prenom',prenomNom.substring(0,posEsp));
		localStorage.setItem('nom',prenomNom.substring(posEsp+1,prenomNom.length));
	}
}

function loginSend(e){
	e.preventDefault();
	xhttp.open("POST", "htbin/login.py", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhttp.send("username=" + username.value + "&userpwd=" + userpwd.value);
}

function changeLogin(){
	const log = document.getElementById("login");
	if(localStorage.getItem('connecté') == "1"){
		log.innerHTML = localStorage.getItem('prenom');	
	}
  }