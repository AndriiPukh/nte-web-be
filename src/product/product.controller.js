const { validationResult } = require('express-validator');
const { log } = require('winston');
const {
  findAllProducts,
  findProductById,
  saveProduct,
} = require('./product.model');
const { ProductError } = require('./errors');
const { getPagination, matchId } = require('../app/utils');
const { normalizeCategory } = require('./utils');
const { statusCode } = require('../app/configs');
const { ValidationError } = require('../app/errors');
const { uploadFile } = require('../app/utils/uploadFileToStorage');

async function httpGetAllProducts(req, res, next) {
  try {
    const { skip, limit } = getPagination(req.query);
    const products = await findAllProducts(skip, limit);
    res.status(statusCode.OK).json(products);
  } catch (err) {
    next(err);
  }
}

async function httpGetProductById(req, res, next) {
  try {
    const { id } = req.param;
    if (!matchId(id)) {
      throw new ProductError('INVALID_ID');
    }
    const product = await findProductById(id);
    if (!product) {
      throw new ProductError('NOT_FOUND');
    }
    res.status(statusCode.OK).json(product);
  } catch (err) {
    next(err);
  }
}

async function httpCreateProduct(req, res, next) {
  try {
    const validationErrors = validationResult(req).formatWith(({ msg }) => msg);
    if (!validationErrors.isEmpty()) {
      throw new ValidationError('Products', validationErrors.errors);
    }
    const newProduct = {};
    if (req.file) {
      newProduct.imageUrl = await uploadFile(req.file);
    }
    const {
      category: nonVerifiedCategory,
      subCategory: nonVerifiedSub,
      ...productData
    } = req.body;
    const { category, subCategory } = normalizeCategory(
      nonVerifiedCategory,
      nonVerifiedSub
    );
    newProduct.category = category;
    newProduct.subCategory = subCategory;
    const product = Object.assign(newProduct, productData, {
      creator: JSON.parse(req.user).userId,
    });
    if (product.price) {
      product.price = +product.price;
    }
    product.amount = +product.amount;
    await saveProduct(product);
    res.status(statusCode.OK).json({ status: 'success' });
  } catch (err) {
    next(err);
  }
}
// TODO - check save for document
async function httMarkProductAsDelete(req, res, next) {
  try {
    const { id } = req.param;
    if (!matchId(id)) {
      throw new ProductError('INVALID_ID');
    }
    const product = findProductById(id);
    if (!product) {
      throw new ProductError('NOT_FOUND');
    }
    product.deleted = true;
    await product.save();
    res.status(statusCode.OK).send('success');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  httpGetAllProducts,
  httpGetProductById,
  httpCreateProduct,
  httMarkProductAsDelete,
};
