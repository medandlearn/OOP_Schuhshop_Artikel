var arrCart = [];

function addToCart(productId, productName, price, quantity) {
   
  var item = {
    productId: productId,
    productName: productName,
    price: price,
    quantity: quantity
  };
  arrCart.push(item);
}

var buttons = document.querySelectorAll('.buy-button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    arrCart = JSON.parse(localStorage.getItem('cart'));

    var productId = this.getAttribute('data-product-id');
    var productName = this.parentNode.querySelector('h3').textContent;
    var price = parseFloat(this.parentNode.querySelector('p span').textContent);
    var itemExists = false;
    for (var j = 0; j < arrCart.length; j++) {
      if (arrCart[j].productId === productId) {
        arrCart[j].quantity++;
        arrCart[j].price = parseFöoat(arrCart[j].price);
        itemExists = true;
        break;
      }
    }
    if (!itemExists) {
      addToCart(productId, productName, price, 1);
    }
    localStorage.setItem('cart', JSON.stringify(arrCart));
  };
}

var cartItems = JSON.parse(localStorage.getItem('cart'));
var cartTable = document.getElementById('cart-items');
var totalPrice = 0;
for (var i = 0; i < cartItems.length; i++) {
  var row = document.createElement('tr');
  var productIdCell = document.createElement('td');
  productIdCell.textContent = cartItems[i].productId;
  var productNameCell = document.createElement('td');
  productNameCell.textContent = cartItems[i].productName;
  var priceCell = document.createElement('td');
  priceCell.textContent = cartItems[i].price;
  var quantityCell = document.createElement('td');
  quantityCell.textContent = cartItems[i].quantity;
  row.appendChild(productIdCell);
  row.appendChild(productNameCell);
  row.appendChild(priceCell);
  row.appendChild(quantityCell);
  cartTable.appendChild(row);
  totalPrice += parseFloat(cartItems[i].price * cartItems[i].quantity);
}
document.getElementById('total-price').textContent = totalPrice;