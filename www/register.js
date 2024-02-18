var divs=new Array();
divs[0]="errFirst";
divs[1]="errLast";
divs[2]="errEmail";
divs[3]="errBdate"
divs[4]="errUname";
divs[5]="errPwd";

document.getElementById("submit").disabled = true;

changeLogin();

function validate(){
  var inputs=new Array();
  inputs[0]=document.getElementById("firstname").value;
  inputs[1]=document.getElementById("lastname").value;
  inputs[2]=document.getElementById("useremail").value;
  inputs[3]=document.getElementById("birthdate").value;
  inputs[4]=document.getElementById("username").value;
  inputs[5]=document.getElementById("userpwd").value;

  var errors= new Array();
  errors[0]="<span>Entrez votre prénom</span>";
  errors[1]="<span>Entrez votre nom</span>";
  errors[2]="<span>Entrez votre e-mail</span>";
  errors[3]="<span>Entrez votre date de naissance au format jj/mm/aaaa</span>";
  errors[4]="<span>Entrez votre nom d'utilisateur</span>";
  errors[5]="<span>Entre votre mot de passe</span>";

  for(i in inputs){
    var errMsg=errors[i];
    var divMsg=divs[i];
    if(inputs[i]=="" && i!=3){
      document.getElementById(divMsg).innerHTML=errMsg;
      document.getElementById("submit").disabled = true;
    }

    else if(i==2){
      var atpos=inputs[i].indexOf("@");
      var dotpos=inputs[i].lastIndexOf(".");
      if(atpos<1 || dotpos<atpos+2 || dotpos+2>=inputs[i].length){
        // le @ est en premier OU le point est juste après le @ OU il y'a moins de 2 caractères après le point
        document.getElementById("errEmail").innerHTML="<span>Entrez une adresse mail valide</span>";
        document.getElementById("submit").disabled = true;
      }
      else{
        document.getElementById(divMsg).innerHTML="OK!";
      }
    }

    else if(i==3){
      if(inputs[i] != ""){
        var birthdate = inputs[i];
        var format = /^(\d{2}\/){2}\d{4}$/;
        var formatValid = true;
        if(!format.test(birthdate)){
          formatValid = false;
          document.getElementById("errBdate").innerHTML="<span>Entrez une date au format jj/mm/aaaa</span>";
          document.getElementById("submit").disabled = true;
        }
        else{
          var date_temp = birthdate.split('/');
          date_temp[1] -= 1; // On rectifie le mois
          if(date_temp[0] == 31){
            date_temp[0] -= 1;
          }
          var ma_date = new Date();
          ma_date.setDate(date_temp[0]);
          ma_date.setMonth(date_temp[1]);
          ma_date.setFullYear(date_temp[2]);
          if(ma_date.getFullYear() == date_temp[2] && ma_date.getMonth() == date_temp[1] && ma_date.getDate() == date_temp[0]){
            document.getElementById(divMsg).innerHTML="OK!";
          }
          else{
            document.getElementById("errBdate").innerHTML="<span>Entrez une date valide</span>";
            document.getElementById("submit").disabled = true;
          }
        }
      }
      else{
        document.getElementById(divMsg).innerHTML="OK!";
      }
    }

    else if(i==4){
      if(inputs[i].length < 6){
        document.getElementById("errUname").innerHTML="<span>Votre nom d'utilisateur doit contenir au moins 6 caractères</span>";
        document.getElementById("submit").disabled = true;
      }
      else{
        document.getElementById(divMsg).innerHTML="OK!";
      }
    }

    else if(i==5){
      var userpwd = document.getElementById("userpwd").value; 
      if (userpwd.match(/[0-9]/g) && userpwd.match(/[A-Z]/g) && userpwd.match(/[a-z]/g) && userpwd.length >= 8){
        document.getElementById(divMsg).innerHTML="OK!";
      }
      else{
        document.getElementById("errPwd").innerHTML=
        "<span>Votre mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre</span>";
        document.getElementById("submit").disabled = true;
      }
    }

    else{
      document.getElementById(divMsg).innerHTML="OK!";
    }
  }

  var count = 0;
  for(i=0; i<6; i++){
    var divMsg = divs[i];
    if(document.getElementById(divMsg).innerHTML == "OK!"){
      count += 1;
    }
  }
  if(count == 6){
    document.getElementById("errFinal").innerHTML = "Les données sont correctes";
    document.getElementById("submit").disabled = false;
  }
  else{
    document.getElementById("errFinal").innerHTML="Veuillez remplir tous les champs correctement";
  }
}

function changeLogin(){
	const log = document.getElementById("login");
	if(localStorage.getItem('connecté') == "1"){
		log.innerHTML = localStorage.getItem('prenom');	
	}
  }