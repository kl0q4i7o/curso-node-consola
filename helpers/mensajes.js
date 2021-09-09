require('colors');

const mostrarMenu = () => {
    return new Promise( ( resolve ) => {
        console.clear();
        console.log("\n=====================".red);
        console.log("Seleccione una opción".white);
        console.log("=====================\n".red);
    
        console.log(`${ '1.'.red } Crear tarea`);
        console.log(`${ '2.'.red } Listar tareas`);
        console.log(`${ '3.'.red } Listar tareas completadas`);
        console.log(`${ '4.'.red } Listar tareas pendientes`);
        console.log(`${ '5.'.red } Completar tarea(s)`);
        console.log(`${ '6.'.red } Borrar tarea(s)`);
        console.log(`${ '0.'.red } Salir\n`);
    
        // Creamos interfaz para recibir información del usuario.
        // Nos permite leer datos de la consola antes de que el proceso termine.
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        // Question es para realizar una pregunta al usuario y registrar su dato. Se ejecuta un callback.
        readLine.question("Seleccione una opción: ", ( opt ) => {
            // Se colocan las llaves para mostrar nombre de clave y su valor.
            // console.log({ opt });
            // Cerramos el readline. Aquí indicamos que ya recogimos la información del usuario.
            readLine.close();
            resolve( opt );
        });
    })
}

const pausaReadLine = ( ) => {
    return new Promise ( ( resolve ) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`\nPresione ${'Enter'.red} para continuar: `, ( opt ) => {
            readLine.close();
            resolve();
        });
    })
}

module.exports = {
    mostrarMenu,
    pausaReadLine,
}