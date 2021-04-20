// ************************************
// *     EJERCICIO 1                   *
// ************************************

// ============== Point =======================

function Point (x, y) {
	this.x = x;
	this.y = y;    
}

// ============== Rectangle ====================
function Rectangle() {}

Rectangle.prototype.init = function(p1,p2) {
	this.px = p1.x;
	this.py = p1.y;
	this.width = p2.x - p1.x;
	this.height = p2.y - p1.y;
	this.lineWidth= 1;
	this.color = 'black';
}

Rectangle.prototype.draw = function() {

	// TU CÓDIGO AQUÍ:
	// pinta un rectángulo del color actual en pantalla en la posición px,py, con
	// la anchura y altura actual y una línea de anchura=lineWidth. Ten en cuenta que 
	// en este ejemplo la variable ctx es global y que guarda el contexto (context) 
	// para pintar en el canvas.

	ctx.fillStyle = this.color;
	ctx.fillRect(this.px,this.py,this.width, this.height);

	ctx.strokeStyle = "#000000";
	ctx.lineWidth = this.lineWidth;
	ctx.strokeRect(this.px,this.py,this.width, this.height);

	
}

Rectangle.prototype.setLineWidth = function(width) { this.lineWidth=width}
Rectangle.prototype.setFill = function(color) { this.color = color}

//** Método introducido en el EJERCICIO 4 */

Rectangle.prototype.move = function(x,y){
	this.px += x;
	this.py += y;
	this.draw();
}

//** Método introducido en el EJERCICIO 4 */

Rectangle.prototype.erase = function(){
	ctx.beginPath();
	ctx.lineWidth = this.lineWidth+2;
	ctx.strokeStyle = Tetris.BOARD_COLOR;
	ctx.rect(this.px, this.py, this.width, this.height);
	ctx.stroke();
	ctx.fillStyle = Tetris.BOARD_COLOR;
	ctx.fill()

}

// ============== Block ===============================

function Block (pos, color) {


	// TU CÓDIGO AQUÍ: este es el constructor de la clase Block. Recibe dos parámetros, pos y color. Pos = posición de la celda, por ejemplo, (9,19).
	// color = color que hay que emplear para pintar el bloque.
	// Internamente este método crea dos puntos (empleando las coordenadas del pixel)
	// y llama al método init de la clase Rectangle, pasándole como parámetro,
	// estos dos puntos.
	// Sería interesante que emplearas las constantes Block.BLOCK_SIZE y Block.OUTLINE_WIDTH,
	// para establecer la anchura del bloque y la anchura de la línea.

	this.x = pos.x;
	this.y = pos.y;
	let posCasilla = new Point(pos.x * Block.BLOCK_SIZE, pos.y * Block.BLOCK_SIZE); 

	this.init(posCasilla, new Point(posCasilla.x + Block.BLOCK_SIZE, posCasilla.y + Block.BLOCK_SIZE));
	this.lineWidth = Block.OUTLINE_WIDTH;
	this.color = color;

}

Block.BLOCK_SIZE = 30;
Block.OUTLINE_WIDTH = 2;

// TU CÓDIGO AQUÍ: emplea el patrón de herencia (Block es un Rectangle)
Block.prototype = Object.create(Rectangle.prototype);

/** Método introducido en el EJERCICIO 4 */

Block.prototype.move = function(dx, dy) {
	this.x += dx;
	this.y += dy;

	Rectangle.prototype.move.call(this, dx * Block.BLOCK_SIZE, dy * Block.BLOCK_SIZE);
}

 /**************************************************
 *	 Código que se da dado para el EJERCICIO 5 *
 ***************************************************/

Block.prototype.can_move = function(board, dx, dy) {
   // TU CÓDIGO AQUÍ: toma como parámetro un increment (dx,dy)
  // e indica si es posible mover el bloque actual si 
 // incrementáramos su posición en ese valor

	return board.can_move(this.x + dx, this.y + dy);

}

// ************************************
// *      EJERCICIO 2                  *
// ************************************

function Shape() {}

Shape.prototype.init = function(coords, color) {

	// TU CÓDIGO AQUÍ: método de inicialización de una Pieza del tablero
	// Toma como parámetros: coords, un array de posiciones de los bloques
	// que forman la Pieza y color, un string que indica el color de los bloques
	// Post-condición: para cada coordenada, crea un bloque de ese color y lo guarda en un bloque-array.
	
	this.blocks = [];
	coords.forEach(coord => {
		this.blocks.push(new Block(coord,color));
	});
};

Shape.prototype.draw = function() {

	// TU CÓDIGO AQUÍ: método que debe pintar en pantalla todos los bloques
	// que forman la Pieza
	this.blocks.forEach(block => {
		block.draw();
	})

};

 /**************************************************
 *	 Código que se da dado para el EJERCICIO 5 *
 ***************************************************/

Shape.prototype.can_move = function(board, dx, dy) {

// TU CÓDIGO AQUÍ: comprobar límites para cada bloque de la pieza
	for(block of this.blocks){
		if(block.can_move(board, dx, dy) == false){
			return false;
		}
	}
	return true;
};

/* Método introducido en el EJERCICIO 4 */

Shape.prototype.move = function(dx, dy) {
   
	for (block of this.blocks) {
		block.erase();
	}

	for (block of this.blocks) {
		block.move(dx,dy);
	}
};


// ============= I_Shape ================================
function I_Shape(center) {
	var coords = [new Point(center.x - 2, center.y),
			  new Point(center.x - 1, center.y),
			  new Point(center.x , center.y),
			  new Point(center.x + 1, center.y)];
   
	Shape.prototype.init.call(this, coords, "#0000FFFF");   

}

// TU CÓDIGO AQUÍ: La clase I_Shape hereda de la clase Shape
I_Shape.prototype = Object.create(Shape.prototype);


// =============== J_Shape =============================
function J_Shape(center) {

   // TU CÓDIGO AQUÍ: Para programar J_Shape toma como ejemplo el código de la clase I_Shape
   var coords = [new Point(center.x + 1, center.y),
	   new Point(center.x - 1, center.y),
	   new Point(center.x , center.y),
	   new Point(center.x + 1, center.y + 1)];

   Shape.prototype.init.call(this, coords, "orange"); 

}

// TU CÓDIGO AQUÍ: La clase J_Shape hereda de la clase Shape
J_Shape.prototype = Object.create(Shape.prototype);

// ============ L Shape ===========================
function L_Shape(center) {

   // TU CÓDIGO AQUÍ: Para programar L_Shape toma como ejemplo el código de la clase I_Shape
   var coords = [new Point(center.x - 1, center.y + 1),
	   new Point(center.x - 1, center.y),
	   new Point(center.x + 1, center.y),
	   new Point(center.x, center.y)];
   Shape.prototype.init.call(this, coords, "cyan");
}

// TU CÓDIGO AQUÍ: La clase L_Shape hereda de la clase Shape
L_Shape.prototype = Object.create(Shape.prototype);

// ============ O Shape ===========================
function O_Shape(center) {

   // TU CÓDIGO AQUÍ: Para programar O_Shape toma como ejemplo el código de la clase I_Shape
   var coords = [new Point(center.x - 1, center.y + 1),
	   new Point(center.x - 1, center.y),
	   new Point(center.x , center.y),
	   new Point(center.x, center.y + 1 )];
   Shape.prototype.init.call(this, coords, "red");

}
	   
// TU CÓDIGO AQUÍ: La clase O_Shape hereda de la clase Shape
O_Shape.prototype = Object.create(Shape.prototype);

// ============ S Shape ===========================
function S_Shape(center) {

   // TU CÓDIGO AQUÍ: Para programar S_Shape toma como ejemplo el código de la clase I_Shape 
   var coords = [new Point(center.x - 1, center.y + 1),
	   new Point(center.x, center.y + 1),
	   new Point(center.x , center.y),
	   new Point(center.x + 1, center.y)];
   Shape.prototype.init.call(this, coords, "green");

}

// TU CÓDIGO AQUÍ: La clase S_Shape hereda de la clase Shape
S_Shape.prototype = Object.create(Shape.prototype);

// ============ T Shape ===========================
function T_Shape(center) {

   // TU CÓDIGO AQUÍ: : Para programar T_Shape toma como ejemplo el código de la clase I_Shape
   var coords = [new Point(center.x, center.y + 1),
	   new Point(center.x - 1, center.y),
	   new Point(center.x , center.y),
	   new Point(center.x + 1, center.y)];
   Shape.prototype.init.call(this, coords, "yellow");

}

// TU CÓDIGO AQUÍ: La clase T_Shape hereda de la clase Shape
T_Shape.prototype = Object.create(Shape.prototype);

// ============ Z Shape ===========================
function Z_Shape(center) {
   
   // TU CÓDIGO AQUÍ: : Para programar Z_Shape toma como ejemplo el código de la clase I_Shape
   var coords = [new Point(center.x + 1, center.y + 1),
	   new Point(center.x - 1, center.y),
	   new Point(center.x , center.y),
	   new Point(center.x, center.y + 1)];
   Shape.prototype.init.call(this, coords, "magenta");
}

// TU CÓDIGO AQUÍ: La clase Z_Shape hereda de la clase Shape
Z_Shape.prototype = Object.create(Shape.prototype);


// ************************************
// *     EJERCICIO 3               *
// ************************************

// ====================== BOARD ================

function Board(width, height) {
	this.width = width;
	this.height = height;
	this.grid = {}; /* 6. Estructura de datos introducida en el EJERCICIO 6 */
}

// Si la pieza nueva puede entrar en el tablero, pintarla y devolver true.
// Si no, devoler false

Board.prototype.draw_shape = function(shape){
	if (shape.can_move(this,0,0)){
		shape.draw();
		return true;
	}
	return false;
}

 /*****************************
 *	 EJERCICIO 6          *
 *****************************/

Board.prototype.add_shape = function(shape){

	// TU CÓDIGO AQUÍ: meter todos los bloques de la pieza que hemos recibido por parámetro en la estructura de datos grid
	for(block of shape.blocks){
		this.grid[[block.x, block.y]] = block;
	}
}

// ****************************
// *     EJERCICIO 5          *
// ****************************

Board.prototype.can_move = function(x,y){

 	// TU CÓDIGO AQUÍ: 
 	// hasta ahora, este método siempre devolvía el valor true. Ahora,
 	// comprueba si la posición que se le pasa como párametro está dentro de los  
	// límites del tablero y en función de ello, devuelve true o false.
	return !([x,y] in this.grid) && x < this.width && y < this.height && x >= 0 && y >= 0;

	/* EJERCICIO 7 */
	// TU CÓDIGO AQUÍ: código para detectar colisiones. Si la posición x,y está en el diccionario grid, devolver false y true en cualquier otro caso.
};

// ==================== Tetris ==========================

function Tetris() {
	this.board = new Board(Tetris.BOARD_WIDTH, Tetris.BOARD_HEIGHT);
}

Tetris.SHAPES = [I_Shape, J_Shape, L_Shape, O_Shape, S_Shape, T_Shape, Z_Shape];
Tetris.DIRECTION = {'Left':[-1, 0], 'Right':[1, 0], 'Down':[0, 1]};
Tetris.BOARD_WIDTH = 10;
Tetris.BOARD_HEIGHT = 20;
Tetris.BOARD_COLOR='white';

Tetris.prototype.create_new_shape = function(){

	// TU CÓDIGO AQUÍ: 
	// Elegir un nombre de pieza al azar del array Tetris.SHAPES
	// Crear una instancia de ese tipo de pieza (x = centro del tablero, y = 0)
	// Devolver la referencia de esa pieza nuevad
	return new Tetris.SHAPES[Math.floor(Math.random() * (Tetris.SHAPES.length))](new Point(Tetris.BOARD_WIDTH/2,0));
}

Tetris.prototype.init = function(){

    /**************
     EJERCICIO 4
    ***************/

	// gestor de teclado

	document.addEventListener('keydown', this.key_pressed.bind(this), false);

	// Obtener una nueva pieza al azar y asignarla como pieza actual

	this.current_shape = this.create_new_shape()

	// TU CÓDIGO AQUÍ: 
	// Pintar la pieza actual en el tablero
	// Aclaración: (Board tiene un método para pintar)
	this.board.draw_shape(this.current_shape);

}

Tetris.prototype.key_pressed = function(e) { 

	var key = e.keyCode ? e.keyCode : e.which;

	   // TU CÓDIGO AQUÍ:
   // en la variable key se guardará el código ASCII de la tecla que
   // ha pulsado el usuario. ¿Cuál es el código key que corresponde 
   // a mover la pieza hacia la izquierda, la derecha, abajo o a rotarla?

   switch(key){
	   case 32:
		   //Evento cuando pulsa el espacio (Debe caer hasta el final del tablero)
		   this.do_move('Drop');
		   break;
	   case 37:
		   this.do_move('Left');
		   break;
	   case 39:
		   this.do_move('Right');
		   break;
	   case 40:
		   this.do_move('Down');
		   break;
   }
}

Tetris.prototype.do_move = function(direction) {

	// TU CÓDIGO AQUÍ: el usuario ha pulsado la tecla Left, Right o Down (izquierda,
	// derecha o abajo). Tenemos que mover la pieza en la dirección correspondiente
	// a esa tecla. Recuerda que el array Tetris.DIRECTION guarda los desplazamientos 
	// en cada dirección, por tanto, si accedes a Tetris.DIRECTION[direction], 
	// obtendrás el desplazamiento (dx, dy). A continuación analiza si la pieza actual 
	// se puede mover con ese desplazamiento. En caso afirmativo, mueve la pieza. 

	if(direction == 'Drop'){
		direction_vector = Tetris.DIRECTION["Down"];
		//Mientras pueda caer, la pieza irá bajando
		while(this.current_shape.can_move(this.board, direction_vector[0], direction_vector[1])){
			this.current_shape.move(direction_vector[0], direction_vector[1]);
		}
		//Una vez ya esté abajo del todo lo añadiremos al grip y crearemos una pieza nueva.
		this.board.add_shape(this.current_shape);

		this.current_shape = this.create_new_shape();
		this.board.draw_shape(this.current_shape);
		return;
	}


	direction_vector = Tetris.DIRECTION[direction];

	if(this.current_shape.can_move(this.board, direction_vector[0], direction_vector[1])){
		this.current_shape.move(direction_vector[0], direction_vector[1]);
	}else if(direction=='Down'){
		this.board.add_shape(this.current_shape);

		this.current_shape = this.create_new_shape();
		this.board.draw_shape(this.current_shape);
	}

		/* Código que se pide en el EJERCICIO 6 */
	// else if(direction=='Down')
	// TU CÓDIGO AQUÍ: añade la pieza actual al grid. Crea una nueva pieza y dibújala en el tablero.
}
