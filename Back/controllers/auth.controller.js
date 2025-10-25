//importar el array de usuarios desde el archivo JSON (se carga una sola vez al iniciar)
const users = require("../modelo/users.json");

//funcion controladora para manejar el login
exports.login = (req, res) => {
    //Extrae 'cuenta' del body de la peticion (proteccion contra body undefined)
    const {cuenta} = req.body || {};

    //Aceptar 'contraseña' o 'contrasena' (con/sin tilde) usando optional chaining
    const contrasena = req.body?.contrasena ?? req.body?.["contraseña"];

    //Valida que vengan ambos campos requeridos
    if(!cuenta || !contrasena) {
        return res.status(400).json({
            error: "Faltan campos obligatorios: 'cuenta' y  'contrasena'.",
            ejemplo: { cuenta: "gina", contrasena: "1234" }
        });
    }

    //Busca un usuario que coincida exactamente con cuneta y contrasena
    const match = users.find(u => u.cuenta === cuenta && u.contrasena === contrasena);

    //Si no encuentra coincidencia, retorna error
    if(!match) {
        return res.status(401).json({
            error: "Credenciales invalidas"
        });
    }

    //Login exitoso
    return res.status(200).json({
       mensaje: "Acceso permitido",
       usuario: {cuenta:match.cuenta} //Devuelve solo la cuenta, no la contraseña 
    });
    
};