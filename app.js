const express = require('express');
const app = express();

//explicacion en readme.md de lineas 5 y 6
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//Primera ruta para ver la lista de usuarios con el get
app.get('/usuarios',(req,res)=>{
    res.send(usuarios)
})


//Segunda ruta para buscar el usuario por el nombre con el get
app.get(`/usuarios/:nombre`,(req,res)=>{
const nombre = req.params.nombre;

  const usuario = usuarios.find(usuario => usuario.nombre.toLowerCase() === nombre.toLowerCase());
   //res.json(usuario)
  if (usuario) {
      res.send(usuario);
  } else {
      res.status(404).json({ error: 'Nombre no encontrado' });
  }
});

// Tercera ruta para crear con el post
app.post('/usuarios', (req, res) => {
    const { nombre, edad, lugarProcedencia } = req.body;

    if (!nombre || !edad || !lugarProcedencia) {
        return res.status(404).json({ error: 'Faltan datos requeridos: nombre, edad o lugarProcedencia' });
    }

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        edad,
        lugarProcedencia
    };
    usuarios.push(nuevoUsuario);
    res.json(nuevoUsuario);
});



// Cuarta ruta  para modificar usuario con patch
app.patch('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;

    const usuario = usuarios.find(usuario => usuario.nombre.toLowerCase() === nombre.toLowerCase());

    if (!usuario) {
        return res.status(404).json({ error: 'Nombre no encontrado' });
    }
    const { edad, lugarProcedencia } = req.body;

    if (edad !== undefined) usuario.edad = edad;
    if (lugarProcedencia !== undefined) usuario.lugarProcedencia = lugarProcedencia;

    res.json(usuario);
});




// Quinta ruta para eliminar con delete
app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;

    const usuarioEliminado = usuarios.find(usuario => usuario.nombre.toLowerCase() === nombre.toLowerCase());

    if (!usuarioEliminado) {
        return res.status(404).json({ error: 'Nombre no encontrado' });
    }
    usuarios = usuarios.filter(usuario => usuario.nombre.toLowerCase() !== nombre.toLowerCase());

    res.json({ message: 'Usuario eliminado', usuario: usuarioEliminado });
});


app.listen(3000, ()=>{
    console.log('escuchando en  http://localhost:3000')
})