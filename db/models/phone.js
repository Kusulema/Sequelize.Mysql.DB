// db/models/phone.js

const { DataTypes } = require('sequelize');
const sequelize = require('../connections');

// Определение модели Phone (Таблица 'Phones' в БД)
const Phone = sequelize.define('Phone', {
    brand: { // Бренд телефона
        type: DataTypes.STRING,
        allowNull: false
    },
    model: { // Модель телефона
        type: DataTypes.STRING,
        allowNull: false
    },
    price: { // Цена (в долларах/евро)
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imageUrl: { // URL или путь к изображению
        type: DataTypes.STRING,
        allowNull: true
    },
    // НОВОЕ ПОЛЕ: Объем памяти (storage) - выполняет задачу по добавлению нового поля
    storage: { 
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Phone;