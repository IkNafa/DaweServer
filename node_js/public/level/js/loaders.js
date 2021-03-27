import Level from './Level.js';
import SpriteSheet from './SpriteSheet.js'
import {createBackgroundLayer} from './layers.js';

export function loadImage(url){

  return new Promise(resolve =>{
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.src = url;
  })
}

function loadJSON(url){
  return fetch(url).then(r1 => r1.json());
}

function createTiles(level, backgrounds){

  let i;
  for(i=0;i<backgrounds.length;i++){
    let background = backgrounds[i];

    let tile = background.tile;

    let j;
    for(j=0; j<background.ranges.length;j++){
      let range = background.ranges[j];

      let x = range[0];
      let y = range[2];
      let sizex = range[0] + range[1];
      let sizey = range[2] + range[3];

      for(let i=x;i<sizex;i++){
        for(let j=y; j<sizey;j++){
          level.tiles.set(i,j,{
            name:tile,
          })
        }
      }
    }
  }
}

function loadSpriteSheet(){
  return loadJSON('sprites/sprites.json')
          .then(sheetSpec => Promise.all([
            sheetSpec,
            loadImage(sheetSpec.imageURL)
          ]))
          .then(([sheetSpec, image]) => {
            const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);
            var i;
            for(i=0;i<sheetSpec.tiles.length;i++){
              let tile = sheetSpec.tiles[i];
              sprites.defineTile(tile.name, tile.index[0], tile.index[1]);
            }
            
            return sprites;

          });
  }


export function loadLevel(){
  return loadJSON('levels/level.json') // qué tiles hay que poner y dónde dentro de este nivel
  .then(levelSpec => Promise.all([
      levelSpec, 
      loadSpriteSheet(), // cargar imágenes de un spritesheet como sprites 
    ]))
      .then(([levelSpec, backgroundSprites]) => {
          const level = new Level();
          createTiles(level, levelSpec.backgrounds); // desplegar tiles en la estrucura Matrix

          const backgroundLayer = createBackgroundLayer(level, backgroundSprites); // cargar canvas
          level.background = backgroundLayer; // canvas buffer 

          return level;
  });
    
}
