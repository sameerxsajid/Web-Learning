// Product comparison page JavaScript

$(document).ready(function() {
    loadProductOptions();
    
    // Compare button handler
    $('#compare-btn').on('click', function() {
        const product1Id = $('#product1').val();
        const product2Id = $('#product2').val();
        
        if (!product1Id || !product2Id) {
            showAlert('Please select both products to compare.', 'warning');
            return;
        }
        
        if (product1Id === product2Id) {
            showAlert('Please select two different products to compare.', 'info');
            return;
        }
        
        compareProducts(product1Id, product2Id);
    });
    
    // Clear button handler
    $('#clear-btn').on('click', function() {
        $('#product1').val('');
        $('#product2').val('');
        $('#comparison-result').html(`
            <div class="text-center py-5 fade-in">
                <i class="fas fa-balance-scale fa-4x text-muted mb-3"></i>
                <h4 class="text-muted">No Comparison Yet</h4>
                <p class="text-muted">Select two products above and click "Compare Products" to see a detailed comparison.</p>
            </div>
        `);
    });
    
    // Load products from sessionStorage if available
    loadFromCompareList();
});

// Load product options in dropdowns
function loadProductOptions() {
    let html1 = '<option value="">Choose a product...</option>';
    let html2 = '<option value="">Choose a product...</option>';
    
    productsData.forEach(product => {
        const option = `<option value="${product.id}">${product.brand.toUpperCase()} - ${product.name}</option>`;
        html1 += option;
        html2 += option;
    });
    
    $('#product1').html(html1);
    $('#product2').html(html2);
}

// Compare two products
function compareProducts(product1Id, product2Id) {
    const product1 = getProductById(product1Id);
    const product2 = getProductById(product2Id);
    
    if (!product1 || !product2) {
        $('#comparison-result').html(`
            <div class="alert alert-danger alert-dismissible fade show shadow-sm" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                <strong>Error:</strong> One or both products could not be found.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
        return;
    }
    
    // Create comparison table
    let featuresHtml1 = '';
    let featuresHtml2 = '';
    
    product1.features.forEach(feature => {
        featuresHtml1 += `<li><i class="fas fa-check-circle text-success me-2"></i>${feature}</li>`;
    });
    
    product2.features.forEach(feature => {
        featuresHtml2 += `<li><i class="fas fa-check-circle text-success me-2"></i>${feature}</li>`;
    });
    
    const html = `
        <div class="text-center mb-4">
            <h2 class="display-5 fw-bold">
                <i class="fas fa-balance-scale text-primary me-2"></i>Product Comparison
            </h2>
            <p class="text-muted">Side-by-side comparison of selected products</p>
        </div>
        <div class="row g-4 mb-4">
            <!-- Product 1 Card -->
            <div class="col-lg-6">
                <div class="card h-100 shadow-sm border-0 product-comparison-card">
                    <div class="card-header bg-primary text-white text-center py-4">
                        <div class="product-image-wrapper mb-3">
                            <img src="${product1.image}" alt="${product1.name}" class="img-fluid rounded" style="max-height: 200px; width: auto;" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-image fa-5x\\'></i>';">
                        </div>
                        <h4 class="mb-2">${product1.name}</h4>
                        <span class="badge bg-light text-dark mb-2">${product1.brand.toUpperCase()}</span>
                        <h3 class="mb-0">${product1.price}</h3>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <h6 class="text-muted mb-2">
                                <i class="fas fa-folder text-primary me-2"></i>Category
                            </h6>
                            <p class="mb-0">${product1.category}</p>
                        </div>
                        <div class="mb-3">
                            <h6 class="text-muted mb-2">
                                <i class="fas fa-info-circle text-primary me-2"></i>Summary
                            </h6>
                            <p class="mb-0">${product1.summary}</p>
                        </div>
                        <div class="mb-3">
                            <h6 class="text-muted mb-2">
                                <i class="fas fa-star text-primary me-2"></i>Key Features
                            </h6>
                            <ul class="list-unstyled mb-0">
                                ${featuresHtml1}
                            </ul>
                        </div>
                        <div class="d-grid gap-2">
                            <a href="${product1.docFile}" class="btn btn-outline-primary" download>
                                <i class="fas fa-download me-2"></i>Download Details
                            </a>
                            <a href="product-detail.html?id=${product1.id}" class="btn btn-primary">
                                <i class="fas fa-eye me-2"></i>View Full Details
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Product 2 Card -->
            <div class="col-lg-6">
                <div class="card h-100 shadow-sm border-0 product-comparison-card">
                    <div class="card-header bg-info text-white text-center py-4">
                        <div class="product-image-wrapper mb-3">
                            <img src="${product2.image}" alt="${product2.name}" class="img-fluid rounded" style="max-height: 200px; width: auto;" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-image fa-5x\\'></i>';">
                        </div>
                        <h4 class="mb-2">${product2.name}</h4>
                        <span class="badge bg-light text-dark mb-2">${product2.brand.toUpperCase()}</span>
                        <h3 class="mb-0">${product2.price}</h3>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <h6 class="text-muted mb-2">
                                <i class="fas fa-folder text-info me-2"></i>Category
                            </h6>
                            <p class="mb-0">${product2.category}</p>
                        </div>
                        <div class="mb-3">
                            <h6 class="text-muted mb-2">
                                <i class="fas fa-info-circle text-info me-2"></i>Summary
                            </h6>
                            <p class="mb-0">${product2.summary}</p>
                        </div>
                        <div class="mb-3">
                            <h6 class="text-muted mb-2">
                                <i class="fas fa-star text-info me-2"></i>Key Features
                            </h6>
                            <ul class="list-unstyled mb-0">
                                ${featuresHtml2}
                            </ul>
                        </div>
                        <div class="d-grid gap-2">
                            <a href="${product2.docFile}" class="btn btn-outline-info" download>
                                <i class="fas fa-download me-2"></i>Download Details
                            </a>
                            <a href="product-detail.html?id=${product2.id}" class="btn btn-info text-white">
                                <i class="fas fa-eye me-2"></i>View Full Details
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Side-by-Side Comparison Table -->
        <div class="card shadow-sm border-0">
            <div class="card-header bg-light">
                <h5 class="mb-0">
                    <i class="fas fa-table text-primary me-2"></i>Detailed Comparison
                </h5>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th style="width: 25%;" class="align-middle">
                                    <i class="fas fa-list text-primary me-2"></i>Feature
                                </th>
                                <th style="width: 37.5%;" class="text-center align-middle">
                                    <strong>${product1.name}</strong>
                                </th>
                                <th style="width: 37.5%;" class="text-center align-middle">
                                    <strong>${product2.name}</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="fw-semibold">
                                    <i class="fas fa-folder text-muted me-2"></i>Category
                                </td>
                                <td class="text-center">${product1.category}</td>
                                <td class="text-center">${product2.category}</td>
                            </tr>
                            <tr>
                                <td class="fw-semibold">
                                    <i class="fas fa-info-circle text-muted me-2"></i>Summary
                                </td>
                                <td>${product1.summary}</td>
                                <td>${product2.summary}</td>
                            </tr>
                            <tr>
                                <td class="fw-semibold">
                                    <i class="fas fa-star text-muted me-2"></i>Key Features
                                </td>
                                <td>
                                    <ul class="list-unstyled mb-0">
                                        ${featuresHtml1}
                                    </ul>
                                </td>
                                <td>
                                    <ul class="list-unstyled mb-0">
                                        ${featuresHtml2}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    $('#comparison-result').html(html).addClass('fade-in');
    
    // Scroll to comparison result
    $('html, body').animate({
        scrollTop: $('#comparison-result').offset().top - 100
    }, 500);
}

// Load products from compare list in sessionStorage
function loadFromCompareList() {
    const compareList = JSON.parse(sessionStorage.getItem('compareList') || '[]');
    
    if (compareList.length >= 1) {
        $('#product1').val(compareList[0]);
    }
    
    if (compareList.length >= 2) {
        $('#product2').val(compareList[1]);
        // Auto-compare if both are selected
        setTimeout(() => {
            $('#compare-btn').click();
        }, 500);
    }
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertClass = type === 'warning' ? 'alert-warning' : type === 'danger' ? 'alert-danger' : 'alert-info';
    const icon = type === 'warning' ? 'exclamation-triangle' : type === 'danger' ? 'times-circle' : 'info-circle';
    
    const alertHtml = `
        <div class="alert ${alertClass} alert-dismissible fade show shadow-sm" role="alert">
            <i class="fas fa-${icon} me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    // Remove existing alerts and add new one
    $('#comparison-result').html(alertHtml);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        $('.alert').alert('close');
    }, 5000);
}

