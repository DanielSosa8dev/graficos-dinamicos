// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const mongoose = require("mongoose");

// Rutas
const stackRoutes = require("./routes/stackRoutes");
const authRoutes = require("./routes/authRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");  // Importar las rutas de ejercicio

const app = express();
const PORT = 5000;

// 1. Conexión a MongoDB (StackDB)
mongoose.connect("mongodb://localhost:27017/StackDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conectado a la base de datos StackDB"))
.catch((err) => console.error("Error de conexión a MongoDB:", err));

// 2. Configuración de Helmet con CSP
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Permitir solo fuentes del mismo origen
        imgSrc: ["'self'", "http://localhost:5000"], // Permitir imágenes desde el servidor local
        scriptSrc: ["'self'", "'unsafe-inline'"], // Permitir scripts inline
        styleSrc: ["'self'", "'unsafe-inline'"] // Permitir estilos inline
      }
    }
}));

// 3. Habilitar CORS y JSON
app.use(cors());
app.use(express.json());

// 4. Servir archivos estáticos (favicon, CSS, etc.)
app.use(express.static(path.join(__dirname, "public")));

// 5. Rutas de autenticación
app.use("/api/auth", authRoutes);

// 6. Rutas de Stack
app.use("/api/stack", stackRoutes);

// 7. Rutas de ejercicios
app.use("/api/exercise", exerciseRoutes);

// 8. Ruta principal (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 9. Rutas para las vistas de Autenticación
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

// 10. Ruta para conceptos (stackConcepts.html)
app.get("/concepts", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "stackConcepts.html"));
});

// 11. Ruta para los ejercicios
app.get("/exercises", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "exercises.html"));
});

// 12. Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
