import React from "react";
import "./Styles/Footer.css";

const Footer = () => {
    return (
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-top">
                    <div class="footer-brand">
                        <div class="footer-logo">
                            <div class="logo-icon">🍽️</div>
                            <div class="logo-text">
                                <span class="logo-main">Culinary Evolved</span>
                                <span class="logo-sub">Culinary Marketplace</span>
                            </div>
                        </div>
                        <p class="footer-description">
                            Connecting the culinary world through innovative marketplace solutions. 
                            Empowering businesses and chefs to grow together.
                        </p>
                        <div class="social-links">
                            <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3 class="footer-title">For Businesses</h3>
                            <ul class="footer-links">
                                <li><a href="#">Register Your Business</a></li>
                                <li><a href="#">Bulk Product Listings</a></li>
                                <li><a href="#">Supplier Network</a></li>
                                <li><a href="#">Business Solutions</a></li>
                                <li><a href="#">API Integration</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-section">
                            <h3 class="footer-title">For Chefs</h3>
                            <ul class="footer-links">
                                <li><a href="#">Chef Registration</a></li>
                                <li><a href="#">Profile Management</a></li>
                                <li><a href="#">Chef Community</a></li>
                                <li><a href="#">Professional Resources</a></li>
                                <li><a href="#">Training Programs</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-section">
                            <h3 class="footer-title">Support</h3>
                            <ul class="footer-links">
                                <li><a href="#">Help Center</a></li>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">Live Chat</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Community Forum</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-section">
                            <h3 class="footer-title">Company</h3>
                            <ul class="footer-links">
                                <li><a href="#">About Culinary Evolved</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Press & Media</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Investor Relations</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <div class="footer-bottom-content">
                        <div class="copyright">
                            <p>&copy; 2025 Culinary Evolved. All rights reserved.</p>
                        </div>
                        <div class="footer-legal">
                            <a href="#">Terms of Service</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Cookie Policy</a>
                            <a href="#">Accessibility</a>
                        </div>
                        <div class="footer-back-to-top">
                            <button class="back-to-top-btn" id="backToTop">
                                <i class="fas fa-arrow-up"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;