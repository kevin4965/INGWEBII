const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const { validationResult, check } = require('express-validator');

const router = Router();

// Listar estadoEquipos
router.get('/', async function (req, res) {
    
    try {

        const estadosEquipos = await EstadoEquipo.find(); // select * from estadoEquipos
        res.send(estadosEquipos);

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

        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date;
        estadoEquipo.fechaActualizacion = new Date;

        estadoEquipo = await estadoEquipo.save(); 
        res.send(estadoEquipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear estadoEquipo')
        
    }
    
  });

  // PUT method route
router.put('/:estadoEquipoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        console.log(req.params.estadoEquipoId);
        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        
        if (!estadoEquipo) {
            return res.status(400).send('estadoEquipo no existe');
        }

        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date;

        estadoEquipo = await estadoEquipo.save(); 
        res.send(estadoEquipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear estadoEquipo')
        
    }
    
  });
  
  module.exports = router;