// import { Product } from "./checkoutdeal";

// function removeFromBasket(ProductId) {
//   const ProductIndex = Product.findIndex(Product => Product.id === ProductId);
//   if (ProductIndex > -1) {
//       Product.splice(ProductIndex, 1);
//       renderProducts();
//   }
// }

// function getBasketTotal() {
//   return Product.reduce((total, Product) => total + Product.price, 0);
// }

// function renderProducts() {
//   const ProductsContainer = document.getElementById('Products');
//   ProductsContainer.innerHTML = '';
//   Product.forEach(Product => {
//       const ProductDiv = document.createElement('div');
//       ProductDiv.classList.add('Product');
//       for(let i = 0; i<Product.length; i++){
//         Producthtml += `
//           <div class="image">
//               <img src="${Product[i].img}" alt="${Product[i].title}">
//           </div>
//           <div class="description">
//               <h4>${Product[i].title}</h4>
//               <p>₹ ${Product[i].price}</p>
//               <button onclick="removeFromBasket(${Product[i].id})">Remove</button>
//           </div>
//       `

//       }
//       ProductDiv.innerHTML = Producthtml;
//       ProductsContainer.appendChild(ProductDiv);
//   });

//   document.getElementById('item-count').innerText = Product.length;
//   document.getElementById('subtotal-value').innerText = `₹ ${getBasketTotal()}`;
// }

// document.getElementById('checkout-button').addEventListener('click', () => {
//   window.location.href = "/address";
// });

// renderProducts;

const products = [
  { id: 1, title: "Dell Alienware x14 R2 Gaming Laptop, Intel Core i7-13620H/32GB/1TB SSD/NVIDIA RTX 4060 8GB GDDR6/14'' (35.56Cms) QHD+ 165Hz, 3ms, 300nits/Win 11+MSO'21+McAfee 15 Month/Lunar Silver/2.08Kgs", price: 157990, image: "https://m.media-amazon.com/images/I/41Diz41FkhL._AC_SY200_.jpg" },
  { id: 2, title: "boAt Newly Launched Airdopes 121 Pro Plus TWS in-Ear Earbuds w/ 100 hrs Playtime, 4 Mics with ENx™, 50ms low-latency BEAST™ Mode, ASAP™ Charge, IWP™ Tech, BT v5.3 & IPX5(Black)", price: 1399, image: "https://m.media-amazon.com/images/I/31aNgbvYJKL._AC_SY200_.jpg" },
];

function removeFromBasket(productId) {
  const productIndex = products.findIndex(product => product.id === productId);
  if (productIndex > -1) {
      products.splice(productIndex, 1);
      renderProducts();
  }
}

function getBasketTotal() {
  return products.reduce((total, product) => total + product.price, 0);
}

function renderProducts() {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';
  products.forEach(product => {
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

  document.getElementById('item-count').innerText = products.length;
  document.getElementById('subtotal-value').innerText = `₹ ${getBasketTotal()}`;
}

document.getElementById('checkout-button').addEventListener('click', () => {
  window.location.href = "billing.html";
});

renderProducts();


