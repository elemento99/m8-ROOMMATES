import { Router } from "express";
import { gastosController } from "../controller/gastos.controller.js";

const router = Router()

router.get('/', gastosController.gastosTodos)
router.get('/:id', gastosController.gastoId)
router.post('/', gastosController.nuevoGasto)
router.put('/:id', gastosController.actualizacionGasto)
router.delete('/:id', gastosController.eliminarGasto)

export default router; 