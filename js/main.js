/**
 * main.js - Точка входа в приложение.
 * Инициализирует общие компоненты и запускает логику конкретных страниц.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Проверяем авторизацию (из auth.js)
    if (typeof Auth !== 'undefined') {
        Auth.init();
    }

    // 2. Вставляем навигацию (из ui-utils.js)
    if (typeof UI !== 'undefined') {
        UI.insertNavigation();
    }

    // 3. Определяем текущую страницу и запускаем её специфическую логику
    const currentPage = window.location.pathname.split("/").pop();

    switch (currentPage) {
        case 'search.html':
            initProductsPage();
            break;
        case 'tasks.html':
            initTasksPage();
            break;
        case 'admin.html':
            initAdminPage();
            break;
        case 'profile.html':
            initProfilePage();
            break;
    }
});

/**
 * Пример инициализации страницы продуктов
 */
function initProductsPage() {
    const container = document.querySelector('.grid-container');
    if (!container) return;

    // Отрисовываем все товары из data.js при загрузке
    const productsHtml = TeaHubData.products.map(p => UI.renderProductCard(p)).join('');
    container.innerHTML = productsHtml;

    // Тут можно добавить логику поиска/фильтрации
}

/**
 * Инициализация профиля
 */
function initProfilePage() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    // Подставляем имя пользователя в заголовок
    const nameEl = document.querySelector('.user-name-display');
    if (nameEl) nameEl.textContent = user.name;
    
    // Здесь будет код для отрисовки графиков статистики
}