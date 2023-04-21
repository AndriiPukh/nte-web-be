module.exports = {
  recipeData: {
    title: 'Test recipe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus Ad dolore dignissimos asperiores dicta facere optio quod commodi nam tempore recusandae. Rerum sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio aliqua Tenetur quod quidem voluptatem corporis dolorum dicta sit pariatur porro quaerat autem ipsam odit quam beatae tempora quibusda',
    ingredients: [
      {
        title: 'Test ingredients',
        amount: '1',
        unit: 'кг',
        products: [
          {
            product: null,
          },
        ],
      },
    ],
  },
  wrongRecipeData: {
    title: 'ls',
    description: 'as',
    ingredients: [
      {
        title: 'Te',
        amount: 'nan',
        unit: 'кгs',
        products: [
          {
            product: null,
          },
        ],
      },
    ],
  },
  validationErrors: [
    {
      title:
        "Value 'ls' - Length must be more than 3 and less than 30 characters",
    },
    {
      description:
        "Value 'as' - Length must be more than 3 and less than 900 characters",
    },
    {
      'ingredients[0].title':
        "Value 'Te' - Length must be more than 3 and less than 30 characters",
    },
    {
      'ingredients[0].amount':
        "Value 'nan' - Wrong amount format, must be a number",
    },
    {
      'ingredients[0].unit': "Value 'кгs' - Wrong unit",
    },
  ],
};
