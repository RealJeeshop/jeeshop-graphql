import axios from 'axios';

const credentials = {'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==", "Content-Type": "application/json"};
const url = "https://localhost:8443";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var ProductService = {

    findAllProducts(args) {

        return axios.get(`${url}/jeeshop-admin/rs/products`, {params: args, headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                if(response.status == "404") return []
            })
    },
    findProductById(id, locale) {

        let params = locale ? {locale: locale} : {};
        return axios.get(`${url}/jeeshop-admin/rs/products/${id}`, {params: params, headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                if(response.status == "404") return []
            })
    },
    createProduct(args) {
        return axios.post(`${url}/jeeshop-admin/rs/products`, {params: args, headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                if(response.status == "404") return []
            })
    },
    modifyProduct(args) {
        return axios.put(`${url}/jeeshop-admin/rs/products`, {params: args, headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                if(response.status == "404") return []
            })
    },
    deleteProduct(id) {
        return axios.delete(`${url}/jeeshop-admin/rs/products/${id}`, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                if(response.status == "404") return []
            })
    },
    findProductLocalizedContent(productId, locale) {
        return axios.get(`${url}/jeeshop-admin/rs/products/${productId}/presentations/${locale}`, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                if(response.status == "404") return []
            })
    },
    deleteProductLocalizedContent(productId, locale) {
        return axios.delete(`${url}/jeeshop-admin/rs/products/${productId}/presentations/${locale}`, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                if(response.status == "404") return []
            })
    },
    createProductLocalizedContent(productId, locale, presentationObject) {
        return axios.post(`${url}/jeeshop-admin/rs/products/${productId}/presentations/${locale}`, presentationObject, {headers: credentials})
            .then((response) => {

                return response.data;
            })
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    modifyProductLocalizedContent(productId, locale, presentationObject) {
        return axios.put(`${url}/jeeshop-admin/rs/products/${productId}/presentations/${locale}`, presentationObject, {headers: credentials})
            .then((response) => {
                console.log("response : " + JSON.stringify(response.data));
                return response.data
            })
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
};
export default ProductService;