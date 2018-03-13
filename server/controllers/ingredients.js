const Ingredient = require('mongoose').model('Ingredient');

module.exports = {
   index(request, response) {
      Ingredient.find({})
         .then(ingredients => {
            if(!ingredients) { throw new Error(); }

            console.log(`Return ingredients: ${ingredients}`);

            return response.json(ingredients);
         })
         .catch(console.log)
   },
   unused(request,response){
      console.log('Looking for unused ingredients')
      Ingredient.find({ 'used' : false })
         .then(ingredients => {
            if(!ingredients) { return response.json('{ "error" : "No available ingredients"}')}

            // console.log(`Returning unused ingredients: ${ingredients}`);

            return response.json(ingredients);
         })
   },
   get(request, response){
      Ingredient.findById(request.params.ingredient_id)
         .then(ingredient => response.json(ingredient))
         .catch(console.log)
   },
   create(request, response){
      console.log(`Trying to create an ingredient`);
      // console.log(request.cookies);
      request.body._addedBy = request.cookies.userId;
      Ingredient.create(request.body)
         .then(ingredient => response.json(ingredient))
         .catch(console.log);
      // return response.json(true);
   },
   update(request, response){
      
   },
   destroy(request, response){
      
   }
}