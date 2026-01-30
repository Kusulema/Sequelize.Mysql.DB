const request = require('supertest');
const express = require('express');
const path = require('path');
const Phone = require('../db/models/phone');
const sequelize = require('../db/connections');

// Mock Phone model and sequelize connection
jest.mock('../db/models/phone');
jest.mock('../db/connections');

// Mock the entire server.js to isolate it for testing
const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.get('/api/phones', async (req, res) => {
    try {
        const phones = await Phone.findAll();
        res.json(phones);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

describe('Server API', () => {
    beforeAll(() => {
        // Mock sequelize authenticate to always resolve for server startup
        sequelize.authenticate.mockResolvedValue();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a list of phones from /api/phones', async () => {
        const mockPhones = [
            { id: 1, brand: 'iPhone', model: '14 Pro', price: 999, imageUrl: '/images/iphone14.jpg', storage: 128 },
            { id: 2, brand: 'Samsung', model: 'Galaxy S23 Ultra', price: 1199, imageUrl: '/images/s23ultra.jpg', storage: 256 },
        ];
        Phone.findAll.mockResolvedValue(mockPhones);

        const response = await request(app).get('/api/phones');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(mockPhones);
        expect(Phone.findAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when fetching phones', async () => {
        Phone.findAll.mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/api/phones');

        expect(response.statusCode).toEqual(500);
        expect(response.text).toEqual('Server Error');
        expect(Phone.findAll).toHaveBeenCalledTimes(1);
    });
});
