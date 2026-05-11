/**
 * ui-utils.js - Утилиты для динамической отрисовки интерфейса.
 * Отвечает за генерацию карточек, навигации и индикаторов прогресса.
 */

const UI = {
    /**
     * Рендер карточки продукта для страницы каталога (search.html)
     */
    renderProductCard(product) {
        return `
            <div class="glass-card card-content" data-id="${product.id}">
                <div class="badge">${product.type}</div>
                <img src="${product.image}" class="card-image" alt="${product.name}" 
                     onerror="this.src='https://images.unsplash.com/photo-1594631252845-29fc45865157?q=80&w=500&auto=format&fit=crop'">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-description">${product.description}</p>
                <div style="margin-top: 15px; display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--accent-blue);">
                    <span><i class="fa-solid fa-droplet"></i> ${product.stats.temperature || product.stats.roast}</span>
                    <span><i class="fa-solid fa-clock"></i> ${product.stats.time || product.stats.process}</span>
                </div>
            </div>
        `;
    },

    /**
     * Рендер карточки курса для страницы обучения (tasks.html)
     */
    renderCourseCard(course) {
        return `
            <div class="glass-card card-content" onclick="window.location.href='theory.html?id=${course.id}'">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                    <div class="flex-center" style="width: 50px; height: 50px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
                        <i class="fa-solid ${course.icon}" style="font-size: 1.2rem; color: var(--accent-purple);"></i>
                    </div>
                    <div>
                        <div class="badge" style="margin-bottom: 0;">${course.category}</div>
                        <h3 class="card-title" style="margin-top: 5px; font-size: 1.1rem;">${course.title}</h3>
                    </div>
                </div>
                
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${course.progress}%"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-dim);">
                    <span>Прогресс</span>
                    <span>${course.progress}%</span>
                </div>
            </div>
        `;
    },

    /**
     * Динамическая вставка навигации (Sidebar)
     * Позволяет не копировать меню на каждую страницу вручную.
     */
    insertNavigation() {
        const navContainer = document.getElementById('nav-placeholder');
        if (!navContainer) return;

        const user = Auth.getCurrentUser();
        const role = user ? user.role : 'guest';

        navContainer.innerHTML = `
            <nav class="sidebar">
                <div class="nav-logo">
                    <i class="fa-solid fa-mug-hot" style="font-size: 1.5rem; color: #fff;"></i>
                </div>
                <ul class="nav-links">
                    <li class="nav-item">
                        <a href="index.html" class="nav-link ${this.isActive('index.html')}" title="Главная">
                            <i class="fa-solid fa-house"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="search.html" class="nav-link ${this.isActive('search.html')}" title="Продукты">
                            <i class="fa-solid fa-search"></i>
                        </a>
                    </li>
                    ${role !== 'guest' ? `
                    <li class="nav-item">
                        <a href="tasks.html" class="nav-link ${this.isActive('tasks.html')}" title="Обучение">
                            <i class="fa-solid fa-graduation-cap"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="profile.html" class="nav-link ${this.isActive('profile.html')}" title="Профиль">
                            <i class="fa-solid fa-user-circle"></i>
                        </a>
                    </li>
                    ` : ''}
                    ${role === 'master' ? `
                    <li class="nav-item">
                        <a href="admin.html" class="nav-link ${this.isActive('admin.html')}" title="Админ">
                            <i class="fa-solid fa-screwdriver-wrench"></i>
                        </a>
                    </li>
                    ` : ''}
                </ul>
                <div class="nav-item" style="margin-top: auto; margin-bottom: 20px;">
                    ${role !== 'guest' ? 
                        `<a href="#" onclick="Auth.logout()" class="nav-link" title="Выход"><i class="fa-solid fa-sign-out-alt"></i></a>` : 
                        `<a href="index.html" class="nav-link" title="Вход"><i class="fa-solid fa-right-to-bracket"></i></a>`
                    }
                </div>
            </nav>
        `;
    },

    /**
     * Проверка активной страницы для подсветки иконки в меню
     */
    isActive(pageName) {
        const currentPath = window.location.pathname.split("/").pop();
        if (currentPath === '' && pageName === 'index.html') return 'active';
        return currentPath === pageName ? 'active' : '';
    }
};

// Инициализируем навигацию автоматически
document.addEventListener('DOMContentLoaded', () => {
    UI.insertNavigation();
});

window.UI = UI;