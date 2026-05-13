document.addEventListener('DOMContentLoaded', () => {
  initMenuHamburguesa();
  initNavbarScroll();
  initCatalogo();
  initFormularioContacto();
  initScrollAnimations();
});

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.classList.add('hidden');
    } else if (currentScroll < lastScroll) {
      navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  });
}

function initMenuHamburguesa() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = navMenu.querySelectorAll('a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

async function initCatalogo() {
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productsGrid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');

  let productos = [];
  let filtroActual = 'all';
  let busquedaActual = '';

  try {
    const response = await fetch('data/products.json');
    const data = await response.json();
    productos = data.productos;
    renderizarProductos(productos);
  } catch (error) {
    console.error('Error al cargar productos:', error);
    productsGrid.innerHTML = '<p style="text-align:center;color:var(--text-muted)">Error al cargar el catálogo</p>';
  }

  function renderizarProductos(lista) {
    if (lista.length === 0) {
      productsGrid.innerHTML = '';
      noResults.hidden = false;
      return;
    }

    noResults.hidden = true;
    productsGrid.innerHTML = lista.map((producto, index) => `
      <article class="product-card" style="animation-delay: ${index * 0.05}s">
        <div class="product-image">
          <img src="${producto.imagen}" alt="${producto.nombre} - ${producto.categoria} - ${producto.descripcion.substring(0, 50)}..." loading="lazy" width="400" height="300">
          <span class="product-category">${producto.categoria}</span>
        </div>
        <div class="product-info">
          <h3 class="product-title">${producto.nombre}</h3>
          <p class="product-description">${producto.descripcion}</p>
          <p class="product-price">$${producto.precio.toFixed(2)}</p>
        </div>
      </article>
    `).join('');
  }

  function filtrarProductos() {
    let filtrados = productos;

    if (filtroActual !== 'all') {
      filtrados = filtrados.filter(p => p.categoria === filtroActual);
    }

    if (busquedaActual.trim() !== '') {
      const busqueda = busquedaActual.toLowerCase();
      filtrados = filtrados.filter(p => 
        p.nombre.toLowerCase().includes(busqueda) ||
        p.descripcion.toLowerCase().includes(busqueda) ||
        p.categoria.toLowerCase().includes(busqueda)
      );
    }

    renderizarProductos(filtrados);
  }

  searchInput.addEventListener('input', (e) => {
    busquedaActual = e.target.value;
    filtrarProductos();
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filtroActual = btn.dataset.category;
      filtrarProductos();
    });
  });
}

function initFormularioContacto() {
  const form = document.getElementById('contactForm');
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const mensajeInput = document.getElementById('mensaje');

  const validarNombre = () => {
    const errorEl = document.getElementById('nombreError');
    if (nombreInput.value.trim().length < 2) {
      errorEl.textContent = 'El nombre debe tener al menos 2 caracteres';
      nombreInput.setCustomValidity('invalido');
    } else {
      errorEl.textContent = '';
      nombreInput.setCustomValidity('');
    }
  };

  const validarEmail = () => {
    const errorEl = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      errorEl.textContent = 'Ingrese un correo electrónico válido';
      emailInput.setCustomValidity('invalido');
    } else {
      errorEl.textContent = '';
      emailInput.setCustomValidity('');
    }
  };

  const validarMensaje = () => {
    const errorEl = document.getElementById('mensajeError');
    if (mensajeInput.value.trim().length < 10) {
      errorEl.textContent = 'El mensaje debe tener al menos 10 caracteres';
      mensajeInput.setCustomValidity('invalido');
    } else {
      errorEl.textContent = '';
      mensajeInput.setCustomValidity('');
    }
  };

  nombreInput.addEventListener('blur', validarNombre);
  emailInput.addEventListener('blur', validarEmail);
  mensajeInput.addEventListener('blur', validarMensaje);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validarNombre();
    validarEmail();
    validarMensaje();

    if (form.checkValidity()) {
      const datos = {
        nombre: nombreInput.value,
        email: emailInput.value,
        telefono: document.getElementById('telefono').value,
        mensaje: mensajeInput.value
      };

      const popup = document.getElementById('popup');
      const popupClose = document.getElementById('popupClose');
      popup.classList.add('active');

      popupClose.addEventListener('click', () => {
        popup.classList.remove('active');
      });

      popup.addEventListener('click', (e) => {
        if (e.target === popup) {
          popup.classList.remove('active');
        }
      });

      form.reset();
    } else {
      form.reportValidity();
    }
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('.catalogo, .nosotros, .contacto');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  document.addEventListener('scroll', () => {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  });
}