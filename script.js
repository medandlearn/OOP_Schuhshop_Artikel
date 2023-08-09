//import {Article, Articles} from './modules/article.js';
// Auslesen des DOM
// const addCarts = document.querySelectorAll(".add-cart");

// const domArticles = document.querySelectorAll(".images");
/* const countItems = document.querySelector('.cart span');
const changeToCart = document.querySelector('header'); */
// const products = document.querySelector('.products');
// const cartBtn = document.querySelector('.shoppingcart');
// const headerDiv = document.querySelector('#hdindex');

const articleForm = document.querySelector('.manipulate-articles');
const radioBtns = document.querySelectorAll('input[name=action]');
let divInpFields = document.querySelector('.change'); // Eingabefelder Artikel
console.log(divInpFields);
let activePage = "";
const domProducts =  document.querySelector('.container'); 
const shoeArticles = new Articles(domProducts);
const domInfo = document.querySelector('#info'); 

// Navigation part und Laden der jeweiligen Seiten
window.onload = () => {
    const headerDiv = document.querySelector('#hdindex');
    setHeader(headerDiv);
    if(domProducts) {
        initProducts();
    }
    const anchors = document.querySelectorAll("nav a");
    for(let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];
        anchor.addEventListener("click", e => {
            let target = e.target.href;
           activePage = target;
           console.log(activePage);
            window.location.href = target;
           

        })
    }
}

//  helper functions
function setHeader(headerDiv) {
    headerDiv.innerHTML = "";
    let headerHTML =` 
        <div class="overlay" >
            <nav>
                <h2>moveFooter </h2>
                <ul>
                    <li><a href="index.html">home</a></li>
                    <li><a href="manage.html">manage</a></li>
                    <li><a href="#">about</a></li>
                    <li class="cart"><a href="#">
                        <ion-icon name="basket"></ion-icon> 
                        Cart <span>0</span></a>
                    </li>
                </ul>
            </nav>
        </div>

    `
    headerDiv.innerHTML = headerHTML;
}

// Manage Articles

if(articleForm) {
    radioBtns.forEach(rb => rb.addEventListener('change', function(ev){
        divInpFields.className=`change ${ev.target.value}`
    }))

    articleForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const fd = new FormData(articleForm);
        const obj = Object.fromEntries(fd);
        console.log(obj);
        domInfo.innerHTML = '';
       //
       // Prüfen ob Artikel bereits existiert.
       const art = shoeArticles.findArticle(obj.artid);
       console.log(art);
       if (!art && obj.action === "insert") {
        if(obj.pname && obj.artprice && obj.pdesc) {
            let product = new Article(obj.artid, obj.pname, obj.pdesc, [8, 9, 10, 11],parseFloat(obj.artprice), "mF_"+obj.pname);
            console.log(product);
            shoeArticles.addArticle(product);
         } else {
            domInfo.innerHTML ="Zum Einfügen müssen alle Felder ausgefüllt werden.";
         }
        } else if ( obj.action === "insert") {
            domInfo.innerHTML ="Artikel kann nicht eingefügt werden, artikelId ist schon vorhanden";
             }
    })
}


// Formatting prices and so on
const eurFormat = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

function initProducts() {
    console.log(shoeArticles.articleList);

    // Create header
    // headerDiv.innerHTML = "";
    // headerDiv.innerHTML += headerHTML;

    if (shoeArticles.articleList.length === 0 ) {
        let art = new Article('a10010','airSole', 'Sportschuh AirSole',  [8, 9, 10, 11], 149, 'mF_airSole');
        console.log(art);
        shoeArticles.addArticle(art);
       
        art = new Article('a10020','airStride', 'Sportschuh AirStride',  [8, 9, 10, 11], 169, 'mF_airStride');
        shoeArticles.addArticle(art);
        art = new Article('a10030','flexNew', 'Sportschuh flexNew',  [8, 9, 10, 11], 179, 'mF_flexNew');
        shoeArticles.addArticle(art);
        shoeArticles.updateArticleCatalog();

    } else {
        shoeArticles.updateArticleCatalog();
    }
}





 

/* const clients = [
    {
        kdNr: 'k1000',
        kdName: 'testUser1'
    },
    {
        kdNr: 'k2000',
        kdName: 'testUser2'
    }
]

let cart = {}; //leerer Key-value-store für den Einkaufswagen */



/* 

//Eventhandler
if(domContainer) {
    // added only on index page
    domContainer.addEventListener('click', addToCart);
} 

if(products) {
    // added only on index page
    products.addEventListener('click', changeCartItems); //remove or update inCart
}

//cartBtn.addEventListener('click', displayShoppingCart);

window.addEventListener(
    "hashchange",
    () => {
      displayShoppingCart();
    },
    false,
  );


changeToCart.addEventListener('click',init);


// window.addEventListener('load', onLoad());

function addToCart(ev) {
    //ev.target.
    
   
    if(ev.target.tagName === 'A') {
      
        let artidToCart = ev.target.parentNode.dataset.artid;
        if (localStorage.getItem('cart')) {
             cart = JSON.parse(localStorage.getItem('cart'));
        }
        updateCart(artidToCart);
    
        let cartNumber = localStorage.getItem('cartNumber');
        if(cartNumber===null) {
            cartNumber = 0;
        }
        cartNumber = parseInt(cartNumber);
        cartNumber++; // Beim Clicken erhöhen.
        localStorage.setItem('cartNumber', cartNumber);
        countItems.textContent = cartNumber.toString(); 

       
    }
}

function init() {
    //resetStorage();
    let cartNumber = localStorage.getItem('cartNumber');
    if(cartNumber===null) {
        cartNumber = '0';
    }
    localStorage.setItem('cartNumber', cartNumber);
    countItems.textContent = cartNumber.toString(); 
}

function resetStorage() {
    localStorage.setItem('cartNumber', 0);
    //localStorage.setItem('cart', null);
    localStorage.removeItem('cart');
}

function  updateCart(artidToCart) {
    const articleToCart = {};
    Object.assign(articleToCart, articles.find(art => art.artId === artidToCart)); // deep copy
   console.log(cart);
    if(articleToCart) {
       //let cart = JSON.parse(localStorage.getItem('cart'));
           if(cart[artidToCart]===undefined) {
            articleToCart.inCart = 1;
            cart[artidToCart]=articleToCart;
        } else {
            cart[artidToCart].inCart++;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    // Aktualisieren der TotalCosts
    

}


function computeCartTotal() {
    let items = JSON.parse(localStorage.getItem('cart'));
    let total = 0;
    for (const artId in items) {
        total = total + parseFloat(items[artId].price) * parseInt(items[artId].inCart);
    }
    return total;
}

init();
//
// ----- nur für Shopping-Cart ----
//

function displayShoppingCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    if(cartItems && products) {
       products.innerHTML = '';
       Object.values(cartItems).map(item => {
        products.innerHTML+= `
            <div class="product"  data-artid="${item.artId}">
               
                    <ion-icon name="trash-outline" data-eventtype="delete"></ion-icon>
                    <img src="./images/${item.imgURL}.png"/>
                    <span class="sm-hide">${item.prodName}</span>
             </div>
                <div class="price"> <span>${eurFormat.format(parseFloat(item.price))} </span></div>
                <div class="quantity" data-artid="${item.artId}">
                    <ion-icon name="caret-down-outline" data-eventtype="decrease"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon name="caret-up-outline" data-eventtype="increase"></ion-icon>
                </div>
                <div class="total">
                    ${eurFormat.format(parseInt(item.inCart) * parseFloat(item.price))}
                </div>
             
            `

       })
       products.innerHTML += `
            <div class="cartTotal">
                <h4 class= "totalTitle">Gesamtsumme <span>(inkl. MwSt): </span> </h4> 
                <h4 class= "totalAmount">${eurFormat.format(computeCartTotal())} </h4>

            </div> 
            `   
       

    }
}

displayShoppingCart();

function changeCartItems(ev) {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    let cartNumber = parseInt(localStorage.getItem('cartNumber'));

    if((cartItems &&  ev.target.dataset.eventtype==='delete') ||
        (cartItems &&  ev.target.dataset.eventtype==='decrease'
        && parseInt(cartItems[ev.target.parentNode.dataset.artid].inCart) === 1))
    {
        cartNumber = cartNumber - 1;
        delete cartItems[ev.target.parentNode.dataset.artid];
        
    } else if (cartItems &&  ev.target.dataset.eventtype==='decrease'
       &&  parseInt(cartItems[ev.target.parentNode.dataset.artid].inCart) > 1) {
            cartNumber--;
            let inCart = parseInt(cartItems[ev.target.parentNode.dataset.artid].inCart);
            inCart--;
            cartItems[ev.target.parentNode.dataset.artid].inCart = inCart.toString();
    } 
    if(cartItems &&  ev.target.dataset.eventtype==='increase') {
             cartNumber++;
             let inCart = parseInt(cartItems[ev.target.parentNode.dataset.artid].inCart);
             inCart++;
             cartItems[ev.target.parentNode.dataset.artid].inCart=inCart.toString();
    } 

    localStorage.setItem('cart',JSON.stringify(cartItems));
    localStorage.setItem('cartNumber',cartNumber.toString());
   
    init();
    displayShoppingCart();
}

*/