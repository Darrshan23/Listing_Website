import React from "react";
import "./Styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar" id="navbar">
            <div className="nav-container">
                <div className="nav-brand">
                <a href="#" className="logo">
                    <div className="logo-icon">🍽️</div>
                    <div className="logo-text">
                    <span className="logo-main">Culinary Evolved</span>
                    <span className="logo-sub">Culinary Marketplace</span>
                    </div>
                </a>
                </div>

                <div className="nav-menu" id="navMenu">
                <ul className="nav-links">
                    <li className="nav-item dropdown">
                    <a href="#" className="nav-link">
                        <i className="fas fa-th-large"></i>
                        Browse
                        <i className="fas fa-chevron-down"></i>
                    </a>
                    <div className="dropdown-menu">
                        <a href="#" className="dropdown-item">
                        <i className="fas fa-boxes"></i>
                        Bulk Products
                        </a>
                        <a href="#" className="dropdown-item">
                        <i className="fas fa-utensils"></i>
                        Kitchen Equipment
                        </a>
                        <a href="#" className="dropdown-item">
                        <i className="fas fa-seedling"></i>
                        Organic Ingredients
                        </a>
                    </div>
                    </li>
                    <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i className="fas fa-building"></i>
                        For Businesses
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i className="fas fa-chef-hat"></i>
                        For Chefs
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i className="fas fa-info-circle"></i>
                        About
                    </a>
                    </li>
                </ul>
                </div>

                <div className="nav-actions">
                <div className="auth-buttons">
                    <button className="auth-btn login-btn" id="loginBtn">
                    <i className="fas fa-sign-in-alt"></i>
                    Login
                    </button>
                    <button className="auth-btn signup-btn" id="signupBtn">
                    <i className="fas fa-user-plus"></i>
                    Sign Up
                    </button>
                </div>
                <div className="mobile-menu-toggle" id="mobileToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

