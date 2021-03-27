import {Disco} from "./discos.js";
import {Libro} from "./libros.js";

var libro1 = new Libro("Dublinés", "Alfonso Zapico", 18);
var libro2 = new Libro("El arte de volar","Antonio Altarriba y Kim",20.90);
var disco1 = new Disco("Próxima estación: Esperanza", "Manu Chao", 15, "CD");

var tienda = []

tienda.push(libro1);
tienda.push(libro2);
tienda.push(disco1);

export {tienda};