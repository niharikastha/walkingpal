module.exports = {
    attributes: {
        // user: {
        //     model: 'user',
        //     required: true
        // },
        city: { 
            type: 'string', 
            required: true 
        },
        state: { 
            type: 'string', 
            required: true 
        },
        country: { 
            type: 'string', 
            required: true 
        },
        area:{ 
            type: 'string', 
            required: true 
        },
        street:{ 
            type: 'string', 
            required: true 
        },
        postalCode:{ 
            type: 'string', 
            required: true 
        },
        latitude: { 
            type: 'number', 
            allowNull: true 
        },
        longitude: { 
            type: 'number', 
            allowNull: true 
        }
    }
};
