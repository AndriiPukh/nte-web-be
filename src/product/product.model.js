const mongoose = require('mongoose');
const ProductDB = require('./product.mongo');

async function saveProduct(product) {
  const createdProduct = new ProductDB(product);
  return createdProduct.save();
}

async function findAllActiveProducts(skip, limit, filter = {}) {
  return ProductDB.find(
    { deleted: false, ...filter },
    { __v: 0, comments: 0, deleted: 0 }
  )
    .populate({
      path: 'creator',
      select:
        '_id additionalInformation.firstName additionalInformation.lastName additionalInformation.photoUrl',
    })
    .skip(skip)
    .limit(limit)
    .lean();
}

async function findProductById(_id) {
  return ProductDB.findOne({ _id, deleted: false }, { __v: 0 })
    .populate({
      path: 'creator',
      select:
        '_id additionalInformation.firstName additionalInformation.lastName additionalInformation.photoUrl',
    })
    .populate({
      path: 'comments',
      populate: [
        {
          path: 'author',
          select:
            '_id additionalInformation.firstName additionalInformation.lastName additionalInformation.photoUrl',
        },
      ],
    });
}

async function findAllProducts(skip, limit, filter = {}) {
  return ProductDB.find(filter, { __v: 0 })
    .populate({
      path: 'creator',
      select:
        '_id additionalInformation.firstName additionalInformation.lastName additionalInformation.photoUrl',
    })
    .skip(skip)
    .limit(limit);
}

async function updateManyProducts(ids, values) {
  const { ObjectId } = mongoose.Types;
  const objectIds = ids.map((id) => new ObjectId(id));
  return ProductDB.updateMany(
    { _id: { $in: objectIds } },
    { $set: { ...values } }
  );
}

module.exports = {
  saveProduct,
  findAllActiveProducts,
  findProductById,
  findAllProducts,
  updateManyProducts,
};
