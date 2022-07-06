import ApiHelper from "./ApiHelper";

function getActiveProducts() {
    return ApiHelper({
        url: "/products/active",
        method: "GET",
    });
}

function purchaseProduct(email, productId) {
    return ApiHelper({
        url: `/products/${productId}/purchase`,
        method: "POST",
        params: {
            email: email,
        },
    });
}

const ProductApi = {
    getActiveProducts,
    purchaseProduct,
};

export default ProductApi;
