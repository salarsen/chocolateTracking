const batchController = require('../../controllers/batches');
const router = require('express').Router();

module.exports = router
   .get('/', batchController.index)
   .post('/', batchController.create)
   .get('/:batch_id', batchController.get)
   .put('/:batch_id', batchController.update)
   .delete('/:batch_id', batchController.destroy);
   