const { Router } = require('express');
const { authRouter } = require('../../auth');
const { userRouter } = require('../../user');
const { productRouter } = require('../../product');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router;
