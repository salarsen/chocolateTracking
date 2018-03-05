const ingredientController = require('../../controllers/ingredients');
const router = require('express').Router();

module.exports = router
   .get('/', ingredientController.index)
   .get('/unusued', ingredientController.unused)
   .post('/', ingredientController.create)
   .get('/:ingredient_id', ingredientController.get)
   .put('/:ingredient_id', ingredientController.update)
   .delete('/:ingredient_id', ingredientController.destroy);
   