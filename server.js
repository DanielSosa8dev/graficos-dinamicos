const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware de seguridad
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "http://localhost:5000"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"]
        }
    }
}));

// Habilitar CORS
app.use(cors());

// Middleware para procesar JSON
app.use(express.json());

// Servir archivos estáticos (incluyendo favicon)
app.use(express.static(path.join(__dirname, "public")));

// Datos del Stack (Ejemplo en memoria)
let stack = [];

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// API para obtener el Stack
app.get("/api/stack", (req, res) => {
    res.json({ stack });
});

// API para agregar elementos (Push)
app.post("/api/stack/push", (req, res) => {
    const { value } = req.body;
    if (value) {
        stack.push(value);
        res.json({ stack });
    } else {
        res.status(400).json({ error: "Debe enviar un valor" });
    }
});

// API para eliminar elementos (Pop)
app.post("/api/stack/pop", (req, res) => {
    if (stack.length > 0) {
        stack.pop();
        res.json({ stack });
    } else {
        res.status(400).json({ error: "El stack está vacío" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
