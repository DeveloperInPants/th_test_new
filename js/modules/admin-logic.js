/**
 * admin-logic.js - Логика панели управления (admin.html)
 */

function initAdminPage() {
    const user = Auth.getCurrentUser();
    if (!user || user.role !== 'master') return;

    const statsContainer = document.querySelector('.admin-stats-grid');
    const employeeList = document.querySelector('.employee-list');

    // 1. Отрисовка общей статистики мастера
    if (statsContainer) {
        const s = TeaHubData.userStats.master;
        statsContainer.innerHTML = `
            <div class="glass-card stat-card">
                <span class="stat-value">${s.totalEmployees}</span>
                <span class="stat-label">Сотрудников</span>
            </div>
            <div class="glass-card stat-card">
                <span class="stat-value">${s.averageProgress}%</span>
                <span class="stat-label">Средний прогресс</span>
            </div>
            <div class="glass-card stat-card">
                <span class="stat-value">${s.activeCourses}</span>
                <span class="stat-label">Активных курсов</span>
            </div>
        `;
    }

    // 2. Логика открытия модалки добавления сотрудника (как на скриншоте)
    const addBtn = document.getElementById('add-employee-btn');
    const modal = document.getElementById('add-employee-modal');

    if (addBtn && modal) {
        addBtn.onclick = () => modal.style.display = 'flex';
        
        // Закрытие модалки
        window.onclick = (e) => {
            if (e.target === modal) modal.style.display = 'none';
        };
    }

    // 3. Обработка формы добавления
    const form = document.getElementById('add-employee-form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            alert('Сотрудник успешно добавлен и приглашение отправлено на почту!');
            modal.style.display = 'none';
        };
    }
}

window.initAdminPage = initAdminPage;