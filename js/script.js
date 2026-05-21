// Scripts globais e interatividade avançada

// ===== EFEITO DE PÉTALAS DE CEREJEIRA CAINDO =====
function initSakuraPetals() {
    const container = document.body;
    
    // Criar container para pétalas
    const petalsWrapper = document.createElement('div');
    petalsWrapper.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10;';
    container.appendChild(petalsWrapper);

    // Adicionar estilos CSS
    const styles = document.createElement('style');
    styles.innerHTML = `
        @keyframes fall {
            to { 
                transform: translateY(100vh) rotate(360deg); 
                opacity: 0;
            }
        }
        
        @keyframes sway {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(150px); }
            75% { transform: translateX(-150px); }
        }
        
        .petal-item {
            position: absolute;
            width: 25px;
            height: 25px;
            background: #FFB6C1;
            border-radius: 50% 0;
            opacity: 0.95;
            animation: fall linear forwards;
            box-shadow: 0 0 8px rgba(253, 96, 175, 0.6);
        }
    `;
    document.head.appendChild(styles);

    // Função para criar pétala
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal-item';
        
        // Tamanho aleatório (reduzido)
        const size = 8 + Math.random() * 10;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        
        // Posição aleatória
        const startX = Math.random() * window.innerWidth;
        petal.style.left = startX + 'px';
        petal.style.top = '-50px';
        
        // Duração aleatória
        const duration = 10 + Math.random() * 8;
        petal.style.animationDuration = duration + 's';
        
        // Rotação inicial
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        petalsWrapper.appendChild(petal);
        
        // Remover pétala quando cair
        setTimeout(() => petal.remove(), duration * 1000);
    }

    // Criar pétalas continuamente
    setInterval(createPetal, 400);
    
    // Criar algumas pétalas de início
    for (let i = 0; i < 3; i++) {
        createPetal();
    }
}

// Iniciar assim que possível
if (document.body) {
    initSakuraPetals();
} else {
    document.addEventListener('DOMContentLoaded', initSakuraPetals);
}

document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Scroll reveal effect com IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.contact-item, .button-group, .about-section');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Efeito parallax no background
    const landingPage = document.querySelector('.landing-page');
    if (landingPage) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            landingPage.style.backgroundPosition = `${x * 20}px ${y * 20}px`;
        });
    }

    // Animação de entrada dos botões
    const buttons = document.querySelectorAll('.btn-cta, .btn');
    buttons.forEach((btn, index) => {
        btn.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
    });

    // Efeito de ripple ao clicar
    function createRipple(e) {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = diameter + 'px';
        circle.style.left = e.clientX - button.offsetLeft - radius + 'px';
        circle.style.top = e.clientY - button.offsetTop - radius + 'px';
        circle.classList.add('ripple');
        circle.style.position = 'absolute';
        circle.style.borderRadius = '50%';
        circle.style.background = 'rgba(255, 255, 255, 0.6)';
        circle.style.transform = 'scale(0)';
        circle.style.animation = 'ripple-animation 0.6s ease-out';
        circle.style.pointerEvents = 'none';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(circle);

        setTimeout(() => circle.remove(), 600);
    }

    const clickableButtons = document.querySelectorAll('.btn-cta, .btn, .social-links a');
    clickableButtons.forEach(btn => {
        btn.addEventListener('click', createRipple);
    });

    // Adicionar estilo keyframe para ripple
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Animar números ao aparecer na tela
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Função para copiar email ou telefone
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = element.innerText;
        element.innerText = 'Copiado!';
        element.style.color = '#28a745';
        
        setTimeout(() => {
            element.innerText = originalText;
            element.style.color = '#667eea';
        }, 2000);
    });
}

// ===== EFEITOS ELEGANTES E SUTIS =====

// 1. Suave fade-in ao carregar elementos
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.profile-card, .contact-section, .about-section');
    
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s forwards`;
    });
});

// 2. Efeito de hover suave nos botões (sem glow maluco)
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// 3. Animação suave da foto de perfil
document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.transition = 'all 0.3s ease';
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08)';
        });
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// 4. Barra de progresso de scroll elegante
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.height = '3px';
        progressBar.style.background = 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)';
        progressBar.style.zIndex = '9999';
        progressBar.style.width = '0%';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            progressBar.style.width = scrolled + '%';
        });
    }
});

// ===== EFEITO TYPING (DIGITAÇÃO) =====
function typeWriter(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== FILTRO DE HABILIDADES INTERATIVO =====
document.addEventListener('DOMContentLoaded', function() {
    const skillCategories = document.querySelectorAll('[data-skill-category]');
    
    if (skillCategories.length > 0) {
        // Criar botões de filtro dinamicamente
        const categories = new Set();
        skillCategories.forEach(skill => {
            categories.add(skill.getAttribute('data-skill-category'));
        });
        
        const filterContainer = document.createElement('div');
        filterContainer.className = 'skill-filters';
        filterContainer.style.display = 'flex';
        filterContainer.style.gap = '10px';
        filterContainer.style.marginBottom = '20px';
        filterContainer.style.flexWrap = 'wrap';
        filterContainer.style.justifyContent = 'center';
        
        // Botão "Todos"
        const allBtn = document.createElement('button');
        allBtn.textContent = 'Todos';
        allBtn.className = 'filter-btn active';
        allBtn.style.padding = '8px 16px';
        allBtn.style.borderRadius = '20px';
        allBtn.style.border = '2px solid #667eea';
        allBtn.style.background = '#667eea';
        allBtn.style.color = 'white';
        allBtn.style.cursor = 'pointer';
        allBtn.style.transition = 'all 0.3s ease';
        allBtn.style.fontWeight = '600';
        
        allBtn.addEventListener('click', () => {
            skillCategories.forEach(skill => {
                skill.style.display = 'inline-block';
                skill.style.animation = 'fadeIn 0.3s ease';
            });
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'transparent';
                btn.style.color = '#667eea';
            });
            allBtn.classList.add('active');
            allBtn.style.background = '#667eea';
            allBtn.style.color = 'white';
        });
        
        filterContainer.appendChild(allBtn);
        
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.textContent = category;
            btn.className = 'filter-btn';
            btn.style.padding = '8px 16px';
            btn.style.borderRadius = '20px';
            btn.style.border = '2px solid #667eea';
            btn.style.background = 'transparent';
            btn.style.color = '#667eea';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'all 0.3s ease';
            btn.style.fontWeight = '600';
            
            btn.addEventListener('mouseenter', function() {
                this.style.background = '#667eea';
                this.style.color = 'white';
            });
            
            btn.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.background = 'transparent';
                    this.style.color = '#667eea';
                }
            });
            
            btn.addEventListener('click', () => {
                skillCategories.forEach(skill => {
                    if (skill.getAttribute('data-skill-category') === category) {
                        skill.style.display = 'inline-block';
                        skill.style.animation = 'fadeIn 0.3s ease';
                    } else {
                        skill.style.display = 'none';
                    }
                });
                
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active');
                    b.style.background = 'transparent';
                    b.style.color = '#667eea';
                });
                btn.classList.add('active');
                btn.style.background = '#667eea';
                btn.style.color = 'white';
                allBtn.classList.remove('active');
            });
            
            filterContainer.appendChild(btn);
        });
        
        const skillsSection = document.querySelector('.skills-section, [class*="skill"]');
        if (skillsSection) {
            skillsSection.insertBefore(filterContainer, skillsSection.firstChild);
        }
    }
});

// ===== TOGGLE DARK MODE =====
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.bottom = '20px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.style.zIndex = '1000';
    darkModeToggle.style.width = '50px';
    darkModeToggle.style.height = '50px';
    darkModeToggle.style.borderRadius = '50%';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.background = '#667eea';
    darkModeToggle.style.color = 'white';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.fontSize = '24px';
    darkModeToggle.style.transition = 'all 0.3s ease';
    darkModeToggle.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
    
    darkModeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.6)';
    });
    
    darkModeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
    });
    
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        this.innerHTML = isDark ? '☀️' : '🌙';
    });
    
    document.body.appendChild(darkModeToggle);
});

// ===== LAZY LOADING DE IMAGENS =====
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    img.style.animation = 'fadeIn 0.5s ease';
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// ===== ADICIONAR ANIMAÇÕES CSS =====
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('style[data-animations]')) {
        const style = document.createElement('style');
        style.setAttribute('data-animations', 'true');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            .dark-mode {
                background: #1a1a1a;
                color: #e0e0e0;
            }
            
            .dark-mode a {
                color: #667eea;
            }
        `;
        document.head.appendChild(style);
    }
});
