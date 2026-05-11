/**
 * task-logic.js - Логика учебного центра (tasks.html)
 */

function initTasksPage() {
    const container = document.querySelector('.grid-container');
    if (!container) return;

    // Отрисовка карточек курсов из data.js
    container.innerHTML = TeaHubData.courses.map(course => UI.renderCourseCard(course)).join('');

    // Обработка кликов по урокам внутри курса
    // В данном проекте переход осуществляется через URL параметры (на theory.html?id=...)
}

/**
 * Логика самого теста (если мы на странице теста)
 */
function initTestEngine(testId) {
    const testData = TeaHubData.tests[testId];
    const container = document.querySelector('.test-container');
    if (!testData || !container) return;

    let currentQuestion = 0;
    let score = 0;

    const renderQuestion = () => {
        const q = testData.questions[currentQuestion];
        container.innerHTML = `
            <div class="glass-modal">
                <h2 style="margin-bottom:20px;">${testData.title}</h2>
                <p style="font-size: 1.2rem; margin-bottom:30px;">${q.question}</p>
                <div class="options-list">
                    ${q.options.map((opt, idx) => `
                        <button class="test-option" onclick="handleAnswer(${idx})">${opt}</button>
                    `).join('')}
                </div>
                <div style="margin-top:20px; color:var(--text-dim)">Вопрос ${currentQuestion + 1} из ${testData.questions.length}</div>
            </div>
        `;
    };

    window.handleAnswer = (idx) => {
        if (idx === testData.questions[currentQuestion].correct) score++;
        
        currentQuestion++;
        if (currentQuestion < testData.questions.length) {
            renderQuestion();
        } else {
            showResult();
        }
    };

    const showResult = () => {
        container.innerHTML = `
            <div class="glass-modal" style="text-align:center;">
                <h2>Тест завершен!</h2>
                <div class="stat-value" style="margin: 30px 0;">${Math.round((score/testData.questions.length)*100)}%</div>
                <p>Ваш результат: ${score} из ${testData.questions.length}</p>
                <button class="glass-button" onclick="location.href='tasks.html'" style="margin-top:20px;">Вернуться к обучению</button>
            </div>
        `;
    };

    renderQuestion();
}

window.initTasksPage = initTasksPage;
window.initTestEngine = initTestEngine;