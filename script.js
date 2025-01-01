let prices = { milk: 80, paneer: 150, curd: 120, butter: 180 };
let quantities = { milk: 1, paneer: 1, curd: 1, butter: 1 };
let discount = 0;

function updateQuantity(product, change) {
  if (quantities[product] + change >= 0) { // Allow quantity to go down to 0
    quantities[product] += change;
    document.getElementById(`${product}-quantity`).innerText = quantities[product];
    document.getElementById(`${product}-price`).innerText = `₹${quantities[product] * prices[product]}`;
    updateTotals();
  }
}

function applyCoupon() {
  const coupon = document.getElementById("couponCode").value.trim();
  if (coupon === "SAVE10") {
    discount = 10;
    document.getElementById("discountMessage").innerText = "Coupon Applied! 10% Discount.";
  } else {
    discount = 0;
    document.getElementById("discountMessage").innerText = "Invalid Coupon Code.";
  }
  updateTotals();
}

function updateTotals() {
  const subtotal = quantities.milk * prices.milk + 
                   quantities.paneer * prices.paneer + 
                   quantities.curd * prices.curd + 
                   quantities.butter * prices.butter;
  const tax = subtotal * 0.05;
  const total = subtotal + tax - (subtotal * discount) / 100;
  document.getElementById("subtotal").innerText = `₹${subtotal.toFixed(2)}`;
  document.getElementById("tax").innerText = `₹${tax.toFixed(2)}`;
  document.getElementById("total").innerText = `₹${total.toFixed(2)}`;
}

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const total = document.getElementById("total").innerText;

  // Redirect to summary page
  window.location.href = `checkout.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&address=${encodeURIComponent(address)}&total=${encodeURIComponent(total)}`;
});
