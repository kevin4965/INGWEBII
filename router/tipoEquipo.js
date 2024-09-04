const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const { validationResult, check } = require('express-validator');

const router = Router();

//LISTAR, CREAR Y ACTUALIZAR, ELIMINAR

// Listar tiposEquipos
router.get('/', async function (req, res) {
    
    try {

        const tiposEquipos = await TipoEquipo.find(); // select * from 
        res.send(tiposEquipos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error')
    }
    
  });

  // POST method route
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date;
        tipoEquipo.fechaActualizacion = new Date;

        tipoEquipo = await tipoEquipo.save(); 
        res.send(tipoEquipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear estadoEquipo')
        
    }
    
  });

  // PUT method route
router.put('/:tipoEquipoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId); //select * from tipoEquipo where id = ?
        
        if (!tipoEquipo) {
            return res.status(400).send('Tipo de equipo no existe');
        }

        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date;

        tipoEquipo = await tipoEquipo.save(); 
        res.send(tipoEquipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear estadoEquipo')
        
    }
    
  });
  
  module.exports = router;