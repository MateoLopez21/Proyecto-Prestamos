import { pool } from "../db.js";
import { manejoFechas } from "../utils/manejoFechas.js";

const fechaUtil = new  manejoFechas()


// Aquí están los queries
export const getPrestamos = async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT prestamo_id, clientes.id AS idCliente, clientes.nombre AS nombre, clientes.apellido AS apellido, monto, total_pagar, resta, DATE_FORMAT(fecha_inicio, '%d-%m-%Y') AS fecha_inicio, DATE_FORMAT(proximo_pago, '%d-%m-%Y') AS proximo_pago, monto_cuota, cuotas FROM Prestamos
        INNER JOIN clientes ON prestamos.cliente_id = clientes.id
        WHERE prestamos.activo = TRUE;`)
        if (rows.length === 0) {
            res.status(200).json({
                message: 'No hay ningún préstamo registrado'
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

export const getPrestamo = async (req, res) => {
    const query = `SELECT prestamo_id, clientes.id AS idCliente, clientes.nombre AS nombre, clientes.apellido AS apellido, monto, total_pagar, resta, DATE_FORMAT(fecha_inicio, '%d-%m-%Y') AS fecha_inicio, DATE_FORMAT(proximo_pago, '%d-%m-%Y') AS proximo_pago, monto_cuota, cuotas FROM Prestamos
                INNER JOIN clientes ON prestamos.cliente_id = clientes.id
                WHERE prestamos.prestamo_id = (?)`
    try {
        const [rows] = await pool.query(query, [req.params.id])

        if (rows.length <= 0) {
        return res.status(404).json({ message: 'No se encontró ningún préstamo' })
        }
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
    
}

export const createPrestamos = async (req, res) => {
    const {cliente_id, monto, total_pagar, monto_cuota, cuotas, fecha_inicio, proximo_pago} = req.body;
    const intereses = total_pagar - monto;
    const insertQuery = `INSERT INTO Prestamos (cliente_id, monto, total_pagar, fecha_inicio, proximo_pago, monto_cuota, cuotas, resta)
                        VALUES (?, ?, ?, ?, ?, ?, ?,?);`

    const updateQuery = `UPDATE Finanzas
                        SET total_disponible_prestar = total_disponible_prestar - (?), ganancias_intereses = ganancias_intereses + (?)
                        WHERE finanzas_id = 1;`
    try {
        const[rows] = await pool.query(insertQuery, [cliente_id, monto, total_pagar, fecha_inicio, proximo_pago, monto_cuota, cuotas, total_pagar])

        const[updateRows] = await pool.query(updateQuery, [monto, intereses])
        res.send({ 
            prestamo_id: rows.insertId, 
            cliente_id: cliente_id,
            monto,
            total_pagar,
            fecha_inicio,
            proximo_pago,
            monto_cuota,
            cuotas,
            resta: total_pagar
        })
        console.log('Prestamo registrado exitosamente')
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
    })
    }
    
}

export const deletePrestamo = async (req, res) => {
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

export const updatePrestamo = async (req, res) => {
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
