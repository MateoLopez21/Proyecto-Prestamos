import { Router } from "express";
import {getPrestamos, getPrestamo, createPrestamos, updatePrestamo, deletePrestamo } from "../controllers/prestamos.controller.js";


const router = Router()

router.get('/prestamos', getPrestamos)

router.get('/prestamos/:id', getPrestamo)

router.post('/prestamos', createPrestamos)

// router.put('/Prestamos/:id', updatePrestamos)
router.patch('/prestamos/:id', updatePrestamo)

router.delete('/prestamos/:id', deletePrestamo)

export default router