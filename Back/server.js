const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

const ALLOWED_ORIGINS = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
];

app.use(cors({
    origin: function (origin, callback) {
        if(!origin || ALLOWED_ORIGINS.includes(origin)) {
            return callback(null, true); // null = sin error, true = permitido
        }
        //Si el origen no esta permitido, se rechaza la solicitud con un mensaje de error
        return callback(new Error('Not allowed by CORS' + origin));
    },
    //Especifica los metodos HTTP que este servidor aceptara
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200 //Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
//montar rutas bajo /api
app.use("/api", authRoutes);

//(opcional) Ruta salud
app.get("/api/health", (_req, res) => res.json({
    ok: true  
}));

//levantar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
