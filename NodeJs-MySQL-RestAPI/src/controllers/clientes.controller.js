import { pool } from "../db.js";


// Aquí están los queries
export const getClientes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes')
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
    
}

export const getCliente = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id = (?)', [req.params.id])

        if (rows.length <= 0) {
        return res.status(404).json({ message: 'Customer not found' })
        }
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
    
}

export const createClientes = async (req, res) => {
        const {nombre, apellido } = req.body
    try {
        const[rows] = await pool.query('INSERT INTO clientes (nombre, apellido) VALUES (?, ?)', [nombre, apellido])

        res.send({ 
            id: rows.insertId, 
            nombre,
            apellido
        } )
        console.log('Customer created successfully')
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
    })
    }
    
}

export const deleteCliente = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM clientes WHERE id = (?)', [req.params.id])
        console.log(result)

        if (result.affectedRows <= 0) return res.status(404).json({ 
            message: 'Customer not found' 
        })
        res.sendStatus(204)
        console.log('Customer deleted successfully')
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
    })
    }
    

}

export const updateClientes = async (req, res) => {
        const { id } = req.params
        const { nombre, apellido, telefono } = req.body
    try {

        const [result] = await pool.query('UPDATE clientes SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), telefono = IFNULL(?, telefono) WHERE id =?', [nombre, apellido, telefono, id])

        if (result.affectedRows <= 0) return res.status(404).json({ 
            message: 'Cliente no encontrado' 
        })

        const [rows] = await pool.query('SELECT * FROM clientes WHERE id = (?)', [id])
        
        res.json(rows[0])
        console.log("Cliente actualizado")
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong'
    })
    }
    
}
