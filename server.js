const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

// Función para obtener un tipo de gráfico aleatorio
function getRandomChartType() {
    const chartTypes = ["bar", "line", "pie", "doughnut", "radar"];
    return chartTypes[Math.floor(Math.random() * chartTypes.length)];
}

// Endpoint que devuelve datos y un tipo de gráfico aleatorio
app.get("/data", (req, res) => {
    const chartType = getRandomChartType();

    const data = {
        type: chartType,
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [
            {
                label: "Ventas",
                data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)"
                ],
                borderWidth: 1
            }
        ]
    };

    res.json(data);
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
