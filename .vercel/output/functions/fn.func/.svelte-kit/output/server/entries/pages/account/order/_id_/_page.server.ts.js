import { m as medusa } from "../../../../../chunks/medusa.js";
import { r as redirect, e as error } from "../../../../../chunks/index.js";
const load = async function({ params, locals }) {
  if (!locals.user)
    throw redirect(307, "/auth?rurl=account/order/" + params.id);
  const order = await medusa.orders.lookupOrder({
    display_id: params.id,
    email: locals.user.email
  }).then(({ order: order2 }) => order2).catch((e) => console.log(e));
  if (order.customer.id !== locals.user.id)
    throw error(403, "You are not authorized to view this order");
  else
    return {
      order
    };
};
const actions = {};
export {
  actions,
  load
};
