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

  var pdict = {};
  for (let i = 0; i < products.length; i++) {
    console.log(i);
    if (products[i].name in pdict) {
       var x = pdict[products[i].name][0];
       var y = pdict[products[i].name][1];
       console.log(x);
       console.log(y);
       pdict[products[i].name] = [x+products[i].price, y+1];
    }
    else {
      pdict[products[i].name] = [products[i].price, 1];
      console.log("hello", pdict[products[i].name][0], pdict[products[i].name][1]);
    }
  }

  console.log(pdict);

  for(var key in pdict) {
    //console.log(key, (pdict[key][0], pdict[key][1]));
    var value = pdict[key];
    var price = value[0];
    var quantity = value[1];

    var row =  shoppingTable.insertRow(1);
    var col1 = row.insertCell(0);
    var col2 = row.insertCell(1);
    var col3 = row.insertCell(2);
    col1.innerHTML = key;
    col2.innerHTML = quantity;
    col3.innerHTML = price;

  // do something with "key" and "value" variables
  }

  // // display shopping cart
  // for (x in pdict) {
  //   name, (price, quantity) = x, pdict[x];
  //   var row =  shoppingTable.insertRow(1);
  //   var col1 = row.insertCell(0);
  //   var col2 = row.insertCell(1);
  //   var col3 = row.insertCell(2);
  //   col1.innerHTML = name;
  //   col2.innerHTML = quantity;
  //   col3.innerHTML = price;
  // }



  // for (let i = 0; i < products.length; i++) {
  //   console.log(products[i].name, products[i].price);
  //   var row =  shoppingTable.insertRow(1);
  //   var col1 = row.insertCell(0);
  //   var col2 = row.insertCell(1);
  //   var col3 = row.insertCell(2);
  //   col1.innerHTML = products[i].name;
  //   col2.innerHTML = 1;
  //   col3.innerHTML = products[i].price;
  // }

}

function loadCount(){
  let products = [];
  if(localStorage.getItem('products')){
    products = JSON.parse(localStorage.getItem('products'));
  }
  //document.getElementById("shoppingcart").innerHTML = products;
  document.getElementById("shoppingcartlen").innerHTML = products.length;
}
