import { Router } from "express";
import {getPagos, getPago, createPago, updatePago, deletePago } from "../controllers/pagos.controller.js";


const router = Router()

router.get('/pagos', getPagos)

router.get('/prestamos/:id', getPago)

router.post('/pagos', createPago)

router.patch('/pagos/:id', updatePago)

router.delete('/pagos/:id', deletePago)

export default router