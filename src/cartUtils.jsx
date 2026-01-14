export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product) => {
  const cart = getCart();
  const index = cart.findIndex(p => p.name === product.name);

  if (index !== -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
};

export const updateQty = (index, qty) => {
  const cart = getCart();
  cart[index].qty = qty;
  saveCart(cart);
};

export const removeFromCart = (index) => {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
};

export const getCartCount = () => {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
};
