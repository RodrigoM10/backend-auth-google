const DOTENV = 'dotenv';
require(DOTENV).config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { default: mongoose } = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const petitionRoutes = require('./routes/petitionRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URL);

app.use(express.json({ extended: true }));

app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/petition', petitionRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log('Servidor Funcionando');
});
