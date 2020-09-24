import axios from "axios";
import { API_BASE_URL, PRODUCTS_URL } from "../utils/urls";

class ProductService {
  static async productDetails(params) {
    return await axios.get(
      `${API_BASE_URL}${PRODUCTS_URL}?keyword=${params.keyword}&asin=${params.asin}`
    );
  }
}
export default ProductService;
