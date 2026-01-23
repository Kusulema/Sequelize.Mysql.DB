// server.js

// 1. Импортируем модули
const express = require('express');
const path = require('path');
// Подключаем только sequelize и модель (логика sync/bulkCreate убрана в scripts/seed.js)
const sequelize = require('./db/connections'); 
const Phone = require('./db/models/phone'); 

const app = express();
const PORT = 3000;

// 2. Middleware для статических файлов (обслуживает public/)
app.use(express.static(path.join(__dirname, 'public')));

// 3. API эндпоинт: получить список всех телефонов
app.get('/api/phones', async (req, res) => {
    try {
        // Получаем все записи из таблицы Phones
        const phones = await Phone.findAll(); 
        res.json(phones);
    } catch (error) {
        console.error('Ошибка при получении телефонов:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// 4. Функция для запуска сервера
const startServer = async () => {
    try {
        // Убеждаемся, что подключение к БД активно
        await sequelize.authenticate();
        
        // Запускаем Express-сервер
        app.listen(PORT, () => {
            console.log(`Сервер запущен на http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Критическая ошибка при запуске сервера:', error);
    }
};

startServer();