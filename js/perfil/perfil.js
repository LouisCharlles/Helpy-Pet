//! Script para interatividade avançada da página de perfil
document.addEventListener('DOMContentLoaded', function() {
    //! Inicialização de elementos
    initializeElements();
    
    //! Configuração de animações de entrada
    setupEntryAnimations();
    
    //! Configuração de interações
    setupInteractions();
    
    //! Configuração de modais
    setupModals();
    
    //! Configuração de responsividade
    setupResponsiveness();
    
    //! Simulação de carregamento de dados
    simulateLoading();
});

//! Inicialização de elementos da página
function initializeElements() {
    console.log('Inicializando elementos da interface...');
    
    //! Adicionar classe para indicar que a página está carregada
    document.body.classList.add('page-loaded');
    
    //! Inicializar tooltips
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

//! Configuração de animações de entrada
function setupEntryAnimations() {
    //! Animar elementos em sequência
    const animatedElements = [
        '.profile-container',
        '.edit-profile-btn',
        '.pet-section',
        '.account-actions',
        '.addresses-section',
        '.footer'
    ];
    
    animatedElements.forEach((selector, index) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    });
}

//! Configuração de interações
function setupInteractions() {
    //! Botão de editar perfil
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Modo de edição de perfil ativado', 'info');
            
            //! Simular efeito de clique
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    }
    
    //! Botão de adicionar pet
    const addPetBtn = document.querySelector('.add-pet-btn');
    if (addPetBtn) {
        addPetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Adicionar novo pet', 'info');
        });
    }
    
    //! Botão de adicionar endereço
    const addAddressBtn = document.querySelector('.add-address-btn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Adicionar novo endereço', 'info');
        });
    }
    
    //! Botões de editar endereço
    const editAddressBtns = document.querySelectorAll('.edit-address-btn');
    editAddressBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Editando endereço...', 'info');
        });
    });
    
    //! Botão de opções do pet
    const petOptionsBtn = document.querySelector('.pet-options-btn');
    if (petOptionsBtn) {
        petOptionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleModal('petOptionsModal');
        });
    }
    
    //! Ações da conta
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            // Efeito de clique
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            //! Verificar qual ação foi clicada
            switch(action) {
                case 'orders':
                    showNotification('Acessando seus pedidos...', 'info');
                    break;
                case 'subscriptions':
                    showNotification('Gerenciando suas assinaturas...', 'info');
                    break;
                case 'coupons':
                    showNotification('Seus cupons disponíveis', 'success');
                    break;
                case 'logout':
                    confirmAction('Tem certeza que deseja sair?', function() {
                        showNotification('Saindo da conta...', 'warning');
                    });
                    break;
                default:
                    break;
            }
        });
    });
    
    //! Navegação do rodapé
    const footerNavItems = document.querySelectorAll('.footer-nav-item');
    footerNavItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            //! Remover classe ativa de todos os itens
            footerNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            //! Adicionar classe ativa ao item clicado
            this.classList.add('active');
            
            //! Mostrar notificação baseada no item clicado
            const itemText = this.querySelector('span').textContent;
            showNotification(`Navegando para: ${itemText}`, 'info');
        });
    });
}

//! Configuração de modais
function setupModals() {
    //! Fechar modal ao clicar no botão de fechar
    const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
    modalCloseBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    //! Fechar modal ao clicar fora do conteúdo
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    //! Opções do modal
    const modalOptions = document.querySelectorAll('.modal-options li');
    modalOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            const optionText = this.textContent.trim();
            
            //! Fechar o modal
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
            
            //! Verificar se é uma opção de perigo
            if (this.classList.contains('danger')) {
                confirmAction(`Tem certeza que deseja ${optionText}?`, function() {
                    showNotification(`${optionText} concluído`, 'warning');
                });
            } else {
                showNotification(`${optionText} selecionado`, 'info');
            }
        });
    });
}

//! Configuração de responsividade
function setupResponsiveness() {
    //! Verificar tamanho da tela e ajustar elementos
    function checkScreenSize() {
        const width = window.innerWidth;
        
        //! Ajustes para telas pequenas
        if (width <= 480) {
            document.body.classList.add('small-screen');
            document.body.classList.remove('medium-screen', 'large-screen');
        } 
        //! Ajustes para telas médias
        else if (width <= 768) {
            document.body.classList.add('medium-screen');
            document.body.classList.remove('small-screen', 'large-screen');
        } 
        //! Ajustes para telas grandes
        else {
            document.body.classList.add('large-screen');
            document.body.classList.remove('small-screen', 'medium-screen');
        }
    }
    
    //! Verificar ao carregar e ao redimensionar
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

//! Funções auxiliares

//! Abrir modal
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        if (modal.classList.contains('active')) {
            closeModal(modalId);
        } else {
            openModal(modalId);
        }
    }
}

//! Abrir modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impedir rolagem do body
    }
}

//! Fechar modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; //! Restaurar rolagem do body
    }
}

//! Mostrar notificação
function showNotification(message, type = 'info') {
    //! Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    //! Ícone baseado no tipo
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-times-circle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
            break;
    }
    
    //! Conteúdo da notificação
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-message">${message}</div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    //! Adicionar ao DOM
    if (!document.querySelector('.notifications-container')) {
        const container = document.createElement('div');
        container.className = 'notifications-container';
        document.body.appendChild(container);
    }
    
    document.querySelector('.notifications-container').appendChild(notification);
    
    //! Animar entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    //! Configurar botão de fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    //! Auto-fechar após 3 segundos
    setTimeout(() => {
        closeNotification(notification);
    }, 3000);
}

//! Fechar notificação
function closeNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hide');
    
    //! Remover do DOM após animação
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
        
        //! Remover container se estiver vazio
        const container = document.querySelector('.notifications-container');
        if (container && !container.hasChildNodes()) {
            container.parentNode.removeChild(container);
        }
    }, 300);
}

//! Confirmar ação
function confirmAction(message, callback) {
    //! Criar modal de confirmação
    const confirmModal = document.createElement('div');
    confirmModal.className = 'modal confirm-modal';
    confirmModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirmação</h3>
                <button class="modal-close-btn"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <p>${message}</p>
                <div class="confirm-actions">
                    <button class="btn-cancel">Cancelar</button>
                    <button class="btn-confirm">Confirmar</button>
                </div>
            </div>
        </div>
    `;
    
    //! Adicionar ao DOM
    document.body.appendChild(confirmModal);
    
    //! Mostrar modal
    setTimeout(() => {
        confirmModal.classList.add('active');
    }, 10);
    
    //! Configurar botões
    const closeBtn = confirmModal.querySelector('.modal-close-btn');
    const cancelBtn = confirmModal.querySelector('.btn-cancel');
    const confirmBtn = confirmModal.querySelector('.btn-confirm');
    
    // Função para fechar o modal
    const closeConfirmModal = () => {
        confirmModal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(confirmModal);
        }, 300);
    };
    
    //! Eventos dos botões
    closeBtn.addEventListener('click', closeConfirmModal);
    cancelBtn.addEventListener('click', closeConfirmModal);
    confirmBtn.addEventListener('click', () => {
        closeConfirmModal();
        if (typeof callback === 'function') {
            callback();
        }
    });
    
    //! Fechar ao clicar fora
    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) {
            closeConfirmModal();
        }
    });
}

//! Mostrar tooltip
function showTooltip(e) {
    const title = this.getAttribute('title');
    if (!title) return;
    
    //! Remover atributo title para evitar tooltip nativo
    this.setAttribute('data-title', title);
    this.removeAttribute('title');
    
    //! Criar tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = title;
    
    //! Adicionar ao DOM
    document.body.appendChild(tooltip);
    
    //! Posicionar tooltip
    const rect = this.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10 + window.scrollY}px`;
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + window.scrollX}px`;
    
    //! Mostrar tooltip
    setTimeout(() => {
        tooltip.classList.add('show');
    }, 10);
    
    //! Armazenar referência ao tooltip
    this._tooltip = tooltip;
}

//! Esconder tooltip
function hideTooltip() {
    if (this._tooltip) {
        //! Restaurar atributo title
        const title = this.getAttribute('data-title');
        if (title) {
            this.setAttribute('title', title);
            this.removeAttribute('data-title');
        }
        
        //! Remover tooltip
        this._tooltip.classList.remove('show');
        setTimeout(() => {
            if (this._tooltip.parentNode) {
                this._tooltip.parentNode.removeChild(this._tooltip);
            }
            this._tooltip = null;
        }, 300);
    }
}

//! Simular carregamento de dados
function simulateLoading() {
    //! Adicionar classe de carregamento a alguns elementos
    const loadingElements = [
        '.pet-card',
        '.address-card'
    ];
    
    loadingElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('loading');
            
            // Remover classe após um tempo
            setTimeout(() => {
                element.classList.remove('loading');
            }, 1500);
        });
    });
}

//! Adicionar estilos CSS para elementos criados dinamicamente
function addDynamicStyles() {
    if (document.getElementById('dynamic-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'dynamic-styles';
    styleSheet.textContent = `
        /* Notificações */
        .notifications-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 300px;
        }
        
        .notification {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            padding: 12px 15px;
            display: flex;
            align-items: center;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            overflow: hidden;
        }
        
        .notification::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 5px;
        }
        
        .notification.info::before { background-color: #3b82f6; }
        .notification.success::before { background-color: #10b981; }
        .notification.warning::before { background-color: #f59e0b; }
        .notification.error::before { background-color: #ef4444; }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.hide {
            transform: translateX(120%);
        }
        
        .notification-icon {
            margin-right: 12px;
            font-size: 1.2rem;
        }
        
        .notification.info .notification-icon { color: #3b82f6; }
        .notification.success .notification-icon { color: #10b981; }
        .notification.warning .notification-icon { color: #f59e0b; }
        .notification.error .notification-icon { color: #ef4444; }
        
        .notification-message {
            flex: 1;
            font-size: 0.9rem;
        }
        
        .notification-close {
            background: transparent;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            padding: 5px;
            margin-left: 10px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        
        .notification-close:hover {
            background-color: rgba(0,0,0,0.05);
            color: #4b5563;
        }
        
        /* Modal de confirmação */
        .confirm-modal .modal-content {
            max-width: 350px;
        }
        
        .confirm-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 20px;
        }
        
        .btn-cancel, .btn-confirm {
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .btn-cancel {
            background-color: #f3f4f6;
            border: 1px solid #d1d5db;
            color: #4b5563;
        }
        
        .btn-confirm {
            background-color: #8257e6;
            border: 1px solid #6d28d9;
            color: white;
        }
        
        .btn-cancel:hover {
            background-color: #e5e7eb;
        }
        
        .btn-confirm:hover {
            background-color: #6d28d9;
        }
        
        /* Tooltips */
        .custom-tooltip {
            position: absolute;
            background-color: rgba(0,0,0,0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.8rem;
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.2s ease, transform 0.2s ease;
        }
        
        .custom-tooltip::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px 5px 0;
            border-style: solid;
            border-color: rgba(0,0,0,0.8) transparent transparent;
        }
        
        .custom-tooltip.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Efeito de clique */
        .clicked {
            transform: scale(0.95) !important;
            transition: transform 0.1s ease !important;
        }
    `;
    
    document.head.appendChild(styleSheet);
}

//! Adicionar estilos dinâmicos ao carregar
document.addEventListener('DOMContentLoaded', addDynamicStyles);
