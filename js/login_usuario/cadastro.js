//! Script para interatividade e validação das telas de login e cadastro
document.addEventListener('DOMContentLoaded', function() {
    //* Inicialização de elementos
    initializeElements();
    
    //todo: Configuração de animações de entrada
    setupEntryAnimations();
    
    //todo: Configuração de interações
    setupInteractions();
    
    //todo: Configuração de validação de formulários
    setupFormValidation();
    
    //* Configuração de responsividade
    setupResponsiveness();
});

//* Inicialização de elementos da página
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
        '.auth-container',
        '.info-panel',
        '.form-panel',
        '.panel-title',
        '.panel-description',
        '.panel-image',
        '.panel-features'
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
    //! Alternar entre formulários de login e cadastro
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (showRegisterBtn && showLoginBtn && loginForm && registerForm) {
        showRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchForms(loginForm, registerForm);
        });
        
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchForms(registerForm, loginForm);
        });
    }
    
    //! Botões de mostrar/ocultar senha
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    //! Botões de login social
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 
                            this.classList.contains('facebook') ? 'Facebook' : 'Apple';
            
            //! Efeito de clique
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            showNotification(`Login com ${provider} será implementado em breve`, 'info');
        });
    });
    
    //! Link de esqueceu a senha
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Recuperação de senha será implementada em breve', 'info');
        });
    }
    
    //! Botões de submit
    const submitBtns = document.querySelectorAll('.submit-btn');
    submitBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            //! Não prevenir o evento padrão aqui para permitir a validação do formulário
            
            //! Efeito de clique
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
}

//! Alternar entre formulários com animação
function switchForms(fromForm, toForm) {
    // !Ocultar formulário atual
    fromForm.style.opacity = '0';
    fromForm.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        fromForm.style.display = 'none';
        
        // Mostrar novo formulário
        toForm.style.display = 'block';
        toForm.style.opacity = '0';
        toForm.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            toForm.style.opacity = '1';
            toForm.style.transform = 'translateY(0)';
        }, 50);
    }, 300);
}

//! Configuração de validação de formulários
function setupFormValidation() {
    //! Formulário de login
    const loginForm = document.querySelector('#loginForm form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            //! Validar campos
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            let isValid = true;
            
            //! Validar email
            if (!validateEmail(email.value)) {
                showError(email, 'emailError', 'E-mail inválido');
                isValid = false;
            } else {
                clearError('emailError');
            }
            
            //! Validar senha
            if (password.value.length < 6) {
                showError(password, 'passwordError', 'A senha deve ter pelo menos 6 caracteres');
                isValid = false;
            } else {
                clearError('passwordError');
            }
            
            //! Se tudo estiver válido, simular login
            if (isValid) {
                simulateLoading(this.querySelector('.submit-btn'));
                setTimeout(() => {
                    showNotification('Login realizado com sucesso!', 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html'; //! Redirecionar para a página de perfil
                    }, 1500);
                }, 2000);
            }
        });
    }
    
    //! Formulário de cadastro
    const registerForm = document.querySelector('#registerForm form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            //! Validar campos
            const name = document.getElementById('registerName');
            const email = document.getElementById('registerEmail');
            const phone = document.getElementById('registerPhone');
            const password = document.getElementById('registerPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            const terms = document.getElementById('termsAgree');
            let isValid = true;
            
            //! Validar nome
            if (name.value.trim().length < 3) {
                showError(name, 'nameError', 'Nome deve ter pelo menos 3 caracteres');
                isValid = false;
            } else {
                clearError('nameError');
            }
            
            //! Validar email
            if (!validateEmail(email.value)) {
                showError(email, 'registerEmailError', 'E-mail inválido');
                isValid = false;
            } else {
                clearError('registerEmailError');
            }
            
            //! Validar telefone
            if (!validatePhone(phone.value)) {
                showError(phone, 'phoneError', 'Telefone inválido');
                isValid = false;
            } else {
                clearError('phoneError');
            }
            
            //! Validar senha
            if (password.value.length < 6) {
                showError(password, 'registerPasswordError', 'A senha deve ter pelo menos 6 caracteres');
                isValid = false;
            } else {
                clearError('registerPasswordError');
            }
            
            //! Validar confirmação de senha
            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'confirmPasswordError', 'As senhas não coincidem');
                isValid = false;
            } else {
                clearError('confirmPasswordError');
            }
            
            //! Validar termos
            if (!terms.checked) {
                showError(terms, 'termsError', 'Você deve concordar com os termos');
                isValid = false;
            } else {
                clearError('termsError');
            }
            
            //! Se tudo estiver válido, simular cadastro
            if (isValid) {
                simulateLoading(this.querySelector('.submit-btn'));
                setTimeout(() => {
                    showNotification('Cadastro realizado com sucesso!', 'success');
                    setTimeout(() => {
                        //! Voltar para o formulário de login
                        const loginForm = document.getElementById('loginForm');
                        const registerForm = document.getElementById('registerForm');
                        switchForms(registerForm, loginForm);
                    }, 1500);
                }, 2000);
            }
        });
    }
    
    //! Máscara para telefone
    const phoneInput = document.getElementById('registerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '(' + value;
                if (value.length > 3) {
                    value = value.substring(0, 3) + ') ' + value.substring(3);
                }
                if (value.length > 10) {
                    value = value.substring(0, 10) + '-' + value.substring(10);
                }
                if (value.length > 15) {
                    value = value.substring(0, 15);
                }
            }
            e.target.value = value;
        });
    }
}

//! Configuração de responsividade
function setupResponsiveness() {
    //! Verificar tamanho da tela e ajustar elementos
    function checkScreenSize() {
        const width = window.innerWidth;
        
        //! Ajustes para telas pequenas
        if (width <= 576) {
            document.body.classList.add('small-screen');
            document.body.classList.remove('medium-screen', 'large-screen');
        } 
        //! Ajustes para telas médias
        else if (width <= 992) {
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

//! Validar email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//! Validar telefone
function validatePhone(phone) {
    //! Remover caracteres não numéricos
    const phoneDigits = phone.replace(/\D/g, '');
    //! Verificar se tem pelo menos 10 dígitos (DDD + número)
    return phoneDigits.length >= 10;
}

//! Mostrar erro
function showError(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
    
    input.classList.add('error');
    input.addEventListener('input', function() {
        input.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }, { once: true });
}

//! Limpar erro
function clearError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

//! Simular carregamento
function simulateLoading(button) {
    //! Salvar texto original
    const originalText = button.innerHTML;
    
    //! Mostrar loader
    button.innerHTML = '<div class="loader"></div>';
    button.disabled = true;
    
    //! Restaurar após o tempo especificado
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
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

//! Adicionar estilos CSS para elementos criados dinamicamente
(function addDynamicStyles() {
    if (document.getElementById('dynamic-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'dynamic-styles';
    styleSheet.textContent = `
        //! Notificações */
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
        
        //! Tooltips */
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
        
        //! Loader 
        .loader {
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Campos com erro */
        .input-container input.error {
            border-color: var(--danger-color);
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
        }
    `;
    
    document.head.appendChild(styleSheet);
})();
