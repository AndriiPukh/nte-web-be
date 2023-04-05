const {
  findAllProducts,
  findProductById,
  saveProduct,
} = require('./product.model');
const { ProductError } = require('./errors');
const { getPagination, matchId } = require('../app/utils');
const { statusCode } = require('../app/configs');

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
    const product = await saveProduct();
    res.status(statusCode.Ok).send('success');
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
    res.status(204).send('success');
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
