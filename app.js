require('colors');
const { printMenu, pause } = require('./helpers/message');
const { inquirerMenu, inquirerPause, leerInput, borrar, confirmar,tareasCompletadas } = require('./helpers/inquirer')
const { TaskList } = require('./models/taskList')
const { Task } = require('./models/task')
const {getData,readData,saveData,deleteTask,updateTask } = require('./helpers/saveInfo')
console.clear();

const main = async () => {
    let opt = '';

    do {
        const taskList = new TaskList();
        const data = await getData();
        const taskBD = readData(data);
        taskList.addTaskFromList(taskBD)
        opt = await inquirerMenu()
        switch (opt) {
            case '1': //AÑADIR TAREA
                const desc = await leerInput('Descripcion: ')
                saveData(taskList.addTask(desc));
                break;
            case '2': //LISTAR
                taskList.listadoCompleto()
                break;
            case '3': //LISTAR TAREAS COMPLETADAS
                taskList.listaTareasCompletas();
                break;
            case '4': //LISTAR TAREAS PENDIENTES
                taskList.listaTareasPendientes();
                break;
            case '5': //COMPLETAR TAREAS
                const ids = await tareasCompletadas(taskList.list);
                const idCambiar = taskList.getTareaCompleted(ids);
                await updateTask(idCambiar);
                break;            
            case '6': //BORRAR
                const id = await borrar(taskList.list);
                if (id !== 0) {
                    const ok = await confirmar('¿Estás seguro que deseas borrar la tarea?');
                    if (ok) deleteTask(id);
                }
                break;
            case '7':
                console.log('Cerrando sesión')    
                break;
            default:
                console.log('Opción invalida')
                break;
        }
        await inquirerPause()
    } while (opt !== '7');
}

main();