// calling the api(default link will be updated)
const loadProducts = () => {
  // const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?`;
  const url = `https://fakestoreapi.com/products/`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
    <div class="single-product card h-100 d-flex flex-wrap flex-row justify-content-between align-items-center">
      <div>
        <img class="product-image" src=${image}></img>
      </div>

      <div class="card-body d-flex flex-column justify-content-center align-items-end">
        <h4>${product.title.substr(0, 15)}...</h4>
        <p class="fs-6 text-muted font-weight-light">Category: ${product.category}</p>

        <div class="d-flex justify-content-center align-items-center fs-5">
        <i class="fas fa-star" style= "color: gold;"></i> <span class= "ms-2">${product.rating.rate}</span>
        <i class="fas fa-users ms-3" style= "color: gold;"></i> <span class= "ms-2"> ${product.rating.count}</span>
      </div>

      <div class= "mt-2">
        <h4 class="text-end">Price: <span class="font-monospace">$${product.price}</span></h4>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success mt-2">add to cart</button>

        <button type="button" class="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="details(${product.id})">Details</button>
      </div>

    </div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};

// details cart
const details = (product) => {
  const Producturl = `https://fakestoreapi.com/products/${product}`;

  fetch(Producturl).then(res => res.json()).then(data => singleProduct(data));

}

// show modal
const modalBody = document.createElement('div');
modalBody.classList.add('modal-body');
const modalFooter = document.createElement('div');
modalFooter.classList.add('modal-footer');

const singleProduct = (data) => {
  modalBody.innerHTML = `
    <div id="single-product">
      <div class= "mx-5">
        <img class="product-image ms-5" src=${data.image} style= "height: auto; width: 300px;"></img>
      </div>  
    
      <div class="card-body d-flex flex-column justify-content-center align-items-center">
        <p class="text-muted">Category: ${data.category}</p>
        <h3 class="text-center">${data.title}</h3>
        <h4 class="text-muted">Price: <strong class="text-success">$<span class="font-monospace">${data.price}</span></strong></h4>
        <div class="d-flex justify-content-center align-items-center fs-5">
        <i class="fas fa-star" style= "color: gold;"></i> <span class= "ms-2">${data.rating.rate}</span>
        <i class="fas fa-users ms-3" style= "color: gold;"></i> <span class= "ms-2"> ${data.rating.count}</span>
      </div>

      <div>
        <hr>
        <h4 class= "text-center mt-2">Product Description</h4>
        <p class="text-center">${data.description}</p>
      </div>
    </div>
  `;

  modalFooter.innerHTML = `
    <div>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary" onclick="addToCart(${data.id},${data.price})">Add this to cart</button>
    </div>
  `;

  document.getElementById('modal-content').appendChild(modalBody);
  document.getElementById('modal-content').appendChild(modalFooter);

  // console.log('item',count++)
}

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()

};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// confirm order
const orderConfirm = () => {
  const total = document.getElementById('total').innerText;
  console.log(total)
  const askUser = confirm(`Order Confirmed. Please Pay $ ${total}`);
  if (askUser == true) {
    alert(`Order Confirmed. Proceeding to Checkout`);
    location.reload();
  }
  else {
    return;
  }
}
