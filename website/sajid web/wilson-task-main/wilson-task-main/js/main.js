// Main JavaScript file for Wilson Sporting Goods

// Product data
const productsData = [
    {
        id: 1,
        name: "Reebok Football Pro",
        brand: "reebok",
        category: "Football",
        price: "$89.99",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500",
        summary: "Professional-grade football with premium leather construction. Perfect for training and matches.",
        features: ["Premium leather", "Hand-stitched", "FIFA approved", "Water resistant"],
        docFile: "assets/docs/reebok-football-pro.docx"
    },
    {
        id: 2,
        name: "Reebok Tennis Racket Elite",
        brand: "reebok",
        category: "Tennis",
        price: "$149.99",
        image: "https://images.unsplash.com/photo-1622163642999-9586bc3c8410?w=500",
        summary: "Lightweight carbon fiber tennis racket with advanced string technology for maximum control.",
        features: ["Carbon fiber frame", "Advanced string pattern", "Lightweight design", "Professional grip"],
        docFile: "assets/docs/reebok-tennis-racket-elite.docx"
    },
    {
        id: 3,
        name: "Nike Basketball Pro",
        brand: "nike",
        category: "Basketball",
        price: "$79.99",
        image: "https://images.unsplash.com/photo-1546519638-70e05990e0e8?w=500",
        summary: "Official size basketball with composite leather for superior grip and durability.",
        features: ["Composite leather", "Deep channel design", "Indoor/Outdoor", "Official size"],
        docFile: "assets/docs/nike-basketball-pro.docx"
    },
    {
        id: 4,
        name: "Nike Running Shoes Air",
        brand: "nike",
        category: "Footwear",
        price: "$129.99",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        summary: "Comfortable running shoes with air cushioning technology for maximum comfort.",
        features: ["Air cushioning", "Breathable mesh", "Lightweight", "Durable sole"],
        docFile: "assets/docs/nike-running-shoes-air.docx"
    },
    {
        id: 5,
        name: "Adidas Football Jersey",
        brand: "adidas",
        category: "Apparel",
        price: "$59.99",
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c39?w=500",
        summary: "Professional football jersey with moisture-wicking technology and team design.",
        features: ["Moisture-wicking", "Breathable fabric", "Team design", "Durable"],
        docFile: "assets/docs/adidas-football-jersey.docx"
    },
    {
        id: 6,
        name: "Adidas Tennis Shoes",
        brand: "adidas",
        category: "Footwear",
        price: "$119.99",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
        summary: "High-performance tennis shoes with excellent court grip and lateral support.",
        features: ["Court grip sole", "Lateral support", "Cushioned midsole", "Lightweight"],
        docFile: "assets/docs/adidas-tennis-shoes.docx"
    },
    {
        id: 7,
        name: "Puma Training Shoes",
        brand: "puma",
        category: "Footwear",
        price: "$99.99",
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500",
        summary: "Versatile training shoes suitable for gym workouts and cross-training activities.",
        features: ["Multi-purpose design", "Flexible sole", "Breathable upper", "Shock absorption"],
        docFile: "assets/docs/puma-training-shoes.docx"
    },
    {
        id: 8,
        name: "Puma Sports Bag",
        brand: "puma",
        category: "Accessories",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        summary: "Spacious sports bag with multiple compartments for organized storage.",
        features: ["Multiple compartments", "Water resistant", "Adjustable straps", "Durable material"],
        docFile: "assets/docs/puma-sports-bag.docx"
    },
    {
        id: 9,
        name: "Reebok Gym Gloves",
        brand: "reebok",
        category: "Accessories",
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
        summary: "Protective gym gloves with enhanced grip for weightlifting and training.",
        features: ["Enhanced grip", "Protective padding", "Breathable material", "Adjustable wrist strap"],
        docFile: "assets/docs/reebok-gym-gloves.docx"
    },
    {
        id: 10,
        name: "Nike Soccer Cleats",
        brand: "nike",
        category: "Footwear",
        price: "$139.99",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500",
        summary: "Professional soccer cleats with stud configuration for optimal traction on grass.",
        features: ["Firm ground studs", "Lightweight design", "Lockdown fit", "Durable construction"],
        docFile: "assets/docs/nike-soccer-cleats.docx"
    }
];

// Initialize on page load
$(document).ready(function() {
    // Load featured products on home page
    if ($('#featured-products').length) {
        loadFeaturedProducts();
    }
    
    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });
});

// Load featured products
function loadFeaturedProducts() {
    const featured = productsData.slice(0, 6);
    let html = '';
    
    featured.forEach(product => {
        html += `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card product-card h-100 shadow-sm">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-image\\'></i>';">
                    </div>
                    <div class="card-body">
                        <span class="product-brand-badge mb-2">${product.brand.toUpperCase()}</span>
                        <h5 class="card-title mb-2">${product.name}</h5>
                        <p class="text-muted small mb-2">
                            <i class="fas fa-tag me-1"></i>${product.category}
                        </p>
                        <p class="card-text mb-3 flex-grow-1">${product.summary}</p>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-primary fw-bold fs-4">${product.price}</span>
                        </div>
                        <div class="d-grid gap-2 mt-auto">
                            <a href="product-detail.html?id=${product.id}" class="btn btn-primary">
                                <i class="fas fa-eye me-2"></i>View Details
                            </a>
                            <button class="btn btn-outline-secondary btn-sm add-to-compare-featured" data-product-id="${product.id}">
                                <i class="fas fa-balance-scale me-1"></i> Add to Compare
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    $('#featured-products').html(html);
    
    // Add to compare button handler for featured products
    $('.add-to-compare-featured').on('click', function() {
        const productId = $(this).data('product-id');
        addToCompare(productId);
        $(this).html('<i class="fas fa-check me-1"></i> Added');
        $(this).removeClass('btn-outline-secondary').addClass('btn-success');
        setTimeout(() => {
            $(this).html('<i class="fas fa-balance-scale me-1"></i> Add to Compare');
            $(this).removeClass('btn-success').addClass('btn-outline-secondary');
        }, 2000);
    });
}

// Get product by ID
function getProductById(id) {
    return productsData.find(p => p.id === parseInt(id));
}

// Get products by brand
function getProductsByBrand(brand) {
    if (brand === 'all') {
        return productsData;
    }
    return productsData.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
}

// Add product to compare (store in sessionStorage)
function addToCompare(productId) {
    let compareList = JSON.parse(sessionStorage.getItem('compareList') || '[]');
    if (!compareList.includes(productId)) {
        compareList.push(productId);
        sessionStorage.setItem('compareList', JSON.stringify(compareList));
    }
}

