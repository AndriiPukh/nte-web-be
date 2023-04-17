const { validationResult } = require('express-validator');
const { log } = require('winston');
const {
  findAllActiveProducts,
  saveProduct,
  findAllProducts,
  updateManyProducts,
} = require('./product.model');
const { ProductError } = require('./errors');
const { normalizeFields, checkPermission } = require('./utils');
const { statusCode } = require('../app/configs');
const { ValidationError } = require('../app/errors');
const { uploadFile } = require('../app/utils/uploadFileToStorage');
const {
  isExist,
  createFilterFromQueryParams,
  checkMultipleIds,
} = require('./helpers/productHelpers');

async function httpGetAllProducts(req, res, next) {
  try {
    const validationErrors = validationResult(req).formatWith(({ msg }) => msg);
    if (!validationErrors.isEmpty()) {
      throw new ValidationError('Products', validationErrors.errors);
    }
    const { skip, limit, ...filter } = createFilterFromQueryParams(req.query);
    const products = await findAllActiveProducts(skip, limit, filter);
    res.status(statusCode.OK).json(products);
  } catch (err) {
    next(err);
  }
}

async function httpGetProductById(req, res, next) {
  try {
    const { id } = req.params;
    const product = await isExist(id);
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
    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadFile(req.file);
    }
    const product = normalizeFields({
      ...req.body,
      imageUrl,
      creator: JSON.parse(req.user).userId,
    });
    const createdProduct = await saveProduct(product);
    res.status(statusCode.OK).json({ id: createdProduct._id });
  } catch (err) {
    next(err);
  }
}

async function httpUpdateProduct(req, res, next) {
  try {
    const validationErrors = validationResult(req).formatWith(({ msg }) => msg);
    if (!validationErrors.isEmpty()) {
      throw new ValidationError('Products', validationErrors.errors);
    }
    const {
      params: { id },
      body: updates,
    } = req;
    const product = await isExist(id);
    if (!checkPermission(product.creator._id, JSON.parse(req.user))) {
      throw new ProductError('FORBIDDEN');
    }
    let normalizedFields = {};
    normalizedFields = normalizeFields(updates);
    if (req.file) {
      product.imageUrl = await uploadFile(req.file);
    }
    Object.keys(updates).forEach(
      // eslint-disable-next-line no-return-assign
      (key) => (product[key] = normalizedFields[key])
    );
    product.updatedAt = new Date().toISOString();
    await product.save();
    res.status(statusCode.OK).json(product);
  } catch (err) {
    next(err);
  }
}

async function httMarkProductAsDelete(req, res, next) {
  try {
    const { id } = req.params;
    const product = await isExist(id);
    if (!checkPermission(product.creator._id, JSON.parse(req.user))) {
      throw new ProductError('FORBIDDEN');
    }
    product.deleted = true;
    await product.save();
    res.status(statusCode.OK).send('success');
  } catch (err) {
    next(err);
  }
}

async function httpAddProductComment(req, res, next) {
  try {
    const validationErrors = validationResult(req).formatWith(({ msg }) => msg);
    if (!validationErrors.isEmpty()) {
      throw new ValidationError('Products', validationErrors.errors);
    }
    const {
      params: { id },
      body: { text },
      user,
    } = req;
    const { userId } = JSON.parse(user);
    const product = await isExist(id);
    product.comments.push({ text, author: userId });
    await product.save();
    res.status(statusCode.OK).json(product);
  } catch (err) {
    next(err);
  }
}

async function httpRemoveProductComment(req, res, next) {
  try {
    const { id, commentId } = req.params;
    const product = await isExist(id);
    if (!checkPermission(product.creator._id, JSON.parse(req.user))) {
      throw new ProductError('FORBIDDEN');
    }
    const { comments } = product;
    const commentIndex = comments.findIndex(
      (com) => com._id.toString() === commentId
    );
    if (commentIndex === -1) {
      throw new ProductError('COMMENT_NOT_FOUND');
    }
    comments.splice(commentIndex, 1);
    await product.save();
    res.status(statusCode.OK).json(product);
  } catch (err) {
    next(err);
  }
}

async function httpGetAllProductsByAdmin(req, res, next) {
  try {
    const validationErrors = validationResult(req).formatWith(({ msg }) => msg);
    if (!validationErrors.isEmpty()) {
      throw new ValidationError('Products', validationErrors.errors);
    }
    const { skip, limit, ...filter } = createFilterFromQueryParams(req.query);

    const products = await findAllProducts(skip, limit, filter);
    res.status(statusCode.OK).json(products);
  } catch (err) {
    next(err);
  }
}

async function httpRemoveRestoreManyProducts(req, res, next) {
  try {
    const validationErrors = validationResult(req).formatWith(({ msg }) => msg);
    if (!validationErrors.isEmpty()) {
      throw new ValidationError('Products', validationErrors.errors);
    }
    const { ids, deleted } = req.body;
    checkMultipleIds(ids);
    await updateManyProducts(ids, { deleted });
    res.status(statusCode.OK).send('success');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  httpGetAllProducts,
  httpGetProductById,
  httpCreateProduct,
  httpUpdateProduct,
  httMarkProductAsDelete,
  httpAddProductComment,
  httpRemoveProductComment,
  httpGetAllProductsByAdmin,
  httpRemoveRestoreManyProducts,
};
