module.exports = {
  // Get all food items for a restaurant
  getByRestaurant: async function (req, res) {
    try {
      const { restaurantId } = req.params;

      const existingRestaurant = await Restaurant.findOne({ id: restaurantId });
      if (!existingRestaurant) {
        return res.status(403).json({
          status: false,
          message: "Please enter a valid restaurant"
        });
      }

      const foodItems = await FoodItem.find({ restaurant: restaurantId });

      return res.status(200).json({
        status: true,
        message: "Food items fetched successfully",
        data: foodItems
      });
    } catch (error) {
      console.error("Error fetching food items:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while fetching food items",
        error: error
      });
    }
  },

  // Create a food item
  create: async function (req, res) {
    try {
      const { name, price, restaurant } = req.body;

      const existingRestaurant = await Restaurant.findOne({ id: restaurant });
      if (!existingRestaurant) {
        return res.status(403).json({
          status: false,
          message: "Please enter a valid restaurant"
        });
      }

      const food = await FoodItem.create({ name, price, restaurant }).fetch();

      return res.status(201).json({
        status: true,
        message: "Food entered successfully",
        data: food
      });
    } catch (error) {
      console.error("Error creating food item:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while creating the food item",
        error: error
      });
    }
  },

  // Update food item
  update: async function (req, res) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;

      const existingFoodItem = await FoodItem.findOne({ id });
      if (!existingFoodItem) {
        return res.status(404).json({
          status: false,
          message: "Food item not found"
        });
      }

      const updatedFoodItem = await FoodItem.updateOne({ id }).set({ name, price });

      return res.status(200).json({
        status: true,
        message: "Food item updated successfully",
        data: updatedFoodItem
      });
    } catch (error) {
      console.error("Error updating food item:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while updating the food item",
        error: error
      });
    }
  },

  // Delete food item
  delete: async function (req, res) {
    try {
      const { id } = req.params;

      const existingFoodItem = await FoodItem.findOne({ id });
      if (!existingFoodItem) {
        return res.status(404).json({
          status: false,
          message: "Food item not found"
        });
      }

      await FoodItem.destroyOne({ id });

      return res.status(200).json({
        status: true,
        message: "Food item deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting food item:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while deleting the food item",
        error: error
      });
    }
  }
};
