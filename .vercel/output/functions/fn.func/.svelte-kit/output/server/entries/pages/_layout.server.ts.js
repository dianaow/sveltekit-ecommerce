const load = async function({ locals }) {
  return {
    // locals.user and locals.cart are set in hooks.server.js
    user: locals.user,
    cart: locals.cart
  };
};
export {
  load
};
