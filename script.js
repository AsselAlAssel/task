import { productsData } from './data.js';
import { renderProductCard, renderViewModal, renderCartItem } from './renders.js';

const domElements = {
    productsContainer: document.querySelector('.products-container'),
    CartBtnContainer: document.querySelector('.nav--cartBtn'),
    cartBtn: document.querySelector('.cart-btn'),
    cartList: document.querySelector('.cart-list.nav--cartList'),
    cartListBody: document.querySelector('.cart-list--body .cart-list--items'),
    cartCloseBtn: document.querySelector('.cart-list--closeBtn'),
    modal: document.querySelector('.modal'),
    viewModalBody: document.querySelector('.view-modal--body'),
    viewModalCloseBtn: document.querySelector('.view-modal--closeBtn'),
    cartListTotal: document.querySelector('.cart-list--totalPrice'),
};

const getCartListItems = () => {
    const cartListItems = JSON.parse(localStorage.getItem('cartList'));
    return cartListItems || [];
}

const changeAddedToCartPropertyToProducts = (products, cartListItems) => {
    return products.map(product => {
        const isAddedToCart = cartListItems.some(item => item.id === product.id);
        return { ...product, addedToCart: isAddedToCart };
    })
}

const changeNumberOfProductsInCart = (cartListItems, CartBtnContainer) => {
    if (cartListItems.length > 0) {
        CartBtnContainer.setAttribute('data-count', cartListItems.length);
        CartBtnContainer.classList.add('active');
    } else {
        CartBtnContainer.removeAttribute('data-count');
        CartBtnContainer.classList.remove('active');
    }
}

const addElementsToDomElements = (domElements) => {
    domElements['addedToCartButtons'] = document.querySelectorAll('.btn--add');
    domElements['viewProductButtons'] = document.querySelectorAll('.btn--view');
}

const renderAllProducts = (products, domElements) => {
    let htmlCode = products.map(product => renderProductCard(product)).join('');
    domElements.productsContainer.innerHTML = htmlCode;
    addElementsToDomElements(domElements);

}

const saveCartListItems = () => {
    localStorage.setItem('cartList', JSON.stringify(cartListItems));
}
const functionsToDoAfterCartListItemsChange = () => {
    renderCartListItems(cartListItems, domElements.cartListBody, domElements.cartListTotal);
    saveCartListItems();
    changeNumberOfProductsInCart(cartListItems, domElements.CartBtnContainer);
}

const handleAddToCart = (btnElement, product) => {
    btnElement.innerText = "Remove from cart"
    product.addedToCart = true
    cartListItems.push(product);
    functionsToDoAfterCartListItemsChange();


}

const handleRemoveFromCart = (btnElement, product) => {
    btnElement.innerText = "Add to cart"
    product.addedToCart = false
    cartListItems = cartListItems.filter(item => item.id !== product.id)
    functionsToDoAfterCartListItemsChange();

}

const handleAddToCartBtnRemoveFromCartBtnClick = (btn, product) => {
    if (product.addedToCart) {
        handleRemoveFromCart(btn, product)
    } else {
        handleAddToCart(btn, product)
    }
}

const addEventListenerForAddToCartBtns = (addedToCartButtons, products) => {
    addedToCartButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => handleAddToCartBtnRemoveFromCartBtnClick(btn, products[index]));
    });
}

const handleViewProduct = (viewModal, viewModalBody, product) => {
    viewModalBody.innerHTML = renderViewModal(product);
    viewModal.classList.add('active');
    const viewModalAddToCartBtn = viewModal.querySelector('.btn--add');
    const productCardAddToCartBtn = document.querySelector(`.product-card[data-id="${product.id}"] .btn--add`);
    viewModalAddToCartBtn.addEventListener('click', () => {
        handleAddToCartBtnRemoveFromCartBtnClick(viewModalAddToCartBtn, product);
        productCardAddToCartBtn.innerText = viewModalAddToCartBtn.innerText;
    }
    );
}

const addEventListenerForViewProductBtns = (viewModal, viewModalBody, viewProductButtons, products) => {
    viewProductButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => handleViewProduct(viewModal, viewModalBody, products[index]));
    });
}

const renderCartListItems = (cartListItems, cartListContainer, cartListTotal) => {
    let totalPrice = 0;
    const cartListItemsHtmlCode = cartListItems.map(item => {
        totalPrice += item.price;
        return renderCartItem(item);
    }).join('');
    cartListContainer.innerHTML = cartListItemsHtmlCode;
    cartListTotal.innerText = "$" + totalPrice;
}

let cartListItems = getCartListItems();
const productsItem = changeAddedToCartPropertyToProducts(productsData, cartListItems)

renderAllProducts(productsItem, domElements);
changeNumberOfProductsInCart(cartListItems, domElements.CartBtnContainer);
addEventListenerForAddToCartBtns(domElements.addedToCartButtons, productsItem);
addEventListenerForViewProductBtns(domElements.modal, domElements.viewModalBody, domElements.viewProductButtons, productsItem);

domElements.cartBtn.addEventListener('click', () => {
    renderCartListItems(cartListItems, domElements.cartListBody, domElements.cartListTotal)
    domElements.cartList.classList.add('active');
});

domElements.cartCloseBtn.addEventListener('click', () => {
    domElements.cartList.classList.remove('active');
});

domElements.viewModalCloseBtn.addEventListener('click', () => {
    domElements.modal.classList.remove('active');
});
window.addEventListener('click', (e) => {
    if (e.target === domElements.modal) {
        domElements.modal.classList.remove('active');
    }
});