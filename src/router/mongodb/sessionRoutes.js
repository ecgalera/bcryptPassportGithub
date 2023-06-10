import { Router } from "express";
// import UserManager from "../../dao/fs/mongodb/manager/userManager.js";
// import { createHash } from "../../utils.js";
// import { validatePassword } from "../../utils.js";
import passport from "passport";

// const um = new UserManager();

const router = Router();

// sessionRouter para capturar los datos y volcarlos a la base de datos
// router.post("/register", async (req, res) => {
//     const { nombre, apellido, email, password } = req.body;
//     if (!nombre || !apellido || !email || !password) return res.send({
//         status: "error", error: "Datos incompletos"
//     })
//     const user = {
//         nombre,
//         apellido,
//         email,
//         password
//     }
//     const result = await um.createUser(user);
//     res.send({ status: "success", payload: result })
// });

// register con contrasenia hasheada: 
// router.post("/register", async(req, res)=>{
//     const {nombre, apellido, email, password}=req.body;
//     // verificamos si el user existe:
//     const exist = await um.getUser({email});
//     if(exist) return res.status(400).send({
//         status:"error", error:"User alreay exists"
//     });
//     // si el usuario no exist lo registramos y encriptamos la contrasenia:
//     const hashedPassword = await createHash(password);
//     // construimos el registro de usuarario:
//     const user ={
//         nombre,
//         apellido,
//         email,
//         password: hashedPassword
//     };
//     const result = await um.createUser(user);
//     res.send({status:"success", payload: result});

// })

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     //En el caso de registro de session con Admin
//     if(email=== "admin@admin.com"  && password === "123"){
//         // si me logueo como administrador ya hicio la session
//         req.session.user = {
//             name: "Administrador",
//             email: "...",
//             role: "admin"
//         }
//     }
//     //reviso si el usuario existe
//     const user = await um.getUser({email, password});
//     if (!user) return res.send({ status: "error", error: "Datos incorrectos" })
//     else
//         req.session.user = {
//             name: `${user.nombre} ${user.apellido}`,
//             email: user.email
//         }

//     res.sendStatus(200);
// });

// Creo el login con la contrasenia hasheada:

// router.post("/login", async(req, res)=>{
//     const {email, password} = req.body;
//     // 1° busco el usuario por mail
//     const user = await um.getUser({email});
//     // reviso que el usuario exista:
//     if(!user) return res.status(400).send({status:"error", error:"Usuario inexistente"})
//     // 2° importo el metodo de utils.js (import {validatePassword} from "../../utils.js")
//     // si el ususario existe aplico la comparación:
//     const isValidPassword = validatePassword(password, user.password);
//     console.log(password)
//     console.log(user.password)
//     if(!isValidPassword)return res.status(400).send({status:"error", error: "Credenciales incorrectas"});
//     // 3° si el usuario existe y la contrasenia es correcta creo la session:
//     req.session.user ={
//         name: `${user.nombre} ${user.apellido}`,
//         email: user.email
//     }
//     res.sendStatus(200)
// });

//passport ------------------------------------------

// register
router.post("/register", passport.authenticate("register",{failureRedirect:"/api/session/registerFail", failureMessage:true}),
async(req, res)=>{
    res.send({status:"success", message:"Registered"})
});

router.get("/regiterFail", (req, res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error", error: req.session.messages})
});

//login
router.post("/login", passport.authenticate("login",{failureRedirect:"/api/session/loginFail", failureMessage:true}),
async(req, res)=>{
    req.session.user = {
        nombre: req.user.nombre,
        role:req.user.role,
        id: req.user.id,
        email:req.user.email
    }
    return res.sendStatus(200);
});

router.get("/loginFail", (req, res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error", error: req.session.messages})
})




export default router;