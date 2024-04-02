import Medusa from "@medusajs/medusa-js"
import { MEDUSA_BACKEND_URL } from '$env/static/private'

const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })

export default medusa
