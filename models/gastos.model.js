
import e from 'express';
import { rm } from 'fs';
import { readFile, writeFile}  from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname

const todoGastos = async () => {
    try {
        const file = await readFile(path.join(__dirname, '../database/gastos.json'))
        const jsonData = JSON.parse(file)

        if(!jsonData){
            throw{msg : 'No se pudo obtener información de los gastos'}
        }
        return jsonData
    }catch(error) {
        console.log(error)

    }
}

const unGasto = async (id) => {
    try {
        const file = await readFile(path.join(__dirname, '../database/gastos.json'))
        const jsonData = JSON.parse(file)
        const gasto = jsonData.find(e => parseInt(e.id) === id)

        if(!gasto) {
            throw {msg: 'No se pudo obtener información del gasto'}
        }
        return gasto
    }catch (error) {
        console.log(error)
    }
}


const agregarGasto = async({roommate_id, comentario, cantidad}) =>{
    try{
       const gastosFile = await readFile(path.join(__dirname, '../database/gastos.json'))
       const gastosData = JSON.parse(gastosFile)
       
       const roommateFile = await readFile(path.join(__dirname, '../database/roommates.json'))
       const roommateData = JSON.parse(roommateFile)

       roommateData.forEach(e =>{
        if(e.id === roommate_id) {
            Object.assign(e, {debit: parseInt(e.debit)+parseInt(cantidad)})
        }
        })

        const gasto = { id: gastosData.length, roommate_id, comentario, cantidad}
        console.log(gasto)
        gastosData.push(gasto)

        await writeFile(path.join(__dirname, '../database/gastos.json'), JSON.stringify(gastosData))
        await writeFile(path.join(__dirname, '../database/roommates.json'), JSON.stringify(roommateData))

        return gastosData[gastosData.length-1]


    }catch (error){
        console.log(error)
    }
}

const actualizarGasto = async(id, {roommate_id, comentario, cantidad}) => {
    try{
        const gastosFile = await readFile(path.join(__dirname, '../database/gastos.json'))
        const gastosData = JSON.parse(gastosFile)

        const roommatesfile = await readFile(path.join(__dirname, '../database/roommates.json'))
        const roommatesData = JSON.parse(roommatesfile)

        let anterior_cantidad = 0
        let anterior_roommate = ""
        let cambio_roommate = false

        const gasto = gastosData.find(e => parseInt(e.id) === parseInt(id))
            if(gasto) {
                if (e.roommate_id != roommate_id) {
                    anterior_roommate = e.roommate_id
                    cambio_roommate = true
            }
            anterior_cantidad = gasto.cantidad
                Object.assign(gasto, {roommate_id, comentario, cantidad})
            } else {
                throw new Error('Gasto no encontrado')
            }
        

        roommatesData.forEach(e => {

            if( e.id === anterior_roommate || (!cambio_roommate && e.id === roommate_id)){
                e.debit = parseInt(e.debit) - parseInt(anterior_cantidad)
            }
            if(cambio_roommate && e.id === roommate_id) {
                e.debit = (parseInt(e.debit) || 0) + parseInt(cantidad);
            }
            if (cambio_roommate && e.id === anterior_roommate) {
                e.debit = parseInt(e.debit) - parseInt(anterior_cantidad)
            }
               
            
        })

        await writeFile(path.join(__dirname, '../database/gastos.json'), JSON.stringify(gastosData, null, 2))
        await writeFile(path.join(__dirname, '../database/roommates.json'), JSON.stringify(roommatesData, null, 2))

        return gasto

    }catch(error){
        console.log(error)
    }
}

const borrarGasto = async(id) =>{
    try {
        const gastosFile = await readFile(path.join(__dirname, '../database/gastos.json'))
        const gastosData = JSON.parse(gastosFile)

        const roommateFile = await readFile(path.join(__dirname, '../database/roommates.json'))
        const roommateData = JSON.parse(roommateFile)

        const index = gastosData.findIndex(e => parseInt(e.id) === parseInt(id))
        if (index === -1){
           return false
        }

        const [deleteGasto] = gastosData.splice(index, 1)
        const roommate = roommateData.find(rm => rm.id === deleteGasto.roommate_id)
        if(roommate){
            roommate.debit -= deleteGasto.cantidad
        }

        await writeFile(path.join(__dirname, '../database/gastos.json'), JSON.stringify(gastosData))
        await writeFile(path.join(__dirname, '../database/roommates.json'), JSON.stringify(roommateData))
        return true

    }catch(error){
        console.log(error)
    }
}

export const gastosModel = {
    todoGastos, 
    unGasto,
    agregarGasto,
    actualizarGasto,
    borrarGasto
}