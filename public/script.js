// public/script.js

// Переменная-заглушка для изображений (для корректного рендеринга при ошибке)
const FALLBACK_IMG =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywaAAAAAAAAAAACAUAOw==';

// Функция для создания DOM-элемента карточки
function renderPhoneCard(phone) {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4 col-sm-6'; 

    const cardInner = document.createElement('div');
    cardInner.className = 'card h-100 shadow-sm';

    // Изображение
    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.alt = `${phone.brand} ${phone.model}`;
    img.src = phone.imageUrl;
    img.onerror = () => {
        img.src = FALLBACK_IMG; 
    };

    // Тело карточки
    const body = document.createElement('div');
    body.className = 'card-body text-center';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = `${phone.brand} ${phone.model}`;

    // ВЫВОД НОВОГО ПОЛЯ 'storage' (выполняет задачу по выводу нового поля на экран)
    const storageText = document.createElement('p');
    storageText.className = 'card-text';
    storageText.textContent = `Память: ${phone.storage} ГБ`; 

    const priceText = document.createElement('p');
    priceText.className = 'card-text';
    priceText.textContent = `${phone.price}$`;

    body.appendChild(title);
    body.appendChild(storageText);
    body.appendChild(priceText);

    cardInner.appendChild(img);
    cardInner.appendChild(body);
    card.appendChild(cardInner);

    return card;
}

// Главная функция, которая запускается при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const phoneListContainer = document.getElementById('phone-list');
    
    // 1. Запрос к API для получения списка телефонов
    fetch('/api/phones')
        .then(response => response.json())
        .then(phones => {
            if (phones.length === 0) {
                phoneListContainer.innerHTML = '<p class="text-center">Телефоны не найдены.</p>';
                return;
            }

            // 2. Рендеринг карточек
            phones.forEach(phone => {
                phoneListContainer.appendChild(renderPhoneCard(phone));
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке телефонов:', error);
            phoneListContainer.innerHTML = '<p class="text-center text-danger">Не удалось загрузить каталог. Проверьте сервер и БД.</p>';
        });
});