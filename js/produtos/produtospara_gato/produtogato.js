// Script para interatividade da página de produto de gato
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização de elementos
    initializeElements();
    
    // Configuração da galeria de imagens
    setupGallery();
    
    // Configuração das variações de produto
    setupVariants();
    
    // Configuração do seletor de quantidade
    setupQuantitySelector();
    
    // Configuração das animações de scroll
    setupScrollAnimations();
    
    // Configuração de responsividade
    setupResponsiveness();
});

// Inicialização de elementos da página
function initializeElements() {
    console.log('Inicializando elementos da interface para produtos de gato...');
    
    // Adicionar classe para indicar que a página está carregada
    document.body.classList.add('page-loaded');
    
    // Configurar botão de favorito
    const favoriteBtn = document.querySelector('.favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                showNotification('Produto adicionado aos favoritos!', 'success');
            } else {
                showNotification('Produto removido dos favoritos!', 'info');
            }
        });
    }
    
    // Configurar botões de compartilhamento
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className;
            
            // Simulação de compartilhamento
            if (platform.includes('link')) {
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        showNotification('Link copiado para a área de transferência!', 'success');
                    })
                    .catch(err => {
                        showNotification('Erro ao copiar link.', 'error');
                    });
            } else {
                showNotification(`Compartilhando via ${platform.split('-')[1]}...`, 'info');
            }
        });
    });
    
    // Configurar botão de compra
    const buyNowBtn = document.querySelector('.secondary-btn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            showNotification('Redirecionando para o checkout...', 'info');
            
            // Simulação de redirecionamento
            setTimeout(() => {
                showNotification('Esta é apenas uma demonstração. Em um ambiente real, você seria redirecionado para o checkout.', 'info');
            }, 2000);
        });
    }
    
    // Configurar botão de adicionar ao carrinho
    const addToCartBtn = document.querySelector('.primary-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Verificar se variações foram selecionadas
            const selectedSize = document.querySelector('.variant-btn.active');
            const selectedColor = document.querySelector('.color-btn.active');
            
            if (!selectedSize) {
                showNotification('Por favor, selecione um tamanho.', 'warning');
                return;
            }
            
            if (!selectedColor) {
                showNotification('Por favor, selecione uma cor.', 'warning');
                return;
            }
            
            // Obter quantidade
            const quantityInput = document.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);
            
            // Animação do botão
            this.innerHTML = '<div class="loader"></div>';
            this.disabled = true;
            
            // Simulação de adição ao carrinho
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho';
                this.disabled = false;
                
                // Atualizar contador do carrinho
                const cartBadge = document.querySelector('.cart-btn .badge');
                if (cartBadge) {
                    const currentCount = parseInt(cartBadge.textContent);
                    cartBadge.textContent = currentCount + quantity;
                    
                    // Animar badge
                    cartBadge.classList.add('pulse');
                    setTimeout(() => {
                        cartBadge.classList.remove('pulse');
                    }, 1000);
                }
                
                showNotification(`${quantity} unidade(s) da Torre de Bolinhas adicionada(s) ao carrinho!`, 'success');
            }, 1500);
        });
    }
    
    // Configurar formulário de CEP
    const zipForm = document.querySelector('.zip-form');
    if (zipForm) {
        const zipBtn = zipForm.querySelector('.zip-btn');
        const zipInput = zipForm.querySelector('.zip-input');
        
        zipBtn.addEventListener('click', function() {
            const zipCode = zipInput.value.trim();
            
            if (!zipCode) {
                showNotification('Por favor, digite um CEP válido.', 'warning');
                return;
            }
            
            // Simulação de cálculo de frete
            this.innerHTML = '<div class="loader"></div>';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = 'OK';
                this.disabled = false;
                
                // Mostrar opções de entrega
                const deliveryOptions = document.querySelector('.delivery-options');
                if (deliveryOptions) {
                    deliveryOptions.style.display = 'block';
                    
                    // Animar entrada
                    deliveryOptions.style.opacity = '0';
                    deliveryOptions.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        deliveryOptions.style.opacity = '1';
                        deliveryOptions.style.transform = 'translateY(0)';
                    }, 50);
                }
                
                showNotification('Frete calculado com sucesso!', 'success');
            }, 1500);
        });
    }
    
    // Configurar botões de produtos relacionados
    const relatedProductBtns = document.querySelectorAll('.add-to-cart-btn');
    relatedProductBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.closest('.product-card-content').querySelector('h3').textContent;
            
            showNotification(`${productName} adicionado ao carrinho!`, 'success');
            
            // Atualizar contador do carrinho
            const cartBadge = document.querySelector('.cart-btn .badge');
            if (cartBadge) {
                const currentCount = parseInt(cartBadge.textContent);
                cartBadge.textContent = currentCount + 1;
                
                // Animar badge
                cartBadge.classList.add('pulse');
                setTimeout(() => {
                    cartBadge.classList.remove('pulse');
                }, 1000);
            }
        });
    });
}

// Configuração da galeria de imagens
function setupGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remover classe active de todas as miniaturas
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Adicionar classe active à miniatura clicada
            this.classList.add('active');
            
            // Atualizar imagem principal
            mainImage.src = this.dataset.image;
            
            // Adicionar efeito de transição
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 50);
        });
    });
    
    // Configurar botões de navegação das miniaturas
    const thumbContainer = document.querySelector('.thumbnails');
    const scrollLeftBtn = document.querySelector('.thumb-scroll-btn.left');
    const scrollRightBtn = document.querySelector('.thumb-scroll-btn.right');
    
    if (thumbContainer && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', function() {
            thumbContainer.scrollBy({ left: -100, behavior: 'smooth' });
        });
        
        scrollRightBtn.addEventListener('click', function() {
            thumbContainer.scrollBy({ left: 100, behavior: 'smooth' });
        });
    }
}

// Configuração das variações de produto
function setupVariants() {
    // Configurar botões de tamanho
    const sizeButtons = document.querySelectorAll('.variant-btn:not(.out-of-stock)');
    
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões no mesmo grupo
            const variantGroup = this.closest('.variant-options');
            const siblings = variantGroup.querySelectorAll('.variant-btn:not(.out-of-stock)');
            siblings.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
        });
    });
    
    // Configurar botões de cor
    const colorButtons = document.querySelectorAll('.color-btn');
    
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões no mesmo grupo
            const variantGroup = this.closest('.variant-options');
            const siblings = variantGroup.querySelectorAll('.color-btn');
            siblings.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
        });
    });
}

// Configuração do seletor de quantidade
function setupQuantitySelector() {
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (!minusBtn || !plusBtn || !quantityInput) return;
    
    // Obter o estoque máximo
    const stockInfo = document.querySelector('.stock-info');
    let maxStock = 8; // Valor padrão baseado no HTML
    
    if (stockInfo) {
        const stockText = stockInfo.textContent;
        const stockMatch = stockText.match(/(\d+)/);
        if (stockMatch) {
            maxStock = parseInt(stockMatch[1]);
        }
    }
    
    minusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        
        if (value > parseInt(quantityInput.min)) {
            quantityInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        
        if (value < maxStock) {
            quantityInput.value = value + 1;
        }
    });
    
    // Validar entrada manual
    quantityInput.addEventListener('input', function() {
        let value = parseInt(this.value);
        
        if (isNaN(value) || value < 1) {
            this.value = 1;
        } else if (value > maxStock) {
            this.value = maxStock;
            showNotification(`Quantidade máxima disponível: ${maxStock}`, 'warning');
        }
    });
}

// Configuração das animações de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem animar
    const animatedElements = document.querySelectorAll('.product-card, .feature, .delivery-option');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// Configuração de responsividade
function setupResponsiveness() {
    // Configurar menu mobile (se necessário)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Ajustar layout em mudanças de orientação
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalcular layouts se necessário
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Configurar botão de fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Função auxiliar para cores de notificação
function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Adicionar estilos de animação para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;

document.head.appendChild(notificationStyles);

