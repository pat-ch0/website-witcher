const message = document.getElementsByName("messagesend")[0];
const xhttpSend = new XMLHttpRequest();
const xhttpGet = new XMLHttpRequest();
const button = document.getElementsByName("Send")[0];


changeLogin();

message.addEventListener('keypressed', function(e){
    if(e.key=='Enter'){
        sendMsg();
    }
});

button.addEventListener('click', sendMsg);

xhttpSend.onload = error;
xhttpGet.onload = getMsg;
xhttpGet.open("GET", "htbin/chatget.py", true);
xhttpGet.send();

function getMsg(){
    document.getElementById("messageRecu").innerHTML = "";
    let Message = this.responseText;
    let dateTemp = "";
    let userTemp = "";
    let msgTemp = "";
    let timeTemp = "";
    let enregistrement = -1;

    for(let i=0;i<Message.length;i++){
        if(enregistrement == -1){
            if(Message[i] == 'd' && Message[i-1] == "\""){
                i += 8;
                enregistrement = 1;
            }
            else if(Message[i] == "m" && Message[i-1] == "\""){
                i += 7;
                enregistrement = 2;
            }
            else if(Message[i] == "u" && Message[i-1] == "\""){
                i += 8;
                enregistrement = 3;
            }else if(Message[i] == "t" && Message[i-1] == "\""){
                i += 8;
                enregistrement = 4;
            }else if(Message[i] == "}"){
                document.getElementById("messageRecu").innerHTML += "<p>("+timeTemp+" "+dateTemp+" | "+userTemp+"): "+msgTemp+"</p>";
                dateTemp = "";
                userTemp = "";
                msgTemp = "";
                timeTemp = "";
            }
        }

        if(Message[i] == "\""){
            enregistrement = -1;
        }

        switch(enregistrement){
            case 1:
                dateTemp += Message[i];
                break;
            case 2:
                msgTemp += Message[i];
                break;
            case 3:
                userTemp += Message[i];
                break;
            case 4:
                timeTemp += Message[i];
                break;
            default:
                break;
        }
    }
}

function sendMsg(){
    xhttpSend.open("POST", 'htbin/chatsend.py', true);
    xhttpSend.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttpSend.send("msg=" + message.value + "&username=" + localStorage.getItem("username"));
    xhttpGet.open("GET", "htbin/chatget.py", true);
    xhttpGet.send();

}

function error(){
    console.log(this.responseText)
}

function changeLogin(){
	const log = document.getElementById("login");
	if(localStorage.getItem('connecté') == "1"){
		log.innerHTML = localStorage.getItem('prenom');	
	}
  }

