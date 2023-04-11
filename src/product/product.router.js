const { Router } = require('express');
const {
  validation: {
    productCreateValidation,
    productUpdateValidation,
    productComments,
  },
} = require('./utils');
const { multer } = require('../app/services/storage');
const {
  httpGetAllProducts,
  httpGetProductById,
  httpCreateProduct,
  httpUpdateProduct,
  httMarkProductAsDelete,
  httpAddProductComment,
  httpRemoveProductComment,
} = require('./product.controller');
const { authenticate } = require('../auth/services/passport');

const productRouter = Router();
productRouter.use(authenticate);
productRouter.get('/', httpGetAllProducts);
productRouter.get('/:id', httpGetProductById);
productRouter.post(
  '/',
  multer.single('image'),
  productCreateValidation,
  httpCreateProduct
);
productRouter.put(
  '/',
  multer.single('image'),
  productUpdateValidation,
  httpUpdateProduct
);
productRouter.get('/mark-delete/:id', httMarkProductAsDelete);
productRouter.post('/:id/comments', productComments, httpAddProductComment);
productRouter.delete('/:id/:commentId', httpRemoveProductComment);

module.exports = productRouter;
