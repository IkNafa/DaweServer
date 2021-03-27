import {Producto} from "./productos.js";

var _paginaActual = Symbol();

class Libro extends Producto {

	constructor(titulo, autor, precio){
		super(titulo, autor, precio);
		this[_paginaActual] = 0;

		// Nota: la implementación de clases de ES2015/ES6 facilita la implementación de código OOP,
		// pero carece de una opción sencilla para incluir atributos privados. Ver:
		// http://stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes
		// Existen formas, pero son más complejas que hacer un simple var _paginaActual, como se ha visto en los ejemplos previos a ES2015
		// http://www.2ality.com/2016/01/private-data-classes.html
		// https://gist.github.com/greim/44e54c2f23eab955bb73b31426e96d6c
		// En este ejemplo he optado por hacer uso de Symbol(), una nueva opción de ES6, que devuelve un identificador único. Desde la consola
		// un objeto libro no expondrá el atributo this[_paginaActual]  - si tecleas libro1. <-- verás que tras el punto no aparece ese atributo.
		// Sin embargo, lo considero un hack (un apaño). Mientras tanto, si no queremos hacer uso de Symbol() para simular atributos privados, 
		// o bien seguimos haciendo uso de la forma clásica (evitamos class en ES2015 y podemos seguir simulando OOP) 
		// o usamos atributos públicos con alguna marca que nos permita identificarlos rápidamente como algo que el programador quiere marcarlo como privado
		// Por convención, se suele usar el _ como prefijo en atributos privados (como aviso a navegantes, aunque
		// sabemos que el intérprete JavaScript no lo tendrá en cuenta, claro...)

		// NOTA: hay una propuesta para incluir soporte de atributos privados en la siguiente versión de ECMAScript
		// https://github.com/tc39/proposal-private-fields
	}


	marcador(pagina){
		this[_paginaActual] = pagina;
		this.obtenerPagina();
	}

	pasarPagina(){
		this[_paginaActual]++;
	}

	obtenerPagina(){
		console.log("Estoy en la página: " + this[_paginaActual]);
	}
}

export {Libro}