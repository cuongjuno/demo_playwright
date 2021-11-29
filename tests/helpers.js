exports.updateCart = (storage, cart) => {
  return {
    ...storage,
    origins: [
      {
        origin: "https://www.saucedemo.com",
        localStorage: [
          {
            name: "cart-contents",
            value: JSON.stringify(cart),
          },
        ],
      },
    ],
  };
};
