const inquirer = require('inquirer');
require('colors');

const menuOpt = [{

    type: 'list',
    name: 'singleOption',
    message: `${"¿Qué desea hacer?".underline.red}`,
    prefix: `${ '[?]'.red }`,
    color: 'red',
    // Mandamos un objeto que tenga key y value.
    choices: [{
            value: '1',
            name: ` ${ ('1' + '.').red } Crear tarea.`
        },
        {
            value: '2',
            name: ` ${ ('2' + '.').red } Listar tarea.`
        },
        {
            value: '3',
            name: ` ${ ('3' + '.').red } Listar tareas completadas.`
        },
        {
            value: '4',
            name: ` ${ ('4' + '.').red } Listar tareas pendientes.`
        },
        {
            value: '5',
            name: ` ${ ('5' + '.').red } Completar tarea(s).`
        },
        {
            value: '6',
            name: ` ${ ('6' + '.').red } Borrar tareas.`
        },
        {
            value: '0',
            name: ` ${ ('0' + '.').red } Salir.`
        },

    ]

}]

const inquirerMenu = async () => {

    console.clear();
    console.log("\n=====================".red);
    console.log("Seleccione una opción".red);
    console.log("=====================\n".red);

    // Esperar a que se complete lo de arriba.
    // Nos pide como parámetro un arreglo.
    // Destructuramos y guardamos como variable el valor de la opción.
    const {
        singleOption
    } = await inquirer.prompt(menuOpt);
    return singleOption;

}

const pausaMenu = async () => {

    const questionEnter = [{
        type: 'input',
        name: 'enter',
        prefix: ` ${ '!'.red } `,
        message: `Presionar ${ 'Enter'.red } para continuar`,
    }]

    console.log('\n')
    await inquirer.prompt(questionEnter);

}

const leerInput = async (message) => {

    const pregunta = {
        type: 'input',
        name: 'desc',
        prefix: `${ '=>'.red }`,
        message,
        // Obligar que pasen valores.
        validate(value) {
            if (value.length === 0) {
                return "Por favor ingresar un valor."
            }
            return true
        }
    }

    const {
        desc
    } = await inquirer.prompt(pregunta);
    return desc;

}

const mostrarInput = async () => {
    console.log("xd")
}

const listadoTareasBorrar = async (tareas = []) => {
    const choicesTarea = tareas.map((tarea, i) => {
        const internalIndex = i + 1;

        return {
            value: tarea.id,
            name: `${ (internalIndex + '.').red }  ${tarea.desc}`,

        }
    });

    // Añadimos al inicio del arreglo
    choicesTarea.unshift({
        value: 0,
        name: `${(0 + ".").red} Salir`,
    })

    const preguntas = [{
        type: 'list',
        name: 'getId',
        message: 'Borrar',
        prefix: `${ '[?]'.red }`,
        choices: choicesTarea,
    }]

    const { getId } = await inquirer.prompt(preguntas);
    return getId;
}

const confirmarAccion = async (mensaje) => {
    const preguntaVerificar = [
        {
            type: 'confirm',
            name: 'confirmDelete',
            prefix: `${ '[?]'.red }`,
            message: mensaje,
        }
    ];

    const {confirmDelete} = await inquirer.prompt(preguntaVerificar);
    return confirmDelete;
}

const mostrarListadoCheck = async (tareas = []) => {
    const choicesTarea = tareas.map((tarea, i) => {
        const internalIndex = i + 1;

        return {
            value: tarea.id,
            name: `${ (internalIndex + '.').red }  ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false,
        }
    });

    // Añadimos al inicio del arreglo
    choicesTarea.unshift({
        value: 0,
        name: `${(0 + ".").red} Salir`,
    })

    const preguntaCheck = [{
        type: 'checkbox',
        name: 'selectedId',
        message: 'Selecciones\n',
        prefix: `${ '[?]'.red }`,
        choices: choicesTarea,
    }]

    const { selectedId } = await inquirer.prompt(preguntaCheck);
    return selectedId;
}

module.exports = {
    inquirerMenu,
    pausaMenu,
    leerInput,
    listadoTareasBorrar,
    confirmarAccion,
    mostrarListadoCheck,
}