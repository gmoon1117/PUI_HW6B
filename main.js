//variables
var a = ["Teatree Care Solution", "Soft Foot Peeling Socks", "Tea Eye Gel Patch"];
var len = 3;

// add function when users press "add to cart"
function add_to_cart() {
  var name = document.getElementById("product_name").innerHTML
  var x = document.getElementById("counter_count").value
  for (var i=0; i<x; i++) {
    a.push(name);
  }
  //a.push(name);
  //document.getElementById("shoppingcart").innerHTML = a;
  len = a.length;
  document.getElementById("shoppingcartlen").innerHTML = len;
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
