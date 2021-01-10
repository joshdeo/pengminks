//TOGGLE MENU
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

// tweezer

let tweezer = [{
  name: "tweezer",
  tag: "tweezer",
  price: 80,
  inCart: 0,
}, ];


let tweezerAdd = document.querySelectorAll(".add-item-tweezer");
// let tweezerContainer = document.querySelector('.add-item-tweezer').parentElement.parentElement;

for (let i = 0; i < tweezerAdd.length; i++) {
  tweezerAdd[i].addEventListener("click", () => {
    // let id = tweezerContainer.dataset.itemId;
    cartNumber(tweezer[i]);
    totalCost(tweezer[i]);
  });
}


// lashes

let lashes = [{
    name: "flirtatious",
    tag: "flirtatious",
    price: 80,
    inCart: 0,
  },
  {
    name: "entanglement",
    tag: "entanglement",
    price: 80,
    inCart: 0,
  },
  {
    name: "birthdaybitch",
    tag: "birthdaybitch",
    price: 80,
    inCart: 0,
  },
  {
    name: "bougie",
    tag: "bougie",
    price: 80,
    inCart: 0,
  },
  {
    name: "mamacita",
    tag: "mamacita",
    price: 80,
    inCart: 0,
  },
  {
    name: "foreigner",
    tag: "foreigner",
    price: 80,
    inCart: 0,
  },
  {
    name: "dramaqueen",
    tag: "dramaqueen",
    price: 80,
    inCart: 0,
  },
  {
    name: "playa",
    tag: "playa",
    price: 80,
    inCart: 0,
  },
  {
    name: "trifling",
    tag: "trifling",
    price: 80,
    inCart: 0,
  },
  {
    name: "peng",
    tag: "peng",
    price: 80,
    inCart: 0,
  },
];

let lashAdd = document.querySelectorAll(".add-item-lashes");

for (let i = 0; i < lashAdd.length; i++) {
  lashAdd[i].addEventListener("click", () => {
    cartNumber(lashes[i]);
    totalCost(lashes[i]);
  });
}

// ADD CART

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(
      ".fa-shopping-cart"
    ).textContent = ` ${productNumbers}`;
  }
}

function cartNumber(product, action) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (action === "decrease") {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cart-logo i").textContent = productNumbers - 1;
  } else if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart-logo i").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart-logo i").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] === undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
  let cartCost = localStorage.getItem("totalCost");

  if (action === "decrease") {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - product.price);
  } else if (cartCost !== null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".small-container");
  let totalsContainer = document.querySelector(".total");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = " ";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <table>
      <tr>
          <td>
              <div class="cart-info">
                  <img src="./images/${item.tag}.jpg" alt="">
                  <div class="product-row">
                      <p>${item.name}</p>
                      <br>
                      <a href="" class="remove"><i class="far fa-trash-alt fa-1x"></i></a>
                  </div>
              </div>
          </td>
          <td>
          <i class="fas fa-minus"></i>
             <span class="inCart">${item.inCart}</span>
             <i class="fas fa-plus"></i>
          </td>
           <td>$${item.inCart * item.price}</td>
      </tr>
  </table>
      `;
    });

    totalsContainer.innerHTML = `
    <h5 class="cart-total-price"> total : $${cartCost}</h5>`;
  }
  deleteButtons();
  manageQuantity();
}

function deleteButtons() {
  let deleteButton = document.querySelectorAll("tr .remove");
  let productName;
  let productNumbers = localStorage.getItem("cartNumbers");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem("totalCost");

  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", () => {
      productName = deleteButton[i].parentElement.parentElement.textContent
        .trim()
        .toLowerCase()
        .replace(/ /g, "");
      console.log(productName);
      // console.log(cartItems[productName].name + " " + cartItems[productName].inCart);
      localStorage.setItem(
        "cartNumbers",
        productNumbers - cartItems[productName].inCart
      );
      localStorage.setItem(
        "totalCost",
        cartCost - cartItems[productName].price * cartItems[productName].inCart
      );

      delete cartItems[productName];
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));

      displayCart();
      onLoadCartNumbers();
    });
  }
}

function manageQuantity() {
  let decreaseButtons = document.querySelectorAll(".fa-minus");
  let increaseButtons = document.querySelectorAll(".fa-plus");
  let currentQuantity = 0;
  let cartItems = localStorage.getItem("productsInCart");
  let currentProduct = "";
  cartItems = JSON.parse(cartItems);

  for (let i = 0; i < decreaseButtons.length; i++) {
    decreaseButtons[i].addEventListener("click", () => {
      currentQuantity = decreaseButtons[i].parentElement.querySelector("span")
        .textContent;
      currentProduct = decreaseButtons[i].parentElement.previousElementSibling
        .querySelector("p")
        .textContent.toLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(currentQuantity);
      console.log(currentProduct);

      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;
        cartNumber(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        displayCart();
      }
    });
  }

  for (let i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener("click", () => {
      currentQuantity = increaseButtons[i].parentElement.querySelector("span")
        .textContent;

      currentQuantity = decreaseButtons[i].parentElement.querySelector("span")
        .textContent;
      currentProduct = decreaseButtons[i].parentElement.previousElementSibling
        .querySelector("p")
        .textContent.toLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(currentQuantity);
      console.log(currentProduct);

      cartItems[currentProduct].inCart += 1;
      cartNumber(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem("productsinCart", JSON.stringify(cartItems));
      displayCart();
    });
  }
}

onLoadCartNumbers();
displayCart();

// STRIPE INTEGRATION

let stripeHandler = StripeCheckout.configure({
  key: stripePublicKey,
  locale: 'auto',
  token: function (token) {

  }
});

let checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', function () {
  let priceElement = document.getElementsByClassName('cart-total-price')[0];

  stripeHandler.open({
    amount: priceElement,
  })
});