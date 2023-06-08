const burger = document.querySelector('.burger'),
      menu = document.querySelector('.menu'),
      close = document.querySelector('.close');

burger.addEventListener('click', () => { menu.classList.toggle('block') })
close.addEventListener('click', () => { menu.classList.toggle('block') })

const product = document.querySelectorAll('.product'),
    products = document.querySelectorAll('.product img'),
      selected_product = document.querySelector('#product-selected');

let pr_img_src = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg',
]

product.forEach((pr)=> {
    pr.addEventListener('click', (e) => {
        let select = e.target.id,
            srcIndex = 0,
            pr_preview = e.target;
        if(select == 'pr-1') { srcIndex = 0; }
        else if(select == 'pr-2') { srcIndex = 1; }
        else if(select == 'pr-3') { srcIndex = 2; }
        else if(select == 'pr-4') { srcIndex = 3; }
        selected_product.src = `${pr_img_src[srcIndex]}`;

        removeCurrentProductPreview();
        pr_preview.classList.toggle('current-product-seclected');
    })
})


function removeCurrentProductPreview() {
    products.forEach(p => {
        p.classList.remove('current-product-seclected')
    })
}

// QUNTITY

const quantity_btn = document.querySelector('.quantity'),
      quantity_number_display = document.getElementById('quantity-number')
let currentQuantityNumebr = 0,
    totalQunatity = currentQuantityNumebr;

quantity_btn.addEventListener('click', (e) => {
    const operator = e.target.id;
    if((operator === 'minus' || operator === 'minus-img') && currentQuantityNumebr > 0) {
        currentQuantityNumebr--;
    } else if(operator === 'plus' || operator === 'plus-img') {
        currentQuantityNumebr++;
    }

    quantity_number_display.innerHTML = `${currentQuantityNumebr}`;
})


// CART MODAL

const cart_notif = document.getElementById('cart'),
      cart_modal = document.querySelector('.cart-modal');

cart_notif.addEventListener('click', () => {
    cart_modal.classList.toggle('flex');
})

// LIGHBOX
const lightbox = document.querySelector('.product-lightbox'),
      lb_overlay = document.querySelector('.lighbox-overlay'),
      close_box = document.querySelector('.close-box'),
      previous = document.querySelector('.previous'),
      next = document.querySelector('.next'),
      current_product_img = document.querySelector('.current-product-img img'),
      lb_preview = document.querySelectorAll('.lighbox-img-preview img');
let lighboxIndex = 0;


selected_product.addEventListener('click', () => {
    lightbox.classList.toggle('flex');
    lb_overlay.classList.toggle('block')
})

close_box.addEventListener('click', () => {
    lightbox.classList.toggle('flex');
    lb_overlay.classList.toggle('block')
})

previous.addEventListener('click', () => {
    if(lighboxIndex > 0) {
        lighboxIndex--;
        changeLightBoxImg(lighboxIndex);
    }
})

next.addEventListener('click', () => {
    if(lighboxIndex >= 0 && lighboxIndex <=2) {
        lighboxIndex++;
        changeLightBoxImg(lighboxIndex)
    }
})

lb_preview.forEach(lbpr => {
    lbpr.addEventListener('click', (e) => {
        let img = e.target.id;

        if(img === 'preview-img-0') { lighboxIndex = 0 } 
        else if(img === 'preview-img-1') { lighboxIndex = 1; } 
        else if(img === 'preview-img-2') { lighboxIndex = 2; } 
        else if(img === 'preview-img-3') { lighboxIndex = 3; }

        changeLightBoxImg(lighboxIndex);
    })
})

function changeLightBoxImg(nn) { current_product_img.src = `${pr_img_src[nn]}`; }


// ADD TO CART BUTTONS

const addToCartBtn = document.querySelector('.add-to-cart-btn'),
      cart_after = window.getComputedStyle( cart_notif, '::after'),
      empty_cart = document.querySelector('.empty-cart'),
      order_cart = document.querySelector('.order-cart'),
      order_quantity = document.querySelector('.order-quantity'),
      total_price = document.querySelector('.total-price');
let tt = 0;
addToCartBtn.addEventListener('click', () => {
    totalQunatity += currentQuantityNumebr;
    if(currentQuantityNumebr > 0) { 
        cart_notif.style.setProperty('--none', `block`)
        empty_cart.setAttribute('style', 'display: none')
        order_cart.setAttribute('style', 'display: grid');
    }
    cart_notif.style.setProperty('--after-content', `'${totalQunatity}'`);
    currentQuantityNumebr = 0;
    quantity_number_display.innerHTML = `${currentQuantityNumebr}`;
    order_quantity.innerText = `${totalQunatity}`
    tt = Number(totalQunatity * 125)
    total_price.innerText = `$${tt}.00`  
})

// DEELETE

const delete_order = document.querySelector('.delete-order img');

delete_order.addEventListener('click', () => {
    tt = 0;
    currentQuantityNumebr = 0;
    empty_cart.setAttribute('style', 'display: grid')
    order_cart.setAttribute('style', 'display: none');
    cart_notif.style.setProperty('--none', `none`)
})

window.addEventListener('click', (e) => {
    console.log(e)
})