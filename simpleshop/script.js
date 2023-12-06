let arrCart = [];

function addToCart(productId, productName, price, quantity) {
   
  let item = {
    productId: productId,
    productName: productName,
    price: price,
    quantity: quantity
  };
  arrCart.push(item);
}

let buttons = document.querySelectorAll('.buy-button');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    if(JSON.parse(localStorage.getItem('cart'))){
      arrCart = JSON.parse(localStorage.getItem('cart'));
    }

    var productId = this.getAttribute('data-product-id');
    var productName = this.parentNode.querySelector('h3').textContent;
    var price = parseFloat(this.parentNode.querySelector('p span').textContent);
    var itemExists = false;
    if (arrCart) {
      for (var j = 0; j < arrCart.length; j++) {
        if (arrCart[j].productId === productId) {
          arrCart[j].quantity++;
          arrCart[j].price = parseFloat(arrCart[j].price);
          itemExists = true;
          break;
        }
      }
    }
    if (!itemExists) {
      addToCart(productId, productName, price, 1);
    }
    localStorage.setItem('cart', JSON.stringify(arrCart));
  };
}

let cartItems = JSON.parse(localStorage.getItem('cart'));
let cartTable = document.getElementById('cart-items');
let  totalPrice = 0;
for (let i = 0; i < cartItems.length; i++) {
    let row = document.createElement('tr');
    let productIdCell = document.createElement('td');
    productIdCell.textContent = cartItems[i].productId;
    let productNameCell = document.createElement('td');
    productNameCell.textContent = cartItems[i].productName;
    let priceCell = document.createElement('td');
    priceCell.textContent = cartItems[i].price;
    var quantityCell = document.createElement('td');
    quantityCell.textContent = cartItems[i].quantity;
    row.appendChild(productIdCell);
    row.appendChild(productNameCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    cartTable.appendChild(row);
    totalPrice += parseFloat(cartItems[i].price) * parseFloat(cartItems[i].quantity);
  }

document.getElementById('total-price').textContent = totalPrice;