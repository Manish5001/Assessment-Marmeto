document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
    const productGrid = document.getElementById('product-grid');
    const tabs = document.querySelectorAll('.tab');
  
    // Fetch product data from API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // console.log('Fetched data:', data); // Log data to understand its structure
        const categories = data.categories;
  
        // Get products of the first category (e.g., 'Men')
        const initialCategory = 'Men';
        const initialProducts = getProductsByCategory(categories, initialCategory);
        displayProducts(initialProducts);
  
        tabs.forEach(tab => {
          tab.addEventListener('click', () => {
            tabs.forEach(tab => tab.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.getAttribute('data-category');
            const categoryProducts = getProductsByCategory(categories, category);
            displayProducts(categoryProducts);
          });
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  
    function getProductsByCategory(categories, categoryName) {
      const category = categories.find(cat => cat.category_name === categoryName);
      return category ? category.category_products : [];
    }
  
    function displayProducts(products) {
      productGrid.innerHTML = '';
      products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
  
        const badge = document.createElement('div');
        badge.classList.add('badge');
        badge.textContent = product.badge_text;
  
        const img = document.createElement('img');
        img.classList.add('card-img');
        img.src = product.image;
        img.alt = product.title;

        const divForHeading = document.createElement('div');
        divForHeading.classList.add('divForHeading');
  
        const title = document.createElement('span');
        title.classList.add('card-title');
        title.textContent = product.title;
  
        const vendor = document.createElement('span');
        vendor.classList.add('card-vendor');
        vendor.textContent = product.vendor;

        divForHeading.appendChild(title);
        divForHeading.appendChild(vendor);
  
        const price = document.createElement('p');
        price.classList.add('card-price');
        const originalPrice = document.createElement('span');
        originalPrice.classList.add('original-price');
        originalPrice.textContent = `Rs ${product.compare_at_price}`;
        const discount = calculateDiscount(product.price, product.compare_at_price);
        price.innerHTML = `Rs ${product.price} <span class="original-price">Rs ${product.compare_at_price}</span> ${discount}% Off`;
  
        const button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = 'Add to Cart';
  
        if(product.badge_text !== null) {
          card.appendChild(badge); 
        }
        card.appendChild(img);
        // card.appendChild(title);
        // card.appendChild(vendor);
        card.appendChild(divForHeading);
        card.appendChild(price);
        card.appendChild(button);
  
        productGrid.appendChild(card);
      });
    }
  
    function calculateDiscount(price, compareAtPrice) {
      const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
      return Math.round(discount);
    }
  });
  