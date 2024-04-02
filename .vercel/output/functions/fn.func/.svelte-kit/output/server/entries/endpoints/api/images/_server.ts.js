import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { j as json } from "../../../../chunks/index.js";
dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
async function GET({ fetch, url }) {
  let result;
  const folderName = url.searchParams.get("folderName") || "test";
  const page = url.searchParams.get("page") || 1;
  const itemsPerPage = url.searchParams.get("itemsPerPage") || 10;
  const id = url.searchParams.get("id");
  const tag = url.searchParams.get("tag");
  const transform = url.searchParams.get("transform") || null;
  function getImage(resource) {
    let options = {
      transformation: [transform],
      type: "authenticated",
      sign_url: true
    };
    resource.url = cloudinary.v2.url(resource.public_id, options);
  }
  if (id) {
    let options = {
      type: "authenticated",
      sign_url: true
    };
    result = await cloudinary.v2.api.resource(folderName + "/" + id, options);
  } else {
    const options = {
      type: "authenticated",
      sign_url: true,
      prefix: folderName + "/",
      max_results: 100,
      sort_by: { field: "created_at", direction: "desc" }
    };
    if (tag) {
      result = await cloudinary.v2.api.resources_by_tag(tag, options);
    } else {
      result = await cloudinary.v2.api.resources(options);
    }
  }
  if (Array.isArray(result.resources)) {
    const startIdx = (+page - 1) * +itemsPerPage;
    const filteredResult = result.resources.slice(startIdx, startIdx + +itemsPerPage);
    filteredResult.forEach((result2) => getImage(result2));
    return json(filteredResult);
  } else if (result.public_id) {
    getImage(result);
    return json(result);
  }
}
export {
  GET
};
