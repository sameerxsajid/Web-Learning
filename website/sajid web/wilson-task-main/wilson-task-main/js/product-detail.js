// Product detail page JavaScript

$(document).ready(function () {
      // Get product ID from URL
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get("id");

      if (productId) {
            loadProductDetail(productId);
      } else {
            $("#product-detail").html(`
            <div class="col-12 text-center py-5">
                <i class="fas fa-exclamation-triangle fa-4x text-warning mb-3"></i>
                <h4>Product not found</h4>
                <p class="text-muted">Please select a valid product.</p>
                <a href="products.html" class="btn btn-primary">Browse Products</a>
            </div>
        `);
      }
});

// Load product detail
function loadProductDetail(productId) {
      const product = getProductById(productId);

      if (!product) {
            $("#product-detail").html(`
            <div class="col-12 text-center py-5">
                <i class="fas fa-exclamation-triangle fa-4x text-warning mb-3"></i>
                <h4>Product not found</h4>
                <p class="text-muted">The requested product could not be found.</p>
                <a href="products.html" class="btn btn-primary">Browse Products</a>
            </div>
        `);
            return;
      }

      let featuresHtml = "";
      product.features.forEach((feature) => {
            featuresHtml += `<li><i class="fas fa-check-circle"></i> ${feature}</li>`;
      });

      const html = `
        <div class="col-lg-6 mb-4">
            <div class="product-image-container text-center">
                <img src="${product.image}" alt="${
            product.name
      }" class="product-detail-image img-fluid" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'product-detail-image bg-light d-flex align-items-center justify-content-center\\'><i class=\\'fas fa-image fa-5x text-muted\\'></i></div>';">
            </div>
        </div>
        <div class="col-lg-6">
            <span class="product-brand-badge mb-2">${product.brand.toUpperCase()}</span>
            <h1 class="display-5 mb-3">${product.name}</h1>
            <p class="text-muted mb-3">${product.category}</p>
            <h3 class="text-primary mb-4">${product.price}</h3>
            
            <div class="mb-4">
                <h4>Summary</h4>
                <p class="lead">${product.summary}</p>
            </div>
            
            <div class="mb-4">
                <h4>Key Features</h4>
                <ul class="feature-list">
                    ${featuresHtml}
                </ul>
            </div>
            
            <div class="mb-4">
                <h4>Detailed Features</h4>
                <p class="text-muted">Download the detailed product specification document for complete information.</p>
                <a href="${
                      product.docFile
                }" class="btn btn-primary download-btn" download>
                    <i class="fas fa-download me-2"></i>Download Product Details (Word Document)
                </a>
            </div>
            
            <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-outline-primary btn-lg add-to-compare-detail" data-product-id="${
                      product.id
                }">
                    <i class="fas fa-balance-scale me-2"></i>Add to Compare
                </button>
                <a href="products.html?brand=${
                      product.brand
                }" class="btn btn-secondary btn-lg">
                    <i class="fas fa-arrow-left me-2"></i>Back to Products
                </a>
            </div>
        </div>
    `;

      $("#product-detail").html(html);

      // Add to compare button handler
      $(".add-to-compare-detail").on("click", function () {
            const productId = $(this).data("product-id");
            addToCompare(productId);
            $(this).html('<i class="fas fa-check me-2"></i>Added to Compare');
            $(this).removeClass("btn-outline-primary").addClass("btn-success");
            setTimeout(() => {
                  window.location.href = "compare.html";
            }, 1000);
      });
}

// Add product to compare
function addToCompare(productId) {
      let compareList = JSON.parse(
            sessionStorage.getItem("compareList") || "[]"
      );
      if (!compareList.includes(productId)) {
            compareList.push(productId);
            sessionStorage.setItem("compareList", JSON.stringify(compareList));
      }
}
