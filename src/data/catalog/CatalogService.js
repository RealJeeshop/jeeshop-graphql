import axios from 'axios';

const credentials = {'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==", "Content-Type": "application/json"};
const url = "https://localhost:8443";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var CatalogService = {

    findAllCatalog(args) {

        return axios.get(`${url}/jeeshop-admin/rs/catalogs`, {params: args, headers: credentials})
            .then((response) => {
                console.log("response.data of find all : " + JSON.stringify(response.data));
                return response.data
            }).catch((response) => {
                if(response.status == "404") return []
            })
    },
    findCatalogById(id) {
        return axios.get(`${url}/jeeshop-admin/rs/catalogs/${id}`, {headers: credentials})
            .then((response) => {
                return response.data
            }).catch((response) => {
                if(response.status == "404") return []
            })
    },
    createCatalog(input) {
        return axios.post(`${url}/jeeshop-admin/rs/catalogs`, input, {headers: credentials})
            .then((response) => {
                return response.data
            }).catch((response) => {
                console.log("response catch: " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    modifyCatalog(input) {
        return axios.put(`${url}/jeeshop-admin/rs/catalogs`, input, {headers: credentials})
            .then((response) => {
                console.log("response : " + JSON.stringify(response.data));
                return response.data
            }).catch((response) => {
                if(response.status == "404") return []
                return []
            })
    },
    deleteCatalog(id) {
        return axios.delete(`${url}/jeeshop-admin/rs/catalogs/${id}`, {headers: credentials})
            .then((response) => {
                console.log("response.data of delete : " + JSON.stringify(response));
                return computeServiceResult(response)
            }).catch((response) => {
                console.log("response.data of catch delete : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    getCatalogLocalizedContent(id, locale) {
        return axios.get(`${url}/jeeshop-admin/rs/catalogs/${id}/presentations/${locale}`, {headers: credentials})
            .then((response) => {
                console.log("response from getCatalogLocalizedContent: " + JSON.stringify(response.data));
                return response.data
            }).catch((response) => {
                console.log("error in getCatalogLocalizedContent : " + JSON.stringify(response));
                if(response.status == "404") return []
                return []

            })
    },
    createCatalogLocalizedContent(id, input) {
        return axios.post(`${url}/jeeshop-admin/rs/catalogs/${id}/presentations/${input.locale}`, input, {headers: credentials})
            .then((response) => {
                console.log("response from createCatalogLocalizedContent: " + JSON.stringify(response.data));
                return response.data
            }).catch((response) => {
                console.log("error in createCatalogLocalizedContent : " + JSON.stringify(response));
                if(response.status == "404") return []
                return []

            })
    }
};

function computeServiceResult(response) {

    var result = {}
    switch (response.status) {

        case 200:
        case 201:
        case 204:
            result.message = "Success"
            result.success = true
            break;

        case 400:
            result.message = response.data.message + ': ' + response.data.exception
            result.success = false
            break;

        case 409:
            result.message =response.data.message + ': ' + response.data.exception
            result.success = false
            break;

        default:
            result.message = '(' + response.status + ') ' + response.data.message + ': ' + response.data.exception
            result.success = false
            break;
    }

    return result
}


export default CatalogService;