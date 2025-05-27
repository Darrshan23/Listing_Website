// loginLightbox.js
let supabase;

// Try to get supabase from different possible sources
if (typeof window !== 'undefined') {
    supabase = window.supabase || window.supabaseClient || null;
}

// If supabase is not available, log error
if (!supabase) {
    console.error('Supabase client not found. Make sure settings.js is loaded before loginLightbox.js');
}

class LoginLightbox {
    constructor() {
        this.isOpen = false;
        this.currentMode = 'login';
        
        // Bind all methods to maintain context
        this.init = this.init.bind(this);
        this.createLightbox = this.createLightbox.bind(this);
        this.bindEvents = this.bindEvents.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.switchMode = this.switchMode.bind(this);
        this.showForgotPassword = this.showForgotPassword.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.clearForms = this.clearForms.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.showError = this.showError.bind(this);
        this.setLoading = this.setLoading.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
        this.createProfile = this.createProfile.bind(this);
        this.checkAuthState = this.checkAuthState.bind(this);
        this.onAuthSuccess = this.onAuthSuccess.bind(this);
        this.onAuthSignOut = this.onAuthSignOut.bind(this);
        this.createUserMenu = this.createUserMenu.bind(this);
        this.updateMode = this.updateMode.bind(this);

        this.init();
    }

    init() {
        this.createLightbox();
        this.bindEvents();
        this.checkAuthState();
    }

    createLightbox() {
        if (document.getElementById('authLightboxOverlay')) return;
        
        const lightboxHTML = `
            <div class="auth-lightbox-overlay" id="authLightboxOverlay">
                <div class="auth-lightbox-container">
                    <div class="auth-lightbox-header">
                        <h2 class="auth-title" id="authTitle">Welcome Back</h2>
                        <button class="auth-close-btn" id="authCloseBtn">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="auth-lightbox-content">
                        <!-- Login Form -->
                        <form class="auth-form" id="loginForm">
                            <div class="form-group">
                                <label for="loginEmail">Email Address</label>
                                <input type="email" id="loginEmail" required>
                            </div>
                            <div class="form-group">
                                <label for="loginPassword">Password</label>
                                <input type="password" id="loginPassword" required>
                            </div>
                            <div class="form-options">
                                <label class="checkbox-container">
                                    <input type="checkbox" id="rememberMe">
                                    <span class="checkmark"></span>
                                    Remember me
                                </label>
                                <a href="#" class="forgot-password" id="forgotPasswordLink">Forgot Password?</a>
                            </div>
                            <button type="submit" class="auth-submit-btn" id="loginSubmitBtn">
                                <span class="btn-text">Sign In</span>
                                <span class="btn-loader" style="display: none;">
                                    <i class="fas fa-spinner fa-spin"></i>
                                </span>
                            </button>
                        </form>

                        <!-- Signup Form -->
                        <form class="auth-form" id="signupForm" style="display: none;">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="signupFirstName">First Name</label>
                                    <input type="text" id="signupFirstName" required>
                                </div>
                                <div class="form-group">
                                    <label for="signupLastName">Last Name</label>
                                    <input type="text" id="signupLastName" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="signupEmail">Email Address</label>
                                <input type="email" id="signupEmail" required>
                            </div>
                            <div class="form-group">
                                <label for="signupPassword">Password</label>
                                <input type="password" id="signupPassword" required>
                            </div>
                            <div class="form-group">
                                <label for="signupConfirmPassword">Confirm Password</label>
                                <input type="password" id="signupConfirmPassword" required>
                            </div>
                            <div class="form-options">
                                <label class="checkbox-container">
                                    <input type="checkbox" id="agreeTerms" required>
                                    <span class="checkmark"></span>
                                    I agree to the <a href="#" class="terms-link">Terms & Conditions</a>
                                </label>
                            </div>
                            <button type="submit" class="auth-submit-btn" id="signupSubmitBtn">
                                <span class="btn-text">Create Account</span>
                                <span class="btn-loader" style="display: none;">
                                    <i class="fas fa-spinner fa-spin"></i>
                                </span>
                            </button>
                        </form>

                        <!-- Forgot Password Form -->
                        <form class="auth-form" id="forgotPasswordForm" style="display: none;">
                            <p class="forgot-password-text">Enter your email address and we'll send you a link to reset your password.</p>
                            <div class="form-group">
                                <label for="forgotEmail">Email Address</label>
                                <input type="email" id="forgotEmail" required>
                            </div>
                            <button type="submit" class="auth-submit-btn" id="forgotPasswordSubmitBtn">
                                <span class="btn-text">Send Reset Link</span>
                                <span class="btn-loader" style="display: none;">
                                    <i class="fas fa-spinner fa-spin"></i>
                                </span>
                            </button>
                            <button type="button" class="back-to-login-btn" id="backToLoginBtn">
                                <i class="fas fa-arrow-left"></i>
                                Back to Login
                            </button>
                        </form>
                    </div>

                    <div class="auth-lightbox-footer">
                        <div class="auth-divider">
                            <span>or</span>
                        </div>
                        
                        <div class="social-auth-buttons">
                            <button class="social-auth-btn google-btn" id="googleAuthBtn">
                                <i class="fab fa-google"></i>
                                Continue with Google
                            </button>
                        </div>

                        <div class="auth-switch">
                            <span class="auth-switch-text" id="authSwitchText">Don't have an account?</span>
                            <button class="auth-switch-btn" id="authSwitchBtn">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    bindEvents() {
        // Use event delegation for dynamic elements
        document.addEventListener('click', (e) => {
            if (e.target.closest('#loginBtn')) {
                e.preventDefault();
                this.openLightbox('login');
            }
            if (e.target.closest('#signupBtn')) {
                e.preventDefault();
                this.openLightbox('signup');
            }
        });

        // Add null checks for all event listeners
        const addListener = (id, event, handler) => {
            const el = document.getElementById(id);
            if (el) el.addEventListener(event, handler);
        };

        // Wait for lightbox elements to be created
        const waitForLightboxElements = () => {
            const overlay = document.getElementById('authLightboxOverlay');
            if (!overlay) {
                setTimeout(waitForLightboxElements, 50);
                return;
            }

            // Lightbox events
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeLightbox();
                }
            });

            addListener('authCloseBtn', 'click', () => this.closeLightbox());
            addListener('authSwitchBtn', 'click', () => this.switchMode());
            addListener('forgotPasswordLink', 'click', (e) => {
                e.preventDefault();
                this.showForgotPassword();
            });
            addListener('backToLoginBtn', 'click', () => this.showLogin());
            addListener('loginForm', 'submit', (e) => this.handleLogin(e));
            addListener('signupForm', 'submit', (e) => this.handleSignup(e));
            addListener('forgotPasswordForm', 'submit', (e) => this.handleForgotPassword(e));
            addListener('googleAuthBtn', 'click', () => this.handleGoogleAuth());

            // ESC key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeLightbox();
                }
            });
        };

        waitForLightboxElements();
    }

    openLightbox(mode = 'login') {
        const overlay = document.getElementById('authLightboxOverlay');
        if (!overlay) return;
        
        this.currentMode = mode;
        this.isOpen = true;
        this.clearForms();
        this.clearErrors();
        this.updateMode();
        
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animate in
        requestAnimationFrame(() => {
            overlay.classList.add('active');
        });
    }

    closeLightbox() {
        const overlay = document.getElementById('authLightboxOverlay');
        if (!overlay) return;
        
        this.isOpen = false;
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Hide after animation
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }

    switchMode() {
        this.currentMode = this.currentMode === 'login' ? 'signup' : 'login';
        this.clearForms();
        this.clearErrors();
        this.updateMode();
    }

    showForgotPassword() {
        this.currentMode = 'forgot';
        this.clearForms();
        this.clearErrors();
        this.updateMode();
    }

    showLogin() {
        this.currentMode = 'login';
        this.clearForms();
        this.clearErrors();
        this.updateMode();
    }

    updateMode() {
        const title = document.getElementById('authTitle');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const forgotForm = document.getElementById('forgotPasswordForm');
        const switchText = document.getElementById('authSwitchText');
        const switchBtn = document.getElementById('authSwitchBtn');
        const footer = document.querySelector('.auth-lightbox-footer');

        if (!title || !loginForm || !signupForm || !forgotForm || !switchText || !switchBtn || !footer) return;

        // Hide all forms
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
        forgotForm.style.display = 'none';

        switch (this.currentMode) {
            case 'login':
                title.textContent = 'Welcome Back';
                loginForm.style.display = 'block';
                switchText.textContent = "Don't have an account?";
                switchBtn.textContent = 'Sign up';
                footer.style.display = 'block';
                break;
            case 'signup':
                title.textContent = 'Create Account';
                signupForm.style.display = 'block';
                switchText.textContent = 'Already have an account?';
                switchBtn.textContent = 'Sign in';
                footer.style.display = 'block';
                break;
            case 'forgot':
                title.textContent = 'Reset Password';
                forgotForm.style.display = 'block';
                footer.style.display = 'none';
                break;
        }
    }

    clearForms() {
        const forms = ['loginForm', 'signupForm', 'forgotPasswordForm'];
        forms.forEach(formId => {
            const form = document.getElementById(formId);
            if (form) form.reset();
        });
    }

    clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        const inputElements = document.querySelectorAll('.auth-form input');
        inputElements.forEach(el => el.classList.remove('error'));
    }

    showError(message, inputId = null) {
        this.clearErrors();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        if (inputId) {
            const input = document.getElementById(inputId);
            if (input) {
                input.classList.add('error');
                input.parentNode.appendChild(errorDiv);
                return;
            }
        }
        
        // Default placement
        const activeForm = document.querySelector('.auth-form[style*="block"]');
        if (activeForm) {
            activeForm.insertBefore(errorDiv, activeForm.firstChild);
        }
    }

    setLoading(formId, loading) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const submitBtn = form.querySelector('.auth-submit-btn');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnLoader = submitBtn?.querySelector('.btn-loader');
        
        if (submitBtn && btnText && btnLoader) {
            if (loading) {
                submitBtn.disabled = true;
                btnText.style.display = 'none';
                btnLoader.style.display = 'inline-block';
            } else {
                submitBtn.disabled = false;
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
            }
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        if (!supabase) {
            this.showError('Authentication service not available');
            return;
        }
        
        const email = document.getElementById('loginEmail')?.value;
        const password = document.getElementById('loginPassword')?.value;
        
        if (!email || !password) {
            this.showError('Please fill in all fields');
            return;
        }
        
        this.setLoading('loginForm', true);
        
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            
            this.onAuthSuccess(data.user);
            
        } catch (error) {
            console.error('Login error:', error);
            this.showError(error.message || 'Login failed. Please try again.');
        } finally {
            this.setLoading('loginForm', false);
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        if (!supabase) {
            this.showError('Authentication service not available');
            return;
        }
        
        const firstName = document.getElementById('signupFirstName')?.value;
        const lastName = document.getElementById('signupLastName')?.value;
        const email = document.getElementById('signupEmail')?.value;
        const password = document.getElementById('signupPassword')?.value;
        const confirmPassword = document.getElementById('signupConfirmPassword')?.value;
        const agreeTerms = document.getElementById('agreeTerms')?.checked;
        
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            this.showError('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showError('Passwords do not match', 'signupConfirmPassword');
            return;
        }
        
        if (password.length < 6) {
            this.showError('Password must be at least 6 characters long', 'signupPassword');
            return;
        }
        
        if (!agreeTerms) {
            this.showError('Please agree to the Terms & Conditions');
            return;
        }
        
        this.setLoading('signupForm', true);
        
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                        full_name: `${firstName} ${lastName}`
                    }
                }
            });
            
            if (error) throw error;
            
            if (data.user && !data.user.email_confirmed_at) {
                this.showError('Please check your email for a confirmation link before signing in.');
                setTimeout(() => {
                    this.showLogin();
                }, 3000);
            } else {
                await this.createProfile(data.user, firstName, lastName);
                this.onAuthSuccess(data.user);
            }
            
        } catch (error) {
            console.error('Signup error:', error);
            this.showError(error.message || 'Signup failed. Please try again.');
        } finally {
            this.setLoading('signupForm', false);
        }
    }

    async handleForgotPassword(e) {
        e.preventDefault();
        if (!supabase) {
            this.showError('Authentication service not available');
            return;
        }
        
        const email = document.getElementById('forgotEmail')?.value;
        
        if (!email) {
            this.showError('Please enter your email address', 'forgotEmail');
            return;
        }
        
        this.setLoading('forgotPasswordForm', true);
        
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`
            });
            
            if (error) throw error;
            
            this.showError('Password reset link sent! Please check your email.');
            setTimeout(() => {
                this.showLogin();
            }, 3000);
            
        } catch (error) {
            console.error('Forgot password error:', error);
            this.showError(error.message || 'Failed to send reset email. Please try again.');
        } finally {
            this.setLoading('forgotPasswordForm', false);
        }
    }

    async handleGoogleAuth() {
        if (!supabase) {
            this.showError('Authentication service not available');
            return;
        }
        
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });
            
            if (error) throw error;
            
        } catch (error) {
            console.error('Google auth error:', error);
            this.showError(error.message || 'Google authentication failed. Please try again.');
        }
    }

    async createProfile(user, firstName, lastName) {
        if (!supabase || !user) return;
        
        try {
            const { error } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: user.id,
                        first_name: firstName,
                        last_name: lastName,
                        email: user.email,
                        avatar_url: user.user_metadata?.avatar_url || null,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    }
                ]);
            
            if (error && error.code !== '23505') { // Ignore duplicate key error
                console.error('Profile creation error:', error);
            }
        } catch (error) {
            console.error('Profile creation error:', error);
        }
    }

    async checkAuthState() {
        if (!supabase) return;
        
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
                this.onAuthSuccess(user);
            } else {
                this.onAuthSignOut();
            }
            
            // Listen for auth state changes
            supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    this.onAuthSuccess(session.user);
                } else if (event === 'SIGNED_OUT') {
                    this.onAuthSignOut();
                }
            });
            
        } catch (error) {
            console.error('Auth state check error:', error);
            this.onAuthSignOut();
        }
    }

    onAuthSuccess(user) {
        console.log('User authenticated:', user);
        this.closeLightbox();
        this.createUserMenu(user);
        
        // Dispatch custom event for other parts of the app
        window.dispatchEvent(new CustomEvent('userAuthenticated', {
            detail: { user }
        }));
    }

    onAuthSignOut() {
        console.log('User signed out');
        this.removeUserMenu();
        
        // Show login/signup buttons
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        
        if (loginBtn) loginBtn.style.display = 'block';
        if (signupBtn) signupBtn.style.display = 'block';
        
        // Dispatch custom event for other parts of the app
        window.dispatchEvent(new CustomEvent('userSignedOut'));
    }

    createUserMenu(user) {
        // Hide login/signup buttons
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        
        // Create or update user menu
        let userMenu = document.getElementById('userMenu');
        if (!userMenu) {
            userMenu = document.createElement('div');
            userMenu.id = 'userMenu';
            userMenu.className = 'user-menu';
            
            const navActions = document.querySelector('.nav-actions');
            if (navActions) {
                navActions.appendChild(userMenu);
            }
        }
        
        const displayName = user.user_metadata?.full_name || 
                           user.user_metadata?.first_name || 
                           user.email?.split('@')[0] || 
                           'User';
        
        const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
        
        userMenu.innerHTML = `
            <div class="user-menu-trigger" id="userMenuTrigger">
                <div class="user-avatar">
                    ${avatarUrl ? 
                        `<img src="${avatarUrl}" alt="${displayName}" />` : 
                        `<i class="fas fa-user"></i>`
                    }
                </div>
                <span class="user-name">${displayName}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="user-menu-dropdown" id="userMenuDropdown">
                <div class="user-menu-header">
                    <div class="user-avatar-large">
                        ${avatarUrl ? 
                            `<img src="${avatarUrl}" alt="${displayName}" />` : 
                            `<i class="fas fa-user"></i>`
                        }
                    </div>
                    <div class="user-info">
                        <div class="user-name-large">${displayName}</div>
                        <div class="user-email">${user.email}</div>
                    </div>
                </div>
                <div class="user-menu-items">
                    <a href="#" class="user-menu-item">
                        <i class="fas fa-user"></i>
                        <span>Profile</span>
                    </a>
                    <a href="#" class="user-menu-item">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                    <a href="#" class="user-menu-item">
                        <i class="fas fa-heart"></i>
                        <span>Favorites</span>
                    </a>
                    <a href="#" class="user-menu-item">
                        <i class="fas fa-shopping-bag"></i>
                        <span>Orders</span>
                    </a>
                    <div class="user-menu-divider"></div>
                    <button class="user-menu-item sign-out-btn" id="signOutBtn">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners for user menu
        const menuTrigger = document.getElementById('userMenuTrigger');
        const menuDropdown = document.getElementById('userMenuDropdown');
        const signOutBtn = document.getElementById('signOutBtn');
        
        if (menuTrigger && menuDropdown) {
            menuTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                menuDropdown.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!userMenu.contains(e.target)) {
                    menuDropdown.classList.remove('active');
                }
            });
        }
        
        if (signOutBtn) {
            signOutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                
                if (!supabase) return;
                
                try {
                    const { error } = await supabase.auth.signOut();
                    if (error) throw error;
                } catch (error) {
                    console.error('Sign out error:', error);
                }
            });
        }
    }

    removeUserMenu() {
        const userMenu = document.getElementById('userMenu');
        if (userMenu) {
            userMenu.remove();
        }
    }
}

// Initialize login lightbox when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.loginLightbox = new LoginLightbox();
    });
} else {
    window.loginLightbox = new LoginLightbox();
}