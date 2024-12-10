const {Task} = require('./task')

class TaskList{
    _list = {
    }
    get list(){
        const list = []

        Object.keys(this._list).forEach( key => {
            const tarea = this._list[key]
            list.push(tarea)
        })

        return list;
    }

    constructor(){
        this._list = {}
    }

    addTask(description){
        const task = new Task(description)
        this._list[task.id] = task
        return this._list[task.id];
    }

    addTaskFromList(taskList = []){
        // taskList.forEach ( task => {
        //     this._list[task.id] = task
        // })
        this._list = taskList
    }

    listadoCompleto(){
        if (this._list.length == 0) {
            console.log('No hay ninguna tarea')
            return
        }
        this.list.forEach(tarea => {
            console.log(`ID: ${tarea.id}`);
            console.log(`Descripcion: ${tarea.description}`);
            (tarea.completed) ? console.log('Completado') : console.log('Sin completar');
            console.log('*')
        })
    }

    deleteTask(id){
        if (this._list[id]) delete this._list[id]
    }
    devuelveTareaId(id){
        this._list
        return this._list[id];
    }
    
    getTareaCompleted(ids){
        let copyid = 0;
        this._list.forEach((tarea) => {
            ids.forEach((id) => {
                if (tarea.id == id && tarea.completed == null) {
                    copyid = id;
                }
            })
        });
        return copyid;
    }
    listaTareasCompletas(){
        let tareasCompletadas = this._list.filter((tarea) => tarea.completed != null);
        if (tareasCompletadas.length == 0) {
            console.log('No hay ninguna tarea completada')
            return
        }
        tareasCompletadas.forEach((tarea) => this.pintaTarea(tarea))
    }
    listaTareasPendientes(){
        let tareasPendientes = this._list.filter((tarea) => tarea.completed == null);
        if (tareasPendientes.length == 0) {
            console.log('No hay ninguna tarea pendiente')
            return
        }
        tareasPendientes.forEach((tarea) => this.pintaTarea(tarea))
    }
    pintaTarea(tarea){
        console.log(`ID: ${tarea.id}`);
            console.log(`Descripcion: ${tarea.description}`);
            (tarea.completed) ? console.log('Completado') : console.log('Sin completar');
            console.log('*')
    }
}

module.exports ={
    TaskList
}
