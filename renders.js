export const renderProductCard = (product) => {
    return `<div class="product-card" data-id=${product.id}>
           <div class="product--img">
             <img src="${product.image}" alt="${product.name}"/>
           </div>
         <div class="product--box">
            <div class="product--info flex">
              <h3>${product.name}</h3>
              <p>$${product.price}</p>
         </div>
         <div class="product--button flex">
              <button class="btn btn--add">
              ${product.addedToCart ? "Remove from cart" : "Add to cart"}
              </button>
         <button class="btn btn--view">View</button>
          </div>
           </div>
        </div>`;
}

export const renderViewModal = (product) => {
    return `
    <img src="${product.image}" alt="${product.name}"/>

<div class="product--info">
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
</div>
<div class="product--button">
    <button class="btn btn--add">
        ${product.addedToCart ? "Remove from cart" : "Add to cart"}
    </button>
</div>
`;
}

export const renderCartItem = (cartItem) => {
    return `<div class="cart-item flex" data-id=${cartItem.id}>
    <div class="cart-item--img">
        <img src="${cartItem.image}" alt="${cartItem.name}"/>
    </div>
    <div class="cart-item--info">
        <h3>${cartItem.name}</h3>
        <p>$${cartItem.price}</p>
    </div>
</div>`;
}