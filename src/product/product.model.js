const ProductDB = require('./product.mongo');

async function saveProduct(product) {
  const createdProduct = new ProductDB(product);
  return createdProduct.save();
}

async function findAllProducts(skip, limit, filter = {}) {
  return ProductDB.find({ deleted: false, ...filter }, { __v: 0, comments: 0 })
    .skip(skip)
    .limit(limit)
    .lean();
}

async function findProductById(_id) {
  return ProductDB.findById(_id, { __v: 0 });
}

module.exports = {
  saveProduct,
  findAllProducts,
  findProductById,
};
