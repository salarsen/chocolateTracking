const router = require('express').Router();
const path = require('path');

router.all('*', (request, response) => {
   response.sendFile(path.resolve('dist', 'index.html'));
});

module.exports = router;