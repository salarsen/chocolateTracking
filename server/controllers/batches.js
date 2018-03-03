const Batch = require('mongoose').model('Batch');

module.exports = {
   index(request, response) {
      return response.json('Index');
   },
   get(request, response) {
      return response.json('Get');
   },
   create(request, response) {
      return response.json('Create');
   },
   update(request, response) {
      return response.json('Update');
   },
   destroy(request, response) {
      return response.json('Destroy');
   }
}