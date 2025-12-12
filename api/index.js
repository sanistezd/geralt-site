import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(helmet());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Адвокат Геральт',
    page: 'home'
  });
});

app.get('/services', (req, res) => {
  res.render('services', { 
    title: 'Послуги',
    page: 'services'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Контакти',
    page: 'contact'
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    title: 'Про мене',
    page: 'about'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Сторінку не знайдено',
    page: '404'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { 
    title: 'Помилка сервера',
    page: '500'
  });
});

export default app;