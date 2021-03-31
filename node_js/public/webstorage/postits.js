/* postits.js
 *
 */

window.onload = init;

function init() {
	var button = document.getElementById("add_button");
	button.onclick = createSticky;

	var buttonRemove = document.getElementById("remove_button");
	buttonRemove.onclick = clearStickyNotes;

	// EJERCICIO A
	// cargar las notas postit de localStorage  
	// cada nota se guarda como un par así: postit_X = texto_de_la_nota
	// donde X es el número de la nota
	// por cada una de ellas, llamar al método
	// addStickyToDOM(texto_de_la_nota);

	getStorageMemorySize();

	var data = Object.entries(localStorage).filter(data => data[0].startsWith("postit_"));

	for(var i=0; i<data.length; i++){
		var postit = localStorage.getItem(data[i][0]);
		addStickyToDOM(postit);
	}
}

function createSticky() {
	var value = document.getElementById("note_text").value;
	
	// EJERCICIO B
        // crear la nota con nombre postit_X, donde X es un número entero
	// (postit_1, postit_2, ...)  y guardarla en el localStorage
	
	var numPostit = localStorage.length;
	localStorage.setItem(`postit_${numPostit}`,value);

	getStorageMemorySize();

	addStickyToDOM(value);
}


function addStickyToDOM(value) {
	var stickies = document.getElementById("stickies");
	var postit = document.createElement("li");
	var span = document.createElement("span");
	span.setAttribute("class", "postit");
	span.innerHTML = value;
	postit.appendChild(span);
	stickies.appendChild(postit);
}

function clearStickyNotes() {
	// EJERCICIO C
	// Crear un nuevo botón en la ventana de postit notes que al pulsarlo,
	// elimine las notas de pantalla y de localStorage
	// Algoritmo:	
	// obtener una referencia a la capa "stickies"
	// recorrer los hijos (childNodes) de esa referencia,
	// eliminándolos uno a uno (removeChild)

	var keys = Object.entries(localStorage).filter(data => data[0].startsWith("postit_"));

	for(key of keys){
		localStorage.removeItem(key[0]);
	}

	var listapostits = document.getElementById("stickies");

	while(listapostits.firstChild){
		listapostits.removeChild(listapostits.lastChild);
	}

	getStorageMemorySize();
}

function getStorageMemorySize(){
	var _lsTotal = 0,
    _xLen, _x;
	for (_x in localStorage) {
		if (!localStorage.hasOwnProperty(_x)) {
			continue;
		}
		_xLen = ((localStorage[_x].length + _x.length) * 2);
		_lsTotal += _xLen;
	};

	document.getElementById("memory").innerHTML = `Memoria local: ${ (_lsTotal / 1024).toFixed(2)} KB`
}
