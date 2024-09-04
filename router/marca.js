const { Router } = require('express');
const Marca = require('../models/Marca');
const { validationResult, check } = require('express-validator');

const router = Router();

// Listar marcas
router.get('/', async function (req, res) {
    
    try {

        const marcas = await Marca.find(); // select * from marcas
        res.send(marcas);

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

        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date;
        marca.fechaActualizacion = new Date;

        marca = await marca.save(); 
        res.send(marca);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear marca')
        
    }
    
  });

  // PUT method route
router.put('/:marcaId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        console.log(req.params.marcaId);
        let marca = await Marca.findById(req.params.marcaId);
        
        if (!marca) {
            return res.status(400).send('marca no existe');
        }

        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date;

        marca = await marca.save(); 
        res.send(marca);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear marca')
        
    }
    
  });
  
  module.exports = router;