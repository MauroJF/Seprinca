document.addEventListener('DOMContentLoaded', () => {

  // 1. Redirigir el botón "Solicitar Cotización" del Hero al formulario de contacto
  const btnCotizacion = document.getElementById('btn-cotizar');

  if (btnCotizacion) {
    btnCotizacion.addEventListener('click', (e) => {
      e.preventDefault();
      const seccionContacto = document.getElementById('contacto');
      if (seccionContacto) {
        seccionContacto.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 2. Desplazamiento suave para los enlaces del menú y cierre automático en móvil
  const enlacesNav = document.querySelectorAll('nav a');
  const navMenu = document.getElementById('nav-menu');

  enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
      const targetId = enlace.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const seccionTarget = document.querySelector(targetId);
        
        // Cierra el menú desplegable en pantallas móviles tras hacer clic
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }

        if (seccionTarget) {
          seccionTarget.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 3. Menú móvil (Hamburguesa)
  const menuToggle = document.getElementById('menu-toggle');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 4. Lógica del Captcha y envío del Formulario
  const captchaBox = document.getElementById('captcha-code');
  const btnRefresh = document.getElementById('btn-refresh');
  const formCotizacion = document.getElementById('form-cotizacion');

  function generarCaptcha() {
    const numero = Math.floor(1000 + Math.random() * 9000);
    if (captchaBox) captchaBox.textContent = numero;
  }

  if (btnRefresh) {
    btnRefresh.addEventListener('click', generarCaptcha);
  }

  // Inicializar EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init("MhcmJeRbmfrTN-UPk");
  }

  if (formCotizacion) {
    generarCaptcha();

    formCotizacion.addEventListener('submit', (e) => {
      e.preventDefault();

      const captchaInput = document.getElementById('captcha-input').value;

      if (captchaInput !== captchaBox.textContent) {
        alert('El código de verificación no coincide. Por favor, inténtalo de nuevo.');
        generarCaptcha();
        return;
      }

      // Si usas EmailJS:
      if (typeof emailjs !== 'undefined') {
        emailjs.sendForm('service_frm8glo', 'template_hxzme4m', formCotizacion)
          .then(() => {
            alert('¡Mensaje enviado con éxito! Te contactaremos a la brevedad.');
            formCotizacion.reset();
            generarCaptcha();
          }, (error) => {
            alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
            console.error('Error EmailJS:', error);
          });
      } else {
        // Enviar por HTML tradicional si no usas EmailJS
        formCotizacion.submit();
      }
    });
  }

});