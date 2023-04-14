module.exports = {
  newProduct: {
    title: 'Test product',
    trademark: 'Test tm',
    category: 'фрукти та овочі',
    subCategory: 'овочі',
    price: 189.0,
    unit: 'кг',
    amount: 1,
  },
  wrongProductData: {
    title: 'Te',
    trademark: 'Te',
    category: 'фрукти та овоч',
    subCategory: 'овоч',
    price: 'price',
    unit: 's',
    amount: 'amount',
  },
  updateField: {
    title: 'Фарш  Філейний охолоджений упаковка РЕТ ~0,4к',
  },
  validationErrors: [
    {
      title:
        "Value 'Te' - Length must be more than 3 and less than 30 characters",
    },
    {
      category: "Value 'фрукти та овоч' - Wrong category",
    },
    {
      subCategory: "Value 'овоч' - Wrong subcategory",
    },
    {
      price: "Value 'price' - Wrong price format, must be a number/decimal",
    },
    {
      unit: "Value 's' - Wrong unit",
    },
    {
      amount: "Value 'amount' - Wrong amount format, must be a number",
    },
  ],
  getProductErrors: {
    invalidId: 'Incorrect product ID format!',
    notFound: 'Product not found!',
  },
  commentsText: {
    text: 'Test message',
  },
};
