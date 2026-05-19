// Scripts globais e interatividade avançada

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
