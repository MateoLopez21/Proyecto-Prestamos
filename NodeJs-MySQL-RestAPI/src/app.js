import express from "express";
import clientesRoutes from "./routes/clientes.routes.js";
import indexRoutes from "./routes/index.routes.js";

import cors from "cors";

const app = express()

app.use(cors());

app.use(express.json());

app.use('/api', clientesRoutes)
app.use(indexRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app;