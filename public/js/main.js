// Сеньйорський гамбургер-меню для сайту адвоката Геральта
class GeraltBurgerMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.menuClose = document.getElementById('menuClose');
        this.body = document.body;
        
        this.init();
    }

    init() {
        // Ініціалізація гамбургер-меню
        this.initHamburger();
        
        // Інші функції
        this.addSmoothScrolling();
        this.addAnimations();
        this.addScrollEffects();
        
        console.log('🍔 Сеньйорський гамбургер-меню завантажено!');
    }

    initHamburger() {
        // Відкриття/закриття меню
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Закриття меню по кнопці
        if (this.menuClose) {
            this.menuClose.addEventListener('click', () => {
                this.closeMenu();
            });
        }

        // Закриття меню по кліку поза ним
        if (this.mobileMenu) {
            this.mobileMenu.addEventListener('click', (e) => {
                if (e.target === this.mobileMenu) {
                    this.closeMenu();
                }
            });
        }

        // Закриття меню по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });

        // Закриття меню при ресайзі вікна
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        this.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    openMenu() {
        this.hamburger.classList.add('active');
        this.mobileMenu.classList.add('active');
        this.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.body.style.overflow = '';
    }

    // Плавна прокрутка
    addSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Закриваємо меню після кліку на мобільному
                    if (window.innerWidth <= 768) {
                        this.closeMenu();
                    }
                }
            }.bind(this));
        });
    }

    // Анімації при скролі
    addAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.case-card, .service-card, .stat-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Ефекти при скролі для хедера
    addScrollEffects() {
        let lastScroll = 0;
        const header = document.querySelector('.header');

        if (header) {
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;

                if (currentScroll <= 0) {
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                    return;
                }

                if (currentScroll > lastScroll && currentScroll > 100) {
                    // Скрол вниз
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Скрол вгору
                    header.style.transform = 'translateY(0)';
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                }

                lastScroll = currentScroll;
            });
        }
    }
}

// Глобальна функція для закриття меню (використовується в HTML)
function closeMenu() {
    const menu = new GeraltBurgerMenu();
    menu.closeMenu();
}

// Ініціалізація при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
    new GeraltBurgerMenu();
});

// Додаткові ефекти для гамбургера
document.addEventListener('DOMContentLoaded', function() {
    // Ефект ховера для гамбургера
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        hamburger.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
            }
        });
    }
    
    // Підсвітка активного пункту меню
    function highlightActiveMenu() {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '/' && href === '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    highlightActiveMenu();
});