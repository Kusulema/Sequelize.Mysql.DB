// db/connection.js

const { Sequelize } = require('sequelize');

// Конфигурация: Подключение к MySQL
// Имя БД: phone_shop_db, Пользователь: root, Пароль: '' (без пароля)
const sequelize = new Sequelize('phone_shop_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql' // Указываем диалект MySQL
});

// Проверка соединения с базой данных
const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных установлено успешно.');
  } catch (error) {
    console.error('Не удалось подключиться к базе данных:', error);
    // При критической ошибке подключения прекращаем работу
    process.exit(1);
  }
};

checkConnection();

module.exports = sequelize;