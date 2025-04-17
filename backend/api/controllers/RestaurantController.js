module.exports = {

  // Create a restaurant
  create: async function (req, res) {
    try {
      const { name, cuisine, priceForOne, rating, discount, imageUrl, foodItems } = req.body;

      if (!name || !cuisine || !priceForOne) {
        return res.status(400).json({
          status: false,
          message: "Missing required fields (name, cuisine, priceForOne)"
        });
      }

      const newRestaurant = await Restaurant.create({
        name,
        cuisine,
        priceForOne,
        rating: rating || 0,
        discount: discount || 0,
        imageUrl: imageUrl || null,
        foodItems: foodItems || []
      }).fetch();

      return res.status(201).json({
        status: true,
        message: "Restaurant created successfully",
        data: newRestaurant
      });
    } catch (error) {
      console.error("Error creating restaurant:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while creating the restaurant",
        error: error
      });
    }
  },

  // Update restaurant
  update: async function (req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const existingRestaurant = await Restaurant.findOne({ id });
      if (!existingRestaurant) {
        return res.status(404).json({
          status: false,
          message: "Restaurant not found"
        });
      }

      const updatedRestaurant = await Restaurant.updateOne({ id }).set(updatedData);

      return res.status(200).json({
        status: true,
        message: "Restaurant updated successfully",
        data: updatedRestaurant
      });
    } catch (error) {
      console.error("Error updating restaurant:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while updating the restaurant",
        error: error
      });
    }
  },

  // Delete restaurant
  delete: async function (req, res) {
    try {
      const { id } = req.params;

      const existingRestaurant = await Restaurant.findOne({ id });
      if (!existingRestaurant) {
        return res.status(404).json({
          status: false,
          message: "Restaurant not found"
        });
      }

      await Restaurant.destroyOne({ id });

      return res.status(200).json({
        status: true,
        message: "Restaurant deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while deleting the restaurant",
        error: error
      });
    }
  },

  find: async function (req, res) {
    try {
      let { page, limit, sortBy, order } = req.query;

      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      order = order === "desc" ? "DESC" : "ASC";
      sortBy = sortBy || "name";

      let skip = (page - 1) * limit;

      const restaurants = await Restaurant.find()
        .populate('foodItems')
        .sort(`${sortBy} ${order}`)
        .skip(skip)
        .limit(limit);

      const totalRestaurants = await Restaurant.count();

      return res.status(200).json({
        status: true,
        message: "Restaurants fetched successfully",
        data: restaurants,
        pagination: {
          total: totalRestaurants,
          page,
          limit,
          totalPages: Math.ceil(totalRestaurants / limit),
        }
      });
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while fetching restaurants",
        error: error
      });
    }
  },

  findOne: async function (req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Restaurant ID is required"
        });
      }

      const restaurant = await Restaurant.findOne({ id }).populate('foodItems');

      if (!restaurant) {
        return res.status(404).json({
          status: false,
          message: "Restaurant not found"
        });
      }

      return res.status(200).json({
        status: true,
        message: "Restaurant fetched successfully",
        data: restaurant
      });

    } catch (error) {
      console.error("Error fetching restaurant:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while fetching the restaurant",
        error: error
      });
    }
  },

};
