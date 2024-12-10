const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tarea completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tarea pemdientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '7',
                name: `${'7.'.green}  Salir`
            }
        ]
    }
]

const inquirerMenu = async () => {

    console.clear()
    console.log('========================'.green);
    console.log('MENÚ DE USUARIO'.white);
    console.log('========================'.green);

    const { opcion } = await inquirer.prompt(preguntas)

    return opcion
}

const inquirerPause = async () => {
    const question = [
        {
            type: 'input',
            name: 'server',
            message: `Pressione ${'enter'.green} para continuar`
        }
    ]
    console.log('\n')
    await inquirer.prompt(question)
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if(value.length === 0){
                    return 'Por favor introduzca un valor'
                }
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc
}
const borrar = async (tareas) => {
    const elecciones = tareas.map((tarea,i) => {
        const index = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${index} : ${tarea.description}`
        }
    });
    elecciones.unshift({
        value: '0',
        name: `0 : Cancelar`.red
    })
    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'borrar',
        choices: elecciones
    }];
    const { id } = await inquirer.prompt(preguntas)
    return id;
}
const confirmar = async (message) => {
    const pregunta = [{
        type: 'confirm',
        name: 'OK',
        message: message
    }]
    const { OK } = await inquirer.prompt(pregunta)
    return OK;
}
const tareasCompletadas = async (tareas) => {
    const elecciones = tareas.map((tarea,i) => {
        const index = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${index} : ${tarea.description}`,
            checked: (tarea.completed)? true:false
        }
    })
    const preguntas = [{
        type: 'checkbox',
        name: 'id',
        message: 'seleccionados',
        choices: elecciones
    }];
    const { id } = await inquirer.prompt(preguntas)
    return id;
}
module.exports = {
    inquirerMenu,
    inquirerPause,
    leerInput,
    borrar,
    confirmar,
    tareasCompletadas
}