function authHeaders() {
  const token = getAuthToken();
  return {
    "content-type": "application/json",
    authorization: token,
  };
}

if (!getAuthToken()) {
  window.location.href = `${url}/signin`;
}

const cartList = document.getElementById("cart-list");
const cartEmpty = document.getElementById("cart-empty");
const cartSummary = document.getElementById("cart-summary");
const subtotalEl = document.getElementById("cart-subtotal");
const checkoutBtn = document.getElementById("checkout-btn");

async function fetchCart() {
  const res = await fetch(`${api}/cart/`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Unable to load cart");
  return res.json();
}

function formatMoney(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

function renderCart(items) {
  if (!items.length) {
    cartList.innerHTML = "";
    cartEmpty.classList.remove("hidden");
    cartSummary.classList.add("hidden");
    return;
  }

  cartEmpty.classList.add("hidden");
  cartSummary.classList.remove("hidden");

  let subtotal = 0;

  cartList.innerHTML = items
    .map((item) => {
      const qty = Number(item.quantity) || 1;
      const lineTotal = item.price * qty;
      subtotal += lineTotal;

      return `
        <article class="cart-row" data-id="${item._id}">
          <img src="${item.image}" alt="${item.title}">
          <div class="cart-row-info">
            <h3>${item.title}</h3>
            <p>${formatMoney(item.price)} each</p>
          </div>
          <div class="qty-control">
            <button type="button" class="qty-minus" aria-label="Decrease quantity">-</button>
            <span class="qty-val">${qty}</span>
            <button type="button" class="qty-plus" aria-label="Increase quantity">+</button>
          </div>
          <div class="cart-row-actions">
            <p class="cart-row-total">${formatMoney(lineTotal)}</p>
            <button type="button" class="remove-item">Remove</button>
          </div>
        </article>
      `;
    })
    .join("");

  subtotalEl.textContent = formatMoney(subtotal);
}

async function removeFromCart(id) {
  const res = await fetch(`${api}/cart/delete/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Delete failed");
}

async function setQuantity(id, quantity) {
  const res = await fetch(`${api}/cart/update/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("Update failed");
}

async function updateQuantity(id, nextQty) {
  try {
    if (nextQty < 1) {
      await removeFromCart(id);
    } else {
      await setQuantity(id, nextQty);
    }
    await loadCart();
    if (typeof updateCartCount === "function") updateCartCount();
  } catch {
    swal("", "Could not update your bag.", "warning");
  }
}

cartList.addEventListener("click", (e) => {
  const row = e.target.closest(".cart-row");
  if (!row) return;

  e.preventDefault();
  e.stopPropagation();

  const id = row.dataset.id;
  const qtyEl = row.querySelector(".qty-val");
  const currentQty = Number(qtyEl.textContent.trim()) || 1;

  if (e.target.classList.contains("qty-minus")) {
    updateQuantity(id, currentQty - 1);
  } else if (e.target.classList.contains("qty-plus")) {
    updateQuantity(id, currentQty + 1);
  } else if (e.target.classList.contains("remove-item")) {
    updateQuantity(id, 0);
  }
});

async function loadCart() {
  try {
    const items = await fetchCart();
    renderCart(items);
  } catch {
    swal("", "Please sign in to view your bag.", "warning");
    window.location.href = `${url}/signin`;
  }
}

checkoutBtn.addEventListener("click", async () => {
  try {
    const items = await fetchCart();
    if (!items.length) {
      swal("", "Your bag is empty.", "warning");
      return;
    }

    for (const item of items) {
      const qty = Number(item.quantity) || 1;
      await fetch(`${api}/orders/addorder`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          title: item.title,
          image: item.image,
          price: item.price * qty,
        }),
      });
    }

    await fetch(`${api}/cart/clear`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    swal("", "Order placed successfully!", "success");
    await loadCart();
    if (typeof updateCartCount === "function") updateCartCount();
  } catch {
    swal("", "Checkout failed. Please try again.", "warning");
  }
});

loadCart();
