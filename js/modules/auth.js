/**
 * auth.js - Модуль авторизации и управления ролями.
 * Реализует вход, выход и проверку прав доступа.
 */

const Auth = {
    // Временные данные для тестирования (пока не подключен Supabase)
    mockUsers: [
        { email: '11@11', password: '11', role: 'employee', name: 'Иван Иванов' },
        { email: '1', password: '1', role: 'master', name: 'Алексей Мастер' }
    ],

    /**
     * Инициализация: проверка, авторизован ли пользователь при загрузке страницы
     */
    init() {
        const user = this.getCurrentUser();
        const currentPage = window.location.pathname.split("/").pop();

        // Если пользователь не авторизован и он не на главной, отправляем на index.html
        if (!user && currentPage !== 'index.html' && currentPage !== '') {
            window.location.href = 'index.html';
        }

        // Если мастер зашел на страницу, доступную только сотруднику, или наоборот
        this.checkAccess(user, currentPage);
    },

    /**
     * Логика входа
     */
    login(email, password) {
        // 1. Пытаемся найти пользователя в mock-данных
        const user = this.mockUsers.find(u => u.email === email && u.password === password);

        if (user) {
            // Сохраняем данные пользователя (кроме пароля) в локальное хранилище
            const userData = {
                email: user.email,
                role: user.role,
                name: user.name
            };
            localStorage.setItem('tea_hub_user', JSON.stringify(userData));
            
            // Перенаправляем в зависимости от роли
            this.redirectByRole(user.role);
            return { success: true };
        } else {
            return { success: false, message: 'Неверный логин или пароль' };
        }
    },

    /**
     * Логика выхода
     */
    logout() {
        localStorage.removeItem('tea_hub_user');
        window.location.href = 'index.html';
    },

    /**
     * Получить данные текущего пользователя
     */
    getCurrentUser() {
        const user = localStorage.getItem('tea_hub_user');
        return user ? JSON.parse(user) : null;
    },

    /**
     * Перенаправление после входа
     */
    redirectByRole(role) {
        if (role === 'master') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'profile.html';
        }
    },

    /**
     * Проверка прав доступа к конкретным страницам
     */
    checkAccess(user, page) {
        if (!user) return;

        // Мастер не должен видеть страницы тестов для сотрудников (по желанию)
        // Сотрудник НЕ МОЖЕТ заходить в admin.html
        if (user.role === 'employee' && page === 'admin.html') {
            alert('Доступ запрещен. У вас нет прав администратора.');
            window.location.href = 'profile.html';
        }
    }
};

// Экспортируем для использования в других скриптах или просто вешаем на окно
window.Auth = Auth;

// Слушатель формы входа (если мы на странице index.html)
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            
            const result = Auth.login(email, password);
            
            if (!result.success) {
                alert(result.message);
            }
        });
    }
});