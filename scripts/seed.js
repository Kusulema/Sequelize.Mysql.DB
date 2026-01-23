// scripts/seed.js

// 1. Импортируем подключение к БД и модель Phone
const sequelize = require('../db/connections');
const Phone = require('../db/models/phone');

// 2. Тестовые данные для наполнения БД (включая новое поле storage)
const seedData = [
    // Установлены относительные пути для картинок - выполняет задачу "Поставить подходящие картинки"
    { brand: 'iPhone', model: '14 Pro', price: 999, storage: 128, imageUrl: '/images/iphone14.jpg' },
    { brand: 'Samsung', model: 'Galaxy S23 Ultra', price: 1199, storage: 256, imageUrl: '/images/s23ultra.jpg' },
    { brand: 'Google', model: 'Pixel 7 Pro', price: 899, storage: 128, imageUrl: '/images/pixel7.png' },
    { brand: 'Xiaomi', model: '13 Pro', price: 799, storage: 256, imageUrl: '/images/xiaomi13.jpg' },
    { brand: 'OnePlus', model: '11', price: 699, storage: 128, imageUrl: '/images/oneplus11.png' },
    { brand: 'Sony', model: 'Xperia 1 V', price: 1399, storage: 512, imageUrl: '/images/xperia1v.jfif' },
];

async function seed() {
    try {
        // Синхронизация: { force: true } удаляет и создает таблицу заново.
        // Это гарантирует добавление нового поля 'storage'.
        await sequelize.sync({ force: true }); 
        console.log('Таблицы в MySQL успешно пересозданы.');

        // Загрузка данных в таблицу Phones
        await Phone.bulkCreate(seedData);
        console.log('Тестовые данные успешно загружены.');

        // Завершаем процесс после сидирования
        process.exit(0);
    } catch (error) {
        console.error('Ошибка при сидировании базы данных:', error);
        process.exit(1);
    }
}

// Запуск функции сидирования
seed();