// functions for quantity counter
// referenced from https://dev.to/stackfindover/products-quantity-counter-using-html-css-javascript-663
function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}

function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}

// switches image when flavor/type is changed
function switch_image(x) {
  // current main product image
 var Image_Id = document.getElementById('product3_image');
 // switch to green tea
 if (Image_Id.src.match("images/pp1.png") && x == 2) {
   Image_Id.src = "images/p2p1.png";
   document.getElementById('flavor').innerHTML="Green Tea";
 }
 // switch to roselle
 else if (Image_Id.src.match("images/p2p1.png") && x == 1) {
   Image_Id.src = "images/pp1.png";
   document.getElementById('flavor').innerHTML="Roselle";
 }
}

//https://stackoverflow.com/questions/55328748/how-to-store-and-retrieve-shopping-cart-items-in-localstorage
function addCart(name, price) {
  let products = [];
  if(localStorage.getItem('products')){
    products = JSON.parse(localStorage.getItem('products'));
  }
  products.push(new Product(name, price));
  localStorage.setItem('products', JSON.stringify(products));
  loadCount();
}

function removeProduct(name, rowid){
  alert("hello");
  let storageProducts = JSON.parse(localStorage.getItem('products'));
  let products = storageProducts.filter(product => product.name !== name );
  localStorage.setItem('products', JSON.stringify(products));
  var row = document.getElementById(rowid);
  row.parentNode.removeChild(row);
  loadCart();
}

// object
function Product(name, price) { //, image_alt, image
  this.name = name;
  this.price = price;
  //this.image_alt = image_alt; //"something product"
  //this.image = image; // "capybara.png"
}

function loadCart(){
  let products = [];
  if(localStorage.getItem('products')){
    products = JSON.parse(localStorage.getItem('products'));
  }
  //document.getElementById("shoppingcart").innerHTML = products;
  document.getElementById("shoppingcartlen").innerHTML = products.length;

  var shoppingTable = document.getElementById("shopping_table");

  // correct the count
  var pdict = {};
  for (let i = 0; i < products.length; i++) {
    if (products[i].name in pdict) {
       var x = pdict[products[i].name][0];
       var y = pdict[products[i].name][1];
       pdict[products[i].name] = [x+products[i].price, y+1];
    }
    else {
      pdict[products[i].name] = [products[i].price, 1];
    }
  }

  // display shopping cart
  for(var key in pdict) {
    var value = pdict[key];
    var price = value[0];
    var quantity = value[1];

    var row =  shoppingTable.insertRow(1);
    row.id = `${key}-row`;
    var col1 = row.insertCell(0);
    var col2 = row.insertCell(1);
    var col3 = row.insertCell(2);
    var col4 = row.insertCell(3);
    col1.innerHTML = key;
    col2.innerHTML = quantity;
    col3.innerHTML = price;

    var btn = document.createElement("button");
    btn.onclick = function(){
      removeProduct(key, row.id);
    };
    var t = document.createTextNode("Delete");
    btn.appendChild(t);
    col4.id = "placer";
    //col4.innerHTML = btn;
    document.getElementById('placer').appendChild(btn);
  }


}

function loadCount(){
  let products = [];
  if(localStorage.getItem('products')){
    products = JSON.parse(localStorage.getItem('products'));
  }
  document.getElementById("shoppingcartlen").innerHTML = products.length;
}
