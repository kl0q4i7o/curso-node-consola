require('colors');

const { guardarData, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausaMenu, 
    leerInput, 
    listadoTareasBorrar,
    confirmarAccion,
    mostrarListadoCheck,
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {

    let opt = '';    
    const tareasClass = new Tareas();
    const tareasDB = leerDB();

    if ( tareasDB ) {
        // Establecer tareas
        tareasClass.cargarTareasFromArray( tareasDB );
    }

    do {
        // Esperar hasta tener la resolución de mostrar menu. Si no no continúa.
        // Despues de resolver lo guarda en opt.
        opt = await inquirerMenu();

        switch ( opt ) {
            case '1':
                // Creamos opción
                const inputDesc = await leerInput('Descripción: ');
                tareasClass.crearTarea( inputDesc )
            break;
            
            case '2':
                // Listamos tareas
                tareasClass.listadoCompleto();
            break;

            case '3':
                // Listar completadas
                tareasClass.listarPendientesCompletadas(true);
            break;

            case '4':
                tareasClass.listarPendientesCompletadas(false);
            break;

            case '5':
                const idSelected = await mostrarListadoCheck( tareasClass.listadoArr );
                tareasClass.toggleCompletadas( idSelected );
            break;

            case '6':
                const id = await listadoTareasBorrar( tareasClass.listadoArr );
                // TODO: Verificar si el ID es igual a 0
                if ( id !== 0) {
                    // TODO: Preguntar si el usuario está seguro de borrar.
                    const preguntaVerificar = await confirmarAccion(`${'¿Estás seguro?'.red}`);
                    if ( preguntaVerificar ) {
                        tareasClass.borrarTarea( id );
                        console.log("\n[!] Tarea borrada.".red)
                    }
                }
                break;
        }

        guardarData( tareasClass.listadoArr );

        // Espera a que se complete lo de arriba para continuar. Solo se da si la opción es diferente a 0
        if ( opt !== '0') await pausaMenu();

    } while ( opt !== '0');
    console.log("\n[!] Hasta luego!".red)
}

main();