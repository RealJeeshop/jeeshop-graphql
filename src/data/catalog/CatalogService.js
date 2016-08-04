import axios from 'axios';

var credentials = {'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA=="};

var CatalogService = {

    findAllCatalog(args) {
        return axios.get(`https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs`, {params: args, headers: credentials})
            .then((response) => {
                return response.data
            }).catch((response) => {
                if(response.status == "404") return []
            })
    },
    findCatalogById(id) {
        return axios.get(`https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs/${id}`, {headers: credentials})
            .then((response) => {
                return response.data
            }).catch((response) => {
                if(response.status == "404") return []
            })
    },
    createCatalog(input) {
        return axios.post(`https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs`, input, {headers: credentials})
            .then((response) => {
                console.log("response : " + JSON.stringify(response));
                return response.data
            }).catch((response) => {
                console.log("response : " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    modifyCatalog(input) {
        return axios.put(`https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs`, input, {headers: credentials})
            .then((response) => {
                console.log("response : " + JSON.stringify(response));
                return response.data
            }).catch((response) => {
                console.log("response catch: " + JSON.stringify(response));
                if(response.status == "404") return []
            })
    },
    deleteCatalog(id) {
        return axios.delete(`https://apps-jeeshop.rhcloud.com/jeeshop-admin/rs/catalogs/${id}`, {headers: credentials})
            .then((response) => {
                return response.data
            }).catch((response) => {
                if(response.status == "404") return []
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