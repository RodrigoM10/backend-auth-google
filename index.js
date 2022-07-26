const DOTENV = 'dotenv';
require(DOTENV).config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const passportSetup = require('./config/passport-setup.js');
// const passport = require('passport-google-oauth20');
const passport = require('passport');
const session = require('express-session');
require('./config/passport-setup');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const petitionRoutes = require('./routes/petitionRoutes');
const authGoogleRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(morgan('dev'));

// initialize passport
app.use(session({ secret: process.env.SECRET })); // session secret
app.use(passport.initialize());
app.use(passport.session());

mongoose
    .connect(process.env.MONGO_URL, {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/petition', petitionRoutes);
app.use('/auth', authGoogleRoutes);

//route not found
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

app.listen(process.env.PORT || 4000, () => {
    console.log('Servidor Funcionando');
});
