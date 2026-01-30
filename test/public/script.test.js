/**
 * @jest-environment jsdom
 */

// Mock fetch API
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([
            { id: 1, brand: 'iPhone', model: '14 Pro', price: 999, imageUrl: '/images/iphone14.jpg', storage: 128 },
            { id: 2, brand: 'Samsung', model: 'Galaxy S23 Ultra', price: 1199, imageUrl: '/images/s23ultra.jpg', storage: 256 },
        ]),
    })
);

// Load the script after mocking fetch and setting up the DOM environment
require('../../../public/script');

describe('Frontend Script', () => {
    let phoneListContainer;

    beforeEach(() => {
        // Set up a clean DOM for each test
        document.body.innerHTML = `
            <main class="container">
                <section id="phone-list" class="tracks" aria-live="polite"></section>
            </main>
        `;
        phoneListContainer = document.getElementById('phone-list');
        jest.clearAllMocks();
    });

    it('should fetch and display phone data on DOMContentLoaded', async () => {
        // Manually trigger DOMContentLoaded
        document.dispatchEvent(new Event('DOMContentLoaded'));

        // Wait for fetch to resolve and DOM to update
        await new Promise(process.nextTick);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('/api/phones');

        // Check if phone cards are rendered
        expect(phoneListContainer.children.length).toBe(2);
        expect(phoneListContainer.children[0].querySelector('.card-title').textContent).toContain('iPhone 14 Pro');
        expect(phoneListContainer.children[1].querySelector('.card-title').textContent).toContain('Samsung Galaxy S23 Ultra');
        expect(phoneListContainer.children[0].querySelector('.card-text').textContent).toContain('Память: 128 ГБ');
    });

    it('should display "Телефоны не найдены." if no phones are returned', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve([]),
            })
        );

        document.dispatchEvent(new Event('DOMContentLoaded'));
        await new Promise(process.nextTick);

        expect(phoneListContainer.innerHTML).toContain('<p class="text-center">Телефоны не найдены.</p>');
    });

    it('should display an error message if fetch fails', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.reject(new Error('Network error'))
        );
        // Suppress console error for this test
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});


        document.dispatchEvent(new Event('DOMContentLoaded'));
        await new Promise(process.nextTick);

        expect(phoneListContainer.innerHTML).toContain('<p class="text-center text-danger">Не удалось загрузить каталог. Проверьте сервер и БД.</p>');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Ошибка при загрузке телефонов:', expect.any(Error));
        consoleErrorSpy.mockRestore();
    });
});
