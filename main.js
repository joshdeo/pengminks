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
    name: 'fauxlashes',
    tag: 'fauxlashes',
    price: 80,
    inCart: 0
  },
  {
    name: 'reallashes',
    tag: 'reallashes',
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

function cartNumber(product, action) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);


  if (action === "decrease") {
    localStorage.setItem('cartNumbers', productNumbers - 1);
    document.querySelector('.cart-logo i').textContent = productNumbers - 1;
  } else if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart-logo i').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart-logo i').textContent = 1;
  };

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

function totalCost(product, action) {
  let cartCost = localStorage.getItem('totalCost');

  if (action === "decrease") {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost - product.price);
  } else if (cartCost !== null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
};

function displayCart() {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".small-container");
  let totalsContainer = document.querySelector('.total');
  let cartCost = localStorage.getItem('totalCost')
  if (cartItems && productContainer) {
    productContainer.innerHTML = ' ';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <table>
      <tr>
          <td>
              <div class="cart-info">
                  <img src="./images/${item.tag}.jpg" alt="">
                  <div>
                      <p>${item.name}</p>
                      <br>
                      <a href="" class="remove"><i class="fa fa-times"></i></a>
                  </div>
              </div>
          </td>
          <td>
            <i class="fa fa-angle-left"></i> 
             <span>${item.inCart}</span>
            <i class="fa fa-angle-right"></i>
          </td>
           <td>$${item.inCart * item.price}</td>
      </tr>
  </table>
      `
    });

    totalsContainer.innerHTML = `
    <h5> total : $${cartCost}</h5>`;
  }
  deleteButtons();
  manageQuantity();
};

function deleteButtons() {
  let deleteButton = document.querySelectorAll('tr .remove');
  let productName;
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem('totalCost');

  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', () => {
      productName = deleteButton[i].parentElement.parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
      console.log(productName)
      // console.log(cartItems[productName].name + " " + cartItems[productName].inCart);
      localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
      localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

      delete cartItems[productName]
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));

      displayCart();
      onLoadCartNumbers();
    });
  };
};

function manageQuantity() {
  let decreaseButtons = document.querySelectorAll('.fa-angle-left');
  let increaseButtons = document.querySelectorAll('.fa-angle-right');
  let currentQuantity = 0;
  let cartItems = localStorage.getItem('productsInCart');
  let currentProduct = '';
  cartItems = JSON.parse(cartItems);

  for (let i = 0; i < decreaseButtons.length; i++) {
    decreaseButtons[i].addEventListener('click', () => {
      currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
      currentProduct = decreaseButtons[i].parentElement.previousElementSibling.querySelector('p').textContent.toLowerCase().replace(/ /g, '').trim();
      console.log(currentQuantity);
      console.log(currentProduct);

      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;
        cartNumber(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        displayCart();
      }

    });
  };

  for (let i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener('click', () => {
      currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;

      currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
      currentProduct = decreaseButtons[i].parentElement.previousElementSibling.querySelector('p').textContent.toLowerCase().replace(/ /g, '').trim();
      console.log(currentQuantity);
      console.log(currentProduct);


      cartItems[currentProduct].inCart += 1;
      cartNumber(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
      displayCart();

    });
  };

};

onLoadCartNumbers();
displayCart();