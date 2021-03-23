"use strict";
exports.__esModule = true;
exports.shoppingCart = exports.items = void 0;
var items = /** @class */ (function () {
    function items(itemName, itemPrice) {
        this.itemName = itemName;
        this.itemPrice = itemPrice;
    }
    items.prototype.setItemName = function (product) {
        this.itemName = product;
    };
    items.prototype.setItemPrice = function (product) {
        this.itemPrice = product;
    };
    items.prototype.getItemName = function () {
        return this.itemName;
    };
    items.prototype.getItemPrice = function () {
        return this.itemPrice;
    };
    return items;
}());
exports.items = items;
function add(shoppingElement, shoppingElement2) {
    var pProduct = document.getElementById(shoppingElement).value;
    var pPrice = parseInt(document.getElementById(shoppingElement2).value);
    var shoppingCart1 = new shoppingCart();
    shoppingCart1.addProduct(pProduct, pPrice);
}
function retriveProduct() {
    var test = sessionStorage.getItem("shoppingCart");
    return JSON.parse(test);
}
function retrieveFromSessionProduct() {
    var table = document.getElementById("financeList");
    var body = table.getElementsByTagName("tbody")[0];
}
var shoppingCart = /** @class */ (function () {
    function shoppingCart() {
        this.cartItems = [];
        this.totalPricee = 0;
    }
    shoppingCart.prototype.addProduct = function (itemName, itemPrice) {
        var cartItem = new items(itemName, itemPrice);
        var test = sessionStorage.getItem("shoppingCart");
        if (test != null) {
            this.cartItems = JSON.parse(test);
        }
        this.cartItems.push(cartItem);
        sessionStorage.setItem("shoppingCart", JSON.stringify(this.cartItems));
        console.log(this.cartItems);
    };
    return shoppingCart;
}());
exports.shoppingCart = shoppingCart;
