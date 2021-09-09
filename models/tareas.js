require('colors');
const Tarea = require('./tarea');

/*  _listado: {
        {
            'uuid-84u921i4-54325325': {
                id: 1,
                desc: 'defefef',
                completadoEn: '942843t3',
            },
        }
    }
*/

String.prototype.capitalize = function () {
    // Toma primer caracter, lo pone en mayúscula y lo agrega.
    return this.charAt(0).toUpperCase() + this.slice(1);
}

class Tareas {

    // Listado de tareas. Manejamos como objeto. Se pone el guión bajo para decir que su uso es privado.
    _listado = {};

    // Getter es como una propiedad en nuestra clase
    get listadoArr() {
        const listado = [];
        // Extraer cada llave de un objeto. Regresa arreglo
        Object.keys(this._listado).forEach( (key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        } );
        return listado;
    }

    constructor( ) {
        this._listado = {};
    }

    borrarTarea( id = '') {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray ( tareas = [] ) {
        
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        } )

    }

    crearTarea( descripcion = '' ) {

        const tarea = new Tarea( descripcion );
        // Asignamos que el valor de la llave inicial será igual al uuid de la Tarea y lo igualamos a la información que esta tiene respectivamente como otro objeto.  
        this._listado[ tarea.id ] = tarea;

    }

    listadoCompleto( ) {
        // Listar tareas
        console.log(this.listadoArr.forEach( ( singleTarea, index ) => {
            let idx = `${ index + 1 }`
            const { desc, completadoEn } = singleTarea;
            const estadoCompletado = ( completadoEn ) ? "Completado".green : "Pendiente".red
            console.log(`${ (idx + '.').red } ${desc.capitalize()} :: ${ estadoCompletado }`);
        }));
    }

    listarPendientesCompletadas( completadas = true ) {
        let counter = 0;

        console.log(this.listadoArr.forEach( ( singleTarea ) => {
            const { desc, completadoEn } = singleTarea;
            const estadoCompletado = ( completadoEn ) ? "Completado".green : "Pendiente".red
            if ( completadas ) {
                if (completadoEn ) {
                    counter += 1;
                    console.log(`${ (counter + '.').red } ${desc.capitalize()} :: ${ estadoCompletado }`);
                }
            } else {
                if ( !completadoEn ) {
                    counter += 1;
                    console.log(`${ (counter + '.').red } ${desc.capitalize()} :: ${ estadoCompletado }`);
                }
            }

        }));
    }

    toggleCompletadas( idSelection = []) {
        idSelection.forEach( (id) => {
            if ( !this._listado[id].completadoEn ) {
                // To iso string generar fecha completa en string.
                this._listado[id].completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach( tarea => {
            // Verificar si el Id seleccionado está dentro y si no está colocar null.
            if ( !idSelection.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;

            }
        })
    }

}

module.exports = Tareas;