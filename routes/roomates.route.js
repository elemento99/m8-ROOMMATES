import { Router } from "express";
import { roommatesController } from "../controller/roomates.controller.js";

const router = Router()

router.get('/', roommatesController.todosRoommates)
router.get('/:id', roommatesController.unRoommate)
router.post('/', roommatesController.agregarRoommate)



export default router; 