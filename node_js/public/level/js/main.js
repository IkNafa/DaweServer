import {loadLevel} from './loaders.js';


const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

let offset = 0;

loadLevel().
    then( level => {
            
            level.draw(context,offset);
            level.tiles.forEach((value,x,y) => {
                console.log(value,x,y);
            })

            var move = () => {
                if(offset < 100){
                    offset++;
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    level.draw(context,offset);
                    requestAnimationFrame(move);   
                }

            }

            move();

    });


