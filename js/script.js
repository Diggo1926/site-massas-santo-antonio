// Configuração padrão
const defaultConfig = {
  hero_title: 'Massas Santo Antônio',
  hero_subtitle: 'Tradição que alimenta gerações desde 1968',
  about_title: 'Nossa História',
  whatsapp_number: '(79) 99990-7969',
  address: 'Itabaiana, Sergipe',
  background_color: '#f5f1e8',
  primary_color: '#2d5a27',
  text_color: '#2c2c2c',
  accent_color: '#8b7355',
  light_color: '#ffffff',
  font_family: 'Source Sans 3',
  font_size: 16
};

// Inicializa ícones Lucide e funcionalidades do site
document.addEventListener('DOMContentLoaded', function() {
  lucide.createIcons();

  // Toggle do menu mobile
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('hidden', !menuOpen);
    });

    // Fecha o menu mobile ao clicar num link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Scroll suave para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navbar = document.getElementById('navbar');
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // Formulário de contato
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();

      if (!name || !phone) {
        formMessage.textContent = 'Por favor, preencha nome e telefone.';
        formMessage.style.color = '#dc2626';
        formMessage.classList.remove('hidden');
        return;
      }

      // Monta mensagem para WhatsApp
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value.trim();
      const waText = encodeURIComponent(
        `Olá! Meu nome é ${name}.\nTelefone: ${phone}\nAssunto: ${subject}\nMensagem: ${message || 'Sem mensagem adicional.'}`
      );
      window.open(`https://wa.me/5579999907969?text=${waText}`, '_blank');

      formMessage.textContent = '✓ Redirecionando para o WhatsApp...';
      formMessage.style.color = '#2d5a27';
      formMessage.classList.remove('hidden');

      contactForm.reset();
      setTimeout(() => { formMessage.classList.add('hidden'); }, 5000);
    });
  }

  // Inicialização do Element SDK (se disponível)
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (config) => {
        const c = { ...defaultConfig, ...config };
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        const aboutTitle = document.getElementById('about-title');
        const contactWhatsapp = document.getElementById('contact-whatsapp');
        const contactAddress = document.getElementById('contact-address');

        if (heroTitle) heroTitle.textContent = c.hero_title;
        if (heroSubtitle) heroSubtitle.textContent = c.hero_subtitle;
        if (aboutTitle) aboutTitle.textContent = c.about_title;
        if (contactWhatsapp) contactWhatsapp.textContent = c.whatsapp_number;
        if (contactAddress) contactAddress.textContent = c.address;

        document.documentElement.style.setProperty('--color-primary', c.primary_color);
        document.documentElement.style.setProperty('--color-secondary', c.background_color);
        document.documentElement.style.setProperty('--color-text', c.text_color);
        document.documentElement.style.setProperty('--color-accent', c.accent_color);
        document.documentElement.style.setProperty('--color-light', c.light_color);

        const mainWrapper = document.querySelector('.main-wrapper');
        if (mainWrapper) mainWrapper.style.backgroundColor = c.background_color;

        document.body.style.fontFamily = `${c.font_family}, sans-serif`;
        document.body.style.fontSize = `${c.font_size}px`;
      },
      mapToCapabilities: (config) => {
        const c = { ...defaultConfig, ...config };
        return {
          recolorables: [
            { get: () => c.background_color, set: (v) => window.elementSdk.setConfig({ background_color: v }) },
            { get: () => c.light_color, set: (v) => window.elementSdk.setConfig({ light_color: v }) },
            { get: () => c.text_color, set: (v) => window.elementSdk.setConfig({ text_color: v }) },
            { get: () => c.primary_color, set: (v) => window.elementSdk.setConfig({ primary_color: v }) },
            { get: () => c.accent_color, set: (v) => window.elementSdk.setConfig({ accent_color: v }) }
          ],
          borderables: [],
          fontEditable: {
            get: () => c.font_family,
            set: (v) => window.elementSdk.setConfig({ font_family: v })
          },
          fontSizeable: {
            get: () => c.font_size,
            set: (v) => window.elementSdk.setConfig({ font_size: v })
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
