import axios from 'axios';

const credentials = {'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==", "Content-Type": "application/json"};
const url = "https://localhost:8443";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var SKUService = {

    findAllSKUs(args) {

        return axios.get(`${url}/jeeshop-admin/rs/skus`, {params: args, headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    findSKUById(id, locale) {

        let params = locale ? {locale: locale} : {};
        return axios.get(`${url}/jeeshop-admin/rs/skus/${id}`, {params: params, headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    createSKU(input) {
        return axios.post(`${url}/jeeshop-admin/rs/skus/`, input, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    modifySKU(input) {
        return axios.put(`${url}/jeeshop-admin/rs/skus/`, input, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    deleteSKU(id) {
        return axios.delete(`${url}/jeeshop-admin/rs/skus/${id}`, {headers: credentials})
            .then((response) => response)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
                return {}
            })
    },
    findSKULocalizedContent(id, locale) {
        return axios.get(`${url}/jeeshop-admin/rs/skus/${id}/presentations/${locale}`, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    deleteSKULocalizedContent(skuId, locale) {
        return axios.delete(`${url}/jeeshop-admin/rs/skus/${skuId}/presentations/${locale}`, {headers: credentials})
            .then((response) => {
                if(response.status == "204") return {success: true}
            })
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    createSKULocalizedContent(skuId, locale, presentationObject) {
        return axios.post(`${url}/jeeshop-admin/rs/skus/${skuId}/presentations/${locale}`, presentationObject, {headers: credentials})
            .then((response) => {

                return response.data;
            })
            .catch((response) => {
                console.log("response error : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    modifySKULocalizedContent(skuId, locale, presentationObject) {
        return axios.put(`${url}/jeeshop-admin/rs/skus/${skuId}/presentations/${locale}`, presentationObject, {headers: credentials})
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
export default SKUService;