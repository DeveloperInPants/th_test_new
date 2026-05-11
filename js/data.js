/**
 * data.js - Хранилище всех статических данных сайта.
 * Содержит информацию о продуктах, учебных курсах и тестах.
 */

const TeaHubData = {
    // 1. Каталог продуктов (используется в search.html)
    products: [
        {
            id: 1,
            category: 'tea',
            type: 'green',
            name: 'Те Гуань Инь',
            description: 'Знаменитый улун из уезда Аньси. Обладает цветочным ароматом с нотками сирени.',
            image: './assets/img/te-guan-yin.jpg',
            stats: { strength: 2, temperature: '85°C', time: '2-3 мин' }
        },
        {
            id: 2,
            category: 'tea',
            type: 'red',
            name: 'Дянь Хун',
            description: 'Красный чай из Юньнани. Насыщенный вкус с медовым послевкусием.',
            image: './assets/img/dian-hun.jpg',
            stats: { strength: 4, temperature: '95°C', time: '3-5 мин' }
        },
        {
            id: 3,
            category: 'coffee',
            type: 'arabica',
            name: 'Эфиопия Иргачефф',
            description: 'Кофе с яркой цитрусовой кислотностью и цветочным ароматом.',
            image: './assets/img/ethiopia.jpg',
            stats: { roast: 'Light', altitude: '1900m', process: 'Washed' }
        }
    ],

    // 2. Учебные курсы (используется в tasks.html)
    courses: [
        {
            id: 'course-1',
            title: 'Основы чайного мастерства',
            category: 'Теория',
            progress: 100,
            icon: 'fa-leaf',
            lessons: [
                { id: 'l1', title: 'История чая', type: 'theory' },
                { id: 'l2', title: 'Классификация', type: 'test' }
            ]
        },
        {
            id: 'course-2',
            title: 'Сервис и подача',
            category: 'Практика',
            progress: 35,
            icon: 'fa-mug-hot',
            lessons: [
                { id: 'l3', title: 'Этикет мастера', type: 'theory' },
                { id: 'l4', title: 'Работа с посудой', type: 'theory' }
            ]
        }
    ],

    // 3. Содержимое теории (используется в theory.html)
    theoryContent: {
        'l1': {
            title: 'История появления чая',
            content: `
                <p>Согласно легенде, чай был открыт в 2737 году до н. э. императором Шэнь-нуном...</p>
                <img src="./assets/img/history-1.jpg" class="card-image" alt="История">
                <h3>Основные вехи:</h3>
                <ul>
                    <li>Династия Тан: становление чайной культуры.</li>
                    <li>Династия Сун: популяризация порошкового чая.</li>
                </ul>
            `
        }
    },

    // 4. Банк вопросов для тестов (используется в tasks.html)
    tests: {
        'l2': {
            title: 'Тест: Классификация чая',
            questions: [
                {
                    question: 'Какой вид чая подвергается максимальной ферментации?',
                    options: ['Зеленый', 'Белый', 'Черный (Хэй Ча)', 'Улун'],
                    correct: 2
                },
                {
                    question: 'Оптимальная температура воды для заваривания белого чая?',
                    options: ['100°C', '70-80°C', '90-95°C', '50°C'],
                    correct: 1
                }
            ]
        }
    },

    // 5. Статистика (имитация данных из БД для profile.html)
    userStats: {
        employee: {
            tasksCompleted: 12,
            testsPassed: 8,
            averageScore: 92,
            totalHours: 24
        },
        master: {
            totalEmployees: 15,
            activeCourses: 4,
            averageProgress: 68,
            notifications: 3
        }
    }
};

// Экспортируем данные для использования в модулях
window.TeaHubData = TeaHubData;