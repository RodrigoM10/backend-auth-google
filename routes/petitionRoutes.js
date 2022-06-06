// Rutas para mensajes
const express = require('express');
const router = express.Router();
const petitionController = require('../controllers/petitionController');
const { check } = require('express-validator');

// Crear un mensaje
router.post(
    '/',
    [
        check('title', 'Titulo obligatorio').not().isEmpty().isLength({ max: 30 }),
        check('description', 'Descripción obligatoria').not().isEmpty(),
        check('image', 'Imagen obligatoria').not().isEmpty(),
        check('nameAuthor', 'Nombre obligatorio').not().isEmpty().isLength({ max: 30 }),
        check('emailAuthor', 'Agrega un Email Valido').isEmail().isLength({ max: 35 }),
        check('emailAuthor', 'Email obligatorio').not().isEmpty(),
        check('phoneAuthor', 'Telefono obligatorio').not().isEmpty().isLength({ max: 15 }),
        check('description', 'La descripción debe tener como mínimo de 15 caracteres').isLength({ min: 10 }),
        check('description', 'La descripción debe tener como maximo de 250 caracteres').isLength({
            max: 250,
        }),
    ],
    petitionController.createPetition
);

router.get('/', petitionController.getPetitions);
router.get('/:id', petitionController.getPetition);
router.delete('/:id', petitionController.deletePetition);

router.get('/', () => {});

module.exports = router;
