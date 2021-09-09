const fs = require('fs');

const  archivo = './database/data.json';

const guardarData = ( data ) => {

    // JSON.stringify() convertir objeto a json
    fs.writeFileSync( archivo, JSON.stringify(data) );

}

const leerDB = () => {
    // Verificar si no existe
    if ( !fs.existsSync( archivo ) ) {
        return null
    }

    // Definimos el formato
    const info = fs.readFileSync( archivo, { 
        encoding: 'utf-8',
    });
    // JSON to object
    const data = JSON.parse( info );

    return data;
}

module.exports = {
    guardarData,
    leerDB,
}