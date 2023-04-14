const { Router } = require('express');
const {
  validation: {
    productCreateValidation,
    productUpdateValidation,
    productComments,
    productFilterParams,
    productMultipleUpdates,
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
  httpGetAllProductsByAdmin,
  httpRemoveRestoreManyProducts,
} = require('./product.controller');
const isAdmin = require('../app/middlewares/checkAdmin');
const { authenticate } = require('../auth/services/passport');

const productRouter = Router();
productRouter.use(authenticate);
productRouter.post(
  '/',
  multer.single('image'),
  productCreateValidation,
  httpCreateProduct
);
productRouter.get('/', productFilterParams, httpGetAllProducts);
productRouter.get(
  '/admin',
  isAdmin,
  productFilterParams,
  productMultipleUpdates,
  httpGetAllProductsByAdmin
);
productRouter.post('/admin', isAdmin, httpRemoveRestoreManyProducts);
productRouter.get('/:id', httpGetProductById);

productRouter.put(
  '/:id',
  multer.single('image'),
  productUpdateValidation,
  httpUpdateProduct
);
productRouter.get('/mark-delete/:id', httMarkProductAsDelete);
productRouter.post('/:id/comments', productComments, httpAddProductComment);
productRouter.delete('/:id/:commentId', httpRemoveProductComment);
module.exports = productRouter;
