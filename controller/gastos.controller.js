import { gastosModel } from "../models/gastos.model.js";


const gastosTodos = async (req, res) => {
    try{
        const gastos = await gastosModel.todoGastos()
        return res.json({gastos})

    }catch (error) {
        console.log(error)
        res.json({ok: false, error})
    } 
}

const gastoId = async (req, res) => {
    try{
        const { id } = req.params
        const gasto = await gastosModel.unGasto(id)
        return res.json({gasto})

    }catch (error){
        console.log(error)
        res.json({ok:false, error})
    }
}

const nuevoGasto = async (req, res) => {
    try {
        const { roommate_id, comentario, cantidad } = req.body
        const gasto = await gastosModel.agregarGasto({roommate_id, comentario, cantidad})
        return res.json({gasto})

    }catch(error){
        console.log(error)
        res.json({ok:false, error})
    }
}

const actualizacionGasto = async (req, res) => {
    try {
        const { id } = req.params
        const { roommate_id, comentario, cantidad } = req.body
        const gasto = await gastosModel.actualizarGasto(id, {roommate_id, comentario, cantidad})
    
        if (gasto) {
            return res.json({gasto})
        } else {
            return res.status(404).json({ok: false, error: 'Gasto no encontrado'})
        }

    }catch (error) {
        console.log(error)
        res.json({ok:false, error})
    }
}

const eliminarGasto = async (req, res) => {
    try {
        const {id} = req.params
        const gasto = await gastosModel.borrarGasto(id)
        if(!gasto) {
            return res.status(404).json({msg: 'Gasto no pudo ser eliminado'})
        }
        return res.json({msg: 'Gasto eliminado correctamente'})

    }catch (error) {
        console.log(error)
        res.json({ok:false, error})
    }
}


export const gastosController = {
    gastosTodos,
    gastoId,
    nuevoGasto,
    actualizacionGasto,
    eliminarGasto
}