require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const validator = require('validator');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

mongoose.connect('mongodb://localhost:27017/aroundb');

const app = express();
const { PORT = 3000 } = process.env;

// 1. CONFIGURACIÓN DE SEGURIDAD Y PARSEO (Siempre al principio)
app.use(cors());
app.options('*', cors());
app.use(express.json());

// 2. LOGGER DE PETICIONES (Antes de las rutas)
app.use(requestLogger);

// RUTAS PÚBLICAS (Mover aquí arriba)
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    // ... otros campos
  }),
}), createUser);

app.use(auth);

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// 5. MANEJO DE RUTAS NO ENCONTRADAS (Después de todas las rutas válidas)
app.use((req, res) => {
  res.status(404).send({
    message: 'Recurso solicitado no encontrado',
  });
});

// 6. LOGS Y ERRORES (Al final de todo)
app.use(errorLogger); // Primero el logger de errores
app.use(errors());      // Luego los errores de celebrate

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ha ocurrido un error en el servidor'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});