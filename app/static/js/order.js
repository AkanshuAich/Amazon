document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');

    const products = [
        {
            image: 'https://m.media-amazon.com/images/I/31VjlrbE3bL.jpg',
            title: 'Apple iPhone 14 (128 GB) - Blue',
            description: '',
            price: '₹62,800',
            suggestions: ['Similar product : Iphone 15 pro', 'Get this product : Extra 20% off(On Sale)', 'Offers applied : <span class="yellow-tag">6 offers applied</span>'],
            tag:''
           
        },
        {
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/00b11c6b-7530-44c9-b712-ece6d77690a6/full-force-low-shoes-w2MKmW.png',
            title: 'NIKE Mens Full Force LoRunning Shoe',
            description: '',
            price: ' ₹6,626',
            suggestions: ['Similar product: Nike Mens Jordan 1 Retro High Sneaker', 'Get this product: Extra 40% off on Axis Bank credit card', 'Offers applied : <span class="yellow-tag">3 offers applied</span>'],
            tag: 'frequently bought'
           
        },
        {
            image: 'https://m.media-amazon.com/images/I/51rONyXYJzL._SL1201_.jpg',
            title: 'Mamaearth Rosemary Anti-Hair Fall Shampoo With Rosemary & Methi Dana For Reducing Hair Loss & Breakage-400 Grams Up To 94% Stronger Hair* Up To 93% Less Hair Fall For Men&Women',
            description: '',
            price: ' ₹356',
            suggestions: ['Similar product: Mamaearth Onion Shampoo for Hair Growth & Hair Fall Control with Onion & Plant Keratin - 1 Litre', 'Get this product: Buy 4 and get 40% off on each product', 'Offers applied : <span class="yellow-tag">5 offers applied</span>'],
            tag:'frequently bought'
        
        }
    ];

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card-amazon');

        if(product.tag == 'frequently bought'){
            card.innerHTML = `
            <div class="product-info">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-details">
                    <h4>${product.title}</h4>
                    <p>${product.description}</p>
                    <p class="price">${product.price}</p>
                    <p class="tag">${product.tag}</p>
                    <button class="buy-again">Buy Again</button>
                </div>
            </div>
            <div class="suggestions">
                <h3>Suggestions</h3>
                <ul>
                    ${product.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                </ul>
                <button class="buy-button">Shop Now</button>
            </div>
        `;
        }
        else{
            card.innerHTML = `
            <div class="product-info">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-details">
                    <h4>${product.title}</h4>
                    <p>${product.description}</p>
                    <p class="price">${product.price}</p>
                    <button class="buy-again">Buy Again</button>
                </div>
            </div>
            <div class="suggestions">
                <h3>Suggestions</h3>
                <ul>
                    ${product.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                </ul>
                <button class="buy-button">Shop Now</button>
            </div>
        `;
        }

       

        cardContainer.appendChild(card);
    });
});
