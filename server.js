const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Простые роуты
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Адвокат Геральт - Топовий адвокат з Голего',
        featuredCases: [],
        stats: {
            totalCases: 47,
            wonCases: 45,
            successRate: 96,
            experience: '3 роки',
            happyClients: 100
        }
    });
});

app.get('/spravy', (req, res) => {
    res.render('spravy/index', {
        title: 'Адвокатські справи - Адвокат Геральт',
        cases: [],
        filters: {}
    });
});

app.get('/spravy/:id', (req, res) => {
    res.render('spravy/show', {
        title: 'Справа - Адвокат Геральт',
        caseItem: {},
        relatedCases: []
    });
});

app.get('/kotyne-pravo', (req, res) => {
    res.render('kotyne-pravo/index', {
        title: 'Котине право - Адвокат Геральт'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Сторінку не знайдено',
        error: 'Такої сторінки не існує в нашій адвокатській картотеці!'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).render('error', {
        title: 'Сталася помилка',
        error: 'Щось пішло не так! Будь ласка, спробуйте пізніше.'
    });
});

// Для Vercel Serverless Functions
module.exports = app;

// Для локального запуска
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Сервер запущено на порту ${PORT}`);
    });
}

// Для Vercel
export default app;

// Локальный запуск
if (import.meta.url === `file://${process.argv[1]}`) {
    app.listen(PORT, () => {
        console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
        console.log(`⚖️  Адвокат Геральт готовий до роботи!`);
    });
}
