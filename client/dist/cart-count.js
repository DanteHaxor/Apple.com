function getBagPageUrl() {
  return `${url}/bag.html`;
}

async function updateCartCount() {
  const bspan = document.getElementById("bspan");
  const bagLink = document.getElementById("bag-link");
  const token = getAuthToken();

  if (!bspan && !bagLink) return;

  if (!token) {
    if (bspan) bspan.textContent = "";
    if (bagLink) bagLink.href = `${url}/signin`;
    return;
  }

  if (bagLink) bagLink.href = getBagPageUrl();

  try {
    const res = await fetch(`${api}/cart/`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    });

    if (!res.ok) throw new Error("cart fetch failed");

    const data = await res.json();
    const count = Array.isArray(data)
      ? data.reduce((sum, item) => sum + (item.quantity || 1), 0)
      : 0;

    if (bspan) bspan.textContent = count > 0 ? ` (${count})` : "";
  } catch {
    if (bspan) bspan.textContent = "";
  }
}

window.updateCartCount = updateCartCount;
updateCartCount();
