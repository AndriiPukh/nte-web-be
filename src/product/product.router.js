const { Router } = require('express');
const {
  httpGetAllProducts,
  httpGetProductById,
  httpCreateProduct,
  httMarkProductAsDelete,
} = require('./product.controller');
const { authenticate } = require('../auth/services/passport');
const permissionCheck = require('../app/middlewares/permissionCheck');

const productRouter = Router();

productRouter.get('/', authenticate, httpGetAllProducts);
productRouter.get('/:id', authenticate, httpGetProductById);
productRouter.post('/', authenticate, httpCreateProduct);
productRouter.get(
  '/mark-delete/:id',
  authenticate,
  permissionCheck,
  httMarkProductAsDelete
);

module.exports = productRouter;
