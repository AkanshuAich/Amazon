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

fetch('/option', {
    method: 'POST',
    body: JSON.stringify({ message: "" }),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
})
.then(r => r.json())
.then(r => {
    const cardOptions = r.options;
    console.log(cardOptions)
    renderAddress();
    renderProducts();
    renderCardOptions(cardOptions);

}).catch((error) => {
    console.error('Error:', error);
});

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

function renderCardOptions(cardOptions) {
    console.log(1);
    const cardOptionsContainer = document.getElementById('card-options');
    const cardOptionsContainer2 = document.getElementById('card-options-no');
    cardOptionsContainer.innerHTML = '';
    cardOptionsContainer2.innerHTML = '';

    console.log(2);
    
    cardOptions.forEach(card => {
        if(card.recommended==="yes"){
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card-option');

            let inputString = card.name;
            let output1 = "";
            let output2 = "";
            // Split the string by the first occurrence of " "
            let firstSpaceIndex = inputString.indexOf(" ");
            let firstPart = inputString.substring(0, firstSpaceIndex); // "credit"

            if(firstPart==="Credit"){
                let secondPart = inputString.substring(firstSpaceIndex + 6); // "card HSBC credit card"

                // Construct the desired outputs
                output1 = firstPart.charAt(0).toUpperCase() + firstPart.slice(1) + " card"; // "Credit card"
                output2 = secondPart.charAt(0).toUpperCase() + secondPart.slice(1); // "HSBC credit card"
            }else{
                output1 = card.name;
            }

            cardDiv.innerHTML = `
                <input type="radio" name="card" value="${card.id}">
                <div class="card-details">
                    <b><p>${output1}</p></b>
                    <p>${output2}</p>
                    <p>${card.details}</p>
                </div>
                <div class="card-image">
                    <img src="${card.image}" alt="${card.name}">
                </div>
            `;
            cardOptionsContainer.appendChild(cardDiv);
        }else{
            const cardDiv2 = document.createElement('div');
            cardDiv2.classList.add('card-option-no');
            cardDiv2.innerHTML = `
                <input type="radio" name="card" value="${card.id}">
                <div class="card-details">
                    <b><p>${card.name}</p></b>
                    <p>${card.details}</p>
                </div>
                <div class="card-image">
                    <img src="${card.image}" alt="${card.name}">
                </div>
            `;
            cardOptionsContainer2.appendChild(cardDiv2);
        }
    });
}

document.getElementById('order-button').addEventListener('click', () => {
    alert('Order placed successfully!');
    // Logic to handle payment confirmation can be added here
});
