export const getLocalStorageCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const setLocalStorageCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToLocalStorageCart = (product,quantity) => {
  const cart = getLocalStorageCart();
  const productInCart = cart.find((cartItem) => cartItem.id ===product.id);

  if (productInCart) {
    productInCart.quantity += quantity;
  } else {
    const item = { ...product , quantity: quantity };
    cart.push(item);
  }
  setLocalStorageCart(cart);
};

export const  clearLocalStorageCart=()=> {
  localStorage.clear();
  return [];
}

export const updateLocalStorageCartItemQuantity = (productId, quantity) => {
  const cart = getLocalStorageCart();
  const index = cart.findIndex((item) => item.id === productId);

  if (index !== -1) {
    cart[index].quantity = quantity;
  }

  setLocalStorageCart(cart);
};

export const removeLocalStorageCartItem = (productId) => {
  const cart = getLocalStorageCart();
  const updatedCart = cart.filter((item) => item.id !== productId);
  setLocalStorageCart(updatedCart);
};