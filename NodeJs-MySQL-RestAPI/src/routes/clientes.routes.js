import { Router } from "express";
import {getClientes, getCliente, createClientes, updateClientes, deleteCliente } from "../controllers/clientes.controller.js";


const router = Router()

router.get('/clientes', getClientes)

router.get('/clientes/:id', getCliente)

router.post('/clientes', createClientes)

// router.put('/clientes/:id', updateClientes)
router.patch('/clientes/:id', updateClientes)

router.delete('/clientes/:id', deleteCliente)

export default router