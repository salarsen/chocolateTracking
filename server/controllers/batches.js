const Batch = require('mongoose').model('Batch');
const Ingredient = require('mongoose').model('Ingredient');

module.exports = {
    index(request, response) {
        Batch.find({})
            .populate('ingredients._ingredientId')
            .then(batch => response.json(batch))
            // .catch(console.log)
            .catch(error => {
                console.log(error)
                response.status(500).json(error);
            });
    },
    get(request, response) {
        Batch.findById({ _id: request.body._id })
            .populate('ingredients._ingredientId')
            .then(batch => response.json(batch))
            // .catch(console.log)
            .catch(error => {
                console.log(error)
                response.status(500).json(error);
            });
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
                // console.log(`Created: ${batch}`)
                // console.log(`number of ingredients: ${batch.ingredients.length}`)

                for(let i = 0; i < batch.ingredients.length; i++){
                    // console.log(i, batch.ingredients[i]._ingredientId)
                    Ingredient.findById(batch.ingredients[i]._ingredientId)
                        .then((ingredient, errors) => {
                            if(errors) {
                                console.log('errors',errors);
                                response.json(false);
                            }
                            ingredient.set({ 'amountUsed': ingredient.amountUsed + batch.ingredients[i].amount})
                            ingredient._batches.push(batch._id);
                            ingredient.save();
                            // console.log('ingredient',ingredient)
                            // response.json(ingredient);

                        })
                        .catch(console.log)
                }
                // response.json(batch)
                // console.log(batch)
                response.json(true);
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