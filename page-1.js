function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu.style.left === '0px') {
        menu.style.left = '-100px';
    } else {
        menu.style.left = '0px';
    }
}



// Select all links
const navLinks = document.querySelectorAll('.nav-link');

// Function to remove active class from all links
function removeActiveClasses() {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
}

// Add click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        removeActiveClasses(); // Remove active class from all links
        link.classList.add('active'); // Add active class to the clicked link
    });
});

// Change active link based on scroll position
window.addEventListener('scroll', function() {
    let fromTop = window.scrollY;

    navLinks.forEach(link => {
        let section = document.querySelector(link.getAttribute('href'));

        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            removeActiveClasses();
            link.classList.add('active');
        }
    });
});

let currentProduct = 0;
const product = ['photos/Gloves.jpg', 'photos/face mask.jpg', 'photos/mirror.jpg'];

function nextProduct() {
    currentProduct = (currentProduct + 1) % product.length;
    document.querySelector('.product-img').src = product[currentProduct];
}

function prevProduct() {
    currentProduct = (currentProduct - 1 + product.length) % product.length;
    document.querySelector('.product-img').src = product[currentProduct];
}




//products



const products = [
    { name: 'Riding Gloves', price: 80, image: 'https://images.pexels.com/photos/26558692/pexels-photo-26558692/free-photo-of-close-up-of-a-motorcycle-glove.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Leather Boots', price: 120, image: 'https://images.pexels.com/photos/12417688/pexels-photo-12417688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Bluetooth Helmet', price: 200, image: 'https://images.pexels.com/photos/26390764/pexels-photo-26390764/free-photo-of-motorcycle-helmet-on-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Elbow Guards', price: 40, image: 'https://images.pexels.com/photos/144113/pexels-photo-144113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Tank Bag', price: 60, image: 'https://images.pexels.com/photos/20635999/pexels-photo-20635999/free-photo-of-close-up-of-an-elbow-guard.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Saddle Bags', price: 100, image: 'https://images.pexels.com/photos/5331881/pexels-photo-5331881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Waterproof Backpack', price: 70, image: 'https://images.pexels.com/photos/20516981/pexels-photo-20516981/free-photo-of-bike-with-side-bags-by-brick-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];

let cart = [];

const productContainer = document.querySelector('.product-container');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');

function displayProducts(productsToDisplay = products) {
    productContainer.innerHTML = ''; 
    if (Array.isArray(productsToDisplay)) {
        productsToDisplay.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
            `;
            productContainer.appendChild(productDiv);
        });
    } else {
        console.error('productsToDisplay is not an array');
    }
}

function addToCart(name, price, image) {
    cart.push({ name, price, image }); 
    cartCount.innerText = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1); 
    cartCount.innerText = cart.length; 
    showCart(); 
}

function showCart() {
    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    cartModal.style.display = 'block'; 
}

function closeCart() {
    cartModal.style.display = 'none'; 
}

function searchProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

document.querySelector('.next').onclick = () => {
    productContainer.scrollBy({ left: 300, behavior: 'smooth' });
};

document.querySelector('.prev').onclick = () => {
    productContainer.scrollBy({ left: -300, behavior: 'smooth' });
};

window.onload = () => {
    displayProducts(products); 
};