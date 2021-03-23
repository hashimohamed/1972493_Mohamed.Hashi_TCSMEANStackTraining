export class items {
    public itemName: string;
    public itemPrice: number;
  
    constructor(itemName: string, itemPrice: number) {
      this.itemName = itemName;
      this.itemPrice = itemPrice;
    }
  
    public setItemName(product: string) {
      this.itemName = product;
    }
  
    public setItemPrice(product: number) {
  
      this.itemPrice = product;
    }
  
    public getItemName(): string {
      return this.itemName;
    }
  
    public getItemPrice(): number {
      return this.itemPrice;
    }
  }
  
  function add(shoppingElement: string, shoppingElement2: string) {
  
    let pProduct = ( < HTMLInputElement > document.getElementById(shoppingElement)).value;
    let pPrice = parseInt(( < HTMLInputElement > document.getElementById(shoppingElement2)).value);
  
    let shoppingCart1 = new shoppingCart();
    shoppingCart1.addProduct(pProduct, pPrice);
  }
  
  function retriveProduct(): Array < items > {
    var test = sessionStorage.getItem("shoppingCart");
    return <Array < items >> JSON.parse(test);
  }
  
  function retrieveFromSessionProduct() {
    let table = document.getElementById("financeList")
    let body = table.getElementsByTagName("tbody")[0];
  }
  
  export class shoppingCart {
    private cartItems: Array < items > = [];
    private totalPricee: number = 0;
  
    public addProduct(itemName: string, itemPrice: number) {
  
      let cartItem = new items(itemName, itemPrice);
      let test = sessionStorage.getItem("shoppingCart");
      if (test != null) {
        this.cartItems = < Array < items >> JSON.parse(test);
      }
      this.cartItems.push(cartItem);
      sessionStorage.setItem("shoppingCart", JSON.stringify(this.cartItems));
      console.log(this.cartItems);
    }
  
  
  }