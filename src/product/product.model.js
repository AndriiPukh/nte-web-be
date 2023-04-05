const ProductDB = require('./product.mongo');

async function saveProduct(product) {
  return ProductDB.findOneAndUpdate({ _id: product._id }, product, {
    upsert: true,
    new: true,
    fields: { __v: 0 },
  });
}

async function findAllProducts(skip, limit, filter = {}) {
  return ProductDB.find({ deleted: false, ...filter }, { __v: 0, reviews: 0 })
    .skip(skip)
    .limit(limit)
    .lean();
}

async function findProductById(_id) {
  return ProductDB.findById(_id, { __v: 0 }).lean();
}

async function deleteProductById(_id) {
  await ProductDB.findByIdAndDelete(_id);
}

module.exports = {
  saveProduct,
  findAllProducts,
  findProductById,
  deleteProductById,
};
