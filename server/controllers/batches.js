const Batch = require('mongoose').model('Batch');

module.exports = {
    index(request, response) {
        return response.json('Index');
    },
    get(request, response) {
        return response.json('Get');
    },
    create(request, response) {
        console.log('Batch create hit')
        return response.json(true);
    },
    update(request, response) {
        return response.json('Update');
    },
    destroy(request, response) {
        return response.json('Destroy');
    }
}