const { Router } = require('express');
const { authRouter } = require('../../auth');
const { userRouter } = require('../../user');
const { productRouter } = require('../../product');
const { recipeRouter } = require('../../recipe');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/recipes', recipeRouter);

module.exports = router;
