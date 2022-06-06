const Petition = require('../models/Petition');
const { validationResult } = require('express-validator');

exports.createPetition = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }

    try {
        let petition;

        petition = new Petition(req.body);

        await petition.save();

        res.json({ msg: 'Petition creada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};

exports.getPetitions = async (req, res) => {
    try {
        const messages = await Petition.find();
        res.send(messages);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};
exports.getPetition = async (req, res) => {
    try {
        const petition = await Petition.findById(req.params.id).select('title description image register');
        res.send(petition);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.deletePetition = async (req, res) => {
    try {
        await Petition.findByIdAndDelete(req.params.id);
        res.send('usuario eliminado');
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};
