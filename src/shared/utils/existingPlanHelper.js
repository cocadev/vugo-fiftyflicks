import ProductApi from "api/ProductApi";
import { formatLocalTime } from "shared/utils/timeFormatter";

export const formatToLocaTime = (dateTime) => {
    const planValidTime = new Date(dateTime);
    const formattedTime = formatLocalTime(planValidTime);
    return formattedTime;
};

export const getProductName = async (productId) => {
    const { data: products } = await ProductApi.getActiveProducts();
    const productName = products.filter(
        (product) => product.id === productId
    )[0].name;
    return productName;
};
