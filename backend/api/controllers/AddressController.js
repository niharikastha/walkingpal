module.exports = {
    create: async function(req, res) {
      try {
        const { city, state, country, area, street, postalCode, latitude, longitude } = req.body;
  
        const newAddress = await Address.create({
          city,
          state,
          country,
          area,
          street,
          postalCode,
          latitude,
          longitude
        }).fetch();
  
        return res.status(200).json({ status: true, message: 'Address saved successfully', data: newAddress });
      } catch (error) {
        sails.log.error('Save Address Error:', error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
      }
    }
  };
  