import { roommatesModel } from "../models/roomates.model.js";


 const todosRoommates = async(req, res) =>{
    try {
        const roommates = await roommatesModel.todos();
        return res.json({roommates});
    } catch (error) {
        console.error(error)
        res.json( { ok: false,  error });
    }
}

const unRoommate = async (req, res) => {
    try {

        const { id } = req.params
        const roommate = await roommatesModel.uno(id)
        return res.json({roommate})

    }catch (error) {
        console.log(error)
        res.json({ok: false, error})
    }
}

const agregarRoommate = async (req, res) => {
    try{

        const roommate = await roommatesModel.agregar()
        return res.json({roommate})

    }catch(error){
        console.log(error)
        res.json({ok: false, error})
    }
}


export const roommatesController = {
   todosRoommates,
   unRoommate,
   agregarRoommate
}