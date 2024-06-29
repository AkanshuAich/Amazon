// script.js

const address = {
    fullName: "Rishav Aich",
    flat: "IIT Jodhpur",
    area: "Karwar",
    landmark: "NIFT Jodhpur",
    city: "Jodhpur",
    state: "Rajasthan",
    phone: "123-456-7890"
};

const basket = [
    { id: 1, title: "Dell Alienware x14 R2 Gaming Laptop, Intel Core i7-13620H/32GB/1TB SSD/NVIDIA RTX 4060 8GB GDDR6/14'' (35.56Cms) QHD+ 165Hz, 3ms, 300nits/Win 11+MSO'21+McAfee 15 Month/Lunar Silver/2.08Kgs", price: 157990, image: "https://m.media-amazon.com/images/I/41Diz41FkhL._AC_SY200_.jpg" },
    { id: 2, title: "boAt Newly Launched Airdopes 121 Pro Plus TWS in-Ear Earbuds w/ 100 hrs Playtime, 4 Mics with ENx™, 50ms low-latency BEAST™ Mode, ASAP™ Charge, IWP™ Tech, BT v5.3 & IPX5(Black)", price: 1399, image: "https://m.media-amazon.com/images/I/31aNgbvYJKL._AC_SY200_.jpg" },
  ];
  

// function removeFromBasket(productId) {
//     const productIndex = basket.findIndex(product => product.id === productId);
//     if (productIndex > -1) {
//         basket.splice(productIndex, 1);
//         renderProducts();
//     }
// }

// function getBasketTotal() {
//     return basket.reduce((total, product) => total + product.price, 0);
// }

// function renderAddress() {
//     const addressContainer = document.getElementById('address');
//     addressContainer.innerHTML = `
//         <p>${address.fullName}</p>
//         <p>${address.flat}</p>
//         <p>${address.area}</p>
//         <p>${address.landmark}</p>
//         <p>${address.city} ${address.state}</p>
//         <p>Phone: ${address.phone}</p>
//     `;
// }

// function renderProducts() {
//     const productsContainer = document.getElementById('products');
//     productsContainer.innerHTML = '';
//     basket.forEach(product => {
//         const productDiv = document.createElement('div');
//         productDiv.classList.add('product');
//         productDiv.innerHTML = `
//             <div class="image">
//                 <img src="${product.image}" alt="${product.title}">
//             </div>
//             <div class="description">
//                 <h4>${product.title}</h4>
//                 <p>₹ ${product.price}</p>
//                 <button onclick="removeFromBasket(${product.id})">Remove</button>
//             </div>
//         `;
//         productsContainer.appendChild(productDiv);
//     });

//     document.getElementById('item-count').innerText = basket.length;
//     document.getElementById('subtotal-value').innerText = `₹ ${getBasketTotal()}`;
// }

// document.getElementById('checkout-button').addEventListener('click', () => {
//     alert('Order placed successfully!');
//     // Logic to handle payment confirmation can be added here
// });

// renderAddress();
// renderProducts();
const cardOptions = [
    { id: 1, name: "Cash on Delivery/Pay on Delivery", details: "Cash, UPI and Cards accepted. know more", image: "indian-rupee.png" },
    { id: 2, name: "Amazon Pay UPI", details: "State Bank of India **2278", image: "https://www.shutterstock.com/image-vector/amazon-pay-logo-biggest-online-600w-2360491029.jpg" },
    { id: 3, name: "Other UPI Apps", details: "Google Pay, PhonePe, Paytm and more", image: "https://cdn.icon-icons.com/icons2/2699/PNG/512/upi_logo_icon_170312.png" },
    { id: 4, name: "Credit or debit card", details: "", image: "https://cdn.iconscout.com/icon/premium/png-256-thumb/card-payment-star-9319049-7601932.png" },
    { id: 5, name: "EMI", details: "", image: "https://www.shutterstock.com/shutterstock/photos/2443921359/display_1500/stock-vector-emi-calculator-with-percentage-sign-icon-as-eps-file-2443921359.jpg" },
    { id: 6, name: "Net Banking", details: "", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShaR-ZCWiGo7Z0xZRkrskeXNTLo1_mvYv32Q&s" },
];

function removeFromBasket(productId) {
    const productIndex = basket.findIndex(product => product.id === productId);
    if (productIndex > -1) {
        basket.splice(productIndex, 1);
        renderProducts();
    }
}

function getBasketTotal() {
    return basket.reduce((total, product) => total + product.price, 0);
}

function renderAddress() {
    const addressContainer = document.getElementById('address');
    addressContainer.innerHTML = `
        <p>${address.fullName}</p>
        <p>${address.flat}</p>
        <p>${address.area}</p>
        <p>${address.landmark}</p>
        <p>${address.city} ${address.state}</p>
        <p>Phone: ${address.phone}</p>
    `;
}

function renderProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    basket.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <div class="image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="description">
                <h4>${product.title}</h4>
                <p>₹ ${product.price}</p>
                <button onclick="removeFromBasket(${product.id})">Remove</button>
            </div>
        `;
        productsContainer.appendChild(productDiv);
    });

    document.getElementById('item-count').innerText = basket.length;
    document.getElementById('subtotal-value').innerText = `₹ ${getBasketTotal()}`;
}

function renderCardOptions() {
    const cardOptionsContainer = document.getElementById('card-options');
    cardOptionsContainer.innerHTML = '';
    cardOptions.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-option');
        cardDiv.innerHTML = `
            <input type="radio" name="card" value="${card.id}">
            <div class="card-details">
                <p>${card.name}</p>
                <p>${card.details}</p>
            </div>
            <div class="card-image">
                <img src="${card.image}" alt="${card.name}">
            </div>
        `;
        cardOptionsContainer.appendChild(cardDiv);
    });
}

document.getElementById('order-button').addEventListener('click', () => {
    alert('Order placed successfully!');
    // Logic to handle payment confirmation can be added here
});

renderAddress();
renderProducts();
renderCardOptions();
