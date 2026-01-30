const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connections');
const Phone = require('../../../db/models/phone');

jest.mock('../../../db/connections');

describe('Phone Model', () => {
    it('should define the Phone model correctly', () => {
        expect(Phone.name).toBe('Phone');
        expect(Phone.getTableName()).toBe('Phones');

        const attributes = Phone.getAttributes();
        
        expect(attributes.brand).toBeDefined();
        expect(attributes.brand.type).toEqual(DataTypes.STRING);
        expect(attributes.brand.allowNull).toBe(false);

        expect(attributes.model).toBeDefined();
        expect(attributes.model.type).toEqual(DataTypes.STRING);
        expect(attributes.model.allowNull).toBe(false);

        expect(attributes.price).toBeDefined();
        expect(attributes.price.type).toEqual(DataTypes.INTEGER);
        expect(attributes.price.allowNull).toBe(false);

        expect(attributes.imageUrl).toBeDefined();
        expect(attributes.imageUrl.type).toEqual(DataTypes.STRING);
        expect(attributes.imageUrl.allowNull).toBe(true);

        expect(attributes.storage).toBeDefined();
        expect(attributes.storage.type).toEqual(DataTypes.INTEGER);
        expect(attributes.storage.allowNull).toBe(false);
    });
});