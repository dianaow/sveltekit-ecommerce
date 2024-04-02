import { r as redirect, f as fail } from "../../../chunks/index.js";
import { m as medusa } from "../../../chunks/medusa.js";
const load = async function({ url, locals }) {
  if (!locals.user)
    throw redirect(307, "/auth");
  const user = medusa.customers.retrieve({ "Cookie": `connect.sid=${locals.sid}` }).then(({ customer }) => customer).catch((e) => console.log(e));
  return {
    user,
    currentPage: parseInt(url.searchParams?.get("page")) || 1
  };
};
const actions = {
  editInfo: async ({ request, locals }) => {
    const data = await request.formData();
    const first_name = data.get("firstName");
    const last_name = data.get("lastName");
    const email = data.get("email");
    const phone = data.get("phone");
    if (!first_name || !last_name || !email) {
      return fail(400, { first_name, missing: true });
    }
    const success = await medusa.customers.update(
      { first_name, last_name, email, phone },
      { "Cookie": `connect.sid=${locals.sid}` }
    ).then(({ response }) => response.status === 200).catch((e) => console.log(e));
    return { success };
  },
  addAddress: async ({ request, locals }) => {
    const data = await request.formData();
    const first_name = data.get("firstName");
    const last_name = data.get("lastName");
    const address_1 = data.get("address1");
    const address_2 = data.get("address2");
    const city = data.get("city");
    const country_code = "us";
    const province = data.get("state");
    const postal_code = data.get("zip");
    const phone = data.get("phone");
    if (!first_name || !last_name || !address_1 || !city || !province || !postal_code) {
      console.log(first_name, last_name, address_1, city, province, postal_code);
      return fail(400, { first_name, missing: true });
    }
    const success = await addShippingAddress(locals, { first_name, last_name, address_1, address_2, city, country_code, province, postal_code, phone });
    return { success };
  },
  editAddress: async ({ request, locals }) => {
  },
  deleteAddress: async ({ request, locals }) => {
    const data = await request.formData();
    const addressId = data.get("addressId");
    if (!addressId) {
      return fail(400, { addressId, missing: true });
    }
    const success = await medusa.customers.addresses.deleteAddress(
      addressId,
      { "Cookie": `connect.sid=${locals.sid}` }
    ).then(({ response }) => response.status === 200).catch((e) => console.log(e));
    return { success };
  },
  changePassword: async ({ request, locals }) => {
    const data = await request.formData();
    const currentPassword = data.get("currentPassword");
    const newPassword = data.get("newPassword");
    const confirmPassword = data.get("confirmPassword");
    if (!currentPassword || !newPassword || !confirmPassword) {
      return fail(400, { currentPassword, newPassword, confirmPassword, missing: true });
    }
    if (newPassword !== confirmPassword) {
      return fail(400, { currentPassword, newPassword, confirmPassword, mismatch: true });
    }
    const success = await medusa.customers.update(
      { password: newPassword },
      { "Cookie": `connect.sid=${locals.sid}` }
    ).then(({ response }) => response.status === 200).catch((e) => console.log(e));
    return { success };
  }
};
async function addShippingAddress(locals, address) {
  if (!locals.user) {
    return false;
  }
  const success = await medusa.customers.addresses.addAddress(
    { address },
    { "Cookie": `connect.sid=${locals.sid}` }
  ).then(({ response }) => response.status === 200).catch((e) => console.log(e));
  return { success };
}
export {
  actions,
  load
};
