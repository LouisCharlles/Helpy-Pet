//! Script específico para a área administrativa
document.addEventListener('DOMContentLoaded', function() {
    //! Inicialização de elementos administrativos
    initializeAdminElements();
    
    //! Configuração de interações administrativas
    setupAdminInteractions();
    
    //! Configuração de validação de formulários administrativos
    setupAdminFormValidation();
});

//! Inicialização de elementos administrativos
function initializeAdminElements() {
    console.log('Inicializando elementos da interface administrativa...');
    
    //! Adicionar classe para indicar que a página está carregada
    document.body.classList.add('admin-page-loaded');
    
    //! Destacar o tipo de acesso selecionado
    highlightSelectedRole();
}

//! Configuração de interações administrativas
function setupAdminInteractions() {
    //! Alternar entre formulários de login e cadastro administrativo
    const showAdminRegisterBtn = document.getElementById('showAdminRegister');
    const showAdminLoginBtn = document.getElementById('showAdminLogin');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminRegisterForm = document.getElementById('adminRegisterForm');
    
    if (showAdminRegisterBtn && showAdminLoginBtn && adminLoginForm && adminRegisterForm) {
        showAdminRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchAdminForms(adminLoginForm, adminRegisterForm);
        });
        
        showAdminLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchAdminForms(adminRegisterForm, adminLoginForm);
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
    
    //! Seleção de tipo de acesso (role)
    const roleInputs = document.querySelectorAll('input[name="role"], input[name="requestRole"]');
    roleInputs.forEach(function(input) {
        input.addEventListener('change', highlightSelectedRole);
    });
    
    //! Link de esqueceu a senha
    const forgotPasswordLink = document.querySelector('.admin-form-panel .forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Um e-mail de recuperação será enviado ao administrador do sistema', 'info');
        });
    }
}

//! Alternar entre formulários administrativos com animação
function switchAdminForms(fromForm, toForm) {
    //! Ocultar formulário atual
    fromForm.style.opacity = '0';
    fromForm.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        fromForm.style.display = 'none';
        
        //! Mostrar novo formulário
        toForm.style.display = 'block';
        toForm.style.opacity = '0';
        toForm.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            toForm.style.opacity = '1';
            toForm.style.transform = 'translateY(0)';
        }, 50);
    }, 300);
}

//! Destacar o tipo de acesso selecionado
function highlightSelectedRole() {
    const adminRoleInputs = document.querySelectorAll('input[name="role"], input[name="requestRole"]');
    adminRoleInputs.forEach(function(input) {
        const label = input.closest('.role-option');
        if (input.checked) {
            label.classList.add('selected');
        } else {
            label.classList.remove('selected');
        }
    });
}

//! Configuração de validação de formulários administrativos
function setupAdminFormValidation() {
    //! Formulário de login administrativo
    const adminLoginForm = document.querySelector('#adminLoginForm form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            //! Validar campos
            const email = document.getElementById('adminEmail');
            const password = document.getElementById('adminPassword');
            const role = document.querySelector('input[name="role"]:checked');
            let isValid = true;
            
            //! Validar email
            if (!validateEmail(email.value)) {
                showError(email, 'adminEmailError', 'E-mail corporativo inválido');
                isValid = false;
            } else if (!email.value.includes('helpypet.com')) {
                showError(email, 'adminEmailError', 'Use seu e-mail corporativo @helpypet.com');
                isValid = false;
            } else {
                clearError('adminEmailError');
            }
            
            //! Validar senha
            if (password.value.length < 8) {
                showError(password, 'adminPasswordError', 'A senha deve ter pelo menos 8 caracteres');
                isValid = false;
            } else {
                clearError('adminPasswordError');
            }
            
            //! Se tudo estiver válido, simular login
            if (isValid) {
                simulateLoading(this.querySelector('.submit-btn'));
                setTimeout(() => {
                    const roleText = role.value === 'admin' ? 'Administrador' : 'Funcionário';
                    showNotification(`Login como ${roleText} realizado com sucesso!`, 'success');
                    setTimeout(() => {
                        // Redirecionar para a página de gerenciamento de estoque
                        window.location.href = 'estoque.html';
                    }, 1500);
                }, 2000);
            }
        });
    }
    
    //! Formulário de cadastro administrativo
    const adminRegisterForm = document.querySelector('#adminRegisterForm form');
    if (adminRegisterForm) {
        adminRegisterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            //! Validar campos
            const name = document.getElementById('adminRegisterName');
            const email = document.getElementById('adminRegisterEmail');
            const phone = document.getElementById('adminRegisterPhone');
            const position = document.getElementById('adminPosition');
            const department = document.getElementById('adminDepartment');
            const justification = document.getElementById('adminJustification');
            const terms = document.getElementById('adminTermsAgree');
            let isValid = true;
            
            //! Validar nome
            if (name.value.trim().length < 3) {
                showError(name, 'adminNameError', 'Nome deve ter pelo menos 3 caracteres');
                isValid = false;
            } else {
                clearError('adminNameError');
            }
            
            //! Validar email
            if (!validateEmail(email.value)) {
                showError(email, 'adminRegisterEmailError', 'E-mail corporativo inválido');
                isValid = false;
            } else if (!email.value.includes('helpypet.com')) {
                showError(email, 'adminRegisterEmailError', 'Use seu e-mail corporativo @helpypet.com');
                isValid = false;
            } else {
                clearError('adminRegisterEmailError');
            }
            
            //! Validar telefone
            if (!validatePhone(phone.value)) {
                showError(phone, 'adminPhoneError', 'Telefone inválido');
                isValid = false;
            } else {
                clearError('adminPhoneError');
            }
            
            //! Validar cargo
            if (position.value.trim().length < 3) {
                showError(position, 'adminPositionError', 'Informe seu cargo');
                isValid = false;
            } else {
                clearError('adminPositionError');
            }
            
            //! Validar departamento
            if (department.value === '') {
                showError(department, 'adminDepartmentError', 'Selecione seu departamento');
                isValid = false;
            } else {
                clearError('adminDepartmentError');
            }
            
            //! Validar justificativa
            if (justification.value.trim().length < 10) {
                showError(justification, 'adminJustificationError', 'Justificativa deve ter pelo menos 10 caracteres');
                isValid = false;
            } else {
                clearError('adminJustificationError');
            }
            
            //! Validar termos
            if (!terms.checked) {
                showError(terms, 'adminTermsError', 'Você deve concordar com os termos');
                isValid = false;
            } else {
                clearError('adminTermsError');
            }
            
            //! Se tudo estiver válido, simular envio
            if (isValid) {
                simulateLoading(this.querySelector('.submit-btn'));
                setTimeout(() => {
                    showNotification('Solicitação enviada com sucesso! Você receberá um e-mail quando for aprovada.', 'success');
                    setTimeout(() => {
                        // Voltar para o formulário de login
                        const adminLoginForm = document.getElementById('adminLoginForm');
                        const adminRegisterForm = document.getElementById('adminRegisterForm');
                        switchAdminForms(adminRegisterForm, adminLoginForm);
                    }, 2000);
                }, 2000);
            }
        });
    }
    
    //! Máscara para telefone
    const phoneInput = document.getElementById('adminRegisterPhone');
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
    
    //! Validação em tempo real para e-mail corporativo
    const emailInputs = document.querySelectorAll('#adminEmail, #adminRegisterEmail');
    emailInputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if (this.value && validateEmail(this.value) && !this.value.includes('helpypet.com')) {
                const errorId = this.id === 'adminEmail' ? 'adminEmailError' : 'adminRegisterEmailError';
                showError(this, errorId, 'Use seu e-mail corporativo @helpypet.com');
            }
        });
    });
}

//! Adicionar estilos CSS específicos para área administrativa
(function addAdminStyles() {
    if (document.getElementById('admin-dynamic-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'admin-dynamic-styles';
    styleSheet.textContent = `
        /* Estilos para role selecionado */
        .role-option.selected .role-label {
            font-weight: 600;
            color: var(--text-dark);
        }
        
        /* Loader administrativo */
        .admin-submit-btn .loader {
            border-top-color: white;
        }
        
        /* Notificações administrativas */
        .admin-page-loaded .notification.info::before { background-color: var(--admin-info); }
        .admin-page-loaded .notification.success::before { background-color: var(--admin-success); }
        .admin-page-loaded .notification.warning::before { background-color: var(--admin-warning); }
        .admin-page-loaded .notification.error::before { background-color: var(--admin-danger); }
        
        .admin-page-loaded .notification.info .notification-icon { color: var(--admin-info); }
        .admin-page-loaded .notification.success .notification-icon { color: var(--admin-success); }
        .admin-page-loaded .notification.warning .notification-icon { color: var(--admin-warning); }
        .admin-page-loaded .notification.error .notification-icon { color: var(--admin-danger); }
    `;
    
    document.head.appendChild(styleSheet);
})();
