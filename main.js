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
  alert("Added to Cart!");
  let products = [];
  if(localStorage.getItem('products')){
    products = JSON.parse(localStorage.getItem('products'));
  }
  var x = document.getElementById("counter_count").value;
  for (var i=0; i<x; i++) {
    products.push(new Product(name, price));
  }
  localStorage.setItem('products', JSON.stringify(products));
  loadCount();
}

function removeProduct(name, rowid){
  alert(`Removing the ${name}!`);
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

function Product(name, price, img, company, desc){
  this.name = name;
  this.price = price;
  this.img = img;
  this.company = company;
  this.desc = desc
}

function loadCart(){
  let products = [];
  if(localStorage.getItem('products')){
    products = JSON.parse(localStorage.getItem('products'));
  }
  //document.getElementById("shoppingcart").innerHTML = products;
  document.getElementById("shoppingcartlen").innerHTML = products.length;
  var shoppingTable = document.getElementById("shopping_table");

  if (products.length == 0){
    var row =  shoppingTable.insertRow(1);
    cell = row.insertCell(0);
    cell.colSpan = "4";
    cell.innerHTML = 'No items in the cart. Shop ' + `<a id="link_pop" href="skincare.html" title="skincare page">here</a>` + "!";
  }
  else{
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
      col3.innerHTML = price.toFixed(2);

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

}

function loadCount(){
  let products = [];
  if(localStorage.getItem('products')){
    products = JSON.parse(localStorage.getItem('products'));
  }
  document.getElementById("shoppingcartlen").innerHTML = products.length;
}

function loadProduct(){
  loadCount();
  let current = [];
  if(localStorage.getItem('current')){
    current = JSON.parse(localStorage.getItem('current'));
  }

  document.getElementById("product_name").innerHTML = current[0].name;
  document.getElementById("product_price").innerHTML = "$" + current[0].price;
  document.getElementById("product_image").src = current[0].img;
  document.getElementById("product_company").innerHTML = current[0].company;
  document.getElementById("product_desc").innerHTML = current[0].desc;

  if (current[0].name == 'Tea Eye Gel Patch'){
    document.getElementById("tea_pics").innerHTML =
    `<img class="mini_img" alt="mini first product picture" src="images/pp1.png"/>
    <img class="mini_img" alt="mini first product picture" src="images/pp2.png"/>
    <img class="mini_img" alt="mini first product picture" src="images/pp3.png"/>`;

    document.getElementById("tea_btn").innerHTML =
    `<button class="addtocart_button" type="button" onclick="addCart('Tea Eye Gel Patch', 9.99)" ><span>Add to Cart</span></button>`

    document.getElementById("options").innerHTML = `<p id="type">Type: </p><p id="flavor">Roselle</p>
    <img class="flavor_choice" id ="Roselle" alt="mini first product picture" src="images/pp2.png" onclick="switch_image(1)"/>
    <img class="flavor_choice" id="GreenTea" alt="mini first product picture" src="images/p2p1.png" onclick="switch_image(2)"/>`;

    document.getElementById("tea_comments").innerHTML =
    `<h2>Comments</h2>
    <h5>14323 Reviews</h5>

    <p>Alyssa R.: Have used on my face and neck. A lot of moisture and many in the pack. Haven’t used enough to see full affects yet but first few times were refreshing.</p>
    <p>Ariadna M.: I have been using these patches for a week, the skin around my eyes looks shinny.</p>`;
  }

}

function set_current(name, price, img, company, desc){
  let current = [];
  if(localStorage.getItem('current')){
    current = JSON.parse(localStorage.getItem('current'));
  }
  current = [new Product(name, price, img, company, desc)];
  localStorage.setItem('current', JSON.stringify(current));
}
