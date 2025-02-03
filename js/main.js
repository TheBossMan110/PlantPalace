document.addEventListener("DOMContentLoaded", function () {
  updateCartBadge();
  displayCart();
});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartProduct = plantsData.find((p) => p.id === productId);
  let qty = document.getElementById("qty").value;
  qty = parseInt(qty);

  const existingProduct = cart.find((p) => p.id === productId);

  if (existingProduct) {
    alert("Item already exist in cart.");
    existingProduct.quantity += 1;
  } else {
    alert("item successfully added to cart");
    cart.push({ ...cartProduct, quantity: qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  totalAmout();
}

function updateCartBadge() {
  const cartBadges = document.getElementById("cartQuantity");
  let cartData = JSON.parse(localStorage.getItem("cart")) || [];

  cartBadges.innerHTML = "";
  cartBadges.innerHTML = "(" + cartData.length + ")";

  totalAmout();
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const prodTable = document.getElementById("prodTable");

  prodTable.innerHTML = "";

  cart.forEach((item) => {
    const row = document.createElement("tr");
    let cleanedValue = item.price.replace(/Rs: |,/g, "");
    cleanedValue *= item.quantity;
    row.innerHTML = ` <tr><td class="cart_product_img">
                                        <a href="#"><img src="${
                                          item.image[0]
                                        }" alt="Product"></a>
                                        <h5>${item.name}</h5>
                                    </td>
                                    <td class="qty">
                                        <div class="quantity">
                                            <span class="qty-minus" onclick="updateQuantity(${
                                              item.id
                                            },-1)"><i class="fa fa-minus" aria-hidden="true"></i></span>
                                            <input type="number" class="qty-text" id="qty" step="1" min="1" max="99" name="quantity" value="${
                                              item.quantity
                                            }">
                                            <span class="qty-plus" onclick="updateQuantity(${
                                              item.id
                                            },1)"><i class="fa fa-plus" aria-hidden="true"></i></span>
                                        </div>
                                    </td>
                                    <td class="price"><span>${
                                      item.price
                                    }</span></td>
                                    <td class="total_price"><span>${cleanedValue.toLocaleString()}</span>
                                     <input type="text" hidden class="totalAmout" value="${cleanedValue.toLocaleString()}"/></td>
                                    <td class="action"><span style="cursor: pointer;" onclick="removeFromCart(${
                                      item.id
                                    })"><i class="icon_close"></i></span></td>
                                </tr>`;
    prodTable.appendChild(row);
  });
  updateCartBadge();
}

function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = cart.find((p) => p.id === productId);
  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      cart = cart.filter((p) => p.id !== productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    totalAmout();
    updateCartBadge();
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((p) => p.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartBadge();
  totalAmout();
}

function totalAmout() {
  let total = 0;
  let priceElements = document.querySelectorAll(".totalAmout");

  priceElements.forEach((element) => {
    var numberWithoutComma = element.value.replace(/,/g, "");
    total += parseInt(numberWithoutComma);
  });

  let showTotal = document.getElementById("showTotal");
  let showTotal2 = document.getElementById("showTotal2");
  showTotal.textContent = "Rs: " + total.toLocaleString();
  showTotal2.textContent = "Rs: " + total.toLocaleString();
}

function checkout() {
  if (localStorage.getItem("cart")) {
    alert("Thank you for shopping with us.");
    localStorage.clear();
    window.location.href = "index.html";
  } else {
    alert("Please add items to cart before checkout.");
  }
}
