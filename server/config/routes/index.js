const router = require('express').Router();
const authRoutes = require('./auth.routes');

const ingredientRoutes = require('./ingredient.routes');
const batchRoutes = require('./batch.routes');

module.exports = router
   .use('/auth', authRoutes)
   .use('/ingredients', ingredientRoutes)
   .use('/batch',batchRoutes);
   