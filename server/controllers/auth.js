const User = require('mongoose').model('User');

module.exports = {
   login(request, response){
      // console.log(`Logging in ${request.body.username}`);
      
      User.findOne({ username : request.body.username })
         .then(user => {
            if(!user) { throw new Error(); }

            // here is where we do password verification if we added it for external network access
            completeLogin(request, response, user);
         })
         .catch(error => {
            response.status(401).json('User does not exists');
         });
   },
   register(request, response){
      // console.log(`Registering : ${request.body}`);
      
      User.create(request.body)
         .then(user => {
            completeLogin(request, response, user);
         })
         .catch(error => {
            response.status(422).json(
               Object.keys(error.errors).map(key => error.errors[key].message) // map errors
            );
         });
   },
   logout(request, response){
      // console.log('Logged out');
      
      request.session.destroy();
      response.clearCookie('userId');
      response.clearCookie('expiration');
      response.json(true);
   }
};

function completeLogin(request, response, user){
//    console.log('Compeleting login');

   request.session.user = user.toObject();

   delete request.session.user.password;

   response.cookie('userId', user._id.toString());
   response.cookie('expiration', Date.now() + 86400 * 1000);

   response.json(user);
}