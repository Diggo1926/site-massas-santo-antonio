// Default configuration
const defaultConfig = {
  hero_title: 'Massas Santo Antônio',
  hero_subtitle: 'Tradição que alimenta gerações desde 1985',
  about_title: 'Nossa História',
  whatsapp_number: '(79) 99999-9999',
  address: 'Itabaiana, Sergipe',
  background_color: '#f5f1e8',
  primary_color: '#2d5a27',
  text_color: '#2c2c2c',
  accent_color: '#8b7355',
  light_color: '#ffffff',
  font_family: 'Source Sans 3',
  font_size: 16
};

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
  lucide.createIcons();

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  mobileMenuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('hidden', !menuOpen);
  });

  // Close mobile menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.add('hidden');
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !phone) {
      formMessage.textContent = 'Por favor, preencha nome e telefone.';
      formMessage.style.color = '#dc2626';
      formMessage.classList.remove('hidden');
      return;
    }

    // Simulate form submission
    formMessage.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contato em breve.';
    formMessage.style.color = '#2d5a27';
    formMessage.classList.remove('hidden');
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.classList.add('hidden');
    }, 5000);
  });

  // Element SDK initialization
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (config) => {
        const c = { ...defaultConfig, ...config };
        
        // Update hero section
        document.getElementById('hero-title').textContent = c.hero_title;
        document.getElementById('hero-subtitle').textContent = c.hero_subtitle;
        
        // Update about section
        document.getElementById('about-title').textContent = c.about_title;
        
        // Update contact info
        document.getElementById('contact-whatsapp').textContent = c.whatsapp_number;
        document.getElementById('contact-address').textContent = c.address;
        
        // Update colors
        document.documentElement.style.setProperty('--color-primary', c.primary_color);
        document.documentElement.style.setProperty('--color-secondary', c.background_color);
        document.documentElement.style.setProperty('--color-text', c.text_color);
        document.documentElement.style.setProperty('--color-accent', c.accent_color);
        document.documentElement.style.setProperty('--color-light', c.light_color);
        
        // Update main wrapper background
        document.querySelector('.main-wrapper').style.backgroundColor = c.background_color;
        
        // Update font family
        const fontStack = `${c.font_family}, sans-serif`;
        document.body.style.fontFamily = fontStack;
        
        // Update font sizes proportionally
        const baseSize = c.font_size;
        document.body.style.fontSize = `${baseSize}px`;
      },
      mapToCapabilities: (config) => {
        const c = { ...defaultConfig, ...config };
        return {
          recolorables: [
            {
              get: () => c.background_color,
              set: (value) => window.elementSdk.setConfig({ background_color: value })
            },
            {
              get: () => c.light_color,
              set: (value) => window.elementSdk.setConfig({ light_color: value })
            },
            {
              get: () => c.text_color,
              set: (value) => window.elementSdk.setConfig({ text_color: value })
            },
            {
              get: () => c.primary_color,
              set: (value) => window.elementSdk.setConfig({ primary_color: value })
            },
            {
              get: () => c.accent_color,
              set: (value) => window.elementSdk.setConfig({ accent_color: value })
            }
          ],
          borderables: [],
          fontEditable: {
            get: () => c.font_family,
            set: (value) => window.elementSdk.setConfig({ font_family: value })
          },
          fontSizeable: {
            get: () => c.font_size,
            set: (value) => window.elementSdk.setConfig({ font_size: value })
          }
        };
      },
      mapToEditPanelValues: (config) => {
        const c = { ...defaultConfig, ...config };
        return new Map([
          ['hero_title', c.hero_title],
          ['hero_subtitle', c.hero_subtitle],
          ['about_title', c.about_title],
          ['whatsapp_number', c.whatsapp_number],
          ['address', c.address]
        ]);
      }
    });
  }
});
