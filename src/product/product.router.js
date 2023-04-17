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

/**
 * @typedef Comment
 * @param {string} text - Text of comments
 * @param {additionalInformation} author - The author of comment
 * @param {string} createdAt - Comment date
 * @param {string} _id - Comment id
 */

/**
 * @typedef additionalInformation
 * @param {string} firstName - Name of creator
 * @param {string} lastName - Last name of creator
 * @param {string} photoUrl - Avatar of creator
 */

/**
 * @typedef Creator
 * @param {string} _id - Creator id
 * @param {additionalInformation} - User info
 */

/**
 * @typedef {object} Product
 * @property {string} title - The product name
 * @property {string} trademark - The trademark of product
 * @property {string} category - The category of product
 * @property {string} subCategory - The sub-category of product
 * @property {number} price - The price of product
 * @property {string} unit - The unit of product
 * @property {number} amount - The amount of product
 * @property {Creator} creator - Creator Info
 * @property {array<Comment>} comments
 */

/**
 * @typedef {object} NewProduct
 * @property {image} image - The product image - binary
 * @property {string} title.required - The product name
 * @property {string} trademark.required - The trademark of product
 * @property {string} category.required - The category of product
 * @property {string} subCategory.required - The sub-category of product
 * @property {number} price.required - The price of product
 * @property {string} unit.required - The unit of product
 * @property {number} amount.required - The amount of product
 */

/**
 * POST /products/
 * @tags Products
 * @summary Endpoint for creation products
 * @param {NewProduct} request.body - The product data - multipart/form-data
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request
 * @example response - 200 - Example success response
 * {
 *   "id": "6438f66f7a32098cfb05a585"
 * }
 * @example response - 400 - Example error response
 * {
 *
 *     "errors": [
 *         {
 *             "title": "Value 'Фа' - Length must be more than 3 and less than 30 characters"
 *         },
 *         {
 *             "category": "Value 'м'яс' - Wrong category"
 *         },
 *         {
 *             "subCategory": "Value 'мелен' - Wrong subcategory"
 *         },
 *         {
 *             "price": "Value 'price' - Wrong price format, must be a number/decimal"
 *         },
 *         {
 *             "unit": "Value ''s'' - Wrong unit"
 *         },
 *         {
 *             "amount": "Value 'no' - Wrong amount format, must be a number"
 *         }
 *     ]
 * }
 *
 */
productRouter.post(
  '/',
  multer.single('image'),
  productCreateValidation,
  httpCreateProduct
);
/**
 * GET /products/
 * @tags Products
 * @summary Endpoint for users - get all products
 * @pram {number} page.query - pagination page
 * @param {number} limit.query - pagination limit
 * @param {string} title.query - search by name
 * @param {string} trademark - search by trademark
 * @param {string} category - search by category
 * @param {string} subCategory - search by subCategory
 * @param {string} creator - search by creator ID
 * @return {array<Product>} 200 - Success response
 * @return {object} 400 - Bad request
 * @example response - 200 - Example success response
 * [
 * {
 *   "_id": "6438f66f7a32098cfb05a585",
 *     "title": "Фарш  Філейний охолоджений упаковка РЕТ ~0,4к",
 *     "trademark": "Наша Ряба",
 *     "imageUrl": "https://storage.googleapis.com/nte-file-storage/46_big.jpg",
 *     "category": "м'ясо",
 *     "subCategory": "мелене м'ясо",
 *     "price": 189,
 *     "unit": "г",
 *     "amount": 64,
 *     "creator": {
 *         "additionalInformation": {
 *             "firstName": "Андрій",
 *             "lastName": "Пух",
 *             "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *         },
 *         "_id": "641c04ffea79cf285b2aa5ac"
 *     },
 *     "createdAt": "2023-04-14T06:37:44.677Z",
 *     "updatedAt": "2023-04-14T08:49:21.225Z",
 *     "comments": [
 *         {
 *             "text": "Весела дулька",
 *             "author": {
 *                 "additionalInformation": {
 *                     "firstName": "Андрій",
 *                     "lastName": "Пух",
 *                     "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *                 },
 *                 "_id": "641c04ffea79cf285b2aa5ac"
 *             },
 *             "createdAt": "2023-04-14T09:48:03.261Z",
 *             "_id": "643921b8b809fdeac603770e"
 *         },
 *         {
 *             "text": ":%)",
 *             "author": {
 *                 "additionalInformation": {
 *                     "firstName": "Андрій",
 *                     "lastName": "Пух",
 *                     "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *                 },
 *                 "_id": "641c04ffea79cf285b2aa5ac"
 *             },
 *             "createdAt": "2023-04-17T06:38:47.249Z",
 *             "_id": "643ce9f2a763c27e2f9bf0ad"
 *         },
 *         {
 *             "text": ":%)",
 *             "author": {
 *                 "additionalInformation": {
 *                     "firstName": "Андрій",
 *                     "lastName": "Пух",
 *                     "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *                 },
 *                 "_id": "641c04ffea79cf285b2aa5ac"
 *             },
 *             "createdAt": "2023-04-17T07:32:17.826Z",
 *             "_id": "643cf607534e44f9a361381e"
 *         }
 *     ]
 * }
 * ]
 * @example response - 400 - Example error response
 * {
 *    "errors": [
 *         {
 *             "category": "Value 'м'яс' - Wrong category"
 *         }
 *     ]
 * }
 */
productRouter.get('/', productFilterParams, httpGetAllProducts);
/**
 * GET /products/admin
 * @tags Products
 * @summary Endpoint for admin users - get all products even products with positive deleted property
 * @pram {number} page.query - pagination page
 * @param {number} limit.query - pagination limit
 * @param {string} title.query - search by name
 * @param {string} trademark - search by trademark
 * @param {string} category - search by category
 * @param {string} subCategory - search by subCategory
 * @param {string} creator - search by creator ID
 * @return {array<Product>} 200 - Success response
 * @return {object} 400 - Bad request
 * @example response - 200 - Example success response
 * [
 * {
 *   "_id": "6438f66f7a32098cfb05a585",
 *     "title": "Фарш  Філейний охолоджений упаковка РЕТ ~0,4к",
 *     "trademark": "Наша Ряба",
 *     "imageUrl": "https://storage.googleapis.com/nte-file-storage/46_big.jpg",
 *     "category": "м'ясо",
 *     "subCategory": "мелене м'ясо",
 *     "price": 189,
 *     "unit": "г",
 *     "amount": 64,
 *     "creator": {
 *         "additionalInformation": {
 *             "firstName": "Андрій",
 *             "lastName": "Пух",
 *             "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *         },
 *         "_id": "641c04ffea79cf285b2aa5ac"
 *     },
 *     "createdAt": "2023-04-14T06:37:44.677Z",
 *     "updatedAt": "2023-04-14T08:49:21.225Z",
 *     "comments": [
 *         {
 *             "text": "Весела дулька",
 *             "author": {
 *                 "additionalInformation": {
 *                     "firstName": "Андрій",
 *                     "lastName": "Пух",
 *                     "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *                 },
 *                 "_id": "641c04ffea79cf285b2aa5ac"
 *             },
 *             "createdAt": "2023-04-14T09:48:03.261Z",
 *             "_id": "643921b8b809fdeac603770e"
 *         },
 *         {
 *             "text": ":%)",
 *             "author": {
 *                 "additionalInformation": {
 *                     "firstName": "Андрій",
 *                     "lastName": "Пух",
 *                     "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *                 },
 *                 "_id": "641c04ffea79cf285b2aa5ac"
 *             },
 *             "createdAt": "2023-04-17T06:38:47.249Z",
 *             "_id": "643ce9f2a763c27e2f9bf0ad"
 *         },
 *         {
 *             "text": ":%)",
 *             "author": {
 *                 "additionalInformation": {
 *                     "firstName": "Андрій",
 *                     "lastName": "Пух",
 *                     "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *                 },
 *                 "_id": "641c04ffea79cf285b2aa5ac"
 *             },
 *             "createdAt": "2023-04-17T07:32:17.826Z",
 *             "_id": "643cf607534e44f9a361381e"
 *         }
 *     ]
 * }
 * ]
 * @example response - 400 - Example error response
 * {
 *    "errors": [
 *         {
 *             "category": "Value 'м'яс' - Wrong category"
 *         }
 *     ]
 * }
 */
productRouter.get(
  '/admin',
  isAdmin,
  productFilterParams,
  productMultipleUpdates,
  httpGetAllProductsByAdmin
);
/**
 * POST /products/admin
 * @tags Products
 * @summary Endpoint for admin users - restore or remove products
 * @param {array<string>} request.body.ids - ids of products
 * @param {boolean} request.body.deleted - flag for product
 * @return {string} 200 - Success response
 * @return {object} 400 - Bad request
 */
productRouter.post('/admin', isAdmin, httpRemoveRestoreManyProducts);

/**
 * GET /products/{id}
 * @tags Products
 * @summary Endpoint for get active product
 * @param {string} request.param.id - id of product
 * @return {Product} 200 - Success response
 * @example response - 200 - Example success response
 * {
 *  "_id": "6437be17223aad5141a14740",
 *         "title": "Перець чевроний",
 *         "trademark": "Без тм",
 *         "imageUrl": null,
 *         "category": "фрукти та овочі",
 *         "subCategory": "овочі",
 *         "price": 189,
 *         "unit": "кг",
 *         "amount": 1,
 *         "creator": {
 *             "_id": "641c04ffea79cf285b2aa5ac",
 *             "additionalInformation": {
 *                 "firstName": "Андрій",
 *                 "lastName": "Пух",
 *                 "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *             }
 *         },
 *         "createdAt": "2023-04-13T08:31:07.507Z",
 *         "updatedAt": "2023-04-13T08:31:07.507Z"
 * }
 */
productRouter.get('/:id', httpGetProductById);

/**
 * PUT /products/{id}
 * @tags Products
 * @summary Endpoint for get active product
 * @param {string} request.param.id - id of product
 * @param {NewProduct} request.body - New data for product -multipart/form-data
 * @return {Product} 200 - Success response
 * @example response - 200 - Example success response
 * {
 *  "_id": "6437be17223aad5141a14740",
 *         "title": "Перець чевроний",
 *         "trademark": "Без тм",
 *         "imageUrl": null,
 *         "category": "фрукти та овочі",
 *         "subCategory": "овочі",
 *         "price": 189,
 *         "unit": "кг",
 *         "amount": 1,
 *         "creator": {
 *             "_id": "641c04ffea79cf285b2aa5ac",
 *             "additionalInformation": {
 *                 "firstName": "Андрій",
 *                 "lastName": "Пух",
 *                 "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *             }
 *         },
 *         "createdAt": "2023-04-13T08:31:07.507Z",
 *         "updatedAt": "2023-04-13T08:31:07.507Z"
 * }
 */
productRouter.put(
  '/:id',
  multer.single('image'),
  productUpdateValidation,
  httpUpdateProduct
);
/**
 * POST /products/mark-delete/{id}
 * @tags Products
 * @summary Endpoint for users -  mark as removed  products
 * @param {string} request.params.id - id of product
 * @return {string} 200 - Success response
 * @return {object} 400 - Bad request
 */
productRouter.get('/mark-delete/:id', httMarkProductAsDelete);
/**
 * POST /products/{id}/comments
 * @tags Products
 * @summary Endpoint for add comments to active product
 * @param {string} request.params.id - id of product
 * @param {string} request.body.text - Comment text
 * @return {Product} 200 - Success response
 * @example response - 200 - Example success response
 * {
 *   "_id": "6438f66f7a32098cfb05a585",
 *     "title": "Фарш  Філейний охолоджений упаковка РЕТ ~0,4к",
 *     "trademark": "Наша Ряба",
 *     "imageUrl": "https://storage.googleapis.com/nte-file-storage/46_big.jpg",
 *     "category": "м'ясо",
 *     "subCategory": "мелене м'ясо",
 *     "price": 189,
 *     "unit": "г",
 *     "amount": 64,
 *     "creator": {
 *         "additionalInformation": {
 *             "firstName": "Андрій",
 *             "lastName": "Пух",
 *             "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *         },
 *         "_id": "641c04ffea79cf285b2aa5ac"
 *     },
 *     "createdAt": "2023-04-14T06:37:44.677Z",
 *     "updatedAt": "2023-04-14T08:49:21.225Z",
 *     "comments": [
 *         {
 *             "text": "Весела дулька",
 *             "author": {
 *                 "additionalInformation": {
 *                     "firstName": "Андрій",
 *                     "lastName": "Пух",
 *                     "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *                 },
 *                 "_id": "641c04ffea79cf285b2aa5ac"
 *             },
 *             "createdAt": "2023-04-14T09:48:03.261Z",
 *             "_id": "643921b8b809fdeac603770e"
 *         },
 *         {
 *             "text": ":%)",
 *             "author": {
 *                 "additionalInformation": {
 *                     "firstName": "Андрій",
 *                     "lastName": "Пух",
 *                     "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *                 },
 *                 "_id": "641c04ffea79cf285b2aa5ac"
 *             },
 *             "createdAt": "2023-04-17T06:38:47.249Z",
 *             "_id": "643ce9f2a763c27e2f9bf0ad"
 *         },
 *         {
 *             "text": ":%)",
 *             "author": {
 *                 "additionalInformation": {
 *                     "firstName": "Андрій",
 *                     "lastName": "Пух",
 *                     "photoUrl": "https://storage.googleapis.com/nte-file-storage/yt_icon_rgb.ico"
 *                 },
 *                 "_id": "641c04ffea79cf285b2aa5ac"
 *             },
 *             "createdAt": "2023-04-17T07:32:17.826Z",
 *             "_id": "643cf607534e44f9a361381e"
 *         }
 *     ]
 * }
 */
productRouter.post('/:id/comments', productComments, httpAddProductComment);
/**
 * DELETE /products/{id}/{commentId}
 * @tags Products
 * @summary Endpoint for users -  mark as removed  products
 * @param {string} request.params.id - id of product
 * @param {string} request.params.commentsId - comment id
 * @return {string} 200 - Success response
 * @return {object} 400 - Bad request
 */
productRouter.delete('/:id/:commentId', httpRemoveProductComment);
module.exports = productRouter;
