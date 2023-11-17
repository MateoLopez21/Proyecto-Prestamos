import { pool } from "../db.js";
import { manejoFechas } from "../utils/manejoFechas.js";

const fechaUtil = new  manejoFechas()

// Aquí están los queries
export const getPagos = async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT prestamos.prestamo_id, DATE_FORMAT(pagos.fecha_pago, '%d-%m-%Y') AS fecha_pago, pagos.monto_pago, clientes.nombre, clientes.apellido FROM pagos 
                                        INNER JOIN prestamos ON pagos.prestamo_id = prestamos.prestamo_id
                                        INNER JOIN clientes ON prestamos.cliente_id = clientes.id
                                        WHERE pagos.activo = TRUE`)
        if (rows.length === 0) {
            res.status(200).json({
                message: 'No hay ningún pago registrado'
            })
        }else{
            res.json(rows);
        }
        
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
    
}

export const getPago = async (req, res) => {
    const query = `SELECT DATE_FORMAT(pagos.fecha_pago, '%d-%m-%Y') AS fecha_pago, pagos.monto_pago, clientes.nombre, clientes.apellido, prestamos.cuotas, prestamos.monto_cuota, DATE_FORMAT(prestamos.proximo_pago, '%Y-%m-%d') AS proximo_pago FROM pagos 
                    INNER JOIN prestamos ON pagos.prestamo_id = prestamos.prestamo_id
                    INNER JOIN clientes ON prestamos.cliente_id = clientes.id
                    WHERE prestamos.prestamo_id = (?) AND pagos.activo = TRUE;`
    try {
        const [rows] = await pool.query(query, [req.params.id])

        const proximo_pagoDB = rows[0].proximo_pago;

        const proximo_pago = new Date(proximo_pagoDB);

        proximo_pago.setDate(proximo_pago.getDate() + 16)

        const fechaFormateada = fechaUtil.formatearFecha(proximo_pago)

        console.log(proximo_pagoDB);
        console.log(fechaFormateada);
        
        if (rows.length <= 0) {
        return res.status(404).json({ message: 'No se encontró ningún pago' })
        }
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
    
}

export const createPago = async (req, res) => {
    const {prestamo_id, fecha_pago, cuotas, monto_pago, proximo_pago} = req.body;

    const insertQuery = `INSERT INTO Pagos (prestamo_id, fecha_pago, monto_pago, activo)
                        VALUES (?, ?, ?, 1);`

    const updateFinanceQuery = `UPDATE Finanzas
                                SET total_disponible_prestar = total_disponible_prestar + (?)
                                WHERE finanzas_id = 1;`

    const updatePrestamoQuery = `UPDATE prestamos
                            SET resta = resta - (?), cuotas = cuotas - (?), proximo_pago = (?), activo = CASE WHEN cuotas = 0 THEN false ELSE activo END
                            WHERE prestamo_id = (?) AND cuotas > 0;`

    const selectActivoQuery = `SELECT activo FROM prestamos 
                                WHERE prestamo_id = (?) AND activo = FALSE`
    
    const disabledPagosQuery = `UPDATE Pagos
                                SET activo = false
                                WHERE prestamo_id = ?;
                                `;

     
    try {
        const[insertPagoQuery] = await pool.query(insertQuery, [prestamo_id, fecha_pago, monto_pago])

        const[updateFinanceRows] = await pool.query(updateFinanceQuery, [monto_pago])

        const[updatePrestamoRows] = await pool.query(updatePrestamoQuery, [monto_pago, cuotas, proximo_pago, prestamo_id]);

        const[activoRows] = await pool.query(selectActivoQuery, [prestamo_id])

        if (activoRows.length > 0) {
            const[disabledPagosRows] = await pool.query(disabledPagosQuery, [prestamo_id]);
          }

        res.send({ 
            prestamo_id: prestamo_id,
            fecha_pago: fecha_pago,
            monto_cuota: monto_pago,
            proximo_pago: proximo_pago
        })
        console.log('Pago registrado exitosamente')
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
    })
    }
    
}

export const deletePago = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM prestamos WHERE prestamo_id = (?)', [req.params.id])
        console.log(result)

        if (result.affectedRows <= 0) return res.status(404).json({ 
            message: 'No se encontró ningún préstamo con ese id' 
        })
        res.sendStatus(204)
        console.log('Préstamo eliminado correctamente')
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
    })
    }
    

}

export const updatePago = async (req, res) => {
        const { id } = req.params
        const { monto, total_pagar, fecha_inicio, proximo_pago, monto_cuota, cuotas } = req.body
    try {

        const [result] = await pool.query('UPDATE prestamos SET monto = IFNULL(?, monto), total_pagar = IFNULL(?, total_pagar), fecha_inicio = IFNULL(?, fecha_inicio), proximo_pago = IFNULL(?, proximo_pago), monto_cuota = IFNULL(?, monto_cuota), cuotas = IFNULL(?, cuotas) WHERE prestamo_id =?', [monto, total_pagar, fecha_inicio, proximo_pago, monto_cuota, cuotas, id])

        if (result.affectedRows <= 0) return res.status(404).json({ 
            message: 'Préstamo no encontrado' 
        })

        const [rows] = await pool.query('SELECT * FROM prestamos WHERE prestamo_id = (?)', [id])
        
        res.json(rows[0])
        console.log("Préstamo actualizado")
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
    })
    }
    
}
