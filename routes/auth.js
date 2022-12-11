/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        accessType: 'offline',
        prompt: 'consent',
    })
);

///Callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res, _next) => {
    // eslint-disable-next-line no-undef
    user = req.user;
    // eslint-disable-next-line no-undef
    res.send(user);
});

module.exports = router;
