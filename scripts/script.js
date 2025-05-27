// DOM Elements
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const tagScrollLeft = document.getElementById('tagScrollLeft');
const tagScrollRight = document.getElementById('tagScrollRight');
const tagsScroll = document.getElementById('tagsScroll');
const listingsGrid = document.getElementById('listingsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const backToTop = document.getElementById('backToTop');
const viewButtons = document.querySelectorAll('.view-btn');
const filterButtons = document.querySelectorAll('.filter-btn');

// Sample data for search suggestions
const suggestions = [
    "Organic Garlic",
    "Kitchen Knives",
    "Professional Chef",
    "Bulk Spices",
    "Catering Services",
    "Commercial Oven",
    "Fresh Vegetables",
    "Vegan Ingredients"
];

// Sample data for listings
const listingsData = [
    {
        type: "product",
        title: "Stainless Steel Cookware Set",
        description: "Professional-grade cookware set for commercial kitchens",
        price: 299.99,
        originalPrice: 349.99,
        rating: 4.7,
        location: "New York, USA",
        shipping: "Free Shipping",
        category: "equipment"
    },
    {
        type: "chef",
        name: "Chef Isabella",
        specialty: "French Cuisine",
        rating: 4.9,
        experience: "12+ years",
        events: "300+",
        rate: "$200/hour",
        skills: ["French", "Pastry", "Fine Dining"],
        category: "chefs"
    },
    {
        type: "service",
        title: "Event Catering Package",
        description: "Full-service catering for weddings and corporate events",
        price: 2500,
        originalPrice: 3000,
        rating: 4.8,
        location: "Los Angeles, USA",
        category: "services"
    }
];

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Search Suggestions
searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    if (value.length > 0) {
        searchSuggestions.innerHTML = '';
        const filtered = suggestions.filter(item => 
            item.toLowerCase().includes(value)
        );
        
        if (filtered.length > 0) {
            searchSuggestions.style.display = 'block';
            filtered.forEach(item => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = item;
                div.addEventListener('click', () => {
                    searchInput.value = item;
                    searchSuggestions.style.display = 'none';
                });
                searchSuggestions.appendChild(div);
            });
        } else {
            searchSuggestions.style.display = 'none';
        }
    } else {
        searchSuggestions.style.display = 'none';
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (e.target !== searchInput) {
        searchSuggestions.style.display = 'none';
    }
});

// Tags Scroll
tagScrollLeft.addEventListener('click', () => {
    tagsScroll.scrollBy({
        left: -200,
        behavior: 'smooth'
    });
});

tagScrollRight.addEventListener('click', () => {
    tagsScroll.scrollBy({
        left: 200,
        behavior: 'smooth'
    });
});

// View Toggle
viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        if (button.dataset.view === 'grid') {
            listingsGrid.classList.remove('list-view');
        } else {
            listingsGrid.classList.add('list-view');
        }
    });
});

// Filter Listings
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        const listings = document.querySelectorAll('.listing-card');
        
        listings.forEach(listing => {
            if (filter === 'all' || listing.dataset.category === filter) {
                listing.style.display = 'block';
            } else {
                listing.style.display = 'none';
            }
        });
    });
});

// Load More Listings
loadMoreBtn.addEventListener('click', () => {
    // In a real app, this would fetch more data from an API
    // For demo, we'll just duplicate existing listings
    const listings = document.querySelectorAll('.listing-card');
    listings.forEach(listing => {
        const clone = listing.cloneNode(true);
        listingsGrid.appendChild(clone);
    });
    
    // Hide button after 3 clicks for demo purposes
    let clicks = loadMoreBtn.dataset.clicks || 0;
    clicks++;
    loadMoreBtn.dataset.clicks = clicks;
    
    if (clicks >= 3) {
        loadMoreBtn.style.display = 'none';
    }
});

// Back to Top Button
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

// Initialize listings
function initListings() {
    // In a real app, this would fetch data from an API
    // For demo, we're using sample data
    listingsData.forEach(item => {
        if (item.type === 'product') {
            const listing = document.createElement('div');
            listing.className = 'listing-card';
            listing.dataset.category = item.category;
            listing.innerHTML = `
                <div class="listing-image">
                    <div class="image-placeholder">🍳</div>
                    <div class="listing-badge verified">Verified</div>
                    <div class="listing-actions">
                        <button class="action-btn favorite">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="action-btn share">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="listing-content">
                    <div class="listing-header">
                        <h3 class="listing-title">${item.title}</h3>
                        <div class="listing-rating">
                            <div class="stars">
                                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(item.rating))}
                                ${item.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            </div>
                            <span class="rating-text">(${item.rating})</span>
                        </div>
                    </div>
                    <p class="listing-description">${item.description}</p>
                    <div class="listing-details">
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${item.location}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-truck"></i>
                            <span>${item.shipping}</span>
                        </div>
                    </div>
                    <div class="listing-footer">
                        <div class="price-group">
                            <span class="current-price">$${item.price.toFixed(2)}</span>
                            <span class="original-price">$${item.originalPrice.toFixed(2)}</span>
                            <span class="discount">-${Math.round((1 - item.price / item.originalPrice) * 100)}%</span>
                        </div>
                        <button class="contact-btn">Contact Supplier</button>
                    </div>
                </div>
            `;
            listingsGrid.appendChild(listing);
        } else if (item.type === 'chef') {
            const listing = document.createElement('div');
            listing.className = 'listing-card chef-card';
            listing.dataset.category = item.category;
            listing.innerHTML = `
                <div class="chef-header">
                    <div class="chef-avatar-section">
                        <div class="chef-avatar-large">👩‍🍳</div>
                        <div class="chef-status online"></div>
                    </div>
                    <div class="chef-actions">
                        <button class="action-btn favorite">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="action-btn message">
                            <i class="fas fa-comment"></i>
                        </button>
                    </div>
                </div>
                <div class="chef-content">
                    <div class="chef-info">
                        <h3 class="chef-name">${item.name}</h3>
                        <p class="chef-specialty">${item.specialty}</p>
                        <div class="chef-rating">
                            <div class="stars">
                                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(item.rating))}
                                ${item.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            </div>
                            <span class="rating-text">(${item.rating}) • 127 reviews</span>
                        </div>
                    </div>
                    <div class="chef-stats">
                        <div class="stat">
                            <span class="stat-number">${item.experience}</span>
                            <span class="stat-label">Years Exp.</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${item.events}</span>
                            <span class="stat-label">Events</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">98%</span>
                            <span class="stat-label">Success Rate</span>
                        </div>
                    </div>
                    <div class="chef-skills">
                        ${item.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                    <div class="chef-footer">
                        <div class="chef-price">
                            <span class="price">${item.rate}</span>
                        </div>
                        <button class="hire-btn">Hire Chef</button>
                    </div>
                </div>
            `;
            listingsGrid.appendChild(listing);
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initListings();
    
    // Add click event to all listing cards
    document.querySelectorAll('.listing-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't navigate if clicking on buttons or links
            if (!e.target.closest('.action-btn, .contact-btn, .hire-btn')) {
                // In a real app, this would navigate to the listing detail page
                console.log('Navigating to listing detail');
            }
        });
    });
});