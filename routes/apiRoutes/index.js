const router = require('express').Router();
const animalRoutes = require('../apiRoutes/noteRoutes');

router.use(noteRoutes);

module.exports = router;