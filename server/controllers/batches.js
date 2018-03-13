const Batch = require('mongoose').model('Batch');

module.exports = {
    index(request, response) {
        return response.json('Index');
    },
    get(request, response) {
        return response.json('Get');
    },
    create(request, response) {
        // console.log('Batch create hit')
        console.log(request.body)
        request.body._addedBy = request.cookies.userId;
        Batch.create(request.body)
            .then(batch => response.json(batch))
            .catch(console.log)
    },
    update(request, response) {
        return response.json('Update');
    },
    destroy(request, response) {
        return response.json('Destroy');
    }
}