import { products } from './data.js';

const domElements = {
    productsContainer: document.querySelector('.products-container'),
    cartBtn: document.querySelector('.cart-btn'),
    viewModal: document.querySelector('.view-modal'),
};

const addElementsToDomElements = (domElements) => {
    domElements['addedToCartButtons'] = document.querySelectorAll('.btn--add');
    domElements['viewProductButtons'] = document.querySelectorAll('.btn--view');
}

const renderProducts = (products, domElements) => {
    let productsHtml = '';
    products.forEach(product => {
        productsHtml += `
            <div class="product-card" data-id=${product.id}>
            <div class="product--img">
                <img src="${product.image}" alt="${product.name}">
            </div>
           <div class="product--box">
           <div class="product--info flex">
           <h3>${product.name}</h3>
           <p>$${product.price}</p>
        </div>
        <div class="product--button flex">
            <button class="btn btn--add">Add to cart</button>
            <button class="btn btn--view">View</button>
        </div>
        </div>
            </div>  
        `;
    });
    domElements.productsContainer.innerHTML = productsHtml;

    addElementsToDomElements(domElements);
}
renderProducts(products, domElements);

const handleAddToCart = (btnElement, products, productId) => {
    btnElement.classList.add('active');
    btnElement.innerText = "Remove from cart"
    products[productId].addedToCart = true
}
const handleRemoveFromCart = (btnElement, products, productId) => {
    btnElement.classList.remove('active');
    btnElement.innerText = "Add to cart"
    products[productId].addedToCart = false
}

const addEventListenerForAddToCartBtns = (addedToCartButtons, products) => {
    addedToCartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const productId = productCard.dataset.id;
            if (btn.classList.contains('active')) {
                handleRemoveFromCart(btn, products, productId)
            } else {
                handleAddToCart(btn, products, productId)
            }
        });
    });
}
addEventListenerForAddToCartBtns(domElements.addedToCartButtons, products);

const addEventListenerForViewProductBtns = (viewProductButtons, viewModal, products) => {
    viewProductButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const productId = productCard.dataset.id;

            renderProductModal(products[productId], viewModal);
        });
    });
}

addEventListenerForViewProductBtns(domElements.viewProductButtons, domElements.viewModal, products);

