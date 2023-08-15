// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);

/*** CREATE ONE PRODUCT ***/
// router.post('/create/', productsController.create);
// router.post('/', productsController.store);


/*** GET ONE PRODUCT ***/
// router.GET('/:id/', productsController.detail);

/*** EDIT ONE PRODUCT ***/
// router.PUT('/:id/???', productsController.edit);
// router.PUT('/:id', productsController.update);


/*** DELETE ONE PRODUCT***/
// router.delete('/:id', productsController.destroy);


module.exports = router;
