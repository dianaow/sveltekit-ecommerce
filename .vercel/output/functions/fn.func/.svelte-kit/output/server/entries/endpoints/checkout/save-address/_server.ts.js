import { m as medusa } from "../../../../chunks/medusa.js";
import { e as error, j as json } from "../../../../chunks/index.js";
const POST = async ({ request, locals }) => {
  const address = await request.json();
  if (!locals.cartid || !address) {
    throw error(400, "bad format");
  }
  if (await addShippingAddress(locals, address)) {
    return json({ success: true });
  } else {
    throw error(500, "server error");
  }
};
async function addShippingAddress(locals, address) {
  if (!locals.user) {
    return false;
  }
  const success = await medusa.customers.addresses.addAddress(
    { address },
    { "Cookie": `connect.sid=${locals.sid}` }
  ).then(({ customer }) => customer).catch((e) => console.log(e));
  return { success };
}
export {
  POST
};
