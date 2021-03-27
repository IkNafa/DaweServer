class Producto {

	constructor(titulo, autor, precio){
		this.titulo = titulo;
		this.autor = autor;
		this.precio = precio;
	}

	mostrar(){

		var contenido = "Producto:" + this.titulo + "<br/>" + "Autor:" + this.autor + "<br/>"  + "Precio:" + this.precio + "<hr/>";
		return contenido;

	}

}

export {Producto}
