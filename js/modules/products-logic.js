/**
 * products-logic.js - Логика страницы каталога (search.html)
 */

function initProductsPage() {
    const container = document.querySelector('.grid-container');
    const searchInput = document.querySelector('.glass-input'); // Предполагаем наличие инпута поиска
    const filterButtons = document.querySelectorAll('.filter-btn'); // Кнопки категорий

    if (!container) return;

    // Функция для отрисовки списка
    const render = (items) => {
        container.innerHTML = items.map(product => UI.renderProductCard(product)).join('');
    };

    // Начальная отрисовка всех продуктов
    render(TeaHubData.products);

    // Логика поиска
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = TeaHubData.products.filter(p => 
                p.name.toLowerCase().includes(term) || 
                p.description.toLowerCase().includes(term)
            );
            render(filtered);
        });
    }

    // Логика фильтрации по категориям (Чай / Кофе)
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            if (category === 'all') {
                render(TeaHubData.products);
            } else {
                const filtered = TeaHubData.products.filter(p => p.category === category);
                render(filtered);
            }
        });
    });
}

// Запуск при загрузке страницы через main.js
window.initProductsPage = initProductsPage;