// ===============================================
// OV - SCRIPT PRINCIPAL
// =============================================

// Configuration globale
const CONFIG = {
    ANIMATION_DELAY: 100,
    SCROLL_THRESHOLD: 0.1
};

// ===============================================
// ANIMATIONS AVANCÉES OV UNICODE
// =============================================

// Animation de révélation au scroll
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal-animation');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, { threshold: 0.1 });
            
            this.elements.forEach(el => observer.observe(el));
        }
    }
}

// ===============================================
// LIGHTBOX (zoom plein écran sur les captures)
// =============================================

class Lightbox {
    constructor(selector = '.screenshot-gallery img, .step-card img') {
        this.images = document.querySelectorAll(selector);
        this.overlay = null;
        this.imgEl = null;
        this.captionEl = null;
        this.currentIndex = -1;
        this.imageList = [];
        this.init();
    }

    init() {
        if (this.images.length === 0) return;

        // Récupérer la liste pour navigation prev/next
        this.imageList = Array.from(this.images);

        // Créer le DOM de l'overlay une seule fois
        this.buildOverlay();

        // Rendre les images cliquables
        this.imageList.forEach((img, idx) => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(idx);
            });
        });

        // Listeners globaux
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen()) return;
            if (e.key === 'Escape') this.close();
            else if (e.key === 'ArrowRight') this.next();
            else if (e.key === 'ArrowLeft') this.prev();
        });
    }

    buildOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <button class="lightbox-close" aria-label="Fermer">&times;</button>
            <button class="lightbox-prev" aria-label="Précédent">&#10094;</button>
            <button class="lightbox-next" aria-label="Suivant">&#10095;</button>
            <div class="lightbox-content">
                <img class="lightbox-image" alt="">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        this.overlay = overlay;
        this.imgEl = overlay.querySelector('.lightbox-image');
        this.captionEl = overlay.querySelector('.lightbox-caption');

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains('lightbox-content')) {
                this.close();
            }
        });
        overlay.querySelector('.lightbox-close').addEventListener('click', () => this.close());
        overlay.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
        overlay.querySelector('.lightbox-next').addEventListener('click', () => this.next());
    }

    open(index) {
        this.currentIndex = index;
        this.show();
        this.overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        // Vide la src après l'animation pour libérer la mémoire
        setTimeout(() => { if (!this.isOpen()) this.imgEl.src = ''; }, 300);
    }

    isOpen() {
        return this.overlay && this.overlay.classList.contains('is-open');
    }

    show() {
        const img = this.imageList[this.currentIndex];
        if (!img) return;
        this.imgEl.src = img.src;
        this.imgEl.alt = img.alt || '';
        this.captionEl.textContent = img.alt || '';
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.imageList.length;
        this.show();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.imageList.length) % this.imageList.length;
        this.show();
    }
}

// Animation de compteur numérique
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.counter-animation');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            this.counters.forEach(counter => observer.observe(counter));
        }
    }
    
    animateCounter(element) {
        const text = element.textContent;
        const numbers = text.match(/\d+/g);
        
        if (numbers) {
            numbers.forEach(num => {
                const finalValue = parseInt(num);
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(timer);
                    }
                    element.textContent = text.replace(num, Math.floor(currentValue));
                }, 30);
            });
        }
    }
}

// ===============================================
// FONCTIONS UTILITAIRES
// =============================================

// Fonction de délai
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ===============================================
// GESTIONNAIRE DE NAVIGATION
// =============================================

class NavigationManager {
    constructor() {
        this.header = document.querySelector('.header');
        this.navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        this.init();
    }
    
    init() {
        this.setupScrollEffect();
        this.setupActiveNavigation();
        this.setupMobileMenu();
    }
    
    // Effet de scroll sur le header
    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
    }
    
    // Navigation active
    setupActiveNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
    
    // Menu mobile - géré nativement par Bootstrap
    setupMobileMenu() {
    }
}

// ===============================================
// GESTIONNAIRE DES ONGLETS ET INTERACTIONS
// ===============================================

class TabManager {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.categoryPanels = document.querySelectorAll('.category-panel');
        this.init();
    }
    
    init() {
        this.setupTabSwitching();
    }
    
    setupTabSwitching() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetCategory = button.getAttribute('data-category');
                this.switchTab(targetCategory);
            });
        });
    }
    
    switchTab(category) {
        // Mettre à jour les boutons
        this.tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            }
        });
        
        // Mettre à jour les panneaux
        this.categoryPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === category) {
                panel.classList.add('active');
            }
        });
    }
}

// ===============================================
// GESTIONNAIRE D'ANIMATIONS
// =============================================

class AnimationManager {
    constructor() {
        this.animatedElements = [];
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupIntersectionObserver();
    }
    
    // Configuration des animations au scroll
    setupScrollAnimations() {
        // Éléments à animer
        this.animatedElements = document.querySelectorAll('.feature-card, .stat-item, .hero-content, .attack-card, .attack-category');
        
        // Ajouter la classe d'animation
        this.animatedElements.forEach(el => {
            el.classList.add('scroll-animate');
        });
    }
    
    // Observer d'intersection pour les animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: CONFIG.SCROLL_THRESHOLD,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
        
        // Observer tous les éléments animés
        this.animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Animation de compteur
    animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
}

// ===============================================
// GESTIONNAIRE DE FORMULAIRE
// =============================================

class FormManager {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (this.contactForm) {
            this.setupFormValidation();
        }
    }
    
    // Validation du formulaire (délègue la soumission au handler AJAX inline)
    setupFormValidation() {
        // La soumission est gérée par le script inline Formspree dans le HTML
        // On ajoute uniquement la validation côté client
        this.contactForm.addEventListener('submit', (e) => {
            const data = Object.fromEntries(new FormData(this.contactForm));
            if (!data.name || !data.email || !data.message) {
                e.preventDefault();
                this.showMessage('Veuillez remplir tous les champs.', 'error');
                return;
            }
            if (!this.isValidEmail(data.email)) {
                e.preventDefault();
                this.showMessage('Veuillez entrer une adresse email valide.', 'error');
            }
        });
    }
    
    // Validation d'email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Affichage des messages
    showMessage(message, type = 'info') {
        // Créer un élément de message
        const messageEl = document.createElement('div');
        messageEl.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'}`;
        messageEl.textContent = message;
        
        // Insérer avant le formulaire
        this.contactForm.parentNode.insertBefore(messageEl, this.contactForm);
        
        // Supprimer après 5 secondes
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// ===============================================
// GESTIONNAIRE DE PARTICULES
// =============================================

class ParticleManager {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.init();
    }
    
    init() {
        if (this.canvas) {
            this.setupCanvas();
            this.createParticles();
            this.animate();
        }
    }
    
    // Configuration du canvas
    setupCanvas() {
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
    
    // Redimensionnement du canvas
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    // Création des particules
    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    // Animation des particules
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Mise à jour de la position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebond sur les bords
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Dessin de la particule
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(42, 162, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    // Nettoyage
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// ===============================================
// GESTIONNAIRE PRINCIPAL
// =============================================

class MainManager {
    constructor() {
        this.navigation = null;
        this.animations = null;
        this.form = null;
        this.particles = null;
        this.init();
    }
    
    async init() {
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        try {
            // Initialiser tous les gestionnaires
            this.navigation = new NavigationManager();
            this.animations = new AnimationManager();
            this.form = new FormManager();
            this.particles = new ParticleManager();
            this.tabs = new TabManager();
            
            // Initialiser les animations avancées
            this.scrollReveal = new ScrollReveal();
            this.counterAnimation = new CounterAnimation();
            this.lightbox = new Lightbox();
            
            // Configuration supplémentaire
            this.setupSmoothScrolling();
            this.setupCounters();
            this.setupTypingEffect();
            
            console.log('🚀 OV - Initialisation terminée');
            console.log('🎨 Animations avancées activées');
            
        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation:', error);
        }
    }
    
    // Défilement fluide (uniquement les liens ancres de navigation)
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            const href = anchor.getAttribute('href');
            if (href === '#' || anchor.closest('.navbar-toggler') || anchor.hasAttribute('data-bs-toggle')) return;
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Animation des compteurs
    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            if (!isNaN(target)) {
                this.animations.animateCounter(counter, target);
            }
        });
    }
    
    // Effet de frappe
    setupTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-effect');
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Démarrer l'effet quand l'élément est visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }
}

// ===============================================
// SCROLL TO TOP
// =============================================

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Afficher/masquer le bouton selon le scroll (disparaît après 3s d'inactivité)
(function () {
    let scrollTimer = null;
    window.addEventListener('scroll', function () {
        const btn = document.querySelector('.scroll-to-top');
        if (!btn) return;
        if (window.scrollY > 300) {
            btn.style.display = 'flex';
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function () {
                btn.style.display = 'none';
            }, 3000);
        } else {
            btn.style.display = 'none';
            clearTimeout(scrollTimer);
        }
    });
})();

// ===============================================
// INITIALISATION
// =============================================

// Créer l'instance principale
const app = new MainManager();

// Export pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MainManager,
        NavigationManager,
        AnimationManager,
        FormManager,
        ParticleManager
    };
}
