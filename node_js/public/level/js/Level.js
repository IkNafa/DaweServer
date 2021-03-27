import {Matrix} from './math.js';

export default class Level {
    constructor() {
        this.tiles = new Matrix();
        this.background = null;
    }

    draw(context, offset){
       // Ejercicio 9. Tema 5: Canvas
        // dibujar en el contexto la imagen de background con el
        // desplazamiento indicado en el parámetro offset
        // (recuerda que el contexto tiene unas dimensiones de 300x300)

        context.drawImage(this.background,offset,0,300,300,0,0,600,600);
    }
}

