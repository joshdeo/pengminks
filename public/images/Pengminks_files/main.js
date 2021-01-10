// var slideIndex = 0;
// showSlides();

// function showSlides() {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {
//     slideIndex = 1
//   }
//   slides[slideIndex - 1].style.display = "block";
//   setTimeout(showSlides, 3000); // Change image every 3 seconds
// }

function productToggle(x) {
  x.classList.toggle("change");
}

function productToggle() {
  var x = document.querySelector(".sandwich-toggle");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// local storage - add to cart

//lip gloss

let products = [{
    name: 'Pink Gloss',
    tag: 'gloss',
    price: 15,
    inCart: 0
  },

  {
    name: 'Blue Gloss',
    tag: 'gloss',
    price: 17,
    inCart: 0
  },

  {
    name: 'Green Gloss',
    tag: 'gloss',
    price: 15,
    inCart: 0
  },
];

let carts = document.querySelectorAll('.add-item'); // <- lipgloss

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumber(products[i]);
    totalCost(products[i])
  });
};

// tweezer

let tweezer = [{
  name: 'tweezer',
  tag: 'tweezer',
  price: 80,
  inCart: 0
}];

let tweezerAdd = document.querySelectorAll('.add-item-tweezer');

for (let i = 0; i < tweezerAdd.length; i++) {
  tweezerAdd[i].addEventListener('click', () => {
    cartNumber(tweezer[i]);
    totalCost(tweezer[i])
  });
};

// lashes

let lashes = [{
    name: 'Faux Lashes',
    tag: 'lash2',
    price: 80,
    inCart: 0
  },
  {
    name: 'Real Lashes',
    tag: 'lashes',
    price: 80,
    inCart: 0
  }
];

let lashAdd = document.querySelectorAll('.add-item-lashes');

for (let i = 0; i < lashAdd.length; i++) {
  lashAdd[i].addEventListener('click', () => {
    cartNumber(lashes[i]);
    totalCost(lashes[i])
  });
};

// ADD CART

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.fa-shopping-cart').textContent = productNumbers;
  }
}

function cartNumber(product) {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.fa-shopping-cart').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.fa-shopping-cart').textContent = 1;
  }

  setItems(product);
};

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {

    if (cartItems[product.tag] === undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }
  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');
  if (cartCost !== null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
};

function displayCart() {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector('.products-container');
  if (cartItems && productContainer) {
    console.log('running');
  }
}
onLoadCartNumbers();
displayCart();