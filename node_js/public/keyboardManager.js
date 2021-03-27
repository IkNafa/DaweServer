// Clase con el patrón Singleton
class KeyboardManager{
    constructor(){
        if(!!KeyboardManager.instance){
            return KeyboardManager.instance;
        }

        KeyboardManager.instance = this;

        return this;
    }

    keyManage(ev){
        let char = ev.char || ev.charCode || ev.which;
        let charName;


        if(char >=37 && char <= 40){
            
            ev.preventDefault();
            switch(char){
                case 37:
                    charName = "Izquierda";
                    break;
                case 38:
                    charName = "Arriba";
                    break;
                case 39:
                    charName = "Derecha";
                    break;
                case 40:
                    charName = "Abajo";
                    break;
            }
            
            alert(`Has pulsado flecha ${charName}`);
        }
    }
}

export {KeyboardManager}