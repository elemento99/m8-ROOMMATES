import { readFile, writeFile } from "fs/promises";
import axios from "axios";
import { v4 as uuidv4} from "uuid";
import path from 'path';



const __dirname = import.meta.dirname

const todos = async() => {
    try{
        const file = await readFile(path.join(__dirname, '../database/roommates.json'))
        const jsonData = JSON.parse(file)
        return jsonData
    }catch(error) {
        console.log(error)
    }
}


const uno = async(id) => {
    try{
    const file = await readFile(path.join(__dirname, '../database/roommates.json'))
    const jsonData = JSON.parse(file)
    const roommate = jsonData.find(e => e.id === id)
    if(!roommate){
        throw {msg: 'El roommate no fue encontrado, por favor intente denuevo'}
    }
    return roommate

}catch (error) {
    console.log(error)
    }

}

const agregar = async () => {
    try {
        const file = await readFile(path.join(__dirname, '../database/roommates.json'))
        const jsonData = JSON.parse(file)

        const { data } = await axios.get('https://randomuser.me/api')

        if(!data){
            throw { msg: 'No se pudo agregar correctamente el nuevo roommate'}
        }
        jsonData.push({id: uuidv4(),name: data.results[0].name.first+' '+data.results[0].name.last,debit: 0 , income: 9999 });

        await writeFile(path.join(__dirname, '../database/roommates.json'), JSON.stringify(jsonData))
        return jsonData[jsonData.length-1]
   
    }catch(error){
        console.log(error)

    }
}

export const roommatesModel = {
    todos,
    uno,
    agregar

}