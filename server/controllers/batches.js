const Batch = require('mongoose').model('Batch');
const Ingredient = require('mongoose').model('Ingredient');

module.exports = {
    index(request, response) {
        return response.json('Index');
    },
    get(request, response) {
        return response.json('Get');
    },
    create(request, response) {
        // console.log('Batch create hit')
        // const ingredientPromise = Ingredient.findById()
        // console.log(request.body)

        // Add user ID for whoever created this batch to the request body
        request.body._addedBy = request.cookies.userId;
        
        Batch.create(request.body)
            .then((batch) => {
                // we need to update the  ingredients used to have their new available amounts
                console.log(`Created: ${batch}`)
                for(item in batch.ingredients){

                }
                response.json(batch)
            })
            .catch(console.log)
    },
    update(request, response) {
        return response.json('Update');
    },
    destroy(request, response) {
        return response.json('Destroy');
    }
}