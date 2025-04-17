module.exports = {
    attributes: {
      name: {
        type: 'string',
        required: true,
      },
      cuisine: {
        type: 'string',
        required: true,
      },
      priceForOne: {
        type: 'number',
        required: true,
      },
      rating: {
        type: 'number',
        defaultsTo: 0,
      },
      discount: {
        type: 'number', 
        defaultsTo: 0,
      },
      imageUrl: {
        type: 'string',
        allowNull: true,
      },
      foodItems: {
        collection: 'fooditem',
        via: 'restaurant'
      }
    }
  };
  