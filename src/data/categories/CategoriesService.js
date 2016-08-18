import axios from 'axios';

const credentials = {'Authorization': "Basic YWRtaW5AamVlc2hvcC5vcmc6amVlc2hvcA==", "Content-Type": "application/json"};
const url = "https://localhost:8443";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var CategoriesService = {

    findAllCategories(args) {

        return axios.get(`${url}/jeeshop-admin/rs/categories`, {params: args, headers: credentials})
            .then((response) => {
                console.log("resonse.data : " + JSON.stringify(response.data));
                return response.data
            })
            .catch((response) => {
                if(response.status == "404") return []
            })
    },
    createCategoryLocalizedContent(id, input) {
        return axios.post(`${url}/jeeshop-admin/rs/categories/${id}/presentations/${input.locale}`, input, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("error in createCatalogLocalizedContent : " + JSON.stringify(response));
                if(response.status == "404") return []
                return []

            })
    },
    getCategoryLocalizedContent(id, locale) {
        return axios.get(`${url}/jeeshop-admin/rs/categories/${id}/presentations/${locale}`, {headers: credentials})
            .then((response) => response.data)
            .catch((response) => {
                console.log("error in getCatalogLocalizedContent : " + JSON.stringify(response));
                if(response.status == "404") return []
                return []

            })
    },
};
export default CategoriesService;