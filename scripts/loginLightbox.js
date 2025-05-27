// Include settings.js first in your HTML before this file
document.addEventListener('DOMContentLoaded', function() {
    // Lightbox HTML (same as before)
    const lightboxHTML = `
    <div class="auth-lightbox" id="authLightbox">
        <div class="auth-container">
            <button class="close-btn" id="closeAuthLightbox">&times;</button>
            <div class="auth-tabs">
                <button class="tab-btn active" data-tab="login">Login</button>
                <button class="tab-btn" data-tab="signup">Sign Up</button>
            </div>
            
            <div class="auth-content">
                <!-- Login Form -->
                <form id="loginForm" class="auth-form active" data-form="login">
                    <div class="form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" id="loginEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" id="loginPassword" required>
                    </div>
                    <button type="submit" class="submit-btn">Login</button>
                    <div class="auth-footer">
                        <a href="#forgot-password" class="forgot-password">Forgot password?</a>
                    </div>
                </form>
                
                <!-- Signup Form -->
                <form id="signupForm" class="auth-form" data-form="signup">
                    <div class="form-group">
                        <label for="signupEmail">Email</label>
                        <input type="email" id="signupEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="signupPassword">Password (min 6 characters)</label>
                        <input type="password" id="signupPassword" minlength="6" required>
                    </div>
                    <div class="form-group">
                        <label for="signupUsername">Username</label>
                        <input type="text" id="signupUsername" required>
                    </div>
                    <button type="submit" class="submit-btn">Create Account</button>
                    <div class="auth-footer">
                        <p>By signing up, you agree to our <a href="#terms">Terms</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
    
    // Add lightbox to body
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Get DOM elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const authLightbox = document.getElementById('authLightbox');
    const closeBtn = document.getElementById('closeAuthLightbox');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    
    // Open lightbox functions
    function openLogin() {
        authLightbox.style.display = 'flex';
        switchTab('login');
    }
    
    function openSignup() {
        authLightbox.style.display = 'flex';
        switchTab('signup');
    }
    
    // Tab switching
    function switchTab(tabName) {
        tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        authForms.forEach(form => {
            form.classList.toggle('active', form.dataset.form === tabName);
        });
    }
    
    // Event listeners
    loginBtn.addEventListener('click', openLogin);
    signupBtn.addEventListener('click', openSignup);
    closeBtn.addEventListener('click', () => {
        authLightbox.style.display = 'none';
    });
    
    // Close lightbox when clicking outside
    authLightbox.addEventListener('click', (e) => {
        if (e.target === authLightbox) {
            authLightbox.style.display = 'none';
        }
    });
    
    // Tab click handlers
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    // Show loading state
    function setLoading(form, isLoading) {
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = isLoading;
        submitBtn.innerHTML = isLoading ? 
            '<span class="loader"></span>' : 
            submitBtn.textContent;
    }

    // Show error message
    function showError(form, message) {
        let errorElement = form.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            form.insertBefore(errorElement, form.firstChild);
        }
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.marginBottom = '1rem';
    }

    // Clear error message
    function clearError(form) {
        const errorElement = form.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Login with Supabase
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('#loginEmail').value;
        const password = form.querySelector('#loginPassword').value;

        clearError(form);
        setLoading(form, true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            // Login successful
            console.log('User logged in:', data);
            authLightbox.style.display = 'none';
            // You might want to redirect or update UI here
            window.location.reload(); // Simple refresh to update auth state
        } catch (error) {
            console.error('Login error:', error.message);
            showError(form, error.message);
        } finally {
            setLoading(form, false);
        }
    });

    // Signup with Supabase
    document.getElementById('signupForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('#signupEmail').value;
        const password = form.querySelector('#signupPassword').value;
        const username = form.querySelector('#signupUsername').value;

        clearError(form);
        setLoading(form, true);

        try {
            // 1. Sign up the user in auth.users table
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username
                    }
                }
            });

            if (authError) throw authError;

            // 2. Create profile in public.profiles table
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: authData.user.id,
                    username,
                    email,
                    role: 'basic'
                });

            if (profileError) throw profileError;

            console.log('User created:', authData);
            alert('Signup successful! Please check your email for confirmation.');
            authLightbox.style.display = 'none';
        } catch (error) {
            console.error('Signup error:', error.message);
            showError(form, error.message);
        } finally {
            setLoading(form, false);
        }
    });

    // Add loader CSS dynamically
    const loaderCSS = `
        .loader {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    
    const style = document.createElement('style');
    style.innerHTML = loaderCSS;
    document.head.appendChild(style);
});