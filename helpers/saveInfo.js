const {connect} = require('./dbConnection')

const getData = async () => {
    const db = await connect();
    try {
        const rows = await db.query('SELECT * FROM TAREAS');
        return rows;
    } catch(error) {
        console.log('Error al obtener los datos: ', error);
    } finally {
        db.end();
    }
}

const readData = (data) => {
    const list = [];
    Object.keys(data).forEach((tarea) => {
        const tareaa = data[tarea];
        list.push(tareaa);
    })
    console.log(list);
    return list
}

const saveData = async (tarea) => {
    const db = await connect();
    try {
        const result = await db.query(`INSERT INTO TAREAS (id,description)  VALUES ('${tarea.id}','${tarea.description}');`);
        console.log('Datos guardados correctamente: ')
    } catch (error) {
        console.log('Error al subir datos: ',error)
    } finally {
        db.end();
    }
}

const updateTask = async (id) => {
    const db = await connect();
    try {
        const result = await db.query(`UPDATE TAREAS SET completed = '2024-01-01' WHERE id = '${id}';`)
        console.log('Datos actualizados correctamente')
    } catch (error) {
        console.log('Error al actualizar los datos: ',error)
    } finally {
        db.end();
    }
}

const deleteTask = async (id) => {
    const db = await connect();
    try {
        const result = await db.query(`DELETE FROM TAREAS WHERE id = '${id}';`)
        console.log('Datos eliminados correctamente')
    } catch (error) {
        console.log('Error al eliminar los datos: ',error)
    } finally {
        db.end();
    }
}

module.exports = {
    getData,
    readData,
    saveData,
    updateTask,
    deleteTask
}