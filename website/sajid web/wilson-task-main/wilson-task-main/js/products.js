// Products page JavaScript

$(document).ready(function() {
    // Get brand from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand');
    
    // Load all products initially
    loadProducts(brandParam || 'all');
    
    // Set active brand filter
    if (brandParam) {
        $('.brand-filter').removeClass('active');
        $(`.brand-filter[data-brand="${brandParam}"]`).addClass('active');
    } else {
        $('.brand-filter[data-brand="all"]').addClass('active');
    }
    
    // Brand filter click handler
    $('.brand-filter').on('click', function() {
        const brand = $(this).data('brand');
        
        // Update active state
        $('.brand-filter').removeClass('active');
        $(this).addClass('active');
        
        // Load products
        loadProducts(brand);
        
        // Update URL without reload
        if (brand === 'all') {
            window.history.pushState({}, '', 'products.html');
        } else {
            window.history.pushState({}, '', `products.html?brand=${brand}`);
        }
    });
});

// Load products based on brand filter
function loadProducts(brand) {
    const products = getProductsByBrand(brand);
    let html = '';
    
    if (products.length === 0) {
        html = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-inbox fa-4x text-muted mb-3"></i>
                <h4 class="text-muted">No products found</h4>
                <p class="text-muted">Try selecting a different brand.</p>
            </div>
        `;
    } else {
        products.forEach(product => {
            html += `
                <div class="col-md-4 col-sm-6 mb-4 fade-in">
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
                                <button class="btn btn-outline-secondary btn-sm add-to-compare" data-product-id="${product.id}">
                                    <i class="fas fa-balance-scale me-1"></i> Add to Compare
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    $('#products-grid').html(html);
    
    // Add to compare button handler
    $('.add-to-compare').on('click', function() {
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

// Add product to compare (store in sessionStorage)
function addToCompare(productId) {
    let compareList = JSON.parse(sessionStorage.getItem('compareList') || '[]');
    if (!compareList.includes(productId)) {
        compareList.push(productId);
        sessionStorage.setItem('compareList', JSON.stringify(compareList));
    }
}

