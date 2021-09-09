// Para un id único a nivel mundial. Sacamos v4 de uuid y lo renombramos.
const { v4: uuidv4 } = require('uuid');

class Tarea {

    // Definimos clases.
    id = '';
    desc = '';
    // Si está en null no está completado.
    completadoEn = null;

    // Se ejecuta cuando hacemos una instancia de nuestra clase.
    // Pedimos la desc de la tarea
    constructor( desc ) {
        // This hace referencia a la instancia de la clase.
        this.desc = desc;
        this.id = uuidv4();
        this.completadoEn = null;
    }

}

// Lo hago así para no importar con destructuración
module.exports = Tarea;