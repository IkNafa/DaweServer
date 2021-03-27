window.onload = ()=>{
    var dropbox = document.getElementById("dropbox")

    dropbox.addEventListener("dragenter",dragOver,false);
    dropbox.addEventListener("dragexit",dragOver,false);
    dropbox.addEventListener("dragover",dragOver, false);
    dropbox.addEventListener("drop",gestorFicheros, false);
}

function dragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.className = (evt.type == "dragover" ? "hover" : "");
}

function gestorFicheros(e) {
    dragOver(e);

    var files = e.target.files || e.dataTransfer.files;

    if(files.length < 2){
        alert("Tienen que ser al menos 2 ficheros");
        return;
    }

    for(var i=0,f; f=files[i]; i++){
        parsearFichero(f);
    }

    var formFiles = document.getElementById("form").fileselect;
    if (formFiles.files.length == 0){
        formFiles.files = files;
    }
}

function parsearFichero(file) {
    let datos = `Datos del fichero: <b>${file.name}</b> Tipo: <b>${file.type}</b> Tamaño: <b>${file.size}</b> bytes`;
    log(datos);
}

function log(message){
    var messageDiv = document.getElementById("mensajes");
    messageDiv.innerHTML += `${message}<br>`;
}

function enviar(){

    if(!check()){
        alert("Los datos introducidos no son correctos");
        return;
    }

    var formData = new FormData(document.getElementById("form"));

    const url = '/pedidos/add'
    fetch(url, {
        method: 'POST',
        body: formData
    }).then(resp => resp.json()).then(resp => {

        console.log(resp);

        let data = resp[0];
        log(`<b>Datos enviados:</b><br>
            -Nombre: ${data.name}<br>
            -Teléfono: ${data.tel}<br>
            -Email: ${data.email}<br>
            -Cantidad Libros: ${data.numBook}`);
        
        for(let i=1; i<resp.length; i++){
            const imagen = `<img src=${resp[i].file} width="100" height="100"/>`;
            console.log(imagen);
            log(imagen);
        }
    })
    
}

function check(){
    var name = document.getElementById("name").value
    var tel = document.getElementById("tel").value
    var email = document.getElementById("email").value

    var numBook = document.getElementById("numBook").value
    var numFiles = document.getElementById("form").fileselect.files.length;
    
    return !(name == null || name == "" ||
           tel == null || tel == "" ||
           email == null || email == "" ||
           numBook == null || numBook < 1 || numBook > 5 ||
           numFiles != 2);
}