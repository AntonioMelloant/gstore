/* ===================================
   G. STORE — JAVASCRIPT
   
   ✏️ ESTOQUE REAL DA LOJA & SINCRONIZAÇÃO
   =================================== */

// ───── CONFIGURAÇÕES ─────
const WHATSAPP_NUMBER = '5511947169791'; // Número oficial da G. Store

const UPLOADED_BASE = 'img';

// ───── ESTOQUE INICIAL PADRÃO ─────
const DEFAULT_PRODUCTS = [
  {
    id: 'jaqueta-tommy-hilfiger-black',
    name: 'Jaqueta Tommy Hilfiger Lightweight',
    brand: 'Tommy Hilfiger',
    category: 'Jaqueta',
    size: 'M',
    pricePix: 670.00,
    priceCredit: 729.99,
    price: 670.00,
    available: true,
    images: [
      `${UPLOADED_BASE}/media_1788732999145.jpg`,
      `${UPLOADED_BASE}/media_1788732999127.jpg`,
      `${UPLOADED_BASE}/media_1788732999140.jpg`,
      `${UPLOADED_BASE}/media_1788732999163.jpg`,
      `${UPLOADED_BASE}/media_1788732999176.jpg`
    ],
    description: 'Jaqueta Tommy Hilfiger Original na cor preta. Modelo leve com isolamento térmico (Lightweight Insulation), resistente ao vento e à água (Wind & Water Resistant). Possui estampa discreta HILFIGER na gola, patch emborrachado com bandeira clássica na manga e bolsos com zíper.',
    specs: [
      'Tamanho: M',
      'Condição: Novo com etiqueta / 100% Original',
      'Tecnologia: Water Resistant & Wind Resistant',
      'Isolamento: Lightweight Insulation',
      'Cor: Preto',
      'Pix: R$ 670,00',
      'Cartão: R$ 729,99 (até 12x sem juros)'
    ]
  },
  {
    id: 'moletom-champion-crewneck-white',
    name: 'Moletom Champion Crewneck Branco',
    brand: 'Champion',
    category: 'Moletom',
    size: 'M',
    pricePix: 349.99,
    priceCredit: 409.99,
    price: 349.99,
    available: true,
    images: [
      `${UPLOADED_BASE}/media_1788733377289.jpg`,
      `${UPLOADED_BASE}/media_1788733389232.jpg`
    ],
    description: 'Moletom Gola Careca (Crewneck) Champion Original na cor branca. Possui bordado exclusivo no peito, patch clássico do logo "C" da Champion no punho da manga e etiqueta original anexada.',
    specs: [
      'Tamanho: M',
      'Condição: Novo com etiqueta original',
      'Modelo: Gola Careca (Crewneck)',
      'Detalhes: Bordado no peito + Patch "C" na manga',
      'Cor: Branco',
      'Pix: R$ 349,99',
      'Cartão: R$ 409,99 (até 12x sem juros)'
    ]
  },
  {
    id: 'camisa-nike-tottenham-green',
    name: 'Camisa Nike Tottenham Hotspur Third',
    brand: 'Nike',
    category: 'Camisa de Time',
    size: 'G',
    pricePix: 349.99,
    priceCredit: 429.99,
    price: 349.99,
    available: true,
    images: [
      `${UPLOADED_BASE}/media_1788816686257.jpg`,
      `${UPLOADED_BASE}/media_1788816686239.jpg`,
      `${UPLOADED_BASE}/media_1788816686210.jpg`,
      `${UPLOADED_BASE}/media_1788816686226.jpg`
    ],
    description: 'Camisa Oficial Nike Tottenham Hotspur Third. Design exclusivo em tom verde camuflado gráfico, com o lendário Swoosh duplo da Nike na vertical, escudo especial bordado com a mensagem "Audere-Est-Facere" e selo de autenticidade Nike Engineered.',
    specs: [
      'Tamanho: G',
      'Condição: Novo com etiqueta / 100% Original Nike',
      'Modelo: Third / Coleção Especial',
      'Escudo: Bordado com lema oficial "Audere-Est-Facere"',
      'Swoosh: Duplo vertical em relevo',
      'Pix: R$ 349,99',
      'Cartão: R$ 429,99 (até 12x sem juros)'
    ]
  },
  {
    id: 'camisa-nike-chelsea-blue',
    name: 'Camisa Nike Chelsea FC Geometric Blue',
    brand: 'Nike',
    category: 'Camisa de Time',
    size: 'M',
    pricePix: 349.99,
    priceCredit: 429.99,
    price: 349.99,
    available: true,
    images: [
      `${UPLOADED_BASE}/media_1788816970007.jpg`,
      `${UPLOADED_BASE}/media_1788816969936.jpg`,
      `${UPLOADED_BASE}/media_1788816969970.jpg`
    ],
    description: 'Camisa Oficial Nike Chelsea FC Special Edition. Estampa geométrica moderna em tons de azul elétrico e preto, com Swoosh Nike dourado, escudo oficial do Chelsea bordado com detalhes em dourado e gravação "LONDON CHELSEA FC" na gola interna.',
    specs: [
      'Tamanho: M',
      'Condição: Novo / 100% Original Nike',
      'Modelo: Special Edition Geometric',
      'Escudo: Bordado oficial Chelsea FC com bordas douradas',
      'Swoosh: Dourado em destaque',
      'Pix: R$ 349,99',
      'Cartão: R$ 429,99 (até 12x sem juros)'
    ]
  }
];

// Carregar estoque sincronizado do localStorage se existir
function getInventory() {
  const saved = localStorage.getItem('gstore_inventory');
  if (saved) {
    try { return JSON.parse(saved); } catch(e) { }
  }
  return DEFAULT_PRODUCTS;
}

let PRODUCTS = getInventory();


// ───── UTILITÁRIOS ─────
function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function buildWhatsAppLink(productName, productSize, pricePix, priceCredit) {
  const sizeText = productSize ? ` (Tam: ${productSize})` : '';
  const priceText = pricePix ? ` por R$ ${pricePix.toFixed(2).replace('.', ',')} no Pix ou R$ ${priceCredit ? priceCredit.toFixed(2).replace('.', ',') : ''} no Crédito (até 12x sem juros)` : '';
  const message = encodeURIComponent(
    `Olá! Vi o produto *${productName}*${sizeText}${priceText} no site da G. Store e tenho interesse. Ainda está disponível?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

function buildGeneralWhatsAppLink() {
  const message = encodeURIComponent(
    'Olá! Vim pelo site da G. Store e gostaria de tirar dúvidas sobre as peças disponíveis no estoque.'
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}


// ───── RENDERIZAÇÃO DA GRID DE PRODUTOS ─────
function renderProducts(filter = 'Todos') {
  PRODUCTS = getInventory(); // Atualizar estoque mais recente
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const filtered = filter === 'Todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.brand === filter || p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--gray); padding: 3rem 0;">Nenhum produto encontrado nesta categoria no momento.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const mainImg = (product.images && product.images.length > 0) ? product.images[0] : (product.image || '');
    const imgCount = (product.images && product.images.length > 1) ? product.images.length : 0;

    return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card__img-wrap">
        <img src="${mainImg}" alt="${product.name}" loading="lazy" />
        <span class="product-card__badge ${product.available ? 'product-card__badge--available' : 'product-card__badge--sold'}">
          ${product.available ? 'Disponível' : 'Vendido'}
        </span>
        <span class="product-card__brand">${product.brand}</span>
        ${imgCount > 1 ? `<span class="product-card__img-count">📷 ${imgCount} fotos</span>` : ''}
      </div>
      <div class="product-card__body">
        <p class="product-card__category">${product.category}</p>
        <h3 class="product-card__name">${product.name}</h3>
        
        <div class="product-card__prices">
          <div class="price-pix-row">
            <span class="price-pix-val">${formatPrice(product.pricePix || product.price)}</span>
            <span class="price-pix-tag">no Pix</span>
          </div>
          ${product.priceCredit ? `<div class="price-credit-row">ou ${formatPrice(product.priceCredit)} no cartão <span class="no-interest">até 12x sem juros</span></div>` : ''}
        </div>

        <div class="product-card__meta">
          <span class="product-card__size">Tamanho: ${product.size}</span>
        </div>

        <button class="product-card__quick-view-btn" type="button">
          Ver Fotos & Comprar
        </button>
      </div>
    </article>
  `;
  }).join('');

  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.dataset.productId;
      openProductModal(productId);
    });
  });
}


// ───── GERENCIAMENTO DO CARROSSEL DO MODAL ─────
let currentProduct = null;
let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;

function setupCarousel(images) {
  const track = document.getElementById('carousel-track');
  const dotsContainer = document.getElementById('carousel-dots');
  const thumbsContainer = document.getElementById('carousel-thumbs');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  currentSlide = 0;
  if (!images || images.length === 0) return;

  track.innerHTML = images.map((src, i) => `
    <div class="carousel-slide ${i === 0 ? 'active' : ''}">
      <img src="${src}" alt="Foto ${i + 1} de ${images.length}" />
    </div>
  `).join('');

  if (images.length > 1) {
    dotsContainer.style.display = 'flex';
    dotsContainer.innerHTML = images.map((_, i) => `
      <button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Ir para foto ${i + 1}"></button>
    `).join('');

    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';

    thumbsContainer.style.display = 'flex';
    thumbsContainer.innerHTML = images.map((src, i) => `
      <div class="carousel-thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
        <img src="${src}" alt="Miniatura ${i + 1}" />
      </div>
    `).join('');
  } else {
    dotsContainer.style.display = 'none';
    thumbsContainer.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }

  updateCarousel();
}

function goToSlide(index) {
  if (!currentProduct || !currentProduct.images) return;
  const total = currentProduct.images.length;
  if (total === 0) return;

  currentSlide = (index + total) % total;
  updateCarousel();
}

function updateCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;
  const slides = track.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const thumbs = document.querySelectorAll('.carousel-thumb');

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });

  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === currentSlide);
  });

  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}


function initCarouselEvents() {
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  const thumbsContainer = document.getElementById('carousel-thumbs');
  const container = document.getElementById('carousel-container');

  if (!container) return;

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(currentSlide - 1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(currentSlide + 1);
  });

  dotsContainer.addEventListener('click', (e) => {
    const dot = e.target.closest('.carousel-dot');
    if (dot) {
      goToSlide(parseInt(dot.dataset.index));
    }
  });

  thumbsContainer.addEventListener('click', (e) => {
    const thumb = e.target.closest('.carousel-thumb');
    if (thumb) {
      goToSlide(parseInt(thumb.dataset.index));
    }
  });

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const swipeThreshold = 40;
  if (touchEndX < touchStartX - swipeThreshold) {
    goToSlide(currentSlide + 1);
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    goToSlide(currentSlide - 1);
  }
}


// ───── GERENCIAMENTO DO MODAL DO PRODUTO ─────
function openProductModal(productId) {
  PRODUCTS = getInventory();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  currentProduct = product;

  document.getElementById('modal-brand').textContent = product.brand;
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-category').textContent = `${product.category} • Pronta Entrega`;
  
  const priceContainer = document.getElementById('modal-price');
  priceContainer.innerHTML = `
    <div class="modal-price-dual">
      <div class="modal-price-main">
        <span class="modal-price-num">${formatPrice(product.pricePix || product.price)}</span>
        <span class="modal-price-badge-pix">no Pix</span>
      </div>
      ${product.priceCredit ? `<div class="modal-price-credit">ou <strong>${formatPrice(product.priceCredit)}</strong> no cartão de crédito <span class="no-interest-badge">até 12x sem juros</span></div>` : ''}
    </div>
  `;

  document.getElementById('modal-size').textContent = `Tamanho: ${product.size}`;
  document.getElementById('modal-description').textContent = product.description || '';

  const specsList = document.getElementById('modal-specs');
  if (product.specs && product.specs.length > 0) {
    specsList.style.display = 'block';
    specsList.innerHTML = product.specs.map(spec => `<li>✓ ${spec}</li>`).join('');
  } else {
    specsList.style.display = 'none';
  }

  const badge = document.getElementById('modal-badge');
  if (product.available) {
    badge.textContent = 'Disponível';
    badge.className = 'modal-badge modal-badge--available';
  } else {
    badge.textContent = 'Vendido';
    badge.className = 'modal-badge modal-badge--sold';
  }

  const buyBtn = document.getElementById('modal-whatsapp-btn');
  if (product.available) {
    buyBtn.href = buildWhatsAppLink(product.name, product.size, product.pricePix, product.priceCredit);
    buyBtn.classList.remove('modal-buy-btn--disabled');
    buyBtn.querySelector('span').textContent = 'Falar no WhatsApp para Comprar';
  } else {
    buyBtn.removeAttribute('href');
    buyBtn.classList.add('modal-buy-btn--disabled');
    buyBtn.querySelector('span').textContent = 'Produto Indisponível (Vendido)';
  }

  const imagesList = (product.images && product.images.length > 0)
    ? product.images
    : [product.image];
  setupCarousel(imagesList);

  const backdrop = document.getElementById('modal-backdrop');
  backdrop.classList.add('active');
  backdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (!window.location.hash.includes(productId)) {
    history.pushState({ modalOpen: true, productId }, '', `#produto-${productId}`);
  }
}

function closeProductModal(isPopState = false) {
  const backdrop = document.getElementById('modal-backdrop');
  if (!backdrop || !backdrop.classList.contains('active')) return;

  backdrop.classList.remove('active');
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (!isPopState && window.location.hash.startsWith('#produto-')) {
    history.pushState('', document.title, window.location.pathname + window.location.search);
  }
}

function initModalEvents() {
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!backdrop) return;

  closeBtn.addEventListener('click', () => closeProductModal());

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeProductModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
  });

  window.addEventListener('popstate', (e) => {
    if (backdrop.classList.contains('active')) {
      closeProductModal(true);
    } else if (e.state && e.state.productId) {
      openProductModal(e.state.productId);
    }
  });

  if (window.location.hash.startsWith('#produto-')) {
    const productId = window.location.hash.replace('#produto-', '');
    setTimeout(() => openProductModal(productId), 300);
  }
}


// ───── FILTROS ─────
function initFilters() {
  const bar = document.getElementById('filter-bar');
  if (!bar) return;

  PRODUCTS = getInventory();
  const brands = ['Todos', ...new Set(PRODUCTS.map(p => p.brand))];

  bar.innerHTML = brands.map(brand => `
    <button class="filter-btn ${brand === 'Todos' ? 'active' : ''}" data-filter="${brand}">
      ${brand}
    </button>
  `).join('');

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    renderProducts(btn.dataset.filter);
  });
}


// ───── LINKS WHATSAPP GERAIS ─────
function initWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp="general"]').forEach(el => {
    el.href = buildGeneralWhatsAppLink();
  });
}

// Sincronizar em tempo real entre abas do navegador (Admin -> Loja)
window.addEventListener('storage', (e) => {
  if (e.key === 'gstore_inventory') {
    renderProducts();
    initFilters();
  }
});


// ───── INIT ─────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initFilters();
  initWhatsAppLinks();
  initCarouselEvents();
  initModalEvents();
});
