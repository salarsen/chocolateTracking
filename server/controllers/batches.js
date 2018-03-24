const Batch = require('mongoose').model('Batch');
const Ingredient = require('mongoose').model('Ingredient');

module.exports = {
    index(request, response) {
        Batch.find({})
            .populate('ingredients._ingredientId')
            .then(batch => response.json(batch))
            // .catch(console.log)
            .catch(error => {
                response.status(422).json(
                    Object.keys(error.errors).map(key => error.errors[key].message) // map errors
                );
            });
    },
    get(request, response) {
        Batch.findById({ _id: request.body._id })
            .populate('ingredients._ingredientId')
            .then(batch => response.json(batch))
            // .catch(console.log)
            .catch(error => {
                response.status(422).json(
                    Object.keys(error.errors).map(key => error.errors[key].message) // map errors
                );
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
                        .then((ingredient, error) => {
                            if(error) {
                                console.log('errors', error);
                                response.status(422).json(
                                    Object.keys(error.errors).map(key => error.errors[key].message) // map errors
                                );
                                
                            }
                            ingredient.set({ 'amountUsed': ingredient.amountUsed + batch.ingredients[i].amount})
                            ingredient._batches.push(batch._id);
                            ingredient.save();
                            // console.log('ingredient',ingredient)
                            // response.json(ingredient);

                        })
                        .catch(error => {
                            response.status(422).json(
                                Object.keys(error.errors).map(key => error.errors[key].message) // map errors
                            );
                        })
                }
                // response.json(batch)
                // console.log(batch)
                response.json(true);
            })
            .catch(error => {
                response.status(422).json(
                    Object.keys(error.errors).map(key => error.errors[key].message) // map errors
                );
            })
    },
    update(request, response) {
        return response.json('Update');
    },
    destroy(request, response) {
        return response.json('Destroy');
    }
}