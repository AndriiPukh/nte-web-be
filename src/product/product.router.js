const { Router } = require('express');
const { validation } = require('./utils');
const { multer } = require('../app/services/storage');
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
productRouter.post(
  '/',
  authenticate,
  multer.single('image'),
  validation,
  httpCreateProduct
);
productRouter.get(
  '/mark-delete/:id',
  authenticate,
  permissionCheck,
  httMarkProductAsDelete
);

module.exports = productRouter;
