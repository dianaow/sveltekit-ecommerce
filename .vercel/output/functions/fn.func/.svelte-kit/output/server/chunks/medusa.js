import Medusa from "@medusajs/medusa-js";
const MEDUSA_BACKEND_URL = "https://canvas-backend-660d1de77d7e.herokuapp.com";
const SECRET_TURNSTILE_KEY = "";
const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });
export {
  SECRET_TURNSTILE_KEY as S,
  medusa as m
};
